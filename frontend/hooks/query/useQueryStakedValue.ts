import useQuery from "../useQuery";

const useQueryStakedValue = (
  contractAddress: string,
  holderAddress: string
): {
  staked?: string;
  loading: boolean;
} => {
  const { res, loading } = useQuery(contractAddress, {
    staked_value: {
      address: holderAddress,
    },
  });

  return { staked: res?.value, loading };
};

export default useQueryStakedValue;
