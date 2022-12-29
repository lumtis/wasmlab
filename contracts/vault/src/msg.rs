use cosmwasm_schema::{cw_serde, QueryResponses};
use cosmwasm_std::Addr;

use crate::state::{VaultInfo, UnlockingTokens};

/// Message type for `instantiate` entry_point
#[cw_serde]
pub struct InstantiateMsg {
    pub vault_info: VaultInfo,
}

#[cw_serde]
pub struct LockMsg {
    pub amount: u128,
}

#[cw_serde]
pub struct UnlockMsg {
    pub amount: u128,
}

#[cw_serde]
pub struct ConfirmUnlockMsg {}

/// Message type for `execute` entry_point
#[cw_serde]
pub enum ExecuteMsg {
    /// Locks tokens in the contract
    Lock(LockMsg),
    /// Unlocks tokens from the contract    
    Unlock(UnlockMsg),
    /// Confirms unlocking tokens from the contract after the unlock time has passed
    ConfirmUnlock(ConfirmUnlockMsg),
}

/// Message type for `migrate` entry_point
#[cw_serde]
pub enum MigrateMsg {}

/// Message type for `query` entry_point
#[cw_serde]
#[derive(QueryResponses)]
pub enum QueryMsg {
    /// Returns the vault info
    #[returns(VaultInfoResponse)]
    VaultInfo {},

    /// Returns the locked tokens
    #[returns(LockedResponse)]
    Locked {addr: Addr},

    /// Returns the unlocking tokens
    #[returns(UnlockingResponse)]
    Unlocking {addr: Addr},
}

#[cw_serde]
pub struct VaultInfoResponse {
    pub vault_info: VaultInfo,
}

#[cw_serde]
pub struct LockedResponse {
    pub locked: u128,
}

#[cw_serde]
pub struct UnlockingResponse {
    pub unlocking: Vec<UnlockingTokens>,
}