use cosmwasm_schema::cw_serde;
use cosmwasm_std::{Addr, Timestamp};
use cw_storage_plus::{Item, Map};

#[cw_serde]
pub struct IncentivesInfo {
    /// The address of the vault contract
    pub vault: Addr,
}

#[cw_serde]
pub struct IncentivesPool {
    /// Identifier of the pool
    pub id: u64,

    /// The address of the token contract for incentives
    pub token: Addr,

    /// The total amount of incentives to distribute
    pub total: u128,

    /// The amount of incentives that have been distributed
    pub distributed: u128,

    /// The block height at which the incentives start
    pub start_height: u64,

    /// The number of incentives to distribute per block
    pub per_block: u128,IncentivesInfo

    /// The block height at which the incentives ended
    /// If this is None, then the incentives hasn't ended
    /// This value is set when all the incentives have been distributed or withdrawn
    pub end_height: Option<u64>,
}

/// Incentives static info
pub const INCENTIVES_INFO: Item<IncentivesInfo> = Item::new("incentives_info");

/// Incentives pools
pub const INCENTIVES_POOLS: Map<u64, IncentivesPool> = Item::new("incentives_pools");

/// Incentives pool counter
pub const INCENTIVES_POOL_COUNTER: Item<u64> = Item::new("incentives_pool_counter");

/// Specify for a given block height, the cumulated amount of incentives per staked token
/// This represents the amount of incentives a would receive if they staked one token from the start height
/// This structure allows to get efficiently the amount of incentives a user can claim
pub const CUMULATED_INCENTIVES_PER_STAKE: Map<u64, u128> = Item::new("incentives_per_block");