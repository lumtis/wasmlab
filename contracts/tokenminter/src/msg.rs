use cosmwasm_schema::{cw_serde, QueryResponses};

use cosmwasm_std::{Addr, Uint128};

/// Message type for `instantiate` entry_point
#[cw_serde]
pub struct InstantiateMsg {
    /// name of the token
    pub name: String,

    /// symbol of the token
    pub symbol: String,

    /// code id of the token contract
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
    #[returns(TokenResponse)]
    Token {},
}

#[cw_serde]
pub struct TokenResponse {
    pub token_address: Addr,
}
