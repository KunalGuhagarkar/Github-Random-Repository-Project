# GitHub Random Repository

A React app that lets you pick a programming language and discover a random GitHub repository written in it. It shows the repository's name, description, stars, forks and open issues, and lets you fetch another one with a single click.

Built for the [GitHub Random Repository](https://roadmap.sh/projects/github-random-repo) project on roadmap.sh.

## Features

- Select a programming language from a dropdown
- Fetch a random matching repository from the GitHub Search API
- Display the repository name (linked to GitHub), description, stars, forks and open issues
- Loading, empty and error states
- "Refresh" button to fetch another random repository for the same language
- Stale requests are cancelled with `AbortController` when the language changes or the component unmounts
- Responsive layout with automatic dark mode

## Tech Stack

- React
- Vite
- Plain CSS
- [GitHub Repository Search API](https://docs.github.com/en/rest/search/search#search-repositories)

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm

### Installation

```bash
git clone https://github.com/KunalGuhagarkar/Github-Random-Repository-Project.git
cd Github-Random-Repository-Project
npm install
npm run dev
```

Then open the local URL printed in the terminal (usually `http://localhost:5173`).

### Build for production

```bash
npm run build
npm run preview
```

## How It Works

1. The user picks a language and clicks **Search**.
2. `App` passes the chosen language to `ResultComponent`.
3. `ResultComponent` sends a search request with a random two-letter query and a random page (1 to 10), so each request returns a different set of repositories.
4. One repository is picked at random from the results and displayed.
5. Clicking **Refresh** repeats the process with the same language.

```
GET https://api.github.com/search/repositories?q={randomQuery}+language:{language}&page={randomPage}
```

## Project Structure

```
src/
├── App.jsx                      # Language dropdown and search button
├── App.css                      # Global and component styles
├── main.jsx
└── components/
    └── ResultComponent.jsx      # Fetches and displays the random repository
```

## UI States

| State | Behavior |
|---|---|
| Loading | "Loading..." is shown while the request is in flight, and Refresh is disabled |
| Success | Repository details are shown, and Refresh is enabled |
| Empty | "No repositories found, try again." is shown |
| Error | The error message (for example a rate-limit error) is shown |

## Known Limitations

- **Rate limit:** the GitHub Search API allows about 10 unauthenticated requests per minute. Clicking Refresh rapidly can return a 403 error.
- **Dev-mode double request:** in development, React StrictMode runs effects twice, so two requests appear in the Network tab and the first is cancelled. This does not happen in production builds.
- **Empty results:** the random query approach does not guarantee a result for every language and query combination, which is why the empty state exists.
- **Language list:** the dropdown currently has a fixed set of languages (JavaScript, Python, Java and PHP).

## Possible Improvements

- Load the full language list from the [githunt languages.json](https://raw.githubusercontent.com/kamranahmedse/githunt/master/src/components/filters/language-filter/languages.json)
- Use authenticated requests through a small backend to raise the rate limit
- Add data fetching with TanStack Query for caching and retries

## Resources

- [Project brief on roadmap.sh](https://roadmap.sh/projects/github-random-repo)
- [GitHub Repository Search API docs](https://docs.github.com/en/rest/search/search#search-repositories)
- [MDN: AbortController](https://developer.mozilla.org/en-US/docs/Web/API/AbortController)

## Author

**Kunal Guhagarkar**

- GitHub: [@KunalGuhagarkar](https://github.com/KunalGuhagarkar)