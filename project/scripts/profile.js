import { auth, db } from './firebase-config.js';
import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js';
import { ref, onValue } from 'https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js';

const userName = document.getElementById("userName");
const userEmail = document.getElementById("userEmail");


function loadReadingList(uid) {
  const statuses = ['wantToRead', 'currentlyReading', 'finishedReading'];

  statuses.forEach(status => {
    const listRef = ref(db, `users/${uid}/readingLists/${status}`);
    const listElement = document.querySelector(`#${status} ul`);

    onValue(listRef, snapshot => {
      listElement.innerHTML = "";
      const books = snapshot.val();
      if (books) {
        Object.values(books).forEach(book => {
          const li = document.createElement('li');
          li.textContent = `${book.title} by ${book.author}`;
          listElement.appendChild(li);
        });
      } else {
        listElement.innerHTML = "<li>No books yet.</li>";
      }
    });
  });
}

function loadUserReviews(uid) {
  const reviewsRef = ref(db, `users/${uid}/reviews`);
  const container = document.getElementById("userReviews");

  onValue(reviewsRef, snapshot => {
    container.innerHTML = "";
    const reviews = snapshot.val();
    if (reviews) {
      Object.values(reviews).forEach(review => {
        const div = document.createElement("div");
        div.className = "review-item";
        div.innerHTML = `
          <h4>${review.bookTitle}</h4>
          <p><strong>Rating:</strong> ${review.rating} ⭐</p>
          <p>${review.text}</p>
        `;
        container.appendChild(div);
      });
    } else {
      container.innerHTML = "<p>You haven't written any reviews yet.</p>";
    }
  });
}

window.logout = () => {
  auth.signOut().then(() => {
    window.location.href = "index.html";
  });
};
