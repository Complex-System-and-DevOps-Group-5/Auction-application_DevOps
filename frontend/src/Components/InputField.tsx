import "../Styling/InputField.css"

export function InputField({name, type, placeholder}:InputFieldProps){

    return(
        <div id="inputField">
            <input name={name} type={type} placeholder={placeholder} required/>
            <br/>
        </div>
    )
}
type InputFieldProps = {
    name : string;
    type : string;
    placeholder : string;
}
export default InputField;