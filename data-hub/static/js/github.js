class Github {
    constructor() {
        this.id = "d5691091cde0221e3554";
        this.secret = "575acf839239b4017108b0089ec83e9c987bf5ca";
        this.count = 5;
        this.sort = "updated";
    }

    async getUser(theUser) {
        const response = await fetch(`https://api.github.com/users/${theUser}?client_id=${this.id}&client_secret=${this.secret}`);
        
        // Repos response
        const reposResponse = await fetch(`https://api.github.com/users/${theUser}/repos?per_page=${this.count}&sort=${this.sort}&direction="asc"&client_id=${this.id}&clien_secret=${this.secret}`);
        
        
        const profile = await response.json();
        const repos = await reposResponse.json();

        return {
            profile,
            repos
        }
    }
}