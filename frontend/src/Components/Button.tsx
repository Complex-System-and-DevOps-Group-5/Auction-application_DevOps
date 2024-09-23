import * as React from "react";

interface ButtonProps {
    text?: string;
    icon?: string
    className?: string;
    onClick: () => void;
    color?: string;
}


const DefaultButton: React.FC<ButtonProps> = ({onClick, text, className = '', color = '#868686'}) => {
    return (
        <button
            onClick={onClick}
            className={`default-button ${className}`} 
            style={{backgroundColor: color}}
        >
            {text}
        </button>
    );
}

export default DefaultButton;