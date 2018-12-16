class UI {
    constructor() {
        this.titleInput = document.querySelector("#title");
        this.bodyInput = document.querySelector("#body");
        this.idInput = document.querySelector("#id");
        this.notification = document.querySelector("#notification");
        this.submitBtn = document.querySelector(".post-submit");
        this.cancelBtn = document.querySelector("#cancelBtn");
        this.currentState = "add";
    }
    // Display the data
    displayData(data) {
        let output = '';

        data.forEach(post => {
            output += `
            <div class="post-container">
                <h4>${post.title}</h4>
                <p id="post-body">${post.body}</p>
                <br>
                <p id="creationDate"><em><strong>Post created</strong>: ${post.postDate}</p></em>
                <div class="controls">
                    <button id="updatePost" data-id=${post.id}><i class="material-icons">edit</i>Update</button>
                    <button id="deletePost" data-id=${post.id}><i class="material-icons">delete</i> Delete</button>
                </div>
            </div>
            `;
        })
        document.querySelector("#posts").innerHTML = output;
    }

    // Fill the form - for update state
    fillForm(data) {
        this.titleInput.value = data.title;
        this.bodyInput.value = data.body;
        this.idInput.value = data.id;

        // Change current state
        this.changeState('edit');     
    }

    // Clear the fields
    clearFields() {
        this.titleInput.value = "";
        this.bodyInput.value = "";
    }

    // Show notification
    showNotification(message, className) {
        this.notification.textContent = message;
        this.notification.classList = className;
        
        setTimeout(() => {
            this.notification.textContent = "";
            this.notification.className = "";
        }, 2500);
    }
    
    // Clear ID input
    clearIdInput() {
        this.idInput.value = "";
    }

    // Change current state
    changeState(state) {
        if(state === "edit") {
            this.currentState = state;
            this.submitBtn.textContent = "Edit post";
            this.cancelBtn.style.display = "block";
        } else {
            this.currentState = "add";
            this.submitBtn.textContent = "Post it";
            this.cancelBtn.style.display = "none";

            // Clear id from hidden field
            this.clearIdInput();

            // Clear fields
            this.clearFields();
        }
    }

}

export const ui = new UI();