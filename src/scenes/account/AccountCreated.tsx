import { generateKey } from "../../utils/Accountutils";

const AccountCreated = () => {
  const createAccount = () => {
    const keys = generateKey();
    console.log(keys);
  };
  return (
    <div>
      <button onClick={createAccount}>Create Account</button>
    </div>
  );
};

export default AccountCreated;
