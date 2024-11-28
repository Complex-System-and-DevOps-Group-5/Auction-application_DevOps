import { useState } from "react";
import {getSearchReqeuest} from "../Components/Post.ts";
// comment to commit and push


export function SearchComponent() {
    const [query, setQuery] = useState("");
    const [results] = useState<any[]>([]);

    async function handleSubmitSearch(event: any) {
        event.preventDefault();
        try {
            const response = await submitSearch()
            console.log(response)
            //set results if successful
        } catch (err) {
            console.log(err)
        }
    }
    async function submitSearch() {
        //
        try {
            const response = await getSearchReqeuest('/api/post', query)
            if (response.ok) {
                alert('Your submit was successfully submitted, if you dont see your bid, reload the page')
            }
        } catch (err){
            console.log(err)
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