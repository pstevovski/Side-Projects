class Github {
    constructor() {
        this.id = "d5691091cde0221e3554";
        this.secret = "575acf839239b4017108b0089ec83e9c987bf5ca";
    }

    async getUser(theUser) {
        const response = await fetch(`https://api.github.com/users/${theUser}`);
        const profile = await response.json();

        return {
            profile
        }
    }
}