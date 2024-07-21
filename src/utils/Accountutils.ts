import ethers, { SigningKey, BaseWallet, Wallet, HDNodeWallet } from "ethers";

interface Account {
  privateKey: string;
  address: string;
  balance: string;
}

export const generateKey = (
  seedPhrase: string = ""
  // index: number = 0
): {
  account: Account;
  seedPhrase: string;
} => {
  let wallet: HDNodeWallet | Wallet;
  if (seedPhrase === "") {
    seedPhrase = String(Wallet.createRandom().mnemonic?.phrase);
  }
  wallet = Wallet.fromPhrase(seedPhrase);
  const { address } = wallet;
  const account = { address, privateKey: wallet.privateKey, balance: "0" };
  // console.log("gerry", address, account);

  return { account, seedPhrase: seedPhrase.includes(" ") ? seedPhrase : "" };
};
