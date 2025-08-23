const form = document.getElementById('feedback-form');
const successMessage = document.getElementById('success');

form.addEventListener('submit', e => {
  e.preventDefault();

  // Collect form data
  const data = {
    studentName: form.studentName.value,
    teacherName: form.teacherName.value,
    subject: form.subject.value,
    communication: form.communication.value,
    behavior: form.behavior.value,
    punctuality: form.punctuality.value,
    clarity: form.clarity.value,
    overall: form.overall.value,
    comments: form.comments.value
  };

  // Send data to Google Apps Script Web App
  fetch('https://script.google.com/macros/s/AKfycbwOrHenOzhgWbwhuUbyazoXJddU-6dld7vD8VJJMl7aFRmHIGguUHRIOI4WmwFfy7Lc2Q/exec', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => response.text())
  .then(result => {
    console.log('Success:', result);

    // Show success message
    successMessage.style.display = 'block';

    // Reset form
    form.reset();

    // Hide success message after 3 seconds
    setTimeout(() => {
      successMessage.style.display = 'none';
    }, 3000);
  })
  .catch(error => {
    console.error('Error:', error);
    alert('There was a problem submitting the form. Please try again.');
  });
});
