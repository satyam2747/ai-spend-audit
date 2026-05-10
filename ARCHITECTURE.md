# Architecture Notes

## SEO & Meta Tags
Currently, the application uses static Open Graph (OG) and Twitter meta tags defined in `client/index.html`. 

### Dynamic Share Limitations
While the `document.title` is updated dynamically on the `ResultPage` using a React `useEffect`, this change is only visible in the browser tab and is not picked up by most social media crawlers (which do not execute JavaScript).

To achieve fully dynamic Open Graph tags (e.g., "I could save $160/mo..." showing up in a Slack or Twitter preview link), the application would require **Server-Side Rendering (SSR)** or a pre-rendering service to inject the specific audit data into the HTML before it is served to the crawler.

For now, the static tags provide a baseline professional appearance for all shared links.
