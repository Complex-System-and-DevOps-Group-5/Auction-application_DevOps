import React from "react";
import styles from "../Styling/DefaultButton.module.css";

interface ButtonProps {
    text: string;
    onClick: () => void;
    color?: string;
    fontSize?: 'small' | 'medium' | 'large';
    disabled?: boolean;
    fullWidth?: boolean;
}


const DefaultButton: React.FC<ButtonProps> = ({
                                                  onClick,
                                                  text,
                                                  color = '#868686',
                                                  fontSize = 'medium',
                                                  disabled = false,
                                                  fullWidth = false,
                                              }) => {

    const buttonClasses = [
        styles.defaultButton,
        styles[fontSize],
        fullWidth ? styles.fullWidth : '',
    ].join(' ');

    return (
        <button
            onClick={onClick}
            className={buttonClasses}
            style={{backgroundColor: color}}
            disabled={disabled}
        >
            {text}
        </button>
    );
}

export default DefaultButton;