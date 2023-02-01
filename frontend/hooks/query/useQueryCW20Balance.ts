import useQuery from "../useQuery";

const useQueryCW20Balance = (
  contractAddress: string,
  holderAddress: string
): {
  balance?: string;
  loading: boolean;
} => {
  const { res, loading } = useQuery(contractAddress, {
    balance: {
      address: holderAddress,
    },
  });

  return { balance: res?.balance, loading };
};

export default useQueryCW20Balance;
