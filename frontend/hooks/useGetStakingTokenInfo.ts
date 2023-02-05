import useQueryStakingConfig from "./query/useQueryStakingConfig";
import useQueryCW20Info, { TokenInfo } from "./query/useQueryCW20Info";

const useGetStakingTokenInfo = (
  contractAddress: string
): {
  tokenInfo: TokenInfo;
  loading: boolean;
} => {
  const { stakingConfig } = useQueryStakingConfig(contractAddress);
  const { tokenInfo, loading } = useQueryCW20Info(stakingConfig?.token_address);

  return { tokenInfo, loading };
};

export default useGetStakingTokenInfo;
