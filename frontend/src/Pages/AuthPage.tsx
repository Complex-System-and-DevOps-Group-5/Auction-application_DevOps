import "../Styling/AuthPage.css"
import InputField from "../Components/InputField.tsx";
import DefaultButton from "../Components/Button.tsx";
import {useLoginDispatch, useLoginState} from "../Context/LoginContext.tsx";
import {useState} from "react";

export function AuthPage() {
    const loggedIn = useLoginState()
    const dispatch = useLoginDispatch()
    const [isLoginPage, setIsLoginPage] = useState(true);



    return(
        <div className="authContainer">
            <div className="authHeader">
                <h2>{ isLoginPage ? "Login" : "Signup"}</h2>
                <div id="line"/>
            </div>
            {/*
            <InputField name="userName" type="text" placeholder="User Name"/>
            <InputField name="email" type="email" placeholder="Email"/>
            <InputField name="password" type="password" placeholder="Password"/>
            <InputField name="repeatPassword" type="password" placeholder="Repeat Password"/>
            */}
            {/*loggedIn.loggedIn !== true ? (
                <>
                    <div className="button-placement">
                        <DefaultButton
                            onClick={() =>
                                {dispatch({type: "toggleLogin", payload: {toggle: true}});}
                            }
                            text="Signup"
                            color='#4E73F6'
                        />
                    </div>

                </>
            ) : (
                <>
                <InputField name="email" type="email" placeholder="Email"/>
                <InputField name="password" type="password" placeholder="Password"/>
                <DefaultButton
                    onClick={() =>
                    {dispatch({type: "toggleLogin", payload: {toggle: false}});}
                    }
                    text="Login"
                    color='#868686'
                />
                </>
            )
            */}
            {isLoginPage ? (
                // Login form
                <>
                    <InputField name="email" type="email" placeholder="Email"/>
                    <InputField name="password" type="password" placeholder="Password"/>
                    <div className="button-placement">
                        <DefaultButton
                            onClick={() => {
                                dispatch({type: "toggleLogin", payload: {toggle: true}})
                                //navigate("/home");
                            }
                            //TODO: Navigate to homePage page
                        }
                            text="Login"
                            color="#4E73F6"
                        />
                    </div>
                    <p className="switchForm">
                        Don't have an account? <span onClick={() => setIsLoginPage(false)}>Login</span>
                    </p>
                </>
            ) : (
                // Signup form
                <>
                    <InputField name="userName" type="text" placeholder="User Name"/>
                    <InputField name="email" type="email" placeholder="Email"/>
                    <InputField name="password" type="password" placeholder="Password"/>
                    <InputField
                        name="repeatPassword"
                        type="password"
                        placeholder="Repeat Password"
                    />
                    <div className="button-placement">
                        <DefaultButton
                            onClick={() => {
                                //TODO: ADD the account to database
                            }}
                            text="Signup"
                            color="#868686"
                        />
                    </div>
                    <div className="switchForm">
                        Already have an account? <span onClick={() => setIsLoginPage(true) }>Login</span>
                    </div>
                </>
            )}
        </div>
    );
}

export default AuthPage;