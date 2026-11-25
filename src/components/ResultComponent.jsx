import { useEffect, useState } from "react";

export default function ResultComponent({ language }) {
    const [repo, setRepo] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function fetchData() {
            const randomPage = Math.floor(Math.random() * 10) + 1;
            const chars = "abcdefghijklmnopqrstuvwxyz";
            const randomQuery =
                chars[Math.floor(Math.random() * chars.length)] +
                chars[Math.floor(Math.random() * chars.length)];

            console.log(randomPage);

            setIsLoading(true);

            try {
                const response = await fetch(
                    `https://api.github.com/search/repositories?q=${randomQuery}+language:${language}&page=${randomPage}`,
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
                console.error(err.message);
            } finally {
                setIsLoading(false);
            }
        }

        fetchData();
    }, [language]);

    return (
        <div>
            <h1>Result Card</h1>
            <p>{language}</p>

            {isLoading && <p>Loading...</p>}

            {!isLoading && repo && <div>{repo.name}</div>}

            <button>Refresh</button>
        </div>
    );
}
