import { auth, db } from './firebase-config.js';
import {
  ref,
  onValue,
  push,
  set
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
import{ clubs }
 from firebase.json;            
const clubId = "example-club-123";

const chatWindow = document.getElementById("chatWindow");
const input = document.getElementById("chatInput");

let currentUser = null;


function loadClubData() {
  const clubRef = ref(db, `clubs/${clubId}`);
  onValue(clubRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      document.getElementById("clubName").textContent = data.name;
      document.getElementById("clubDescription").textContent = data.description;

      if (data.currentBook) {
        document.getElementById("currentBook").innerHTML = `
          <h4>${data.currentBook.title}</h4>
          <p>by ${data.currentBook.author}</p>
        `;
      }

      const memberList = document.getElementById("memberList");
      memberList.innerHTML = "";
      if (data.members) {
        Object.values(data.members).forEach(member => {
          const li = document.createElement("li");
          li.textContent = member;
          memberList.appendChild(li);
        });
      }
    }
  });
}

function listenToMessages() {
  const messagesRef = ref(db, `clubs/${clubId}/messages`);
  onValue(messagesRef, (snapshot) => {
    chatWindow.innerHTML = "";
    const messages = snapshot.val();
    if (messages) {
      Object.values(messages).forEach(msg => {
        const p = document.createElement("p");
        p.innerHTML = `<strong>${msg.user}:</strong> ${msg.text}`;
        chatWindow.appendChild(p);
      });
      chatWindow.scrollTop = chatWindow.scrollHeight;
    }
  });
}

window.sendMessage = () => {
  const text = input.value.trim();
  if (!text || !currentUser) return;

  const messageRef = push(ref(db, `clubs/${clubId}/messages`));
  set(messageRef, {
    user: currentUser.displayName || currentUser.email,
    text,
    timestamp: Date.now()
  });

  input.value = "";
};

window.logout = () => {
  auth.signOut().then(() => {
    window.location.href = "index.html";
  });
};
