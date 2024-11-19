import "../Styling/InputField.css";

export function InputFieldToken({ name, type, placeholder, className, value, onChange }: InputFieldProps) {
    return (
        <div id="inputField">
            <input 
                name={name} 
                type={type} 
                placeholder={placeholder}  
                className={className} 
                value={value} 
                onChange={onChange} 
            />
            <br />
        </div>
    );
}

type InputFieldProps = {
    name: string;
    type: string;
    placeholder: string;
    className?: string; 
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default InputFieldToken;
