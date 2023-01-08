#[cfg(not(feature = "library"))]
use cosmwasm_std::entry_point;
use cosmwasm_std::{
    to_binary, Addr, Binary, Deps, DepsMut, Env, MessageInfo, Reply, Response, StdResult, SubMsg,
    Uint128, WasmMsg,
};
use cw0::parse_reply_instantiate_data;
use cw2::set_contract_version;
use cw20::MinterResponse;

use crate::error::ContractError;
use crate::msg::{ExecuteMsg, InstantiateMsg, MigrateMsg, QueryMsg};
use crate::state::TOKEN;

// version info for migration info
const CONTRACT_NAME: &str = "crates.io:tokenminter";
const CONTRACT_VERSION: &str = env!("CARGO_PKG_VERSION");

const INSTANTIATE_TOKEN_REPLY_ID: u64 = 0;

/// Handling contract instantiation
#[cfg_attr(not(feature = "library"), entry_point)]
pub fn instantiate(
    deps: DepsMut,
    env: Env,
    info: MessageInfo,
    msg: InstantiateMsg,
) -> Result<Response, ContractError> {
    set_contract_version(deps.storage, CONTRACT_NAME, CONTRACT_VERSION)?;

    let instantiate_token_data = &cw20_base::msg::InstantiateMsg {
        name: msg.name,
        symbol: msg.symbol,
        decimals: 6,
        initial_balances: vec![],
        mint: Some(MinterResponse {
            minter: env.contract.address.into(),
            cap: None,
        }),
        marketing: None,
    };

    let instantiate_token_msg = WasmMsg::Instantiate {
        code_id: msg.token_code_id,
        funds: vec![],
        admin: None,
        label: "token".to_string(),
        msg: to_binary(instantiate_token_data)?,
    };

    let reply_msg = SubMsg::reply_on_success(instantiate_token_msg, INSTANTIATE_TOKEN_REPLY_ID);

    Ok(Response::new()
        .add_submessage(reply_msg)
        .add_attribute("method", "instantiate")
        .add_attribute("owner", info.sender))
}

/// Handling contract migration
/// To make a contract migratable, you need
/// - this entry_point implemented
/// - only contract admin can migrate, so admin has to be set at contract initiation time
/// Handling contract execution
#[cfg_attr(not(feature = "library"), entry_point)]
pub fn migrate(_deps: DepsMut, _env: Env, msg: MigrateMsg) -> Result<Response, ContractError> {
    match msg {
        // Find matched incoming message variant and execute them with your custom logic.
        //
        // With `Response` type, it is possible to dispatch message to invoke external logic.
        // See: https://github.com/CosmWasm/cosmwasm/blob/main/SEMANTICS.md#dispatching-messages
    }
}

/// Handling contract execution
#[cfg_attr(not(feature = "library"), entry_point)]
pub fn execute(
    deps: DepsMut,
    _env: Env,
    _info: MessageInfo,
    msg: ExecuteMsg,
) -> Result<Response, ContractError> {
    match msg {
        ExecuteMsg::Mint { recipient, amount } => execute_mint(deps, recipient, amount),
    }
}

/// Handle minting new tokens
fn execute_mint(
    deps: DepsMut,
    recipient: String,
    amount: Uint128,
) -> Result<Response, ContractError> {
    let token_address = TOKEN.load(deps.storage)?;

    let mint_token = cw20_base::msg::ExecuteMsg::Mint {
        recipient: recipient.clone(),
        amount,
    };

    let execute_msg = WasmMsg::Execute {
        contract_addr: token_address.into(),
        funds: vec![],
        msg: to_binary(&mint_token)?,
    };

    Ok(Response::new().add_message(execute_msg))
}

/// Handling contract query
#[cfg_attr(not(feature = "library"), entry_point)]
pub fn query(deps: Deps, _env: Env, msg: QueryMsg) -> StdResult<Binary> {
    match msg {
        QueryMsg::Token {} => to_binary(&query_token(deps)?),
    }
}

/// Handle query token
fn query_token(deps: Deps) -> StdResult<Addr> {
    let token_address = TOKEN.load(deps.storage)?;
    Ok(token_address)
}

/// Handling submessage reply.
/// For more info on submessage and reply, see https://github.com/CosmWasm/cosmwasm/blob/main/SEMANTICS.md#submessages
#[cfg_attr(not(feature = "library"), entry_point)]
pub fn reply(deps: DepsMut, _env: Env, msg: Reply) -> Result<Response, ContractError> {
    if msg.id != INSTANTIATE_TOKEN_REPLY_ID {
        return Err(ContractError::UnknownReplyId { id: msg.id });
    };
    let res = parse_reply_instantiate_data(msg);
    match res {
        Ok(res) => {
            // Validate contract address
            let cw20_addr = deps.api.addr_validate(&res.contract_address)?;

            // Save gov token
            TOKEN.save(deps.storage, &cw20_addr)?;

            Ok(Response::new())
        }
        Err(_) => Err(ContractError::InstantiateTokenError {}),
    }
}
