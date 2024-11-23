import "../Styling/AuthPage.css"
import {useLoginState} from "../Context/LoginContext.tsx";
import {useState} from "react";
//import {useNavigate} from "react-router-dom";
import UserData from "../Interfaces/User.ts";
import {postLoginRequest} from "../Components/Post.ts";

export function AuthPage() {

    //from backend
    const { loggedIn, /*userError*/ } = useLoginState()
    //from DOM
    const [input1, setInput1] = useState('')
    const [input2, setInput2] = useState('')

    //const [email, setEmail] = useState("");

    const [submitting, setSubmitting] = useState(false);

    //const dispatch = useLoginDispatch()

    //const navigate = useNavigate();

    async function handleLoginSubmit(event: any) {
        event.preventDefault();
        setSubmitting(true);
        const user: UserData = {
            username: input1.trim(),
            password: input2.trim(), // here we can also hash
        }
        try {
            await postLoginRequest('fef', user)
        } catch (err) {
            console.log(err)
        }
        setSubmitting(false);
    }

    const userNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInput1(event.target.value);
    }
    const userPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInput2(event.target.value);
    }


    // localStorage.setItem("authToken", token); // Store token in localStorage
    return(
        <div className="authContainer">
            <div className="authHeader">
                <h2>{ loggedIn ? "Login" : "Signup"}</h2>
                <div id="line"/>
            </div>
                    <form onSubmit={handleLoginSubmit}>
                        <input name= "username" type="text"
                               value={input1}
                               onChange = {userNameChange}
                       />
                        <input name= "password" type="text"
                               value={input2}
                               onChange = {userPasswordChange}
                        />
                        {!submitting && loggedIn ? <button>Submit</button> : <p>Loading...</p>}
                    </form>
                </div>

            );
            }

            export default AuthPage;