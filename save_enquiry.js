const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.json());

app.post('/save_enquiry', (req, res) => {
    const { name, email, message } = req.body;
    const data = `Name: ${name}\nEmail: ${email}\nMessage: ${message}\n\n`;

    fs.appendFile(path.join(__dirname, 'enquiries.txt'), data, (err) => {
        if (err) {
            console.error('Error saving enquiry:', err);
            res.status(500).send('Error saving enquiry.');
        } else {
            res.send('Enquiry saved successfully!');
        }
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
