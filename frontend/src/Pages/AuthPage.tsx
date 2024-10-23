import "../Styling/AuthPage.css"
import InputField from "../Components/InputField.tsx";
import DefaultButton from "../Components/DefaultButton.tsx";
import {useLoginDispatch} from "../Context/LoginContext.tsx";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

export function AuthPage() {
    const dispatch = useLoginDispatch()
    const [isLoginPage, setIsLoginPage] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleLogin = aysnc () => {
        try {
            const response = await fetch("http://localhost:4000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username: email, password: password }),
            });
            if (response.ok) {
                const token = await response.text(); // Assuming backend returns JWT token as plain text
                localStorage.setItem("authToken", token); // Store token in localStorage
                dispatch({ type: "toggleLogin", payload: { toggle: true } });
                navigate("/"); // Redirect to homepage or another protected route
            } else {
                setError("Invalid credentials. Please try again.");
            }
        } catch (err) {
            setError("Something went wrong. Please try again.");
        }
    };
    
    return(
        <div className="authContainer">
            <div className="authHeader">
                <h2>{ isLoginPage ? "Login" : "Signup"}</h2>
                <div id="line"/>
            </div>
            {isLoginPage ? (
                // Login form
                <>
                    <div className={"input-field-placement"}>
                        <InputField name="email" type="email" placeholder="Email" value={emai} onChange={(e) => setEmail(e.target.value)}/>
                        <InputField name="password" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <div className="button-placement">
                        <DefaultButton
                            onClick={() => {
                                dispatch({type: "toggleLogin", payload: {toggle: true}})
                                navigate("/");
                            }
                            }
                            text="Login"
                            color="#4E73F6"
                        />
                    </div>
                    {error && <p className="error">{error}</p>} 
                    <p className="switchAuthType">
                        Don't have an account? <span onClick={() => setIsLoginPage(false)}>Sign up</span>
                    </p>
                </>
            ) : (
                // Signup form
                <>
                <div className={"input-field-placement"}>
                    <InputField name="userName" type="text" placeholder="User Name"/>
                    <InputField name="email" type="email" placeholder="Email"/>
                    <InputField name="password" type="password" placeholder="Password"/>
                    <InputField
                        name="repeatPassword"
                        type="password"
                        placeholder="Repeat Password"
                    />
                </div>
                    <div className="button-placement">
                        <DefaultButton
                            onClick={() => {
                                //TODO: ADD the account to database
                            }}
                            text="Signup"
                            color="#4E73F6"
                        />
                    </div>
                    <div className="switchAuthType">
                        Already have an account? <span onClick={() => setIsLoginPage(true)}>Login</span>
                    </div>
                </>
                )}
                </div>
            );
            }

            export default AuthPage;