# 👨‍🔬 `wasmlab`

**Some personal experimentations with CosmWasm smart contract development using Osmosis Beaker.**

## `vault`

<img src="images/vault.png" alt="" width="150"/>

The Vault contract is a simple smart contract that allows users to lock a predefined CW20 token into the contract. To use the contract, users simply send a message with the desired amount of the token to be locked. Once the tokens are locked, they can be unlocked at any time by sending an unlock message to the contract. However, the unlocked tokens are not yet liquid and must be confirmed by the user after a specified time period.

## Testing

`beaker.toml` is configured to interact with a Wasm chain launched with DAO-DAO test environment. To launch this environment:

- https://github.com/DA0-DA0/dao-contracts/blob/main/CONTRIBUTING.md#deploying-in-a-development-environment

### Commands

Build contracts

```
beaker wasm build
```

Store token base code

```
beaker wasm store-code cw20-base --signer-account test1
```

Deploy a mintable token

```
beaker wasm deploy tokenminter --signer-account test1 --no-wasm-opt --raw '{ "name": "foo", "symbol": "FOO", "token_code_id": 20 }'
```

Mint some tokens

```
beaker wasm execute tokenminter --raw '{ "mint": {"amount": "10000", "recipient": "juno10j9gpw9t4jsz47qgnkvl5n3zlm2fz72k67rxsg"} }' --signer-account test1
```

Get address token contract

```
beaker wasm query tokenminter --raw '{"token": {}}'
```

Get balance of token

```
docker exec -i cosmwasm junod q wasm contract-state smart "juno124x902fdvdcaawkr7njtjtccx94jq5vq4vtw6mhshxlrjqqxezqqyexm8w" '{"balance": {"address": "juno10j9gpw9t4jsz47qgnkvl5n3zlm2fz72k67rxsg"}}'
```

Deploy a vault

```
beaker wasm deploy vault --signer-account test1 --no-wasm-opt --raw '{ "vault_info": {"unlock_time": 60, "token": "juno124x902fdvdcaawkr7njtjtccx94jq5vq4vtw6mhshxlrjqqxezqqyexm8w"} }'
```

Add `test1` account in the dev environment

```
echo "siren window salt bullet cream letter huge satoshi fade shiver permit offer happy immense wage fitness goose usual aim hammer clap about super trend" > mnemonic.txt
docker exec -i cosmwasm junod keys add test1 --recover < mnemonic.txt
rm mnemonic.txt
```

Increase allowance for vault

```
docker exec -i cosmwasm junod tx wasm execute "juno124x902fdvdcaawkr7njtjtccx94jq5vq4vtw6mhshxlrjqqxezqqyexm8w" '{ "increase_allowance": {"spender": "juno1ah5xxylq7rfnrldn0rtvlm77gpfk3jhlq9jq40z573u6dx0awnvqqnz2f5", "amount": "100000"} }' --from test1 --chain-id testing -y
```

Lock tokens into vault

```
beaker wasm execute vault --raw '{ "lock": {"addr": "juno10j9gpw9t4jsz47qgnkvl5n3zlm2fz72k67rxsg", "amount": "2000"} }' --signer-account test1
or
docker exec -i cosmwasm junod tx wasm execute "juno1ah5xxylq7rfnrldn0rtvlm77gpfk3jhlq9jq40z573u6dx0awnvqqnz2f5" '{ "lock": {"addr": "juno10j9gpw9t4jsz47qgnkvl5n3zlm2fz72k67rxsg", "amount": "2000"} }' --from test1 --chain-id testing -y
```

Get locked tokens

```
beaker wasm query vault --raw '{"locked": {"addr": "juno10j9gpw9t4jsz47qgnkvl5n3zlm2fz72k67rxsg"}}'
or
docker exec -i cosmwasm junod q wasm contract-state smart "juno1ah5xxylq7rfnrldn0rtvlm77gpfk3jhlq9jq40z573u6dx0awnvqqnz2f5" '{"locked": {"addr": "juno10j9gpw9t4jsz47qgnkvl5n3zlm2fz72k67rxsg"}}'

```

Start unlocking tokens from vault

```
beaker wasm execute vault --raw '{ "trigger_unlock": { "addr": "juno10j9gpw9t4jsz47qgnkvl5n3zlm2fz72k67rxsg", "amount": "500"} }' --signer-account test1
```

Get unlocking tokens

```
beaker wasm query vault --raw '{"unlocking": {"addr": "juno10j9gpw9t4jsz47qgnkvl5n3zlm2fz72k67rxsg"}}'
```

Complete unlock after unlocking time

```
beaker wasm execute vault --raw '{ "complete_unlock": {} }' --signer-account test1
```
