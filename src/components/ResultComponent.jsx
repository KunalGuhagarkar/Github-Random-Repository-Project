import { useCallback, useEffect, useState } from "react";

export default function ResultComponent({ language }) {
    const [repo, setRepo] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = useCallback(
        async (signal) => {
            const randomPage = Math.floor(Math.random() * 10) + 1;
            const chars = "abcdefghijklmnopqrstuvwxyz";
            const randomQuery =
                chars[Math.floor(Math.random() * chars.length)] +
                chars[Math.floor(Math.random() * chars.length)];

            setIsLoading(true);
            setError(null);

            try {
                const response = await fetch(
                    `https://api.github.com/search/repositories?q=${randomQuery}+language:${encodeURIComponent(language)}&page=${randomPage}`,
                    { signal },
                );

                if (!response.ok) {
                    throw new Error(`GitHub API error: ${response.status}`);
                }

                const data = await response.json();

                if (!data.items?.length) {
                    throw new Error("No repositories found, try again.");
                }

                const randomRepo =
                    data.items[Math.floor(Math.random() * data.items.length)];
                setRepo(randomRepo);
            } catch (err) {
                if (err.name !== "AbortError") {
                    setError(err.message);
                    console.error(err.message);
                }
            } finally {
                if (!signal?.aborted) {
                    setIsLoading(false);
                }
            }
        },
        [language],
    );

    useEffect(() => {
        const controller = new AbortController();
        fetchData(controller.signal);
        return () => controller.abort();
    }, [fetchData]);

    return (
        <div className="card">
            <div className="card-header">
                <h2>Result</h2>
                <span className="badge">{language}</span>
            </div>

            {isLoading && <p className="status">Loading...</p>}

            {!isLoading && error && (
                <p role="alert" className="status error">
                    {error}
                </p>
            )}

            {!isLoading && repo && (
                <a
                    className="repo-link"
                    href={repo.html_url}
                    target="_blank"
                    rel="noreferrer"
                >
                    {repo.name}
                </a>
            )}

            <button
                className="btn btn-secondary"
                onClick={() => fetchData()}
                disabled={isLoading}
            >
                Refresh
            </button>
        </div>
    );
}
