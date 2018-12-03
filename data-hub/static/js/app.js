// Instantiate classes
const github = new Github();
const ui = new UI();

const form = document.querySelector("#form");
const searchUser = document.querySelector("#searchUser");

form.addEventListener("submit", (e) => {
    const theUser = searchUser.value;

    if(!theUser) {
        alert("Please enter a username")
    } else {
        github.getUser(theUser).then(data => {
            // Show the profile
            ui.displayData(data.profile);

            // Show the repos
            console.log(data.repos);
            ui.displayRepos(data.repos);
        })
    }

    e.preventDefault();
})

searchUser.addEventListener("keyup", ()=>{
    const theUser = searchUser.value;

    if(!theUser) {
        ui.clearData();
    }
})
