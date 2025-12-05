const parseErrors = require("./errors");

async function fetchActivity(username) {
    const url = `https://api.github.com/users/${username}/events`;

    const response = await fetch(url, {
        headers: {
            "User-Agent": "github-activity-cli",
            "Accept": "application/vnd.github+json"
        }
    });

    const rawBody = await response.text();
    const data = parseErrors(response.status, rawBody);

    return data;
}

module.exports = fetchActivity;