Student Management System
This project is a web-based Student Management System that allows users to manage student data, including adding, editing, and deleting student records. It also includes a visualization of student grades using charts.

Features
Add New Student: Allows users to add new student records with student name and department ID.
Edit Student: Users can edit existing student records.
Delete Student: Users can delete student records.
View Students: Displays a list of all students in a table format.
Grade Visualization: Displays student grades using various types of charts (pie chart, bar graph, doughnut chart).
Technologies Used
Frontend: HTML, CSS, Bootstrap, JavaScript, jQuery, Chart.js
Backend: Node.js, Express.js
Database: MySQL
Project Structure
index.html: Main HTML file containing the structure of the Student Management System.
style.css: Custom CSS file for styling the web application.
script.js: JavaScript file handling CRUD operations and dynamic content update.
server.js: Node.js server file managing API endpoints and database interactions.
piechart.html, barchart.html, doughnutchart.html: HTML files for rendering different types of charts using Chart.js.
Setup Instructions
Clone the repository:

bash
Copy code
git clone https://github.com/yourusername/student-management-system.git
Navigate to the project directory:

bash
Copy code
cd student-management-system
Install the dependencies:

Copy code
npm install
Set up the MySQL database:

Create a MySQL database named examination_report.
Import the SQL script to create the students and grades tables and insert sample data.
Configure the database connection:

Update the database configuration in server.js with your MySQL credentials.
Start the server:

Copy code
node server.js
Open the application:

Open index.html in your browser.
API Endpoints
Create Student: POST /students
Read Students: GET /students
Update Student: PUT /students/:id
Delete Student: DELETE /students/:id
Fetch Student Marks: GET /api/studentMarks
