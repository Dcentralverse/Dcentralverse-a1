import React, { useEffect, useState } from "react";
import styles from "./sidebar.module.scss";
import Vector from "../../assets/Vector.svg";
import VectorPink from "../../assets/VectorPink.svg";
import Map from "../../assets/Map.svg";
import Bell from "../../assets/bell.svg";
import Setting from "../../assets/setting.svg";
import Help from "../../assets/Help icon.svg";
import Profilepic from "../../assets/profile.svg";
import Slide from "../../assets/slide.svg";
import WalletConnection from "../wallet-connection";
import Profile from "../profile";
import MapImage from "../../assets/bg-map.jpg";
import { MdEdit, MdArrowBackIos } from "react-icons/md";
import { ethers } from "ethers";
import { FaUserEdit } from "react-icons/fa";
import Web3 from "web3";
import { useWeb3React } from "@web3-react/core";
import { injected } from "../../utils/helper/connector";
import { useActiveWeb3React } from "../wallet-connection/useWalletConnect";
const Sidebar = () => {
  // const { account, connector, activate, chainId, deactivate, disconnect } =
  //   useWeb3React();
    const { active, account, library, connector, activate, deactivate } =
    useActiveWeb3React();

  // const [active, setActive] = useState(0);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isExtendSidebar, setIsExtendSidebar] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [check, setcheck] = useState(false);
  const [extendData, setExtendData] = useState("");
  const [walletInfo, setwalletInfo] = useState("");
  const [runComponent, setrunComponent] = useState(false);
  const userData = JSON.parse(localStorage.getItem("userData"));

  //    const balance =  Web3.eth.getBalance(userData.walletAddress)
  const getbalance = (address) => {
    // Requesting balance method
    window.ethereum
      .request({
        method: "eth_getBalance",
        params: [userData?.walletAddress, "latest"],
      })
      .then((balance) => {

        setwalletInfo({
          Balance: ethers.utils.formatEther(balance),
          address: userData.walletAddress,
        });
      });
  };

  useEffect(() => {},[runComponent])
  useEffect(() => {
    if(runComponent || isExtendSidebar){
      getbalance();
    }
  }, [runComponent, isExtendSidebar]);

  const handleOpenModal = () => {
    setIsOpen((current) => !current);
  };

  const recieveConfirmationData = () => {
    setIsProfileOpen(true);
  };
  const handleProfileModal = () => {
    setIsProfileOpen((current) => !current);
  };

  const handleExtendSidebar = (data) => {
  
    if(!userData){
      setIsOpen(true)
      return
    }
    if (data == "info") {
      setIsExtendSidebar((current) => !current);
      setExtendData(userData);
      if(userData){

          setcheck(true);
      }else{
        setcheck(false);

      }
    } else if (data == "wallet") {
      if(userData){
        setExtendData(walletInfo);
      }
      setcheck(false);
      setIsExtendSidebar((current) => !current);
      
    }
  };
  const handleWalletDisconnect = () => {
    deactivate(injected);
    setIsExtendSidebar(false)
    localStorage.clear();
    setExtendData("")
  };
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.main}>
          <div className={styles.sidebar}>
            <div className={styles.links}>
              <div className={styles.firsticon}>
                <img src={Vector} alt="no-image"  />
              </div>
              <div className={styles.icon}>
                <img src={Map} alt="no-image" />
              </div>
              <div className={styles.icon}>
                <img src={Bell} alt="no-image" />
              </div>
              <div className={styles.icon}>
                <img src={Setting} alt="no-image" />
              </div>
              <div className={styles.icon}>
                <img src={Help} alt="no-image" />
              </div>
            </div>
            <div className={styles.links}>
              <div className={styles.editImage}>
                <img
                  src={userData?.userImage ? userData?.userImage : Profilepic}
                  alt="no-image"
                  onClick={() => handleExtendSidebar("info")}
                 // onClick={handleProfileModal}
                />
              </div>
              <div className={styles.icon}>
                <img
                  src={userData ? VectorPink : Slide}
                  alt="no-image"
                  onClick={() => handleExtendSidebar("wallet")}
                />
              </div>
            </div>
          </div>
          {isExtendSidebar && (
            <div className={styles.Extendsidebar}>
              <div className={styles.heading}>
                Dcentralverse{" "}
                <MdArrowBackIos
                  className={styles.icon}
                  onClick={() => setIsExtendSidebar(false)}
                />
              </div>
              <div className={styles.links}>
                <div className={styles.text}>
                  {extendData?.bio ? extendData?.bio : ""}
                </div>
                <div className={styles.icon}>
                  <p>
                    {extendData?.userName
                      ? extendData?.userName
                      : extendData?.Balance ? `Wallet Balance : ${Number(extendData?.Balance)?.toFixed(4)} Matic` : ""}{" "}
                  </p>
                  {check ? (
                    <div className={styles.selectimage}>
                      <FaUserEdit className={styles.edit}  onClick={handleProfileModal} />
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <div className={styles.email}>
                  <p>
                    {extendData?.email
                      ? extendData?.email
                      :extendData?.address ? `Wallet Address : ${extendData?.address?.substring(
                          0,
                          6
                        )}...${extendData?.address?.substring(
                          extendData?.address?.length - 4
                        )}` : ""}
                  </p>
                </div>
                <p>
                  {extendData?.address ? (
                    <button
                      style={{ color: "white",textAlign:"left",marginTop:"10px",fontSize:"0.9rem" }}
                      onClick={handleWalletDisconnect}
                    >
                      Disconnect wallet
                    </button>
                  ) : (
                    ""
                  )}
                </p>
              </div>
            </div>
          )}
        </div>
        <div className={styles.right}>
          <img src={MapImage} alt="map" />
        </div>
      </div>
      <WalletConnection
        recieveConfirmationData={recieveConfirmationData}
        visible={isOpen}
        onClose={() => setIsOpen(false)}
        onReload={() => setrunComponent(!runComponent)}
      />
      <Profile
 onSideBaeClose={() => setIsExtendSidebar(false)}
         userInfo={extendData}
        visible={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        onReload={() => setrunComponent(!runComponent)}
      />
    </>
  );
};

export default Sidebar;
