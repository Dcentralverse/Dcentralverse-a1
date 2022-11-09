import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import metamaskSmall from "../../assets/metamask-small.png";
import walletConnectSmall from "../../assets/wallet-connect-small.png";
import Button from "../Button";
import Modal from "../Modal/Modal";
import styles from "./wallet-connection.module.scss";

// import {
//   BNB_NETWORK,
//   BNB_TESTNET,
//   injected,
//   walletconnect,
// } from "../../utils/helper/connector";
import axios from "axios";
import { BASE_URL } from "../../utils/app.constans";
import { BNB_NETWORK, injected, walletconnect } from "../../utils/helper/connector";
import { useActiveWeb3React } from "./useWalletConnect";
import Web3 from "web3";
import { useWeb3React } from "@web3-react/core";
const WalletConnection = ({ visible, onClose, recieveConfirmationData, onReload }) => {
  // const { account, connector, activate, chainId, deactivate, disconnect, error, setError } =
  //   useWeb3React();
  const { active, account, library, connector, activate, deactivate } =
  useActiveWeb3React();
  const [connect, setConnect] = useState(null);
  const address = localStorage.getItem("metaMaskAccount");
  const changeNetwork = async () => {
    // const id = Web3.utils.toHex("80001")
    try {
      if (!window.ethereum) throw new Error("No crypto wallet found");
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [BNB_NETWORK],
      });
    } catch (err) {
    }
  };

  const connectRPC = async () => {
    try {
        
        const res = await activate(walletconnect)
    } catch (error) {
    }
  };
  const connectHandler = async (type) => {
    try {
      if (type === 0) {
        metaMask();
      }
      if (type === 1) {
      }
    } catch (ex) {
    }
  };
const addNetwork = async () => {
  const chainId = 137 // Avalanche testnet
if (window.ethereum.networkVersion !== chainId) {
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: Web3.utils.toHex(chainId) }]
        });
      } catch (err) {
          // This error code indicates that the chain has not been added to MetaMask
        if (err.code === 4902) {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainName: 'Polygon Mainnet',
                chainId: Web3.utils.toHex(chainId),
                nativeCurrency: { name: 'MATIC', decimals: 18, symbol: 'MATIC' },
                rpcUrls: ['https://polygon-rpc.com']
              }
            ]
          });
        }
      }
    }
}
  const metaMask = async () => {
    addNetwork()
    if (account) {
      recieveConfirmationData();
      onClose();
      return;
    }
    if (connector && connector.walletConnectProvider) {
      connector.walletConnectProvider = undefined;
    }
    try {
      await activate(injected);
      changeNetwork();
    } catch (ex) {
    }
  };

  // useEffect(() => {
  //   if(address){
  //       recieveConfirmationData()
  //     onClose()
  //   }
  // }, [address])
  const fetchData = async (account) => {
    try {
      const response = await axios.get(`${BASE_URL}auth/user/${account}`);
      localStorage.setItem("userData", JSON.stringify(response.data.user));
      toast.success("User login successfully")
      onReload()
      onClose();
    } catch (error) {
      if (error.response.data.message == "User not found") {
        localStorage.setItem("metaMaskAccount", account);
        recieveConfirmationData();
        onClose();
      }
    }
  };

  useEffect(() => {
    if (account) {
      fetchData(account);
      // if(response?.data?.status)
    }
  }, [account]);
  return (
    <>
      <Modal visible={visible} onClose={onClose} btn={true}>
        <div className={styles.wrapper}>
          <div className={styles.heading}>Connect a Wallet</div>
          <div className={styles.subheading}>
            Connect a
            <span className={styles.tooltip}>
              &nbsp;wallet&nbsp;
              <span className={styles.tooltiptext}>
                A crytpo wallet is an applicaation or hardware device that
                allows individuals to store and retrieve digital items.
              </span>
            </span>
            to get started
          </div>
          <div
            className={styles.connectCard}
            onClick={() =>
              window.ethereum === undefined
                ? window
                    .open(
                      "https://metamask.io/",
                      "_blank"
                    )
                    .focus()
                : connectHandler(0)
            }
          >
            <div className={styles.buttonInfo}>
              <div className={styles.text}>
                MetaMask
                {/* {window.ethereum === undefined
                                    ? "Install MetaMask Extension"
                                    : "Connect to Meta Mask"} */}
              </div>
              <img className={styles.icon} src={metamaskSmall} alt="icon" />
            </div>
          </div>
          <div
            className={styles.walletConnectCard}
            onClick={connectRPC}
          >
            <div className={styles.buttonInfo}>
              <div className={styles.text}>WalletConnect</div>
              <img
                className={styles.icon}
                src={walletConnectSmall}
                alt="icon"
              />
            </div>
          </div>
          <div className={styles.more}>
            Don't have a wallet? <br />
            <a href="https://metamask.io/" target="_blank">
              Get one here
            </a>
          </div>
        </div>
        <div className={styles.btn}>
          <Button onClick={onClose}>Cancel</Button>
        </div>
      </Modal>
      <ToastContainer/>
    </>
  );
};

export default WalletConnection;
