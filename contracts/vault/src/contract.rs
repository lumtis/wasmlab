#[cfg(not(feature = "library"))]
use cosmwasm_std::entry_point;
use cosmwasm_std::{
    to_binary, Addr, Binary, CosmosMsg, Deps, DepsMut, Env, MessageInfo, Response, StdResult,
    Storage, Uint128, WasmMsg,
};
use cw2::set_contract_version;

use crate::error::ContractError;
use crate::msg::{
    ConfirmUnlockMsg, ExecuteMsg, InstantiateMsg, LockMsg, LockedResponse, QueryMsg, UnlockMsg,
    UnlockingResponse, VaultInfoResponse,
};

use crate::state::{UnlockingTokens, LOCKED, UNLOCKING, VAULT_INFO};

// version info for migration info
const CONTRACT_NAME: &str = "crates.io:vault";
const CONTRACT_VERSION: &str = env!("CARGO_PKG_VERSION");

/// Handling contract instantiation
#[cfg_attr(not(feature = "library"), entry_point)]
pub fn instantiate(
    deps: DepsMut,
    _env: Env,
    info: MessageInfo,
    msg: InstantiateMsg,
) -> Result<Response, ContractError> {
    set_contract_version(deps.storage, CONTRACT_NAME, CONTRACT_VERSION)?;

    VAULT_INFO.save(deps.storage, &msg.vault_info)?;

    // With `Response` type, it is possible to dispatch message to invoke external logic.
    // See: https://github.com/CosmWasm/cosmwasm/blob/main/SEMANTICS.md#dispatching-messages
    Ok(Response::new()
        .add_attribute("method", "instantiate")
        .add_attribute("owner", info.sender))
}

/// Handling contract execution
#[cfg_attr(not(feature = "library"), entry_point)]
pub fn execute(
    deps: DepsMut,
    env: Env,
    info: MessageInfo,
    msg: ExecuteMsg,
) -> Result<Response, ContractError> {
    match msg {
        ExecuteMsg::Lock(msg) => execute_lock(deps, env, info, msg),
        ExecuteMsg::Unlock(msg) => execute_unlock(deps, env, info, msg),
        ExecuteMsg::ConfirmUnlock(msg) => execute_confirm_unlock(deps, env, info, msg),
    }
}

pub fn execute_lock(
    deps: DepsMut,
    env: Env,
    info: MessageInfo,
    msg: LockMsg,
) -> Result<Response, ContractError> {
    let sender = info.sender.to_string();
    let contract_addr = env.contract.address.to_string();

    // Add to locked balance
    LOCKED.update(
        deps.storage,
        &info.sender,
        |locked| -> Result<u128, ContractError> {
            let locked = locked.unwrap_or_default();
            Ok(locked + msg.amount)
        },
    )?;

    // Get messages for transfering tokens from the sender to the contract
    let msgs = get_transfer_from_messages(deps.storage, sender, contract_addr, msg.amount.into())?;

    let res = Response::new().add_messages(msgs);
    Ok(res)
}

pub fn execute_unlock(
    deps: DepsMut,
    env: Env,
    info: MessageInfo,
    msg: UnlockMsg,
) -> Result<Response, ContractError> {
    let locked = LOCKED.load(deps.storage, &info.sender)?;

    // Check if locked balance is enough
    if locked < msg.amount {
        return Err(ContractError::InsufficientLockedBalance {});
    }

    // Reduce locked balance
    LOCKED.update(
        deps.storage,
        &info.sender,
        |locked| -> Result<u128, ContractError> {
            let locked = locked.unwrap_or_default();
            Ok(locked - msg.amount)
        },
    )?;

    // Add to unlocking balance
    UNLOCKING.update(
        deps.storage,
        &info.sender,
        |unlocking| -> Result<Vec<UnlockingTokens>, ContractError> {
            let mut unlocking = unlocking.unwrap_or_default();
            unlocking.push(UnlockingTokens {
                amount: msg.amount,
                unlock_start: env.block.time,
            });
            Ok(unlocking)
        },
    )?;

    let res = Response::new();
    Ok(res)
}

pub fn execute_confirm_unlock(
    deps: DepsMut,
    env: Env,
    info: MessageInfo,
    _msg: ConfirmUnlockMsg,
) -> Result<Response, ContractError> {
    let sender = info.sender.to_string();

    // Get the unlock time
    let vault_info = VAULT_INFO.load(deps.storage)?;
    let unlock_time = vault_info.unlock_time;

    let mut total_unlocking = 0;

    // Remove all unlocking tokens that are older than unlock_time
    UNLOCKING.update(
        deps.storage,
        &info.sender,
        |unlocking| -> Result<Vec<UnlockingTokens>, ContractError> {
            let mut unlocking = unlocking.unwrap_or_default();

            // Calculate total unlocking amount and remove unlocking tokens that are older than unlock_time
            for token in unlocking.iter() {
                if token.unlock_start.plus_seconds(unlock_time) < env.block.time {
                    total_unlocking += token.amount;
                }
            }
            unlocking.retain(|x| x.unlock_start.plus_seconds(unlock_time) > env.block.time);
            Ok(unlocking)
        },
    )?;

    // Get messages for transfering tokens back to the sender
    let msgs = get_transfer_messages(deps.storage, sender, total_unlocking.into())?;

    let res = Response::new().add_messages(msgs);
    Ok(res)
}

/// Returns cw20 messages to transfer tokens from an address to another
pub fn get_transfer_from_messages(
    storage: &dyn Storage,
    from: String,
    to: String,
    amount: Uint128,
) -> StdResult<Vec<CosmosMsg>> {
    // get token address from vault info
    let vault_info = VAULT_INFO.load(storage)?;
    let contract_addr = vault_info.token.to_string();

    // transfer message
    let transfer_from_msg = cw20::Cw20ExecuteMsg::TransferFrom {
        owner: from.clone(),
        recipient: to.clone(),
        amount,
    };

    // return messages
    Ok(vec![CosmosMsg::Wasm(WasmMsg::Execute {
        contract_addr: contract_addr.clone(),
        msg: to_binary(&transfer_from_msg)?,
        funds: vec![],
    })])
}

/// Returns cw20 messages to transfer tokens from caller to another
pub fn get_transfer_messages(
    storage: &dyn Storage,
    to: String,
    amount: Uint128,
) -> StdResult<Vec<CosmosMsg>> {
    // get token address from vault info
    let vault_info = VAULT_INFO.load(storage)?;
    let contract_addr = vault_info.token.to_string();

    // transfer message
    let transfer_from_msg = cw20::Cw20ExecuteMsg::Transfer {
        recipient: to.clone(),
        amount,
    };

    // return messages
    Ok(vec![CosmosMsg::Wasm(WasmMsg::Execute {
        contract_addr: contract_addr.clone(),
        msg: to_binary(&transfer_from_msg)?,
        funds: vec![],
    })])
}

/// Handling contract query
#[cfg_attr(not(feature = "library"), entry_point)]
pub fn query(_deps: Deps, _env: Env, msg: QueryMsg) -> StdResult<Binary> {
    match msg {
        QueryMsg::VaultInfo {} => to_binary(&query_vault_info(_deps)?),
        QueryMsg::Locked { addr } => to_binary(&query_locked(_deps, addr)?),
        QueryMsg::Unlocking { addr } => to_binary(&query_unlocking(_deps, addr)?),
    }
}

fn query_vault_info(deps: Deps) -> StdResult<VaultInfoResponse> {
    let vault_info = VAULT_INFO.load(deps.storage)?;
    Ok(VaultInfoResponse { vault_info })
}

fn query_locked(_deps: Deps, addr: Addr) -> StdResult<LockedResponse> {
    let locked = LOCKED.load(_deps.storage, &addr)?;
    Ok(LockedResponse { locked })
}

fn query_unlocking(_deps: Deps, addr: Addr) -> StdResult<UnlockingResponse> {
    let unlocking = UNLOCKING.load(_deps.storage, &addr)?;
    Ok(UnlockingResponse { unlocking })
}

#[cfg(test)]
mod test {
    use crate::state::VaultInfo;

    use super::*;
    use cosmwasm_std::testing::{mock_dependencies, mock_env, mock_info};
    use cosmwasm_std::{coins, from_binary};

    #[test]
    fn proper_initialization() {
        let mut deps = mock_dependencies();

        let msg = InstantiateMsg {
            vault_info: VaultInfo {
                token: Addr::unchecked("owner"),
                unlock_time: 100,
            },
        };

        let info = mock_info("creator", &coins(1000, "earth"));

        // we can just call .unwrap() to assert this was a success
        let res = instantiate(deps.as_mut(), mock_env(), info, msg).unwrap();
        assert_eq!(0, res.messages.len());

        // it worked, let's query the state
        let res = query(deps.as_ref(), mock_env(), QueryMsg::VaultInfo {}).unwrap();
        let value: VaultInfoResponse = from_binary(&res).unwrap();
        assert_eq!(
            value,
            VaultInfoResponse {
                vault_info: VaultInfo {
                    token: Addr::unchecked("owner"),
                    unlock_time: 100,
                }
            }
        );
    }

    #[test]
    fn lock() {
        let mut deps = mock_dependencies();

        let msg = InstantiateMsg {
            vault_info: VaultInfo {
                token: Addr::unchecked("owner"),
                unlock_time: 100,
            },
        };

        let info = mock_info("creator", &coins(1000, "earth"));

        let _res = instantiate(deps.as_mut(), mock_env(), info, msg).unwrap();

        let info = mock_info("addr0000", &coins(1000, "earth"));
        let msg = LockMsg { amount: 100 };
        let res = execute_lock(deps.as_mut(), mock_env(), info, msg).unwrap();
        assert_eq!(0, res.messages.len());

        let res = query(
            deps.as_ref(),
            mock_env(),
            QueryMsg::Locked {
                addr: Addr::unchecked("addr0000"),
            },
        )
        .unwrap();
        let value: LockedResponse = from_binary(&res).unwrap();
        assert_eq!(value, LockedResponse { locked: 100 });
    }
}
