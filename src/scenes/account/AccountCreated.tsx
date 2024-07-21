import React, { useCallback, useEffect, useState } from "react";
import { generateKey } from "../../utils/Accountutils";
import { Account } from "../Account";
import AccountDetail from "../account/AccountDetails";
import "./account.css";

const recoveryPhraseKeyName = "recoveryPhrase";

function AccountCreated() {
  const [seedphrase, setSeedphrase] = useState("");

  const [account, setAccount] = useState<Account | null>(null);

  const [showRecoverInput, setShowRecoverInput] = useState(false);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSeedphrase(event.target.value);
  }

  const handleKeyDown = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    recoverAccount(seedphrase);
    setSeedphrase("");
  };

  const recoverAccount = useCallback(async (recoveryPhrase: string) => {
    const result = await generateKey(recoveryPhrase);
    console.log(result);

    setAccount(result.account);
    setSeedphrase("");

    if (localStorage.getItem(recoveryPhraseKeyName) !== recoveryPhrase) {
      localStorage.setItem(recoveryPhraseKeyName, recoveryPhrase);
    }
  }, []);

  useEffect(() => {
    const localStorageRecoveryPhrase = localStorage.getItem(
      recoveryPhraseKeyName
    );
    if (localStorageRecoveryPhrase) {
      setSeedphrase(localStorageRecoveryPhrase);
      recoverAccount(localStorageRecoveryPhrase);
    }
  }, [recoverAccount]);

  async function createAccount() {
    const result = await generateKey();

    console.log({ result });

    setAccount(result.account);
  }

  return (
    <div>
      <div className="AccountTransactions pt-6 flex items-center justify-center gap-2">
        <button
          type="button"
          className="bg-blue-700 p-2 text-white rounded-lg"
          onClick={createAccount}
        >
          Create Account
        </button>

        <button
          type="button"
          className="bg-blue-500 p-2 text-white rounded-lg"
          onClick={() =>
            showRecoverInput
              ? recoverAccount(seedphrase)
              : setShowRecoverInput(true)
          }
          disabled={showRecoverInput && !seedphrase}
        >
          Recover account
        </button>
      </div>
      {showRecoverInput && (
        <div className="w-full my-6">
          <form
            onSubmit={handleKeyDown}
            className="flex flex-col w-full py-6 items-start justify-center gap-2"
          >
            <label htmlFor="phrase"></label>
            <input
              type="text"
              id="phrase"
              placeholder="Seedphrase or private key for recovery"
              className="w-full bg-transparent border border-gray-400 h-[2rem] rounded-lg outline-none p-2"
              value={seedphrase}
              onChange={handleChange}
            />
            <div className="flex items-center justify-center gap-2">
              <button
                type="submit"
                value="submit"
                className="bg-blue-500 p-2 text-white rounded-lg"
              >
                Recover
              </button>
              <button
                className="bg-gray-500 p-2 text-white rounded-lg"
                onClick={() => setShowRecoverInput(false)}
              >
                close
              </button>
            </div>
          </form>
        </div>
      )}
      {account && (
        <>
          <hr className="mt-4 text-black font-bold" />
          <AccountDetail account={account} />
        </>
      )}
    </div>
  );
}

export default AccountCreated;

// import { useState } from "react";
// import { generateKey } from "../../utils/Accountutils";

// const AccountCreated = () => {
//   const [showSeedInput, setShowSeedInput] = useState(false);
//   const [seedPhrase, setSeedPhrase] = useState("");
//   const createAccount = () => {
//     const keys = generateKey();
//     console.log(keys);
//   };

//   const rocoverAccount = () => {
//     setShowSeedInput(true);
//   };

//   const generateAccount = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const keys = generateKey(seedPhrase);
//     console.log({ keys });
//   };

//   const setPhrase = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSeedPhrase(e.target.value);
//   };
//   return (
//     <div>
//       <div className="pt-6 flex items-center justify-center gap-2">
//         <button
//           onClick={createAccount}
//           className="bg-blue-700 p-2 text-white rounded-lg"
//         >
//           Create Account
//         </button>
//         <button
//           onClick={rocoverAccount}
//           className="bg-blue-500 p-2 text-white rounded-lg"
//         >
//           Recover Account
//         </button>
//       </div>
//       {showSeedInput ? (
//         <div>
//           <form onSubmit={generateAccount}>
//             <label htmlFor="phrase">Seed Phrase</label>
//             <input
//               type="text"
//               id="phrase"
//               placeholder="please add your seedphrase"
//               onChange={setPhrase}
//             />
//             <button type="submit" value="submit">
//               Recover
//             </button>
//           </form>
//         </div>
//       ) : null}
//     </div>
//   );
// };

// export default AccountCreated;
