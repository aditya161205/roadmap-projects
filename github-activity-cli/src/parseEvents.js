
function formatRelativeTime(dateString) {
    const now = new Date();
    const eventDate = new Date(dateString);
    const diffMs = now - eventDate;
    const diffSecs = Math.floor(diffMs / 1000);
    const diffMins = Math.floor(diffSecs / 60);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    if (diffHours > 0) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffMins > 0) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
    return 'just now';
}


function parseActivity(events) {
    if (!Array.isArray(events)) {
        throw new Error("Invalid GitHub response format");
    }

    if (events.length === 0) {
        return ["No recent activity found"];
    }

    return events.map(event => {
        const { type, repo, created_at, payload } = event;
        const repoName = repo?.name || "Unknown repo";
        const timeAgo = formatRelativeTime(created_at);

        let action = "Unknown event";

        switch (type) {
            case "PushEvent":
                const commitCount = payload.commits?.length || payload.size || 0;
                if (commitCount > 0) {
                    action = `Pushed ${commitCount} commit${commitCount !== 1 ? 's' : ''} to ${repoName}`;
                } else {
                    action = `Pushed to ${repoName}`;
                }
                break;

            case "WatchEvent":
                action = `Starred ${repoName}`;
                break;

            case "IssuesEvent":
                const issueAction = payload.action || "updated";
                const issueNumber = payload.issue?.number || "?";
                action = `${issueAction.charAt(0).toUpperCase() + issueAction.slice(1)} issue #${issueNumber} in ${repoName}`;
                break;

            case "PullRequestEvent":
                const prAction = payload.action || "updated";
                const prNumber = payload.pull_request?.number || "?";
                action = `${prAction.charAt(0).toUpperCase() + prAction.slice(1)} pull request #${prNumber} in ${repoName}`;
                break;

            case "ForkEvent":
                action = `Forked ${repoName}`;
                break;

            case "CreateEvent":
                const refType = payload.ref_type || "branch";
                const ref = payload.ref || "unknown";
                if (refType === "repository") {
                    action = `Created repository ${repoName}`;
                } else {
                    action = `Created ${refType} "${ref}" in ${repoName}`;
                }
                break;

            case "DeleteEvent":
                const delRefType = payload.ref_type || "branch";
                const delRef = payload.ref || "unknown";
                action = `Deleted ${delRefType} "${delRef}" in ${repoName}`;
                break;

            case "IssueCommentEvent":
                const commentIssueNum = payload.issue?.number || "?";
                action = `Commented on issue #${commentIssueNum} in ${repoName}`;
                break;

            case "PullRequestReviewEvent":
                const reviewPrNum = payload.pull_request?.number || "?";
                action = `Reviewed pull request #${reviewPrNum} in ${repoName}`;
                break;

            case "PullRequestReviewCommentEvent":
                const commentPrNum = payload.pull_request?.number || "?";
                action = `Commented on pull request #${commentPrNum} in ${repoName}`;
                break;

            case "ReleaseEvent":
                const releaseName = payload.release?.tag_name || "unknown";
                action = `Published release ${releaseName} in ${repoName}`;
                break;

            case "PublicEvent":
                action = `Made ${repoName} public`;
                break;

            case "MemberEvent":
                const memberAction = payload.action || "added";
                const memberName = payload.member?.login || "a collaborator";
                action = `${memberAction.charAt(0).toUpperCase() + memberAction.slice(1)} ${memberName} to ${repoName}`;
                break;

            case "CommitCommentEvent":
                action = `Commented on a commit in ${repoName}`;
                break;

            case "GollumEvent":
                const pageCount = payload.pages?.length || 0;
                action = `Updated ${pageCount} wiki page${pageCount !== 1 ? 's' : ''} in ${repoName}`;
                break;

            default:
                action = `${type.replace("Event", "")} in ${repoName}`;
        }

        return `- ${action} (${timeAgo})`;
    });
}

module.exports = parseActivity;
