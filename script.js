// JavaScript code to handle CRUD operations

function addStudent() {
    const studentName = document.getElementById('studentName').value;
    const departmentId = document.getElementById('departmentId').value;

    // Perform client-side validation
    if (!isNumeric(departmentId)) {
        // Display error message if department ID is not a number
        alert('Department ID must be a number');
        return;
    }

    // Construct the student object
    const student = {
        student_name: studentName,
        department_id: departmentId
    };

    // Perform AJAX request to add the student
    $.ajax({
        url: 'http://localhost:3000/students/',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(student),
        success: function(response) {
            // Refresh the student table
            getStudents();
            // Clear the form fields
            document.getElementById('studentName').value = '';
            document.getElementById('departmentId').value = '';
        },
        error: function(xhr, status, error) {
            console.error('Error adding student:', error);
        }
    });
}




// Function to edit a student
function editStudent(id) {
    // Perform AJAX request to fetch the student details by id
    $.ajax({
        url: `http://localhost:3000/students/${id}`, // Use id parameter
        type: 'GET',
        success: function(student) {
            // Populate the form fields with the selected student's details
            document.getElementById('studentName').value = student.student_name;
            document.getElementById('departmentId').value = student.department_id;
            // Change the form submission to call updateStudent function with the student id
            $('#studentForm').off('submit').submit(function(event) {
                event.preventDefault(); // Prevent default form submission
                updateStudent(id); // Call updateStudent function with the student id
            });
        },
        error: function(xhr, status, error) {
            console.error('Error fetching student details:', error);
        }
    });
}


function getStudents() {
    // Perform AJAX request to fetch all students
    $.ajax({
        url: 'http://localhost:3000/students/',
        type: 'GET',
        success: function(students) {
            console.log('Response:', students); // Log the response data

            // Clear the table body
            $('#studentTableBody').empty();

            // Populate the table with student data
            students.forEach(function(student) {
                console.log('Student:', student); // Log each student object
                
                // Display student data in table row
                $('#studentTableBody').append(`
                    <tr>
                        <td>${student.student_id}</td>
                        <td>${student.student_name}</td>
                        <td>${student.department_id}</td>
                        <td>
                            <button class="btn btn-sm btn-primary" onclick="editStudent(${student.student_id})">Edit</button>
                            <button class="btn btn-sm btn-danger" onclick="deleteStudent(${student.student_id})">Delete</button>
                        </td>
                    </tr>
                `);
            });
        },
        error: function(xhr, status, error) {
            console.error('Error fetching students:', error);
        }
    });
}

// Function to update a student
function updateStudent(id) {
    const studentName = document.getElementById('studentName').value;
    const departmentId = document.getElementById('departmentId').value;

    // Perform client-side validation
    if (!isNumeric(departmentId)) {
        // Display error message if department ID is not a number
        alert('Department ID must be a number');
        return;
    }

    // Construct the updated student object
    const student = {
        student_name: studentName,
        department_id: departmentId
    };

    // Perform AJAX request to update the student
    $.ajax({
        url: `http://localhost:3000/students/${id}`, // Use id parameter
        type: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify(student),
        success: function(response) {
            // Refresh the student table
            getStudents();
            // Clear the form fields
            document.getElementById('studentName').value = '';
            document.getElementById('departmentId').value = '';
        },
        error: function(xhr, status, error) {
            console.error('Error updating student:', error);
        }
    });
}

// Function to delete a student
function deleteStudent(id) {
    // Perform AJAX request to delete the student
    $.ajax({
        url: `http://localhost:3000/students/${id}`, // Use `id` parameter here
        type: 'DELETE',
        success: function(response) {
            // Refresh the student table
            getStudents();
        },
        error: function(xhr, status, error) {
            console.error('Error deleting student:', error);
        }
    });
}

// Function to check if a value is numeric
function isNumeric(value) {
    return !isNaN(parseFloat(value)) && isFinite(value);
}

// Document ready function
$(document).ready(function() {
    // Fetch all students when the page loads
    getStudents();

    // Submit student form on form submission
    $('#studentForm').submit(function(event) {
        event.preventDefault(); // Prevent default form submission
        addStudent(); // Call addStudent function
    });

    
});
