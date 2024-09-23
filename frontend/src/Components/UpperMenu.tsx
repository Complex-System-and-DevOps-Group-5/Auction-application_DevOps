import {SearchField} from "./SearchField.tsx";
import {useLoginDispatch, useLoginState} from "../Context/LoginContext.tsx";
import {useNavigate} from "react-router-dom";

export function UpperMenu() {
    const loggedIn = useLoginState()
    const dispatch = useLoginDispatch()

    const navigate = useNavigate();

    const username = "AM";
    return(
       
        <nav className= "upper-menu">

            <div className= "search-bar">
                <SearchField/>
            </div>

            <div className= "logo">
                <h1><span>AUC</span>TION</h1>
            </div>

            <div className="user-actions">
                {loggedIn.loggedIn !== true ? (
                    <>
                        <button className="login"
                                onClick={() => {
                                    /*console.log('before' + loggedIn.loggedIn);
                                    dispatch({type: "toggleLogin", payload: {toggle: true}});
                                    console.log('after'+ loggedIn.loggedIn)*/
                                    navigate("/authentication");
                                }
                                }
                        >Login
                        </button>
                    </>
                ) : (
                    <>
                        {/*<div className="username"> {username}</div>
                        <button className="create">Create</button>
                        <button className="watchlist">
                            <img src={watchlistIcon} alt="Watchlist Icon" className="button-icon"/>
                        </button>
                        <button className="notification-icon">
                            <img src={notificationIcon} alt="notifications"/>
                        </button>
*/}
                        <button className="logout"
                                onClick={() =>
                                    {
                                        dispatch({type: "toggleLogin", payload: {toggle: false}})
                                         {console.log(loggedIn)}
                                    }
                                }
                        >Logout
                        </button>
                    </>
                )}
            </div>
        </nav>
    );
}
