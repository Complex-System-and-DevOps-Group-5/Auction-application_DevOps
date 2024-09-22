import * as React from "react";

interface ButtonProps {
    text: string;
    onClick: () => void;
    color?: string;
}


const DefaultButton: React.FC<ButtonProps> = ({onClick, text, color = '#868686'}) => {
    return (
        <button
            onClick={onClick}
            className="default-button"
            style={{backgroundColor: color}}
        >
            {text}
        </button>
    );
}

export default DefaultButton;