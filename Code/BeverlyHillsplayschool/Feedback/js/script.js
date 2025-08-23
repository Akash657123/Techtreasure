const scriptURL = "https://script.google.com/macros/s/AKfycbz0mKizhoBW4jnXFaLuWyaisE7xwzdOZAALu15wAUEEGR1D6ebv0v_XlOH5uu11g9kwHQ/exec";
let pendingDelete = null;

fetch(scriptURL)
  .then(response => response.json())
  .then(data => {
    const tbody = document.querySelector('#feedbackTable tbody');
    data.slice(1).forEach(row => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${row[1]}</td>
        <td>${row[2]}</td>
        <td>${row[3]}</td>
        <td>${row[4]}</td>
        <td>${row[5]}</td>
        <td>${row[6]}</td>
        <td>${row[7]}</td>
        <td>${row[8]}</td>
        <td>${row[9]}</td>
        <td><button onclick="deleteEntry('${row[1]}', '${row[2]}', this)">Delete</button></td>
      `;
      tbody.appendChild(tr);
    });
  });

function deleteEntry(studentName, teacherName, button) {
  pendingDelete = { studentName, teacherName, button };
  document.getElementById("confirmText").textContent =
    `Are you sure you want to delete feedback for ${studentName} (${teacherName})?`;
  document.getElementById("confirmModal").style.display = "block";
}

document.getElementById("confirmYes").onclick = function () {
  const { studentName, teacherName, button } = pendingDelete;
  fetch(scriptURL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ mode: "delete", studentName, teacherName })
  })
  .then(() => {
    button.closest('tr').remove();
    closeModal();
  })
  .catch(err => {
    console.error('Delete failed:', err);
    alert('Could not delete entry.');
    closeModal();
  });
};

document.getElementById("confirmNo").onclick = closeModal;

function closeModal() {
  document.getElementById("confirmModal").style.display = "none";
  pendingDelete = null;
}
