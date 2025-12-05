const fetchActivity = require("./fetch");
const parseEvents = require("./parseEvents");
const validateArgs = require("./validateArgs");

const main = async () => {
    try {
        const username = validateArgs(process.argv);
        console.log(`\n Fetching activity for GitHub user: ${username}\n`);

        const activity = await fetchActivity(username);
        const events = parseEvents(activity);

        events.forEach(msg => {
            console.log(msg);
        });

        console.log();

    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
};

main();

