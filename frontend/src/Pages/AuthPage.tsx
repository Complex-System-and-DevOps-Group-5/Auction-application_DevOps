import "../Styling/AuthPage.css"
import InputField from "../Components/InputField.tsx";
import DefaultButton from "../Components/Button.tsx";
import {useLoginDispatch} from "../Context/LoginContext.tsx";
import {useState} from "react";

export function AuthPage() {
    const dispatch = useLoginDispatch()
    const [isLoginPage, setIsLoginPage] = useState(true);
    //const navigate = UseNavigate();

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
                        <InputField name="email" type="email" placeholder="Email"/>
                        <InputField name="password" type="password" placeholder="Password"/>
                    </div>
                    <div className="button-placement">
                        <DefaultButton
                            onClick={() => {
                                dispatch({type: "toggleLogin", payload: {toggle: true}})
                                //TODO: Navigate to homePage page
                                //navigate("/home");
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