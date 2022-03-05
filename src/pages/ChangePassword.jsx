import React, { useContext, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ThemeContext from '../context/context';

const ChangePassword = () => {
    const { id } = useParams();

    const [passwords, setPasswords] = useState({});
    const [message, setMessage] = useState("");

    const { darkTheme } = useContext(ThemeContext);

    const bg = darkTheme ? 'rgb(48,33,59)' : '#FAFAFA';
    const formBg = darkTheme ? '#251a2e' : '#EEEEEE';
    const inputBg = darkTheme ? '#9E9E9E' : '#FAFAFA';
    const fontColor = darkTheme ? '#FFFFFF' : '#111111';

    const changeHandler = e => {
        let newPasswords = passwords;
        newPasswords[e.target.name] = e.target.value;
        setPasswords(newPasswords);
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        if (passwords.password !== passwords.password2) {
            setMessage("Incorrect Password");
        }
        else {
            setMessage("");
            const response = await fetch(`http://localhost:5000/changePassword/${id}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ password: passwords.password })
            });
            const result = await response.json();

            setMessage(result.message);
        }
    }

    return (
        <div className="maincontainer" style={{ backgroundColor: bg }}>
            <div className="container">
                <div className="row no-gutter">
                    <div className="col-md-3 d-none d-md-flex bg-image"></div>
                    <div className=" col-md-6 my-2 rounded" style={{ backgroundColor: formBg, color: fontColor }}>
                        <div className="login d-flex align-items-center py-3">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-lg-10 col-xl-7 mx-auto">
                                        <h3 className="display-4 mb-4">Change Password</h3>
                                        {message !== "" && <div className="alert alert-secondary" role="alert">{message}</div>}
                                        <form onSubmit={submitHandler}>
                                            <div className="form-group mb-3">
                                                <input style={{ backgroundColor: inputBg }} id="inputPassword" type="password" name="password" onChange={e => changeHandler(e)} placeholder="Password" required className="form-control rounded border-0 shadow-sm px-4 text-primary" />
                                            </div>
                                            <div className="form-group mb-3">
                                                <input style={{ backgroundColor: inputBg }} id="inputConfirmPassword" type="password" name="password2" onChange={e => changeHandler(e)} placeholder="Confirm Password" required className="form-control rounded border-0 shadow-sm px-4 text-primary" />
                                            </div>
                                            <button type="submit" style={{ backgroundColor: 'rgb(87,73,173)', color: 'white', fontWeight: 'bold' }} className="btn btn-block text-uppercase w-100 mb-2 rounded shadow-sm">Sign Up</button>
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

export default ChangePassword;