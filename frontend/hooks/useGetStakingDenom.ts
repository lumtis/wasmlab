import useQueryStakingConfig from "./query/useQueryStakingConfig";
import useQueryCW20Info from "./query/useQueryCW20Info";

const useGetStakingDenom = (
  contractAddress: string
): {
  denom: string;
  loading: boolean;
} => {
  const { stakingConfig } = useQueryStakingConfig(contractAddress);
  const { tokenInfo, loading } = useQueryCW20Info(stakingConfig?.token_address);
  const denom = tokenInfo?.symbol;

  return { denom, loading };
};

export default useGetStakingDenom;
