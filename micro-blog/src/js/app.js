import { http } from "./http";
import { ui } from "./ui";

// Get the posts from the data
document.addEventListener("DOMContentLoaded", getPosts);

// Add a post
document.querySelector(".post-submit").addEventListener("click", addPost);

// Delete a post
document.querySelector("#posts").addEventListener("click", deletePost);

// Update a post
document.querySelector("#posts").addEventListener("click", editPost);

// Listen for cancel
document.querySelector("#cancelBtn").addEventListener("click", cancelEdit);

// GET THE POSTS FROM THE DATA
function getPosts() {
    http.get("http://localhost:3000/posts")
        .then(data => {
            // Display the fetched data
            ui.displayData(data);
        })
        .catch(err => console.log(err));
}

// SUBMIT A POST
function addPost() {
    const title = document.querySelector("#title").value;
    const body = document.querySelector("#body").value;
    const id = document.querySelector("#id").value;

    // If there's input in the post title and post body, then create a post
    if(title && body) {
        // Post creation date
        const postYear = new Date().getFullYear();
        const postMonth = new Date().getMonth() + 1;
        const postDay = new Date().getDate();
        
        // Post creation time
        const postHour = new Date().getHours();
        const postMinutes = new Date().getUTCMinutes();
        const postSeconds = new Date().getSeconds();
        
        const postDate =`${postYear}-${postMonth}-${postDay}, ${postHour < 10 ? 0 : ""}${postHour}:${postMinutes < 10 ? 0 : ""}${postMinutes}:${postSeconds < 10 ? 0 : ""}${postSeconds}`;

        const data = {
            title,
            body,
            postDate
        };

        if(id === '') {
            // Submit the post
            http.post("http://localhost:3000/posts", data)
            .then(() => {
                    // Clear input fields
                    ui.clearFields();
        
                    // Display notification
                    ui.showNotification("Post created", "success");
        
                    // Get the posts again
                    getPosts();
                })
                .catch(err => console.log(err));
        } else {
            // Update the post
            http.put(`http://localhost:3000/posts/${id}`, data)
                .then( () => {
                    // Clear the fields
                    ui.changeState("add");

                    // Show notification
                    ui.showNotification("Post edited", "success");

                    // Get the posts again
                    getPosts();
                })
                .catch(err => console.log(err));
        }
    } else {
        // If the input fields are not filled in, show a notification
        ui.showNotification("Please fill the input fields before trying to create a post.", "error");
    }
}

// DELETE A POST
function deletePost(e) {
    if(e.target.id === "deletePost") {
       const id = e.target.dataset.id;
       
        // Delete the post using the ID
        http.delete(`http://localhost:3000/posts/${id}`)
            .then(() => {
                // Get the posts again
                getPosts();
            })
            .catch(err => console.log(err));
    }
}

// UPDATE A POST
function editPost(e) {
    if(e.target.id === "updatePost") {
        const id = e.target.dataset.id;
        const body = e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.textContent;
        const title = e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.textContent;

        // Get the data from these elements and fill the form
        const data = {
            id,
            body,
            title
        };
        ui.fillForm(data);
    }
}

// CANCEL EDIT
function cancelEdit() {
    ui.changeState('add');
}