// import Moralis from "moralis";

// try {
//   await Moralis.start({
//     apiKey: "YOUR_API_KEY",
//   });

//   const response = await Moralis.EvmApi.wallets.getWalletHistory({
//     chain: "0x1",
//     order: "DESC",
//     address: "0xd8da6bf26964af9d7eed9e03e53415d37aa96045",
//   });

//   console.log(response.raw);
// } catch (e) {
//   console.error(e);
// }

import axios from "axios";
import { sepolia } from "../scenes/chain";

export class TransactionService {
  static API_URL = "https://deep-index.moralis.io/api/v2";
  //   static API_URL = "https://deep-index.moralis.io/api/v2.2/wallets/:";
  //   https://deep-index.moralis.io/api/v2.2/wallets/:address/history
  static API_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImJkMzMzOTg2LWYwYTUtNGM0My04MjVmLTE0ZjAwNjZkNWJjZiIsIm9yZ0lkIjoiNDAwOTE0IiwidXNlcklkIjoiNDExOTU5IiwidHlwZUlkIjoiMTViZjRlODItY2NjNy00NDljLTljZjctNzQ5ZmU5ODVhMjhjIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3MjE2MDMyMTMsImV4cCI6NDg3NzM2MzIxM30.gk9YmtOm6HQp_r9oGtSfhQfzfnJ39p9nXWPHFIUwiR0";

  static async getTransactions(address: string) {
    const options = {
      method: "GET",
      url: `${TransactionService.API_URL}/${address}`,
      params: { chain: sepolia.name.toLowerCase() },
      headers: {
        accept: "application/json",
        "X-API-Key": TransactionService.API_KEY,
      },
    };

    const response = await axios.request(options);
    return response;
  }
}
