import React, { useEffect, useState } from "react";
import Modal from "../Modal/Modal";
import styles from "./profile.module.scss";
import { useFormik } from "formik";
import { SignUpSchema } from "../../yup";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import Button from "../Button";
import ProfilePic from "../../assets/Shape.svg";
import { MdOutlineContentCopy, MdEdit } from "react-icons/md";
import { CopyToClipboard } from "react-copy-to-clipboard";
import VerifyEmail from "../verify-email";
import axios from "axios";
import { BASE_URL } from "../../utils/app.constans";
import { Bars } from "react-loader-spinner";
const Profile = ({ onClose, visible, userInfo, onReload, onSideBaeClose }) => {
  const [isOpenEmail, setIsOpenEmail] = useState(false);
  const [userImage, setUserImage] = useState("");
  const [updateImage, setupdateImage] = useState("");
  const [Bio, setBio] = useState("");
  const [userData, setuserData] = useState("");
  const [checkBox, setcheckBox] = useState(true);
  const [checkBoxError, setcheckBoxError] = useState("");
  const [loading, setLoading] = useState(false);
  const address = localStorage.getItem("metaMaskAccount");

  const handleOpenEmail = () => {
    onClose();
    setIsOpenEmail((current) => !current);
  };

  const SignUpFormik = useFormik({
    initialValues: {
      username: userInfo?.userName ? userInfo?.userName : "",
      email: userInfo?.email ? userInfo?.email : "",
      bio: userInfo?.bio ? userInfo?.bio : ""
    },
    validationSchema: SignUpSchema,
    enableReinitialize: true,
    onSubmit: async (values, onSubmitProps) => {
      try {
        await handlesubmitUSer(values);
      } catch (error) {
        toast.error(error.response.data.message, { position: "top-center" });
      }
    },
  });

  useEffect(() => {
    if(userInfo){

      setupdateImage(userInfo?.userImage)
    }
  }, [userInfo])
  const handlesubmitUSer = async (values) => {

 
    let response;
      if (!checkBox) {
      setcheckBoxError("Please click on notify email");
      return;
    }
    setLoading(true)
    let imageURL;
    const formData = new FormData();

    formData.append("file", userImage);
    formData.append("type", "userImage");
    try {
if(userImage){
  imageURL = await axios.post(`${BASE_URL}storage/upload`, formData);
}
      let obj = {
        userName: values.username,
        email: values.email,
        bio: values.bio,
        userImage:imageURL ? imageURL.data.url : userInfo?.userImage,
        walletAddress:userInfo?.walletAddress ? userInfo?.walletAddress : address,
      };
      setuserData(obj);
      if(userInfo){
        
        const resp = await axios.put(`${BASE_URL}auth/update/${userInfo._id}`,obj);
        if(resp.data.message === "user update successfully"){
          toast.success(resp.data.message);
          localStorage.setItem("userData", JSON.stringify(resp.data.user));
          setLoading(false);
          onSideBaeClose()
          onClose()
          return
        } else {
          toast.success(resp.data.message);
          setLoading(false);
      handleOpenEmail();
      SignUpFormik.resetForm();
      setUserImage("")
        }
        
      }else{
        response = await axios.post(`${BASE_URL}auth/register`, obj);
      }
      toast.success(response.data.message);
      setLoading(false);
      handleOpenEmail();
      SignUpFormik.resetForm();
      setUserImage("")
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };
  const handleImg = (e) => {
    setUserImage(e.target.files[0]);
    setupdateImage("")
  };

  const handleBio = (e) => {
    setBio(e.target.value);
  };

  const handleCheckbox = (e) => {
    if (e.target.checked) {
      setcheckBoxError("");
    } else {
      setcheckBoxError("Please click on notify email");
    }
    setcheckBox(e.target.checked);
  };
  return (
    <>
      <Modal onClose={onClose} visible={visible} showModal2={true} btn={true}>
        <div className={styles.wrapper}>
          <div className={styles.heading}>
           {userInfo ? "Edit profile" : "Create your Dcentralverse account"} 
          </div>
          <div className={styles.profile}>
            <div className={styles.left}>
            <div>
              <label htmlFor="inputimage">
                <div className={styles.profile}>
                  <img
                    src={
                      updateImage ? updateImage :
                        userImage
                          ? window.URL.createObjectURL(userImage)
                          : ProfilePic
                    }
                    className={styles.profileImage}
                    alt="profile"
                  />
                  <div className={styles.editprofile}>
                    <div className={styles.selectimage}>
                      <MdEdit className={styles.icon} />
                    </div>
                    <input
                      type="file"
                      multiple
                      accept="image/png, image/gif, image/jpeg"
                      onChange={(e) => handleImg(e)}
                      id="inputimage"
                    />
                  </div>
                </div>
              </label>
              </div>
            </div>
            <div className={styles.right}>
              <form
                className={styles.formsection}
                onSubmit={SignUpFormik.handleSubmit}
              >
                <div className={styles.inputdiv}>
                  <fieldset className={styles.parentInputDiv}>
                    <legend style={{ marginBottom: "-10px", fontSize: "13px" }}>
                      Username*
                    </legend>
                    <input
                      // value={SignUpFormik.values.username}
                      type="text"
                      placeholder="Give yourself a name"
                      {...SignUpFormik.getFieldProps("username")}
                    />
                  </fieldset>
                  {SignUpFormik.touched.username &&
                    SignUpFormik.errors.username ? (
                    <div className={styles.error}>
                      {SignUpFormik.errors.username}
                    </div>
                  ) : null}
                </div>
                <div className={styles.inputdiv}>
                  <fieldset className={styles.parentInputDiv}>
                    <legend style={{ marginBottom: "-10px", fontSize: "13px" }}>
                      Email*
                    </legend>
                    <input
                      // value={SignUpFormik.values.email}
                      type="email"
                      placeholder="What's your email?"
                      {...SignUpFormik.getFieldProps("email")}
                    />
                  </fieldset>
                  {SignUpFormik.touched.email && SignUpFormik.errors.email ? (
                    <div className={styles.error}>
                      {SignUpFormik.errors.email}
                    </div>
                  ) : null}
                </div>
                <div className={styles.inputdiv}>
                  <fieldset className={styles.parentInputDiv}>
                    <legend style={{ marginBottom: "-10px", fontSize: "13px" }}>
                      Bio
                    </legend>
                    <textarea


                      {...SignUpFormik.getFieldProps("bio")}
                      type="text"
                      placeholder="Tell the world your story!"
                      rows={4}
                    />
                  </fieldset>
                  {SignUpFormik.touched.bio && SignUpFormik.errors.bio ? (
                    <div className={styles.error}>
                      {SignUpFormik.errors.bio}
                    </div>
                  ) : null}
                </div>
                <div className={styles.sendemail}>
                  <input type="checkbox" checked={checkBox} onClick={(e) => handleCheckbox(e)} />
                  <label>Send me Email Notification</label>
                </div>
                <p style={{ color: "red" }}>{checkBoxError}</p>
                <div className={styles.inputdiv}>
                  <fieldset className={styles.parentInputDiv}>
                    <legend style={{ marginBottom: "-10px", fontSize: "13px" }}>
                      Wallet Address
                    </legend>
                    <div className={styles.copied}>
                      <p>{userInfo?.walletAddress ? userInfo?.walletAddress : address}</p>{" "}
                      <label>
                        <MdOutlineContentCopy className={styles.icon} />
                      </label>
                    </div>
                  </fieldset>
                </div>
                <div className={styles.signupbtn}>
                  <Button
                    type="submit"
                    disabled={loading}
                  // primary={true} onClick={handleOpenEmail}
                  >
                    Save
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Modal>
      <ToastContainer />
      <VerifyEmail
      onSideBaeClose={onSideBaeClose}
        onReload={onReload}
        userData={userData}
        userInfo={userInfo}
        onClose={() => setIsOpenEmail(false)}
        visible={isOpenEmail}
      />
    </>
  );
};

export default Profile;
