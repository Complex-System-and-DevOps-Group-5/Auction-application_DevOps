import "../Styling/InputField.css";

export function InputField({ name, type, placeholder, className }: InputFieldProps) {
    return (
        <div id="inputField">
            <input name={name} type={type} placeholder={placeholder} required className={className} />
            <br />
        </div>
    );
}

type InputFieldProps = {
    name: string;
    type: string;
    placeholder: string;
    className?: string; 
};

export default InputField;