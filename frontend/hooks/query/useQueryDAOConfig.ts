import useQuery from "../useQuery";

// DAOInfo is a type that represents DAO information
export type DAOConfig = {
  name: string;
  description: string;
  address: string;
  image: string;
};

const useQueryDAOConfig = (address: string) => {
  const { res, loading } = useQuery(address, {
    config: {},
  });

  const daoConfig: DAOConfig = {
    name: res?.name,
    description: res?.description,
    address: address,
    image: res?.image_url,
  };

  return { daoConfig, loading };
};

export default useQueryDAOConfig;
