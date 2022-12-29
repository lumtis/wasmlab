use cosmwasm_schema::{cw_serde, QueryResponses};

use cosmwasm_std::{Uint128, Addr};

/// Message type for `instantiate` entry_point
#[cw_serde]
pub struct InstantiateMsg {
    pub token_code_id: u64,
}

/// Message type for `execute` entry_point
#[cw_serde]
pub enum ExecuteMsg {
    /// Mint new tokens
    Mint {
        /// Address of the recipient
        recipient: String,
        /// Amount of tokens to mint
        amount: Uint128,
    },
}

/// Message type for `migrate` entry_point
#[cw_serde]
pub enum MigrateMsg {}

/// Message type for `query` entry_point
#[cw_serde]
#[derive(QueryResponses)]
pub enum QueryMsg {
    /// Returns the token address
    #[returns(FooTokenResponse)]
    FooToken {},
}

#[cw_serde]
pub struct FooTokenResponse {
    pub token_address: Addr,
}