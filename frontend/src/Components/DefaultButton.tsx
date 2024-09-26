import React from "react";
import styles from "../Styling/DefaultButton.module.css";

interface ButtonProps {
    text: string;
    onClick: () => void;
    color?: string;
    size?: 'small' | 'medium' | 'large';
    disabled?: boolean;
    fullWidth?: boolean;
}


const DefaultButton: React.FC<ButtonProps> = ({
                                                  onClick,
                                                  text,
                                                  color = '#868686',
                                                  size = 'medium',
                                                  disabled = false,
                                                  fullWidth = false,
                                              }) => {

    const buttonClasses = [
        styles.defaultButton,
        styles[size],
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