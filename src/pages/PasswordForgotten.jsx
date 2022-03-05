import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import ThemeContext from '../context/context';

const PasswordForgotten = () => {

    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const { darkTheme } = useContext(ThemeContext);

    const bg = darkTheme ? 'rgb(48,33,59)' : '#FAFAFA';
    const formBg = darkTheme ? '#251a2e' : '#EEEEEE';
    const inputBg = darkTheme ? '#9E9E9E' : '#FAFAFA';
    const fontColor = darkTheme ? '#FFFFFF' : '#111111';

    const changeHandler = e => {
        setEmail(e.target.value);
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/passwordForgotten', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email })
        });
        const result = await response.json();
        setMessage(result.message);
    }

    return (
        <div className="maincontainer vh-100" style={{ backgroundColor: bg }}>
            <div className="container">
                <div className="row no-gutter">
                    <div className="col-md-3 d-none d-md-flex bg-image"></div>
                    <div className=" col-md-6 my-2 rounded" style={{ backgroundColor: formBg, color: fontColor }}>
                        <div className="login d-flex align-items-center py-3">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-lg-10 col-xl-7 mx-auto">
                                        <h3 className="display-4 mb-4">Password Forgotten</h3>
                                        <p className="text-muted meduim h6 my-4">Enter your email address to receive an email</p>
                                        {message !== "" && <div className="alert alert-secondary" role="alert">{message}</div>}
                                        <form onSubmit={submitHandler}>
                                            <div className="form-group mb-3">
                                                <input style={{ backgroundColor: inputBg }}
                                                    id="inputEmail"
                                                    type="email"
                                                    name="email"
                                                    onChange={e => changeHandler(e)}
                                                    placeholder="Email address"
                                                    required
                                                    className="form-control rounded border-0 shadow-sm px-4"
                                                />
                                            </div>
                                            <button type="submit" style={{ backgroundColor: 'rgb(87,73,173)', color: 'white', fontWeight: 'bold' }} className="btn btn-block text-uppercase w-100 mb-2 rounded shadow-sm">Send Email</button>
                                            <p className="text-muted small h6 mt-4">© {(new Date()).getFullYear()} Copyright : <Link to="/">www.X-Highcharts.com</Link></p>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    );
}

export default PasswordForgotten;