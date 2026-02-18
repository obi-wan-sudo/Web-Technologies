let xmlDoc;

window.onload = function () {
    loadBooks();
};

function loadBooks() {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            xmlDoc = this.responseXML;
            renderTable();
        }
    };
    xhr.open("GET", "books.xml", true);
    xhr.send();
}

function renderTable() {
    const tableBody = document.querySelector("#bookTable tbody");
    tableBody.innerHTML = "";

    const books = xmlDoc.getElementsByTagName("book");
    for (let i = 0; i < books.length; i++) {
        const book = books[i];
        const id = book.getElementsByTagName("id")[0].childNodes[0].nodeValue;
        const title = book.getElementsByTagName("title")[0].childNodes[0].nodeValue;
        const author = book.getElementsByTagName("author")[0].childNodes[0].nodeValue;
        const status = book.getElementsByTagName("availability")[0].childNodes[0].nodeValue;

        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${id}</td>
            <td>${title}</td>
            <td>${author}</td>
            <td class="${status === 'Available' ? 'status-available' : 'status-checked-out'}">${status}</td>
            <td>
                <button class="action-btn update-btn" onclick="toggleStatus(${i})">Toggle Status</button>
                <button class="action-btn delete-btn" onclick="deleteBook(${i})">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    }
}

function addBook() {
    const id = document.getElementById("bookId").value;
    const title = document.getElementById("bookTitle").value;
    const author = document.getElementById("bookAuthor").value;
    const status = document.getElementById("bookStatus").value;

    if (!id || !title || !author) {
        alert("Please fill all fields!");
        return;
    }

    // Check availability of ID
    const books = xmlDoc.getElementsByTagName("book");
    for (let i = 0; i < books.length; i++) {
        if (books[i].getElementsByTagName("id")[0].childNodes[0].nodeValue == id) {
            alert("Book ID already exists!");
            return;
        }
    }

    const newBook = xmlDoc.createElement("book");

    const newId = xmlDoc.createElement("id");
    newId.appendChild(xmlDoc.createTextNode(id));
    newBook.appendChild(newId);

    const newTitle = xmlDoc.createElement("title");
    newTitle.appendChild(xmlDoc.createTextNode(title));
    newBook.appendChild(newTitle);

    const newAuthor = xmlDoc.createElement("author");
    newAuthor.appendChild(xmlDoc.createTextNode(author));
    newBook.appendChild(newAuthor);

    const newStatus = xmlDoc.createElement("availability");
    newStatus.appendChild(xmlDoc.createTextNode(status));
    newBook.appendChild(newStatus);

    xmlDoc.getElementsByTagName("library")[0].appendChild(newBook);

    renderTable();
    clearInputs();
}

function deleteBook(index) {
    const books = xmlDoc.getElementsByTagName("book");
    const bookToDelete = books[index];
    bookToDelete.parentNode.removeChild(bookToDelete);
    renderTable();
}

function toggleStatus(index) {
    const books = xmlDoc.getElementsByTagName("book");
    const statusNode = books[index].getElementsByTagName("availability")[0];
    const currentStatus = statusNode.childNodes[0].nodeValue;
    statusNode.childNodes[0].nodeValue = currentStatus === "Available" ? "Checked Out" : "Available";
    renderTable();
}

function clearInputs() {
    document.getElementById("bookId").value = "";
    document.getElementById("bookTitle").value = "";
    document.getElementById("bookAuthor").value = "";
    document.getElementById("bookStatus").value = "Available";
}
