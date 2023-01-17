import { Button } from "reactstrap";

type ButtonLockProps = {
  onLock: () => void;
};

// ButtonLock is a button that allows to trigger the lock action for tokens
const ButtonLock = ({ onLock, ...props }: ButtonLockProps) => {
  return (
    <Button className="btn btn-primary" onClick={onLock}>
      Lock
    </Button>
  );
};

export default ButtonLock;
