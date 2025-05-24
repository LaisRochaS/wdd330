document.getElementById("contactForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  const formMessage = document.getElementById("formMessage");

  if (!name || !email || !message) {
    formMessage.style.color = "red";
    formMessage.textContent = "Please fill in all fields.";
    return;
  }

  formMessage.style.color = "green";
  formMessage.textContent = "Thanks for contacting us! We'll get back to you soon.";
  this.reset();
});

window.addEventListener('scroll', () => {
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  if (window.scrollY > 300) {
    scrollTopBtn.style.display = 'block';
  } else {
    scrollTopBtn.style.display = 'none';
  }
});

document.getElementById('scrollTopBtn').addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});
