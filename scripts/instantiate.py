import sys
from utils import contracts, instantiate_contract, dump_contract_addresses

wasm_ext = ".wasm"


def instantiate(contracts, serie):
    addresses = {}

    # iterate over instances
    for instance in contracts["instances"][serie]:
        # get instance name
        instance_name = instance["name"]

        # instantiate contract
        print(f"⏳ Instantiating {instance_name}...")
        address = instantiate_contract(instance)
        print(f"✅ {instance_name} instantiated: {address}")

        addresses[instance_name] = address

    # dump addresses
    dump_contract_addresses(addresses, serie)


if __name__ == "__main__":
    contracts = contracts()

    if len(sys.argv) < 2:
        print("Usage: python3 instantiate.py <serie>")
        exit(1)

    instantiate(contracts, sys.argv[1])