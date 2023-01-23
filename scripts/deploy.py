import os
from utils import contracts, store

wasm_ext = ".wasm"


def deploy(contracts):
    root = os.path.expanduser(contracts["root"])

    # iterate over projects
    for project in contracts["projects"]:

        # go to bin root
        project_root = os.path.join(root, project["path"])
        bin_root = os.path.join(project_root, project["bin"])
        os.chdir(bin_root)

        # iterate over contracts
        for contract in project["contracts"]:
            # get contract name
            contract_name = contract["name"]

            # deploy contract
            print(f"⏳ Deploying {contract['name']} code...")
            code_id = store(contract_name + wasm_ext)
            print(f"✅ {contract['name']} code deployed: {code_id}")


if __name__ == "__main__":
    contracts = contracts()

    deploy(contracts)