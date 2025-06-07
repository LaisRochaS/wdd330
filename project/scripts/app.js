const searchBooks = async () => {
  const query = document.getElementById("searchInput").value;
  const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
  const data = await response.json();
  displayBooks(data.items);
};

function displayBooks(books) {
  const results = document.getElementById("bookResults");
  results.innerHTML = "";

  books.forEach(book => {
    const info = book.volumeInfo;
    const bookCard = document.createElement("div");
    bookCard.className = "book-card";
    bookCard.innerHTML = `
      <img src="${info.imageLinks?.thumbnail || ''}" alt="${info.title}" />
      <h3>${info.title}</h3>
      <p>Author: ${info.authors?.join(', ')}</p>
      <p>${info.description?.substring(0, 100)}...</p>
    `;
    results.appendChild(bookCard);
  });
}
