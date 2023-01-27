import { Chain } from "@chain-registry/types";

// localnet chain info
export const localnet: Chain = {
  chain_name: "localnet",
  status: "live",
  network_type: "testnet",
  pretty_name: "Localnet",
  chain_id: "testing",
  bech32_prefix: "juno",
  slip44: 118,
  fees: {
    fee_tokens: [
      {
        denom: "ujunox",
        fixed_min_gas_price: 0.0025,
        low_gas_price: 0.03,
        average_gas_price: 0.04,
        high_gas_price: 0.05,
      },
    ],
  },
  staking: {
    staking_tokens: [
      {
        denom: "ujunox",
      },
    ],
  },
  apis: {
    rpc: [{ address: "http://localhost:26657" }],
  },
};
