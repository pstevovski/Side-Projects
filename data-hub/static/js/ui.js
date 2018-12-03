class UI {
    constructor() {
        this.profile = document.querySelector("#profile");
        this.repos = document.querySelector("#repos");
    }
    // Display profile data
    displayData(profile) {
        // Creation date
        let creationYear = new Date(profile.created_at).getFullYear();
        let creationMonth = new Date(profile.created_at).getMonth() + 1;
        let creationDay = new Date(profile.created_at).getDate();
        let creationDate = `${creationYear}/${creationMonth}/${creationDay}`;

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
                    <img src=${profile.avatar_url} title="Profile picture">
                </div>

                <a href="${profile.html_url}" target="_blank">Go To Profile</a>
        </div>
        
        <div id="profile-info">
                <div id="badges">
                    <div class="badge" id="profile-repos" title="Repos">Public repos: ${profile.public_repos}</div>
                    <div class="badge" id="profile-followers" title="Followers">Followers: ${profile.followers}</div>
                    <div class="badge" id="profile-following" title="Following">Following: ${profile.following}</div>
                </div>

                <div id="basic-info">
                    <ul id="list">
                        <li><strong>Name:</strong> ${profile.name}</li>
                        <li><strong>Location:</strong> ${profile.location}</li>
                        <li><strong>Company:</strong> ${profile.company}</li>
                        <li><strong>Website:</strong> ${profile.blog}</li>
                        <li><strong>Hireable:</strong> ${profile.hireable}</li>
                        <li><strong>Profile created:</strong> ${creationDate}</li>
                    </ul>
                </div>
        </div>
        `;
    }

    // Display repositories
    displayRepos(repos) {
        let output = "<h2>Latest repos</h2>";
        
        repos.forEach(repo => {
            // Creation date
            let creationYear = new Date(repo.created_at).getFullYear();
            let creationMonth = new Date(repo.created_at).getMonth() + 1;
            let creationDay = new Date(repo.created_at).getDate();
            let creationDate = `${creationYear}/${creationMonth}/${creationDay}`;

            // If there's no homepage
            if(repo.homepage === null) {
                repo.homepage = `<span id="notAvailable">No homepage.</span>`;
            } else {
                repo.homepage = `<a href="${repo.homepage}" target="_blank" title="Open project">Open project</a>`;
            };

            output += `
            <div class="repo-box">
                <h3>${repo.name}</h3>
                <div class="repo-box_info">
                    <p>Stars: <span>${repo.stargazers_count}</span></p>
                    <p>Forks: <span>${repo.forks_count}</span></p>
                    <p>Language: <span>${repo.language}</span></p>

                </div>

                <div class="repo-box_desc">
                    <h4>Description: </h4>
                    <p>${repo.description}</p>

                    <div class="repo-box_links">
                        <span>${repo.homepage}</span>

                        <a href="${repo.html_url}" target="_blank" title="GitHub repo">Open repository</a>
                    </div>
                </div>

                <div id="repo-data">
                    <p>Date created: ${creationDate}</p>
                    <p>Size: <span id="size">${repo.size} kb</span></p>
                </div>
            </div>`;

            this.repos.innerHTML = output;
        })
    }

    // Clear profile and repos data
    clearData() {
        this.profile.innerHTML = "";
        this.repos.innerHTML = "";
    }
}