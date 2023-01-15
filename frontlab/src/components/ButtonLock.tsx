import { Button } from "reactstrap";

// ButtonLock is a button that allows to trigger the lock action for tokens
const ButtonLock = () => {
  // Lock tokens
  const lock = () => {
    console.log("lock");
  };

  return (
    <Button className="btn btn-primary" onClick={lock}>
      Lock
    </Button>
  );
};

export default ButtonLock;
