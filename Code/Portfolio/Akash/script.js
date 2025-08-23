function toggleCard(card) {
  const list = card.querySelector('.cert-list');
  list.classList.toggle('expanded');
}

function filterCerts() {
  const input = document.getElementById('searchInput').value.toLowerCase();
  const cards = document.querySelectorAll('.cert-card');

  cards.forEach(card => {
    const items = card.querySelectorAll('li');
    let matchFound = false;

    items.forEach(item => {
      if (item.textContent.toLowerCase().includes(input)) {
        item.style.display = '';
        matchFound = true;
      } else {
        item.style.display = 'none';
      }
    });

    card.style.display = matchFound ? '' : 'none';
  });
}

document.querySelectorAll('.cert-list li').forEach(item => {
  item.addEventListener('click', () => {
    document.getElementById('modalTitle').textContent = item.textContent;
    document.getElementById('modalDetails').textContent = `Details about "${item.textContent}" will be shown here.`;
    document.getElementById('certModal').style.display = 'block';
  });
});

function closeModal() {
  document.getElementById('certModal').style.display = 'none';
}
