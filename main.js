const myLibrary = [
  //   { id: 1, title: "a", author: "b", pages: 2, read: true, info: () => "xd" },
];
let libraryElement = document.getElementById("my-library");
let showFormButton = document.getElementById("show-add-book-form");
let addBookButton = document.getElementById("add-book");
let formDialog = document.getElementById("form-dialog");
let newBookForm = document.getElementById("new-book-form");

let titleInput = document.getElementById("title");
let authorInput = document.getElementById("author");
let pagesInput = document.getElementById("pages");
let readInput = document.getElementById("read");

showFormButton.addEventListener("click", () => {
  formDialog.showModal();
});

formDialog.addEventListener("close", () => {});

addBookButton.addEventListener("click", (event) => {
  if (newBookForm.checkValidity() == true) {
    addBookToLibrary(
      titleInput.value,
      authorInput.value,
      pagesInput.value,
      readInput.checked
    );
    titleInput.value = null;
    authorInput.value = null;
    pagesInput.value = null;
    readInput.checked = false;
    showMyLibrary();
    formDialog.close();
  }
});

function Book(title, author, pages, read) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function () {
    return `${this.title} by ${this.author}, ${pages} pages, ${
      this.read ? "already read" : "not read yet"
    }.`;
  };
  this.updateReadStatus = function () {
    this.read = !this.read;
  };
}

function addBookToLibrary(title, author, pages, read) {
  let newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
}

function showMyLibrary() {
  if (myLibrary.length === 0) {
    libraryElement.textContent = "No books yet.";
    return;
  }
  libraryElement.innerHTML = null;
  myLibrary.forEach((book) => {
    let bookWrapper = document.createElement("div");
    bookWrapper.classList = "book-card";
    let bookElement = document.createElement("p");
    bookElement.textContent = book.info();
    let removeBookButton = document.createElement("button");
    removeBookButton.textContent = "Delete";
    removeBookButton.addEventListener("click", (event) => {
      removeBookFromLibrary(book.id);
    });
    let changeReadStatusButton = document.createElement("button");
    changeReadStatusButton.textContent = book.read
      ? "Mark As Not Read Yet"
      : "Mark as Read";
    changeReadStatusButton.addEventListener("click", (event) => {
      updateBookReadStatus(book.id);
    });
    let actionsWrapper = document.createElement("div");
    actionsWrapper.classList = "actions-wrapper";
    actionsWrapper.append(changeReadStatusButton, removeBookButton);

    bookWrapper.append(bookElement, actionsWrapper);
    libraryElement.appendChild(bookWrapper);
  });
}

function removeBookFromLibrary(bookId) {
  myLibrary.splice(
    myLibrary.findIndex((book) => book.id === bookId),
    1
  );
  showMyLibrary();
}

function updateBookReadStatus(bookId) {
  myLibrary.find((book) => book.id === bookId).updateReadStatus();
  showMyLibrary();
}

showMyLibrary();
