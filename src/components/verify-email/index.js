import React, { useState } from 'react'
import styles from "./verify-email.module.scss"
import Modal from "../Modal/Modal"
import Button from '../Button'
import TermsAndPrivacy from '../terms-and-privacy'
import axios from 'axios'
import { BASE_URL } from '../../utils/app.constans'
import { toast, ToastContainer } from 'react-toastify'
const VerifyEmail = ({ visible, onClose, userData,userInfo,onSideBaeClose, onReload }) => {
    const [isOpenTerms, setIsOpenTerms] = useState(false)
    const [OTP, setOTP] = useState(false)
    const [loading, setloading] = useState(false)

    const handleOpenTerms = () => {
        onClose()
        setIsOpenTerms(current => !current)
    }

    const handleInput = (e) => {
        setOTP(e.target.value)
    }

    const handleOTpSubmit  = async () => {
        let obj = {code :OTP}
        setloading(true)
        try {
        const response = await axios.post(`${BASE_URL}auth/verify-pin`, obj)
        toast.success(response.data.message)
        setloading(false)

        handleOpenTerms()
        } catch (error) {
            toast.error(error.response.data.message)
            setloading(false)
        }
    }
    return (
        <>
            <Modal visible={visible} onClose={onClose} btn={true}>
                <div className={styles.wrapper}>
                    <div className={styles.heading}>Verify your email</div>
                    <div className={styles.subheading}> You need to verify your email to
                        continue. Enter the 6 digit code received
                        by <span className={styles.tooltip}>
                            &nbsp;{userData?.email}&nbsp;
                            <span className={styles.tooltiptext}>
                                If you have not received the verification email,please check your "Spam" or "Bulk Email" folder.
                            </span>
                        </span>

                    </div>
                    <div className={styles.inputdiv}>
                        <fieldset className={styles.parentInputDiv}>
                            <legend style={{ marginBottom: "-10px", fontSize: "13px" }}>Email verification code</legend>
                            <input
                            onChange={(e) => handleInput(e)}
                                type="text"
                                placeholder="Enter the 6 digit code"
                            />
                        </fieldset>
                    </div>
                    <div className={styles.more}>Not your correct address? <br />
                        <a href="#" target="_blank">Update your email address</a>
                    </div>
                    <div className={styles.btn}>
                        <Button
                        onClick={handleOTpSubmit}
                        disabled={loading}
                        //  primary={true} onClick={handleOpenTerms}
                         >Submit</Button>
                    </div>
                </div>
            </Modal><ToastContainer/>
            <TermsAndPrivacy onSideBaeClose={onSideBaeClose} userInfo={userInfo} visible={isOpenTerms} onClose={() => setIsOpenTerms(false)} userData={userData} onReload={onReload}/>
        </>
    )
}

export default VerifyEmail