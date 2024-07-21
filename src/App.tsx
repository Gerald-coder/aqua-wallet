import AccountCreated from "./scenes/account/AccountCreated";

function App() {
  return (
    <div className="w-[45rem] bg-[#f2f2f2] mx-auto mt-[2rem] p-[2rem] flex items-center justify-center flex-col shadow-lg">
      <h2 className="text-[2rem]">IFT 513 Wallet</h2>
      <AccountCreated />
    </div>
  );
}

export default App;
