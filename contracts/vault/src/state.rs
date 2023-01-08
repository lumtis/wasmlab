use cosmwasm_schema::cw_serde;
use cosmwasm_std::{Addr, Timestamp};
use cw_storage_plus::{Item, Map};

#[cw_serde]
pub struct VaultInfo {
    /// The time it takes for tokens to unlock
    pub unlock_time: u64,

    /// The address of the token contract
    pub token: Addr,

    /// The address of the owner of the vault
    /// This is the address that can trigger locking unlocking tokens
    /// If this is None, then anyone can trigger locking and unlocking tokens
    /// None should only be used for testing
    pub owner: Option<Addr>,
}

#[cw_serde]
pub struct UnlockingTokens {
    pub amount: u128,
    pub unlock_start: Timestamp,
}

pub const VAULT_INFO: Item<VaultInfo> = Item::new("vault_info");
pub const LOCKED: Map<&Addr, u128> = Map::new("locked");
pub const UNLOCKING: Map<&Addr, Vec<UnlockingTokens>> = Map::new("unlocking");
