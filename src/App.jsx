import { useState } from "react";

import "./App.css";

import ResultComponent from "./components/ResultComponent";

export default function App() {
    const [currentLanguage, setCurrentLanguage] = useState("JavaScript");
    const [finalLanguage, setFinalLanguage] = useState("");
    const [showResult, setShowResult] = useState(false);

    function searchClickHandler() {
        setFinalLanguage(currentLanguage);
        setShowResult(true);
    }

    return (
        <div>
            <h1>Github Random Repository Project</h1>
            <select
                name="language"
                id="language"
                value={currentLanguage}
                onChange={(e) => setCurrentLanguage(e.target.value)}
            >
                <option value="JavaScript">JavaScript</option>
                <option value="Python">Python</option>
                <option value="Java">Java</option>
                <option value="Php">Php</option>
            </select>
            <button onClick={searchClickHandler}>Search</button>

            {showResult && <ResultComponent language={finalLanguage} />}
        </div>
    );
}
