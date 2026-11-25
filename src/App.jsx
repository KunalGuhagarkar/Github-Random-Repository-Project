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
        <main className="app">
            <h1 className="app-title">GitHub Random Repository</h1>
            <p className="app-subtitle">
                Pick a language and discover a random project.
            </p>

            <div className="controls">
                <label htmlFor="language" className="sr-only">
                    Language
                </label>
                <select
                    name="language"
                    id="language"
                    className="select"
                    value={currentLanguage}
                    onChange={(e) => setCurrentLanguage(e.target.value)}
                >
                    <option value="JavaScript">JavaScript</option>
                    <option value="Python">Python</option>
                    <option value="Java">Java</option>
                    <option value="Php">Php</option>
                </select>
                <button
                    className="btn btn-primary"
                    onClick={searchClickHandler}
                >
                    Search
                </button>
            </div>

            {showResult && <ResultComponent language={finalLanguage} />}
        </main>
    );
}
