import { Button, CardBody, CardText } from "reactstrap";

type ButtonConnectProps = {
  walletName?: string;
  onConnect: () => void;
  connected: boolean;
};

// ButtonConnect is a button that allows to connect to a wallet
export const ButtonConnect = ({
  onConnect,
  connected,
  walletName,
  ...props
}: ButtonConnectProps) => {
  if (!connected) {
    return (
      <Button className="btn btn-primary" onClick={onConnect}>
        Connect
      </Button>
    );
  }

  return (
    <CardBody>
      <CardText>{walletName}</CardText>
    </CardBody>
  );
};
