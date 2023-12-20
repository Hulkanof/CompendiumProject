import React, { useState } from 'react';
import '../styles/ResetPassword.css';
import { useNavigate } from "react-router-dom"
import useToken from "../hooks/useToken"


const ResetPassword: React.FC<defaultPageProps> = () => {
    const [resetToken, setResetToken] = useState("")
    const [info, setInfo] = useState<{
        message: string
        type: string
    }>()
    const navigate = useNavigate()
    const { setToken } = useToken()

    async function handleSubmit() {
        if (resetToken === "")
            return setInfo({
                message: "Please fill in all fields",
                type: "warning"
            })

        const res = await fetch("/api/v1/user/checkResetToken", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                resetToken
            })
        })

        const data: BasicAPIResponse<{ user: User; token: string }> = await res.json()
        if (data.type === "error") {
            setInfo({
                message: `${data.error}`,
                type: "error"
            })
            return
        }

        setInfo({
            message: `${data.data}`,
            type: "success"
        })
        
        setToken(data.data.token)
        navigate("/reset-password/confirm")
        
    }

    return (
        <div className="main">
            <div className="reset-password">
                <h1>Reset Password</h1>
                <h2>Enter your reset token to reset your password.</h2>
                <input className="reset-password-input" type="text" placeholder="Reset Token" onChange={e => setResetToken(e.target.value)} />
                <button className="reset-password-button" onClick={handleSubmit}>
                    Send
                </button>
                {info ? (
                        <div
                            className={`register-info`}
                            style={info.type === "warning" ? { border: "1px solid orange" } : info.type === "error" ? { border: "1px solid red" } : {}}
                        >
                            {info.message}
                        </div>
                    ) : (
                        <></>
                    )}
            </div>
        </div>
    );
}

export default ResetPassword;