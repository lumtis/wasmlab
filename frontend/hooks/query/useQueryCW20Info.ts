import useQuery from "../useQuery";

export type TokenInfo = {
  name: string;
  symbol: string;
  decimals: number;
};

const useQueryCW20Info = (contractAddress: string) => {
  const { res, loading } = useQuery(contractAddress, {
    token_info: {},
  });

  const tokenInfo: TokenInfo = {
    name: res?.name,
    symbol: res?.symbol,
    decimals: res?.decimals,
  };

  return { tokenInfo, loading };
};

export default useQueryCW20Info;
