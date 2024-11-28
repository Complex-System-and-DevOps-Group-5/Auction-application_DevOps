import "../Styling/searchComponent.css"
import { useState } from "react";


export function SearchComponent() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<any[]>([]);

    async function handleSearch(event: any){
        event.preventDefault();
        try {
            const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            const data = await response.json();
            setResults(data);
        } catch (error) {
            console.error("Search failed", error);
        }
    }
    return (
        <div className="search-container">
            <div className="search-header">
                <form onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Search..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="searchField"
                />
                <button >Search</button>
                </form>
            </div>
            <div className="search-content">
                {results.map((result, index) => (
                    <div key={index} className="search-result">
                        <h3>{result.name}</h3>
                        <p>{result.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}