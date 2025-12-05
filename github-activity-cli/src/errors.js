function parseErrors(statusCode, rawBody) {

    if (statusCode === 404) {
        throw new Error(" User not found");
    }

    if (statusCode === 403) {
        throw new Error(" Rate limit exceeded. Try again later.");
    }

    if (statusCode >= 500) {
        throw new Error(" GitHub server error. Please try again later.");
    }

    let json;
    try {
        json = JSON.parse(rawBody);
    } catch (e) {
        throw new Error(" Failed to parse GitHub response");
    }

    if (json?.message && statusCode !== 200) {
        throw new Error(` GitHub Error: ${json.message}`);
    }


    return json;
}

module.exports = parseErrors;
