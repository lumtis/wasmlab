use cosmwasm_std::to_binary;

fn main() {
    // Get binary of a voting contract instantiate message
    let bin = to_binary(&dao_voting_cw20_staked::msg::InstantiateMsg {
        token_info: dao_voting_cw20_staked::msg::TokenInfo::Existing {
            address: "juno182jzjwdyl5fw43yujnlljddgtrkr04dpd30ywp2yn724u7qhtaqsnwt2ks".to_string(),
            staking_contract: dao_voting_cw20_staked::msg::StakingInfo::New {
                staking_code_id: 10,
                unstaking_duration: None,
            },
        },
        active_threshold: None,
    });

    println!("{}", bin.unwrap());
}
