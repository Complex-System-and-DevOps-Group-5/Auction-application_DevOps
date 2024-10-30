import "../Styling/AuthPage.css"
import InputField from "../Components/InputField.tsx";
import DefaultButton from "../Components/DefaultButton.tsx";
import {useLoginDispatch} from "../Context/LoginContext.tsx";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import InputFieldToken from "../Components/InputField_Token.tsx";

export function AuthPage() {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const dispatch = useLoginDispatch()
    const [isLoginPage, setIsLoginPage] = useState(true);
    const navigate = useNavigate();

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
                        <InputFieldToken name="email" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <InputFieldToken name="password" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
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