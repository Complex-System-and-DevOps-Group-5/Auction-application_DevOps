import '../Styling/SearchField.css'


interface SearchFieldProps {
    className?: string;
}

export function SearchField({ className }: SearchFieldProps) {
    return (
        <input 
            type="text" 
            placeholder="Search" 
            className={className} 
        />
    );
}