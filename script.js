// Initialize an array to store student data
let studentsData = [];

document.getElementById("marksForm").addEventListener("submit", function(event) {
    event.preventDefault();
    collectData();
    displayResults();
});

function generateStudentFields() {
    const count = parseInt(document.getElementById("studentCount").value);
    if (!count || count < 1) {
        alert("Please enter a valid number of students");
        return;
    }
    
    const form = document.getElementById("marksForm");
    const studentsContainer = document.getElementById("students");
    
    // Show the form
    form.style.display = "flex";
    
    // Clear existing fields
    studentsContainer.innerHTML = '';
    
    // Generate new fields
    for(let i = 0; i < count; i++) {
        addStudent();
    }
}

// Function to collect the input data
function collectData() {
    const studentEntries = document.querySelectorAll(".student-entry");
    studentsData = [];

    studentEntries.forEach(entry => {
        const student = {
            name: entry.querySelector(".student-name").value,
            regNumber: entry.querySelector(".reg-number").value,
            schoolSpec: entry.querySelector(".school-spec").value,
            subjectMarks: {
                subject1: parseInt(entry.querySelector(".subject1").value),
                subject2: parseInt(entry.querySelector(".subject2").value),
                subject3: parseInt(entry.querySelector(".subject3").value),
                subject4: parseInt(entry.querySelector(".subject4").value),
                subject5: parseInt(entry.querySelector(".subject5").value),
                subject6: parseInt(entry.querySelector(".subject6").value)
            }
        };

        studentsData.push(student);
    });
}

// Function to add a new student entry input field
function addStudent() {
    const studentDiv = document.createElement("div");
    studentDiv.classList.add("student-entry");

    studentDiv.innerHTML = `
        <label>Student Name:</label>
        <input type="text" class="student-name" required placeholder="Enter student name">
        <br>
        <label>Registration Number:</label>
        <input type="text" class="reg-number" required placeholder="Enter registration number">
        <br>
        <label>School with Specialization:</label>
        <input type="text" class="school-spec" required placeholder="Enter school and specialization">
        <br>
        <label>Subject 1:</label>
        <input type="number" class="subject1" required placeholder="Enter Subject 1 marks" min="0" max="100">
        <br>
        <label>Subject 2:</label>
        <input type="number" class="subject2" required placeholder="Enter Subject 2 marks" min="0" max="100">
        <br>
        <label>Subject 3:</label>
        <input type="number" class="subject3" required placeholder="Enter Subject 3 marks" min="0" max="100">
        <br>
        <label>Subject 4:</label>
        <input type="number" class="subject4" required placeholder="Enter Subject 4 marks" min="0" max="100">
        <br>
        <label>Subject 5:</label>
        <input type="number" class="subject5" required placeholder="Enter Subject 5 marks" min="0" max="100">
        <br>
        <label>Subject 6:</label>
        <input type="number" class="subject6" required placeholder="Enter Subject 6 marks" min="0" max="100">
    `;

    document.getElementById("students").appendChild(studentDiv);
}

// Function to check the result of each student
function displayResults() {
    let resultHTML = "";

    studentsData.forEach(student => {
        const failedSubjects = [];
        let status = "PASS";

        // Check if the student has failed any subject (marks < 40)
        Object.entries(student.subjectMarks).forEach(([subject, marks]) => {
            if (marks < 40) {
                failedSubjects.push(subject);
                status = "FAIL";
            }
        });

        // Display student results
        resultHTML += `
            <div class="student-result">
                <h3>Student Details:</h3>
                <p><strong>Name:</strong> ${student.name}</p>
                <p><strong>Registration Number:</strong> ${student.regNumber}</p>
                <p><strong>School & Specialization:</strong> ${student.schoolSpec}</p>
                <p><strong>Status:</strong> ${status}</p>
                <p><strong>Subject Marks:</strong></p>
                <ul>
                    ${Object.entries(student.subjectMarks).map(([subject, marks]) => 
                        `<li>${subject}: ${marks}</li>`).join('')}
                </ul>
                ${failedSubjects.length > 0 ? 
                    `<p class="failed">Failed subjects: ${failedSubjects.join(", ")}</p>` : 
                    '<p class="passed">Passed all subjects!</p>'}
            </div>
        `;
    });

    // Show the results on the page
    document.getElementById("results").innerHTML = resultHTML;
}
