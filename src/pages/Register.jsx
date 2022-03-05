import React, { useContext, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import GoogleLogo from '../images/GoogleLogo.png';
import '../css/Or.css';
import ThemeContext from '../context/context';

const Register = () => {

    const [user, setUser] = useState({ gender: 'male' });
    const [message, setMessage] = useState("");

    const btnRef = useRef(null);

    const { darkTheme } = useContext(ThemeContext);

    const bg = darkTheme ? 'rgb(48,33,59)' : '#FAFAFA';
    const formBg = darkTheme ? '#251a2e' : '#EEEEEE';
    const inputBg = darkTheme ? '#9E9E9E' : '#FAFAFA';
    const fontColor = darkTheme ? '#FFFFFF' : '#111111';

    const changeHandler = e => {
        let newUser = user;
        newUser[e.target.name] = e.target.value;
        setUser(newUser);
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        if (user.password !== user.password2)
            setMessage("Incorrect Password");
        else {
            setMessage("");
            const formData = new FormData(e.currentTarget);
            const response = await fetch('http://localhost:5000/register', {
                method: 'POST',
                body: formData
            });
            const { token, message } = await response.json();
            if (token)
                console.log(token);
            setMessage(message);
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
                                        <h3 className="display-4 mb-4">Sign Up</h3>
                                        {message !== "" && <div className="alert alert-secondary" role="alert">{message}</div>}
                                        <form onSubmit={submitHandler} encType="multipart/form-data">
                                            <div className="form-group mb-3">
                                                <input style={{ backgroundColor: inputBg }} id="firstName" type="text" name="firstName" onChange={e => changeHandler(e)} placeholder="First Name" required autoFocus className="form-control rounded border-0 shadow-sm px-4" />
                                            </div>
                                            <div className="form-group mb-3">
                                                <input style={{ backgroundColor: inputBg }} id="lastName" type="text" name="lastName" onChange={e => changeHandler(e)} placeholder="LastName" required className="form-control rounded border-0 shadow-sm px-4" />
                                            </div>
                                            <div className="form-group mb-3">
                                                <input style={{ backgroundColor: inputBg }} id="inputEmail" type="email" name="email" onChange={e => changeHandler(e)} placeholder="Email address" required className="form-control rounded border-0 shadow-sm px-4" />
                                            </div>
                                            <div className="form-group mb-3">
                                                <input style={{ backgroundColor: inputBg }} id="inputPassword" type="password" name="password" onChange={e => changeHandler(e)} placeholder="Password" required className="form-control rounded border-0 shadow-sm px-4 text-primary" />
                                            </div>
                                            <div className="form-group mb-3">
                                                <input style={{ backgroundColor: inputBg }} id="inputConfirmPassword" type="password" name="password2" onChange={e => changeHandler(e)} placeholder="Confirm Password" required className="form-control rounded border-0 shadow-sm px-4 text-primary" />
                                            </div>
                                            <div className="form-group mb-3">
                                                <input style={{ backgroundColor: inputBg }} id="birthDate" type="date" name="birthDate" onChange={e => changeHandler(e)} placeholder="Birth Date" required className="form-control rounded border-0 shadow-sm px-4" />
                                            </div>
                                            <div className="form-group mb-3">
                                                <input style={{ backgroundColor: inputBg }} type="button" className="form-control btn-light"
                                                    onClick={() => btnRef.current.click()} value="Upload Image" />
                                                <input type="file" id="img" name="image" style={{ display: 'none' }}
                                                    accept="image/png, image/jpeg" className="form-control" ref={btnRef} />
                                            </div>
                                            <div className="form-group d-flex flex-row  justify-content-around mb-3">
                                                <label className="radio inline">
                                                    <input type="radio" name="gender" value="male" onChange={e => changeHandler(e)} checked={true} />
                                                    <span>Homme</span>
                                                </label>
                                                <label className="radio inline">
                                                    <input type="radio" name="gender" value="female" onChange={e => changeHandler(e)} />
                                                    <span>Femme</span>
                                                </label>
                                            </div>
                                            <button type="submit" style={{ backgroundColor: 'rgb(87,73,173)', color: 'white', fontWeight: 'bold' }} className="btn btn-block text-uppercase w-100 mb-2 rounded shadow-sm">Sign Up</button>
                                            <div id="or" className="m-2">OR</div>
                                            <button type="button" className="btn btn-light btn-block text-uppercase w-100 mb-3 rounded shadow-sm"><img src={GoogleLogo} alt="Google Logo" /> Sign Up With Google</button>
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
};

export default Register;