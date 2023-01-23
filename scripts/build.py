import os
from utils import contracts, compile_wasm


def build(contracts):
    root = os.path.expanduser(contracts["root"])

    # iterate over projects
    for project in contracts["projects"]:

        # define rust flag
        os.environ["RUSTFLAGS"] = "-C link-arg=-s"

        # get project root
        project_root = os.path.join(root, project["path"])

        # iterate over contracts
        for contract in project["contracts"]:
            # move to contract root
            contract_root = os.path.join(project_root, contract["path"])
            os.chdir(contract_root)

            # compile contract
            print(f"⏳ Compiling {contract['name']}...")
            compile_wasm()
            print(f"✅ {contract['name']} compiled")


if __name__ == "__main__":
    contracts = contracts()

    build(contracts)