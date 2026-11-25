# GitHub Random Repository

A small React app that lets you pick a programming language and discover a random GitHub repository written in it. Built as a practice project for working with external APIs, async requests, and UI states.

## Features

- Select a programming language from a dropdown
- Fetch a random repository from the GitHub Search API
- Display the repository name as a link to its GitHub page
- Loading and error states
- "Refresh" button to fetch another random repository
- Cancels stale requests with `AbortController` when the language changes or the component unmounts
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
# clone the repository
git clone <your-repo-url>
cd <your-project-folder>

# install dependencies
npm install

# start the dev server
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
3. `ResultComponent` builds a search request with a random two-letter query and a random page (1 to 10), so each request returns a different set of repositories.
4. One repository is picked at random from the returned results and displayed.
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
| Loading | "Loading..." is shown while the request is in flight |
| Success | Repository name (linked) is displayed, and Refresh is enabled |
| Empty | "No repositories found, try again." is shown |
| Error | The error message (for example a rate-limit error) is shown |

## Known Limitations

- **Rate limit:** the GitHub Search API allows about 10 unauthenticated requests per minute. Clicking Refresh rapidly will return a 403 error. The Refresh button is disabled while loading to reduce this.
- **Dev-mode double request:** in development, React StrictMode runs effects twice, so you will see two requests in the Network tab. The first is cancelled. This does not happen in production builds.
- The random query approach does not guarantee a result for every language and query combination, which is why the empty state exists.

## Possible Improvements

- Show description, stars, forks, and open issues on the card
- Load the full language list from the [githunt languages.json](https://raw.githubusercontent.com/kamranahmedse/githunt/master/src/components/filters/language-filter/languages.json)
- Use an authenticated request (through a small backend) to raise the rate limit
- Add data-fetching with TanStack Query for caching and retries

## Resources

- [GitHub Repository Search API docs](https://docs.github.com/en/rest/search/search#search-repositories)
- [Programming language data](https://raw.githubusercontent.com/kamranahmedse/githunt/master/src/components/filters/language-filter/languages.json)
- [MDN: AbortController](https://developer.mozilla.org/en-US/docs/Web/API/AbortController)

## Author

Kunal Guhagarkar