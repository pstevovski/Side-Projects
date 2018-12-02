class UI {
    constructor() {
        this.profile = document.querySelector("#profile");
    }
    // Display profile data
    displayData(profile) {
        // Check if there is data is the user's hireable
        if(profile.hireable === null) {
            profile.hireable = `<span id="notAvailable">No info.</span>`;
        }

        // Check if there is data for the user's email
        if (profile.company === null) {
            profile.company = `<span id="notAvailable">No info.</span>`;
        }

        // Check if there is data for the user's website
        if (profile.blog === "") {
            profile.blog = `<span id="notAvailable">Website not available.</span>`;
        } else {
            profile.blog = `<a href="${profile.blog} target="_blank">${profile.blog}</a>`;
        }


        // Inser the dynamically generated HTML into the container
        this.profile.innerHTML = `
        <div id="profile-main">
                <div id="profile-image">
                    <img src=${profile.avatar_url}>
                </div>

                <a href="${profile.html_url}">${profile.login}</a>
        </div>
        
        <div id="profile-info">
                <div id="badges">
                    <div class="badge" id="profile-repos">Public repos: ${profile.public_repos}</div>
                    <div class="badge" id="profile-followers">Followers: ${profile.followers}</div>
                    <div class="badge" id="profile-following">Following: ${profile.following}</div>
                </div>

                <div id="basic-info">
                    <ul id="list">
                        <li><strong>Name:</strong> ${profile.name}</li>
                        <li><strong>Location:</strong> ${profile.location}</li>
                        <li><strong>Company:</strong> ${profile.company}</li>
                        <li><strong>Website:</strong> ${profile.blog}</li>
                        <li><strong>Hireable:</strong> ${profile.hireable}</li>
                        <li><strong>Profile created:</strong> ${profile.created_at}</li>
                    </ul>
                </div>
        </div>
        `;
    }
}