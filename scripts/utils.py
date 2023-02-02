import yaml
import subprocess
import base64
import json


def create_contract_query_cmd(address, q):
    prefix = ["junod", "q", "wasm", "contract-state", "smart"]

    return prefix + [address, q]


def contract_query(query):
    q = json.dumps(query["content"]).replace("null", f'{{}}')

    subprocess.run(create_contract_query_cmd(query["address"], q), check=True)


def create_tx_cmd(cmd):
    prefix = ["junod", "tx", "wasm"]
    suffix = [
        "--from", "user1", "--chain-id", "testing", "--yes", "-b", "block",
        "--gas", "auto", "--gas-adjustment", "1.5"
    ]

    return prefix + cmd + suffix


def create_store_cmd(contract_file):
    return create_tx_cmd(["store", contract_file])


def create_instantiate_cmd(name, code_id, init_msg):
    return create_tx_cmd(
        ["instantiate", code_id, init_msg, "--label", name, "--no-admin"])


def get_code_id_from_response(res):
    # parse response and get code id
    for event in res["events"]:
        if event["type"] == "store_code":
            for attr in event["attributes"]:
                if base64.b64decode(attr["key"]).decode('utf-8') == "code_id":
                    return base64.b64decode(attr["value"]).decode('utf-8')

    raise Exception("No code id found in response")


def store(contract_file):
    p = subprocess.run(create_store_cmd(contract_file),
                       check=True,
                       stdout=subprocess.PIPE)
    res = yaml.safe_load(p.stdout)

    return get_code_id_from_response(res)


def get_contract_addresses_from_response(res, contract_name_list):
    addresses = {}

    # parse response and get contract addresses from the list of names
    for event in res["logs"][0]["events"]:
        if event["type"] == "wasm":
            for attr in event["attributes"]:
                if attr["key"] in contract_name_list:
                    addresses[attr["key"]] = attr["value"]

    return addresses


def instantiate_contract(instance):
    init_msg = json.dumps(instance["msg"])

    p = subprocess.run(create_instantiate_cmd(instance["name"],
                                              str(instance["code"]), init_msg),
                       check=True,
                       stdout=subprocess.PIPE)
    res = yaml.safe_load(p.stdout)

    # print(json.dumps(res, indent=4))

    return get_contract_addresses_from_response(res, instance["address_list"])


def compile_wasm():
    subprocess.run(["cargo", "wasm"],
                   check=True,
                   stdout=subprocess.DEVNULL,
                   stderr=subprocess.DEVNULL)


def contracts():
    # read contracts.yaml file
    with open("contracts.yaml") as file:
        contracts = yaml.safe_load(file)
        return contracts


def queries():
    # read queries.yaml file
    with open("queries.yaml") as file:
        contracts = yaml.safe_load(file)
        return contracts


def dump_code_ids(codes):
    with open("codes.yaml", "w") as file:
        yaml.dump(codes, file)


def dump_contract_addresses(addresses_from_serie, serie):
    with open("addresses.yaml") as file:
        addresses = yaml.safe_load(file)
        addresses[serie] = addresses_from_serie
        with open("addresses.yaml", "w") as addr_file:
            yaml.dump(addresses, addr_file)