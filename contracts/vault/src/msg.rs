use cosmwasm_schema::{cw_serde, QueryResponses};
use cosmwasm_std::Addr;

use crate::state::{UnlockingTokens, VaultInfo};

/// Message type for `instantiate` entry_point
#[cw_serde]
pub struct InstantiateMsg {
    pub vault_info: VaultInfo,
}

/// Message type for `execute` entry_point
#[cw_serde]
pub enum ExecuteMsg {
    /// Locks tokens in the contract
    Lock(LockMsg),
    /// Triggers the unlock tokens from the contract    
    TriggerUnlock(TriggerUnlockMsg),
    /// Completes unlocking tokens from the contract after the unlock time has passed
    CompleteUnlock(CompleteUnlockMsg),
}

#[cw_serde]
pub struct LockMsg {
    pub addr: Addr,
    pub amount: u128,
}

#[cw_serde]
pub struct TriggerUnlockMsg {
    pub addr: Addr,
    pub amount: u128,
}

#[cw_serde]
pub struct CompleteUnlockMsg {}

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
    Locked { addr: Addr },

    /// Returns the unlocking tokens
    #[returns(UnlockingResponse)]
    Unlocking { addr: Addr },
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
