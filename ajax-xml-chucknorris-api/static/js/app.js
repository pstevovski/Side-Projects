const listTitle = document.querySelector("#jokes-list_title");
const jokesList = document.querySelector("#jokes-list");
const getJokes = document.querySelector("#getJokes");
const jokesNumber = document.querySelector("#jokesNumber");

getJokes.addEventListener("click", (e)=>{
    const xhr = new XMLHttpRequest();
    const number = jokesNumber.value;
    const url = `http://api.icndb.com/jokes/random/${number}`;
    let output = '';

    // GET data from the given URL, asynchronously
    xhr.open("GET", url, true);

    xhr.onload = () => {
        // Status 200 -> everything is ok
        if(xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);

            // For each value of the response, create a new list item
            response.value.forEach(joke => {
                output += `
                    <li>${joke.joke}</li>
                `;
            })

            // Display the output
            jokesList.innerHTML = output;
        } else {
            alert("There were some issues getting data from the API.")
        }
    }

    xhr.send();
    
    e.preventDefault();
})