use cosmwasm_schema::cw_serde;
use cosmwasm_std::{Addr, Timestamp};
use cw_storage_plus::{Item, Map};

#[cw_serde]
pub struct VaultInfo {
    pub unlock_time: u64,
    pub token: Addr,
}

#[cw_serde]
pub struct UnlockingTokens {
    pub amount: u128,
    pub unlock_start: Timestamp,
}

pub const VAULT_INFO: Item<VaultInfo> = Item::new("vault_info");
pub const LOCKED: Map<&Addr, u128> = Map::new("locked");
pub const UNLOCKING: Map<&Addr, Vec<UnlockingTokens>> = Map::new("unlocking");
