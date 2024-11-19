import {useState} from "react";
import DefaultButton from "./DefaultButton.tsx";
import "../Styling/DropDownMenu.css"
interface DropDownMenu {
    title: string;
}
export function DropDownMenu({title}:DropDownMenu){

    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            {/*TODO: ADD NOTIFICATION BUTTON*/}
            <div className="button">
                <DefaultButton
                    onClick={() =>
                        toggleDropdown()
                    }
                    text={title}
                    color="#4E73F6"
                    fontSize = 'small'
                />
            </div>

            {isOpen && (
                <div className="dropdown-container">
                    <h3>{title}</h3>
                    <div className="vertical-menu">
                        <a>Notification 1</a>
                        <a>Notification 2</a>
                        <a>Notification 3</a>
                        <a>Notification 4</a>
                        <a>Notification 5</a>
                    </div>
                </div>)
            }
        </>
    )
}