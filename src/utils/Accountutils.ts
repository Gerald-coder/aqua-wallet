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
    // the private key is gotten from the seedPhrase, through hash functions, the public key is generated from the private key through an encryption library like openssl or cryptojs and the elliptic curve digital signature algorithm (ECDSA), this public key is then hashed through hashing algorithms like keccak 256 to generate the ethereum address for an account.
  }
  wallet = Wallet.fromPhrase(seedPhrase);
  const { address, privateKey } = wallet;
  const account = { address, privateKey, balance: "0" };
  // console.log("gerry", address, account);

  return { account, seedPhrase: seedPhrase.includes(" ") ? seedPhrase : "" };
};

export function toFixedIfNecessary(value: string, decimalPlaces: number = 2) {
  return +parseFloat(value).toFixed(decimalPlaces);
}
