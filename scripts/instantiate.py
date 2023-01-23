import os
import sys
from utils import contracts, instantiate_contract

wasm_ext = ".wasm"


def instantiate(contracts, serie):
    root = os.path.expanduser(contracts["root"])

    # iterate over instances
    for instance in contracts["instances"][serie]:
        # get instance name
        instance_name = instance["name"]

        # instantiate contract
        print(f"⏳ Instantiating {instance_name}...")
        address = instantiate_contract(instance)
        print(f"✅ {instance_name} instantiated: {address}")


if __name__ == "__main__":
    contracts = contracts()

    if len(sys.argv) < 2:
        print("Usage: python3 instantiate.py <serie>")
        exit(1)

    instantiate(contracts, sys.argv[1])