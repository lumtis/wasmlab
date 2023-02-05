import useQuery from "../useQuery";

const useQueryMinterToken = (
  contractAddress: string
): {
  token?: string;
  loading: boolean;
} => {
  const { res, loading } = useQuery(contractAddress, {
    token: {},
  });

  return { token: res, loading };
};

export default useQueryMinterToken;
