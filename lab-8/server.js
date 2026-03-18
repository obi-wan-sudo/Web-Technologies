const express = require('express');
const { exec } = require('child_process');
const path = require('path');

const app = express();
const PORT = 3000;

// Set default content type to plain text to avoid any GUI/HTML interpretation
app.use((req, res, next) => {
    res.type('text/plain');
    next();
});

app.get('/', (req, res) => {
    res.send('Lab 8 Express Server\nAvailable endpoints:\n/exercise1\n/exercise2\n/exercise3\n/all');
});

const runExercise = (file) => {
    return new Promise((resolve, reject) => {
        exec(`node ${file}`, { cwd: __dirname }, (error, stdout, stderr) => {
            if (error) {
                resolve(`Error execution ${file}:\n${error.message}`);
                return;
            }
            if (stderr) {
                resolve(`Stderr ${file}:\n${stderr}`);
                return;
            }
            resolve(`Output of ${file}:\n${stdout}`);
        });
    });
};

app.get('/exercise1', async (req, res) => {
    const output = await runExercise('exercise1.js');
    res.send(output);
});

app.get('/exercise2', async (req, res) => {
    const output = await runExercise('exercise2.js');
    res.send(output);
});

app.get('/exercise3', async (req, res) => {
    const output = await runExercise('exercise3.js');
    res.send(output);
});

app.get('/all', async (req, res) => {
    const out1 = await runExercise('exercise1.js');
    const out2 = await runExercise('exercise2.js');
    const out3 = await runExercise('exercise3.js');
    res.send(`${out1}\n${'-'.repeat(40)}\n\n${out2}\n${'-'.repeat(40)}\n\n${out3}`);
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log('Endpoints: /exercise1, /exercise2, /exercise3, /all');
});
