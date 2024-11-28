import {SearchField} from "./SearchField.tsx";
import {useLoginDispatch, useLoginState} from "../Context/LoginContext.tsx";
import '../Styling/UpperMenu.css'
import {Logo} from "./Logo.tsx";
import {DropDownMenu} from "./DropDownMenu.tsx";
import {useNavigate} from "react-router-dom";
//import {useEffect} from "react";
//import {fetchData} from "./Fetch.ts";

export function UpperMenu() {
    const { loggedIn, username } = useLoginState()
    const dispatch = useLoginDispatch()

    const navigate = useNavigate();
    // useEffect(() => {
    //     fetchData('')
    //         .then(fetchedData => {
    //             dispatch({ type: "toggleLogin", payload: { toggle: true }});
    //             dispatch({ type: "setUsername", payload: { username: fetchedData.username }});
    //         })
    //         .catch(() =>
    //             dispatch({ type: "setUserError", payload: { failed: true } })
    //         );
    // }, []);
    return(

        <div className="upper-menu">
            <div className="search-bar">
                <SearchField/>
            </div>

            <div className="logo">
                <Logo/>
            </div>

            {loggedIn ? (
                    <div className="loggedIn">
                        <button className="create-button" onClick={() => navigate('/createPost')}>Create</button>
                        
                        <DropDownMenu title="Notification"/>
                        
                        {/* in the future use ProfilePicture component*/}
                        <div className='profile'>
                            <p className='username'>{username}</p>
                            <span
                                className='dot'>
                            </span> {/*make this a button instead of span when drop down menus are readu*/}
                        </div>

                        <button className="logout-button"
                                onClick={() => {
                                    dispatch({type: "toggleLogin", payload: {toggle: false}})
                                    {
                                        console.log(loggedIn)
                                    }
                                }
                                }
                        >Logout
                        </button>
                    </div>
                ) : (
                    <button className="login-button"
                        onClick={() => {
                                navigate("/login");
                            }
                        }
                    >Login
                    </button>
                )
            }
        </div>
    );
}

export default UpperMenu;
