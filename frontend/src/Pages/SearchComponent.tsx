import { useState } from "react";
import {getSearchRequest} from "../Components/Post.ts";



export function SearchComponent() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<any[]>([]);

    async function handleSubmitSearch(event: any) {
        event.preventDefault();
        try {
            const response = await submitSearch()
            console.log(response)
        } catch (err) {
            console.log(err)
        }
    }
    async function submitSearch() {
        try {
            const response = await getSearchRequest(`http://130.225.170.52:10101/api/search?q=` + encodeURI(query));
            setResults(response);
        } catch (err) {
            console.error("Search failed: ", err);
        }
    }


    return (
        <div className="search-container">
            <div className="search-header">
                <form onSubmit={handleSubmitSearch}>
                <input
                    type="text"
                    placeholder="Search..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="searchField"
                />
                </form>
            </div>
            <div className="search-content" >
                {results.map((result, index) => (
                    <div key={index} className="search-result" style={{background: "#fff"}}>
                        <a href={"/product/" + result.id} style={{color: "#000"}}>{result.title}</a>
                    </div>
                ))}
            </div>
        </div>
    );
}