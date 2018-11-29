// Elements
const form = document.querySelector("#theForm");
const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const isbnInput = document.querySelector("#isbn");
const tableBody = document.querySelector("#table-body");
const notification = document.querySelector("#notification");

// Book
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

// UI
class UI {
    addBook(book) {
        // Create a row
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="delete-btn">X</a></td>
        `;

        tableBody.appendChild(row);
    };

    // Clear input fields
    clearFields() {
        titleInput.value = "";
        authorInput.value = "";
        isbnInput.value = "";
    }

    // Delete book
    deleteBook(target) {
        if(target.className === "delete-btn") {
            // Remove the target's parent element parent element --> delete the "table row" element
            target.parentElement.parentElement.remove();
        }
    }

    // Display notification
    notification(message, className) {
        notification.style.display = "block"
        notification.textContent = message;
        notification.classList.add(`${className}`, "active");
        console.log(notification);

        setTimeout(() => {
            notification.textContent = "";
            notification.style.display = "none";
            notification.classList.remove(`${className}`, "active");
            console.log(notification);
        }, 2000);
    }
}

// Store books in local storage
class Store {
    // Get the books from the local storage
    static getBooks() {
        let books = JSON.parse(localStorage.getItem("books")) || [];
        return books;
    };

    // Display the books from local storage
    static displayBooks() {
        const books = Store.getBooks();

        books.forEach(book => {
            const ui = new UI();

            ui.addBook(book);
         });
    };

    // Add the book to local storage
    static addBook(book) {
        const books = Store.getBooks();

        books.push(book);

        localStorage.setItem("books", JSON.stringify(books));
    }

    // Remove the book from local storage
    static removeBook(isbn) {
        const books = Store.getBooks();
        books.forEach((book, index) => {
            if(book.isbn === isbn) {
                books.splice(index, 1)
            }
        })

        localStorage.setItem("books", JSON.stringify(books));
    }
}

// Display saved books
document.addEventListener("DOMContentLoaded", Store.displayBooks)

// Submiting the form
form.addEventListener("submit", (e) => {
    const title = titleInput.value;
    const author = authorInput.value;
    const isbn = isbnInput.value;

    // Instantiate 
    const book = new Book(title, author, isbn);

    // Instantiate ui
    const ui = new UI();

    if(!title || !author || !isbn) {
        // If theres no input value in the fields, display a notification
        ui.notification("Please fill the form fields.", "error")
    } else {
        // Add a book to the table and display a notification
        ui.notification("Book added to the list.", "success")
        ui.addBook(book);

        // Add book to local storage
        Store.addBook(book);

        // Clear the input fields after submiting
        ui.clearFields();
    }

    e.preventDefault();
})

document.querySelector("#table-body").addEventListener("click", e => {
    // Instantiate ui
    const ui = new UI();

    // Delete the book from the table
    ui.deleteBook(e.target);

    // Remove the book from local storage
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

    e.preventDefault();
})

