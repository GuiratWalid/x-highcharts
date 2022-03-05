import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import GoogleLogo from '../images/GoogleLogo.png';
import '../css/Or.css';
import ThemeContext from '../context/context';


const Login = () => {

    const [user, setUser] = useState({});
    const [message, setMessage] = useState("");

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
        const response = await fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        const { token, message } = await response.json();
        if (!token)
            setMessage(message);
        else {
            setMessage("");
            console.log(token);
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
                                        <h3 className="display-4 mb-4">Log In</h3>
                                        {message !== "" && <div className="alert alert-secondary" role="alert">{message}</div>}
                                        <form>
                                            <div className="form-group mb-3">
                                                <input style={{ backgroundColor: inputBg }} id="inputEmail" type="email" name="email" onChange={e => changeHandler(e)} placeholder="Email address" required autoFocus className="form-control rounded border-0 shadow-sm px-4" />
                                            </div>
                                            <div className="form-group mb-3">
                                                <input style={{ backgroundColor: inputBg }} id="inputPassword" type="password" name="password" onChange={e => changeHandler(e)} placeholder="Password" required className="form-control rounded border-0 shadow-sm px-4 text-primary" />
                                            </div>
                                            <div className="custom-control custom-checkbox mb-3">
                                                <input id="customCheck1" type="checkbox" className="custom-control-input" />{'  '}
                                                <label htmlFor="customCheck1" className="custom-control-label">Remember password</label>
                                            </div>
                                            <button type="submit" onClick={submitHandler} style={{ backgroundColor: 'rgb(87,73,173)', color: 'white', fontWeight: 'bold' }} className="btn btn-block text-uppercase w-100 mb-3 rounded shadow-sm">Sign in</button>
                                            <div className="custom-control custom-checkbox mb-2">
                                                <Link to="/passwordForgotten">Forgot your password ?</Link>
                                            </div>
                                            <div id="or" className="m-2">OR</div>
                                            <button type="button" className="btn btn-light btn-block text-uppercase w-100 mb-3 rounded shadow-sm"><img src={GoogleLogo} alt="Google Logo" /> Sign In With Google</button>
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

export default Login;