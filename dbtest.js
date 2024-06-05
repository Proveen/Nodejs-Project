const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware to parse JSON requests
app.use(bodyParser.json());
app.use(cors());

// Create MySQL connection
const db = mysql.createConnection({
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: '', // Add your MySQL password here
    database: 'examination_report' // Add your MySQL database name here
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
        return;
    }
    console.log('Connection to MySQL database successful...');
});

// Route to create a new student
app.post('/students', (req, res) => {
    const { student_name, department_id } = req.body;
    const sql = 'INSERT INTO students (student_name, department_id) VALUES (?, ?)';
    db.query(sql, [student_name, department_id], (err, result) => {
        if (err) {
            console.error('Error creating student: ', err);
            res.status(500).send('Error creating student');
            return;
        }
        console.log('New student added with ID: ', result.insertId); // Log the auto-generated student ID
        res.status(201).send('Student created successfully');
    });
});




// Route to read all students
app.get('/students', (req, res) => {
    const sql = 'SELECT * FROM students';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching students: ', err);
            res.status(500).send('Error fetching students');
            return;
        }
        console.log('List of students:');
        console.table(results);
        res.json(results);
    });
});

// Route to update a student
app.put('/students/:id', (req, res) => {
    const studentId = req.params.id;
    const { student_name, department_id } = req.body;
    const newData = { student_name, department_id };
    const sql = 'UPDATE students SET ? WHERE student_id = ?';
    db.query(sql, [newData, studentId], (err, result) => {
        if (err) {
            console.error('Error updating student: ', err);
            res.status(500).send('Error updating student');
            return;
        }
        console.log('Student updated successfully');
        res.send('Student updated successfully');
    });
});

// Route to fetch a student by ID
app.get('/students/:id', (req, res) => {
    const studentId = req.params.id;
    const sql = 'SELECT * FROM students WHERE student_id = ?';
    db.query(sql, studentId, (err, result) => {
        if (err) {
            console.error('Error fetching student details:', err);
            res.status(500).send('Error fetching student details');
            return;
        }
        if (result.length === 0) {
            // If no student with the specified ID is found, return 404 Not Found
            res.status(404).send('Student not found');
            return;
        }
        // Return the student details as JSON response
        res.json(result[0]);
    });
});



// Route to delete a student and associated grades
app.delete('/students/:id', (req, res) => {
    const studentId = req.params.id;
    const deleteGradesSql = 'DELETE FROM grades WHERE student_id = ?';
    db.query(deleteGradesSql, studentId, (err, result) => {
        if (err) {
            console.error('Error deleting grades:', err);
            res.status(500).send('Error deleting grades');
            return;
        }
        console.log('Grades deleted successfully');

        // Now delete the student record
        const deleteStudentSql = 'DELETE FROM students WHERE student_id = ?';
        db.query(deleteStudentSql, studentId, (err, result) => {
            if (err) {
                console.error('Error deleting student:', err);
                res.status(500).send('Error deleting student');
                return;
            }
            console.log('Student deleted successfully');
            res.send('Student and associated grades deleted successfully');
        });
    });
});



// API endpoint to fetch student marks
app.get('/api/studentMarks', (req, res) => {
    // Query the database to fetch student marks
    db.query('SELECT s.student_name, g.grade FROM students s INNER JOIN grades g ON s.student_id = g.student_id', (err, results) => {
        if (err) {
            console.error('Error fetching student marks:', err);
            res.status(500).json({ error: 'Error fetching student marks' });
            return;
        }

        // Send the fetched data as a JSON response
        res.json(results);
    });
});


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
