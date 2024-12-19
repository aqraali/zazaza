const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// إعداد المسار الثابت لملفات HTML وCSS وJavaScript
app.use(express.static(path.join(__dirname, 'public')));

let complaints = [];
let moveRequests = [];

app.post('/submit-complaint', (req, res) => {
    const { fullName, address, mukhtarName, phoneNumber, complaint, complainantNames } = req.body;
    complaints.push(req.body);
    console.log('Received complaint:', req.body);
    res.json({ status: 'success' });
});

app.post('/submit-move-request', (req, res) => {
    const { fullName, surname, address, nearestLandmark, moveFrom, moveTo, phoneNumber } = req.body;
    moveRequests.push(req.body);
    console.log('Received move request:', req.body);
    res.json({ status: 'success' });
});

app.get('/dashboard', (req, res) => {
    res.send(`
        <html>
            <head>
                <title>لوحة التحكم</title>
                <style>
                    body { font-family: Arial, sans-serif; direction: rtl; text-align: right; }
                    h1, h2 { color: #333; }
                    ul { list-style-type: none; padding: 0; }
                    li { background: #f9f9f9; margin: 10px 0; padding: 10px; border: 1px solid #ddd; }
                </style>
            </head>
            <body>
                <h1>لوحة التحكم</h1>
                <h2>الشكاوى</h2>
                <ul>
                    ${complaints.map(complaint => `
                    <li>
                        <strong>الاسم الكامل:</strong> ${complaint.fullName}<br>
                        <strong>العنوان:</strong> ${complaint.address}<br>
                        <strong>اسم المختار:</strong> ${complaint.mukhtarName}<br>
                        <strong>رقم الهاتف:</strong> ${complaint.phoneNumber}<br>
                        <strong>الشكوى:</strong> ${complaint.complaint}<br>
                        <strong>أسماء المشتكين:</strong> ${complaint.complainantNames.join(', ')}
                    </li>
                    `).join('')}
                </ul>
                <h2>طلبات الانتقال</h2>
                <ul>
                    ${moveRequests.map(request => `
                    <li>
                        <strong>الاسم الكامل:</strong> ${request.fullName}<br>
                        <strong>اللقب:</strong> ${request.surname}<br>
                        <strong>العنوان:</strong> ${request.address}<br>
                        <strong>أقرب معلم:</strong> ${request.nearestLandmark}<br>
                        <strong>الانتقال من:</strong> ${request.moveFrom}<br>
                        <strong>الانتقال إلى:</strong> ${request.moveTo}<br>
                        <strong>رقم الهاتف:</strong> ${request.phoneNumber}
                    </li>
                    `).join('')}
                </ul>
            </body>
        </html>
    `);
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
