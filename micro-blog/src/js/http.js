class Http {
    // Get method
    async get(url) {
        const response = await fetch(url);
        const data = await response.json();

        return data;
    }

    // Post method
    async post(url, data) {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-type" : "application/json",
            },
            body: JSON.stringify(data)
        });

        const post = await response.json();

        return post;
    }

    // Update (put) method
    async put(url, data) {
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(data)
        });

        const updatedPost = await response.json();

        return updatedPost;
    }

    // Delete method
    async delete(url) {
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json",
            }
        });

        const result = await response.json();

        return result;
    }
}

export const http = new Http();