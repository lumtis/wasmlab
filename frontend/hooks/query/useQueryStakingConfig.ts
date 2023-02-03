import useQuery from "../useQuery";

// DAOInfo is a type that represents DAO information
export type StakingConfig = {
  token_address: string;
  unstaking_duration?: any;
};

const useQueryStakingConfig = (address: string) => {
  const { res, loading } = useQuery(address, {
    get_config: {},
  });

  const stakingConfig: StakingConfig = {
    token_address: res?.token_address,
    unstaking_duration: res?.unstaking_duration,
  };

  return { stakingConfig, loading };
};

export default useQueryStakingConfig;
