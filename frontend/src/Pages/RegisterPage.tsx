import React from 'react'
import  { redirect } from 'react-router-dom'
import "../Styling/AuthPage.css"
import {useLoginDispatch} from "../Context/LoginContext.tsx";
import {useState} from "react";
//import {useNavigate} from "react-router-dom";
import RegisterData from "../Interfaces/RegisterData.ts";
import UserData from "../Interfaces/User.ts";
import {postLoginRequest, postRegisterRequest} from "../Components/Post.ts";

export function RegisterPage() {

    //from backend
    //from DOM
    const [username, setUsernameInput] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')

    //const [email, setEmail] = useState("");

    const [submitting, setSubmitting] = useState(false);

    const dispatch = useLoginDispatch()

    //const navigate = useNavigate();

    function handleRegisterSubmit(event: any) {
        event.preventDefault();
        setSubmitting(true);
        const register: RegisterData = {
            email: email.trim(),
            username: username.trim(),
            password: password.trim(), // here we can also hash
        }
        return new Promise((resolve, reject): void => {
            postRegisterRequest('api/register', register)
                .then(response => {
                    const user: UserData = {
                        username: username,
                        password: password,
                    }
                    postLoginRequest('api/login', user)
                        .then(response => {
                            dispatch({type: "setUsername", payload: {username: response.username}});
                            dispatch({type: "setAuthToken", payload: {token: response.token}});
                            dispatch({type: "toggleLogin", payload: {toggle: true}});
                            dispatch({type: "setUserError", payload: {failed: response.message}});
                            setSubmitting(false);
                            console.log('resolving promise, the username is now: ' + username);
                            resolve(response)
                            redirect('')
                        })
                        .catch(error => {
                            reject(error)
                        })
                    /*
                    */
                    console.log('Registered user');
                    setSubmitting(false);
                    resolve(response)
                })
                .catch(error =>{
                    console.log('Error: ' + error)
                    // dispatch({type: "setUserError", payload: {failed: error.message.replace(/\s/g,'')}});
                    setSubmitting(false);
                    reject(error);
                }
                );
        });
    }

    const userEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    }
    const userNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsernameInput(event.target.value);
    }
    const userPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }
    /*
    useEffect(() => {
        // storing username in localstorage because to keep it as session state if context state fails
        // might be a bit overkill
        localStorage.setItem("username", username);
        localStorage.setItem("authToken", authToken);
    }, [username, authToken]);
    */

    const handleKeyPress = (event: React.KeyboardEvent) => {
        if (submitting){
            event.preventDefault();
        }
    }
    /*
    TODO
    Hide password input
    Hide form after successful login
    Make custom error css based on server response
        - if username/password pair is wrong  --> 404 not found
        - if username is correct but incorrect password --> 403 forbidden
     */

    return(
            <div className="authContainer">
                <div className="authHeader">
                    <h2>Register</h2>
                    <div id="line"/>
                </div>
                <form onSubmit={handleRegisterSubmit} onKeyPress={handleKeyPress}>
                    <input name= "email" type="text"
                            value={email}
                            placeholder="Email"
                            onChange = {userEmailChange}
                    />
                    <input name= "username" type="text"
                            value={username}
                            placeholder="Username"
                            onChange = {userNameChange}
                    />
                    <input name= "password" type="password"
                            value={password}
                            placeholder="Password"
                            onChange = {userPasswordChange}
                    />
                    {/*
                    {userError === 'NotFound' && <p>Username does not exist</p>}
                    {userError === 'Forbidden' && <p>Username does not exist</p>}
                    {userError === '' && <p> </p>}
                    {loggedIn && <p>loggedIn is true and hello {username}</p>}
                    */}
                    {!submitting ? <button className="button-placement">Register</button> : <p>Registering...</p>}
                    Login <a href="login">here</a>
                </form>
            </div>
        );
}

export default RegisterPage;