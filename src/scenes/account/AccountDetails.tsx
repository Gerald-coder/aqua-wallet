import React, { useEffect, useState } from "react";
import { sendToken } from "../../utils/transactioUtils";
import { sepolia } from "../../scenes/chain";
import { Account } from "../Account";
// import AccountTransactions from "./AccountTransactions";
import { ethers } from "ethers";
import { toFixedIfNecessary } from "../../utils/Accountutils";
import "./account.css";

interface AccountDetailProps {
  account: Account;
}

const AccountDetail: React.FC<AccountDetailProps> = ({ account }) => {
  const [destinationAddress, setDestinationAddress] = useState("");
  const [amount, setAmount] = useState(0);
  const [balance, setBalance] = useState(account.balance);

  const [networkResponse, setNetworkResponse] = useState<{
    status: null | "pending" | "complete" | "error";
    message: string | React.ReactElement;
  }>({
    status: null,
    message: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const provider = new ethers.JsonRpcProvider(sepolia.rpcUrl);
      let accountBalance = await provider.getBalance(account.address);
      setBalance(
        String(toFixedIfNecessary(ethers.formatEther(accountBalance)))
      );
    };
    fetchData();
  }, [account.address]);

  function handleDestinationAddressChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    setDestinationAddress(event.target.value);
  }

  function handleAmountChange(event: React.ChangeEvent<HTMLInputElement>) {
    setAmount(Number.parseFloat(event.target.value));
  }

  async function transfer() {
    // Set the network response status to "pending"
    setNetworkResponse({
      status: "pending",
      message: "",
    });

    try {
      const { receipt } = await sendToken(
        amount,
        account.address,
        destinationAddress,
        account.privateKey
      );

      if (receipt?.status === 1) {
        // Set the network response status to "complete" and the message to the transaction hash
        setNetworkResponse({
          status: "complete",
          message: (
            <p>
              Transfer complete!{" "}
              <a
                href={`${sepolia.blockExplorerUrl}/tx/${receipt.hash}`}
                target="_blank"
                rel="noreferrer"
              >
                View transaction
              </a>
            </p>
          ),
        });
        return receipt;
      } else {
        // Transaction failed
        console.log(`Failed to send ${receipt}`);
        // Set the network response status to "error" and the message to the receipt
        setNetworkResponse({
          status: "error",
          message: JSON.stringify(receipt),
        });
        return { receipt };
      }
    } catch (error: any) {
      // An error occurred while sending the transaction
      console.error({ error });
      // Set the network response status to "error" and the message to the error
      setNetworkResponse({
        status: "error",
        message: error.reason || JSON.stringify(error),
      });
    }
  }

  return (
    <div className="mt-4">
      <h4 className="text-[1.2rem] text-gray-600 flex flex-col items-center justify-center">
        Address:
        <a
          href={`https://sepolia.etherscan.io/address/${account.address}`}
          target="_blank"
          rel="noreferrer"
          className="text-blue-500"
        >
          {account.address}
        </a>
        Balance: {balance} ETH
      </h4>
      <div className="flex flex-col items-start justify-center gap-2">
        <div className="flex flex-col w-full">
          <label>Destination Address:</label>
          <input
            className="w-full bg-transparent border border-gray-400 h-[2rem] rounded-lg outline-none p-2"
            type="text"
            value={destinationAddress}
            onChange={handleDestinationAddressChange}
          />
        </div>

        <div className="flex flex-col w-full">
          <label>Amount:</label>
          <input
            className="w-full bg-transparent border border-gray-400 h-[2rem] rounded-lg outline-none p-2"
            type="number"
            step={0.01}
            min={0}
            value={amount}
            onChange={handleAmountChange}
          />
        </div>

        <button
          className="bg-blue-500 p-2 text-white rounded-lg"
          type="button"
          onClick={transfer}
          disabled={!amount || networkResponse.status === "pending"}
        >
          Send {amount} ETH
        </button>
      </div>

      {networkResponse.status && (
        <>
          {networkResponse.status === "pending" && (
            <p>Transfer is pending...</p>
          )}
          {networkResponse.status === "complete" && (
            <p>{networkResponse.message}</p>
          )}
          {networkResponse.status === "error" && (
            <p>
              Error occurred while transferring tokens:{" "}
              {networkResponse.message}
            </p>
          )}
        </>
      )}

      {/* <AccountTransactions account={account} /> */}
    </div>
  );
};

export default AccountDetail;
