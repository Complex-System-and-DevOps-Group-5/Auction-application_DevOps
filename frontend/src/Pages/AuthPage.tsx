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
                    setSubmitting(false);
                    console.log('resolving promise, the username is now: ' + username);
                    resolve(response)
                })
                .catch(error =>{
                    console.log(error)
                    dispatch({type: "setUserError", payload: {failed: error.message}});
                    setSubmitting(false);
                    reject(alert('Backend denied acces :' + error.message));
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
     */

    return(
            <div className="authContainer">
                <div className="authHeader">
                    <h2> {loggedIn ? "Welcome " + username : "Login" } </h2>
                    <div id="line"/>
                </div>
                        <form onSubmit={handleLoginSubmit} onKeyPress={handleKeyPress}>
                            <input name= "username" type="text"
                                   value={input1}
                                   onChange = {userNameChange}
                           />
                            <input name= "password" type="text"
                                   value={input2}
                                   onChange = {userPasswordChange}
                            />
                            {!submitting ? <button>Submit</button> : <p>Submitting...</p>}
                        </form>
                {userError && <p>Try again!</p>}
                {loggedIn && <p>loggedIn is true and hello {username}</p>}
            </div>

        );
}

export default AuthPage;