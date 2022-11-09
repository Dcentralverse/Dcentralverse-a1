import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
// import Web3 from "web3";
const INFURA_KEY = "45da0b6572cd40078af83a09120c224c";

export const RPC_URLS = {
  137: `https://mainnet.infura.io/v3/${INFURA_KEY}`,
};

// });
export const injected = new InjectedConnector({
  supportedChainIds: [137],
});
export const BNB_NETWORK = {
  chainId: "0x89",
};




export const walletconnect = new WalletConnectConnector({
  infuraId: "27e484dcd9e3efcfd25a83a78777cdf1",
  qrcode: true,
});
// export function resetWalletConnector(connector) {
//   if (connector && connector instanceof WalletConnectConnector) {
//     connector.walletConnectProvider = undefined;
//   }
// }

// export const payBNB = async (fromTransfer) => {
//   // let price = Number(coinPromotionPrice) - Number(discount);
//   let price = 0.001;
//   let a = Web3.utils.toWei(price.toString(), "ether");
//   try {
//     const params = {
//       from: fromTransfer,
//       to: "0x76Cd0dFeF3cC86A1527FdbC540420bfeB8ff5de9",
//       value: a,
//     };

//     const web3 = new Web3(window.ethereum);
//     const sendHash = await web3.eth.sendTransaction(params);
//     return sendHash;
//   } catch (e) {
//     return e;
//   }
// };

// export const payVoteToken = async (param) => {
//   try {
//     const web3 = new Web3(window.ethereum);
//     const sendHash = await web3.eth.sendTransaction(param);
//     return sendHash;
//   } catch (e) {
//     return e;
//   }
// };
