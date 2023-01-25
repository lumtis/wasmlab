use cosmwasm_std::{to_binary, Decimal, Empty, Uint128};
use dao_interface::{Admin, ModuleInstantiateInfo};
use dao_voting::{
    deposit::{DepositRefundPolicy, DepositToken, UncheckedDepositInfo},
    pre_propose::PreProposeInfo,
    threshold::PercentageThreshold,
    threshold::Threshold,
};

fn main() {
    // Get binary of a voting contract instantiate message
    let voting_bin = to_binary(&dao_voting_cw20_staked::msg::InstantiateMsg {
        token_info: dao_voting_cw20_staked::msg::TokenInfo::Existing {
            address: "juno1suhgf5svhu4usrurvxzlgn54ksxmn8gljarjtxqnapv8kjnp4nrsf8smqw".to_string(),
            staking_contract: dao_voting_cw20_staked::msg::StakingInfo::New {
                staking_code_id: 10,
                unstaking_duration: None,
            },
        },
        active_threshold: None,
    });

    // Get binary of propose contract instantiate message
    let propose_bin = to_binary(&dao_proposal_single::msg::InstantiateMsg {
        min_voting_period: None,
        threshold: Threshold::ThresholdQuorum {
            threshold: PercentageThreshold::Majority {},
            quorum: PercentageThreshold::Percent(Decimal::percent(10)),
        },
        max_voting_period: cw_utils::Duration::Time(432000),
        allow_revoting: false,
        only_members_execute: true,
        pre_propose_info: PreProposeInfo::ModuleMayPropose {
            info: ModuleInstantiateInfo {
                code_id: 10,
                msg: to_binary(&dao_pre_propose_single::InstantiateMsg {
                    deposit_info: Some(UncheckedDepositInfo {
                        denom: DepositToken::VotingModuleToken {},
                        amount: Uint128::new(1000000000),
                        refund_policy: DepositRefundPolicy::OnlyPassed,
                    }),
                    open_proposal_submission: false,
                    extension: Empty::default(),
                })
                .unwrap(),
                admin: Some(Admin::CoreModule {}),
                label: "DAO DAO Pre-Propose Module".to_string(),
            },
        },
        close_proposal_on_execution_failure: false,
    });

    println!("voting: {}", voting_bin.unwrap());
    println!("propose: {}", propose_bin.unwrap());
}
