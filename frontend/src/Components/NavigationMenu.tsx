import '../Styling/NavigationMenu.css'
import {useNavigate} from "react-router-dom";

export function NavigationMenu() {
    const navigate = useNavigate();
    return (
        <ul>
            <li><p onClick={()=>navigate("/")}>Home</p></li>
            <li>|</li>
            <li><p onClick={()=>navigate("/ongoing")}>Ongoing</p></li>
            <li>|</li>
            <li><p onClick={()=>navigate("/trending")}>Trending</p></li>
            <li>|</li>
            <li><p onClick={()=>navigate("/biddingshistory")}>Biddings history</p></li>
            <li>|</li>
            <li><p onClick={()=>navigate("/about")}>About us</p></li>
        </ul>

    )

}