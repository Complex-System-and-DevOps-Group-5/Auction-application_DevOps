import '../Styling/NavigationMenu.css'
import {useNavigate} from "react-router-dom";

export function NavigationMenu() {
    const navigate = useNavigate()
    return (
        <ul>
            <li><a onClick={()=>navigate("/")}>Home</a></li>
            <li>|</li>
            <li><a onClick={()=>navigate("/ongoing")}>Ongoing</a></li>
            <li>|</li>
            <li><a onClick={()=>navigate("/hitlist")}>Hitlist</a></li>
            <li>|</li>
            <li><a onClick={()=>navigate("/biddingshistory")}>Biddings history</a></li>
            <li>|</li>
            <li><a onClick={()=>navigate("/about")}>About us</a></li>
        </ul>

    )

}