import React, { useState } from "react";
import styles from "./terms-and-privacy.module.scss";
import Modal from "../Modal/Modal";
import Button from "../Button";
import axios from "axios";
import { BASE_URL } from "../../utils/app.constans";
import { toast, ToastContainer } from "react-toastify";
const TermsAndPrivacy = ({ onClose, visible,userInfo,onSideBaeClose, userData, onReload }) => {
  const [checkBoxNews, setcheckBoxNews] = useState(false);
  const [loading, setloading] = useState(false);
  const [checkBoxErrorNews, setcheckBoxErrorNews] = useState("");
  const [checkBox, setcheckBox] = useState(false);
  const [checkBoxError, setcheckBoxError] = useState("");

  const handleCheckbox =  (e) => {
    if (e.target.checked) {
      setcheckBoxError("");
    } else {
      setcheckBoxError("Please accept term and condition");
    }
    setcheckBox(e.target.checked);
  };
  const handleCheckboxNews =  (e) => {
    if (e.target.checked) {
      setcheckBoxError("");
    } else {
      setcheckBoxError("Please accept term and condition");
    }
    setcheckBoxNews(e.target.checked);
  };
  const handleSubmit = async () => {
    if (!checkBox || !checkBoxNews) {
      setcheckBoxError("Please accept term and condition");
      return;
    }
    setloading(true)
    try {
      if(userInfo){
        const resp = await axios.post(`${BASE_URL}auth/register-update-user/${userInfo?._id}`, userData)
        toast.success(resp.data.message);
    
        localStorage.setItem("userData", JSON.stringify(resp.data.user));
        setloading(false)
        onSideBaeClose()
        onReload()
        onClose();
      }else{
        const response = await axios.post(`${BASE_URL}auth/register-user`, userData)
        toast.success(response.data.message);
        localStorage.setItem("userData", JSON.stringify(response.data.user));
        setloading(false)
        onReload()
        onClose();
      }
     
    } catch (error) {
      toast.error(error.response.data.message);
    }
   
  };
  return (
    <>
      <Modal onClose={onClose} visible={visible} btn={true}>
        <div className={styles.wrapper}>
          <div className={styles.heading}>Terms & Privacy</div>
          <div className={styles.subheading}>
            <input type="checkbox" onClick={(e) => handleCheckboxNews(e)}/> &nbsp;
            <span>
              I want to receive news and feature updates from Dcentralverse.
            </span>
          </div>
          {/* <p style={{ color: "red" }}>{checkBoxErrorNews}</p> */}

          <div className={styles.subheading}>
            <input type="checkbox" onClick={(e) => handleCheckbox(e)} /> &nbsp;
            <span>
              I have read and agree to the{" "}
              <a href="#">Terms of Use, Privacy Policy,</a> and confirm. I am at
              least 18 years old.
            </span>
          </div>
          <p style={{ color: "red" }}>{checkBoxError}</p>

          <div className={styles.btn}>
            <Button onClick={onClose}>Cancel</Button>
            <Button primary={true} onClick={handleSubmit} disabled={loading}>
              Accept and sign
            </Button>
          </div>
        </div>
      </Modal>
      <ToastContainer/>
    </>
  );
};

export default TermsAndPrivacy;
