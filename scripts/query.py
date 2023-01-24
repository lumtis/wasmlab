import os
import sys
from utils import queries, contract_query


def query(queries, query_name):
    contract_query(queries[query_name])


if __name__ == "__main__":
    queries = queries()

    if len(sys.argv) < 2:
        print("Usage: python3 query.py <query_name>")
        exit(1)

    query(queries, sys.argv[1])