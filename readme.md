# 👨‍🔬 `wasmlab`

**Some personal experimentations with CosmWasm smart contract development using Osmosis Beaker.**

## `vault`

<img src="images/vault.png" alt="" width="150"/>

The Vault contract is a simple smart contract that allows users to lock a predefined CW20 token into the contract. To use the contract, users simply send a message with the desired amount of the token to be locked. Once the tokens are locked, they can be unlocked at any time by sending an unlock message to the contract. However, the unlocked tokens are not yet liquid and must be confirmed by the user after a specified time period.

### Testing

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
beaker wasm deploy tokenminter --signer-account test1 --no-wasm-opt --raw '{ "name": "foo", "symbol": "FOO", "token_code_id": 1 }'
```

Mint some tokens

```
beaker wasm execute tokenminter --raw '{ "mint": {"amount": "10000", "recipient": "wasm13rlrrumq285fwf4sh6celk4vd33m7yyl6yesgd"} }' --signer-account test1
```

Get address token contract

```
beaker wasm query tokenminter --raw '{"token": {}}'
```

Get balance of token

```
wasmdd q wasm contract-state smart "wasm1suhgf5svhu4usrurvxzlgn54ksxmn8gljarjtxqnapv8kjnp4nrss5maay" '{"balance": {"address": "wasm13rlrrumq285fwf4sh6celk4vd33m7yyl6yesgd"}}'
```

Deploy a vault

```
beaker wasm deploy vault --signer-account test1 --no-wasm-opt --raw '{ "vault_info": {"unlock_time": 60, "token": "wasm1suhgf5svhu4usrurvxzlgn54ksxmn8gljarjtxqnapv8kjnp4nrss5maay"} }'
```

Increase allowance for vault

```
wasmdd tx wasm execute "wasm1suhgf5svhu4usrurvxzlgn54ksxmn8gljarjtxqnapv8kjnp4nrss5maay" '{ "increase_allowance": {"spender": "wasm17p9rzwnnfxcjp32un9ug7yhhzgtkhvl9jfksztgw5uh69wac2pgsm0v070", "amount": "100000"} }' --from alice --chain-id wasmd -y
```

Lock tokens into vault

```
beaker wasm execute vault --raw '{ "lock": {"addr": "wasm13rlrrumq285fwf4sh6celk4vd33m7yyl6yesgd", "amount": "2000"} }' --signer-account test1
```

Get locked tokens

```
beaker wasm query vault --raw '{"locked": {"addr": "wasm13rlrrumq285fwf4sh6celk4vd33m7yyl6yesgd"}}'
```

Start unlocking tokens from vault

```
beaker wasm execute vault --raw '{ "trigger_unlock": { "addr": "wasm13rlrrumq285fwf4sh6celk4vd33m7yyl6yesgd", "amount": "500"} }' --signer-account test1
```

Get unlocking tokens

```
beaker wasm query vault --raw '{"unlocking": {"addr": "wasm13rlrrumq285fwf4sh6celk4vd33m7yyl6yesgd"}}'
```

Complete unlock after unlocking time

```
beaker wasm execute vault --raw '{ "complete_unlock": {} }' --signer-account test1
```
