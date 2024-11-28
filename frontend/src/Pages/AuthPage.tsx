import "../Styling/AuthPage.css"
import {useLoginState, useLoginDispatch} from "../Context/LoginContext.tsx";
import {useEffect, useState} from "react";
//import {useNavigate} from "react-router-dom";
import UserData from "../Interfaces/User.ts";
import {postLoginRequest} from "../Components/Post.ts";

export function AuthPage() {

    //from backend
    const { loggedIn, username, authToken, userError } = useLoginState()
    //from DOM
    const [input1, setInput1] = useState('')
    const [input2, setInput2] = useState('')

    //const [email, setEmail] = useState("");

    const [submitting, setSubmitting] = useState(false);

    const dispatch = useLoginDispatch()

    //const navigate = useNavigate();

    function handleLoginSubmit(event: any) {
        event.preventDefault();
        setSubmitting(true);
        const user: UserData = {
            username: input1.trim(),
            password: input2.trim(), // here we can also hash
        }
        return new Promise((resolve, reject): void => {
            postLoginRequest('api/login', user)
                .then(response => {
                    dispatch({type: "setUsername", payload: {username: response.username}});
                    dispatch({type: "setAuthToken", payload: {token: response.token}});
                    dispatch({type: "toggleLogin", payload: {toggle: true}});
                    dispatch({type: "setUserError", payload: {failed: response.message}});
                    setSubmitting(false);
                    console.log('resolving promise, the username is now: ' + username);
                    resolve(response)
                })
                .catch(error =>{
                    console.log('error name that will be used for css class: ' + error.message.replace(/\s/g,''))
                    dispatch({type: "setUserError", payload: {failed: error.message.replace(/\s/g,'')}});
                    setSubmitting(false);
                    reject(error.message);
                }
                );
        });
    }

    const userNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInput1(event.target.value);
    }
    const userPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInput2(event.target.value);
    }
    useEffect(() => {
        // storing username in localstorage because to keep it as session state if context state fails
        // might be a bit overkill
        localStorage.setItem("username", username);
        localStorage.setItem("authToken", authToken);
        localStorage.setItem("loggenIn", loggedIn.toString());
    }, [username, authToken]);

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
                    <h2> {loggedIn ? "Welcome " + username : "Login" } </h2>
                    <div id="line"/>
                </div>
                { !loggedIn &&
                        <form onSubmit={handleLoginSubmit} onKeyPress={handleKeyPress}>
                            <input name= "username" type="text"
                                   value={input1}
                                   placeholder="Username"
                                   onChange = {userNameChange}
                                   className= {userError}
                           />
                            <input name= "password" type="password"
                                   value={input2}
                                   placeholder="Password"
                                   onChange = {userPasswordChange}
                                   className= {userError}
                            />
                            {userError === 'NotFound' && <p>Username does not exist</p>}
                            {userError === 'Forbidden' && <p>Username does not exist</p>}
                            {userError === '' && <p> </p>}
                            {loggedIn && <p>loggedIn is true and hello {username}</p>}
                            {!submitting ? <button>Enter</button> : <p>Login in...</p>}
                            Register <a href="register">here</a>
                        </form>
                }
            </div>

        );
}

export default AuthPage;