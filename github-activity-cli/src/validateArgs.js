function validateArgs(args) {
    const username = args[2];

    if (!username) {
        throw new Error(" Username is required\n\nUsage: github-activity <username>");
    }


    const usernameRegex = /^[a-zA-Z0-9]([a-zA-Z0-9-]{0,37}[a-zA-Z0-9])?$/;

    if (!usernameRegex.test(username)) {
        throw new Error(
            ` Invalid GitHub username: "${username}"\n\n` +
            "GitHub usernames:\n" +
            "  - Can only contain alphanumeric characters and hyphens\n" +
            "  - Cannot start or end with a hyphen\n" +
            "  - Maximum 39 characters"
        );
    }

    return username;
}

module.exports = validateArgs;