document.addEventListener('DOMContentLoaded', () => {
  const searchBtn = document.getElementById('searchBtn');
  const searchInput = document.getElementById('searchInput');

  searchBtn.addEventListener('click', () => {
    const query = searchInput.value.trim();
    if (query) {
      // Redirect to search results page with query parameter
      window.location.href = `/search.html?q=${encodeURIComponent(query)}`;
    } else {
      alert('Please enter a product to search for.');
    }
  });
});
