import { useTokenBalance } from "../hooks/useTokenBalance";
import { CardTitle, CardBody, CardText } from "reactstrap";

// BalanceAvailable is a component that displays the available balance of the token
const BalanceAvailable = () => {
  const { balance } = useTokenBalance(
    "FOO",
    "juno124x902fdvdcaawkr7njtjtccx94jq5vq4vtw6mhshxlrjqqxezqqyexm8w",
    6
  );

  return (
    <CardBody>
      <CardTitle>FOO Balance</CardTitle>
      <CardText>{balance}</CardText>
    </CardBody>
  );
};

export default BalanceAvailable;
