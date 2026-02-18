let students = [];

window.onload = function () {
    loadStudents();
};

async function loadStudents() {
    try {
        const response = await fetch('students.json');
        if (!response.ok) {
            throw new Error('Failed to load student data');
        }
        students = await response.json();
        renderTable();
    } catch (error) {
        showMessage(error.message, 'error');
    }
}

function renderTable() {
    const tableBody = document.querySelector("#studentTable tbody");
    tableBody.innerHTML = "";

    students.forEach((student, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.course}</td>
            <td>${student.marks}</td>
            <td>
                <button class="action-btn edit-btn" onclick="editStudent(${index})">Edit</button>
                <button class="action-btn delete-btn" onclick="deleteStudent(${index})">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function addStudent() {
    const id = document.getElementById("stuId").value;
    const name = document.getElementById("stuName").value;
    const course = document.getElementById("stuCourse").value;
    const marks = document.getElementById("stuMarks").value;

    if (!id || !name || !course || !marks) {
        showMessage("Please fill all fields", "error");
        return;
    }

    if (students.some(s => s.id === id)) {
        showMessage("Student ID already exists", "error");
        return;
    }

    const newStudent = { id, name, course, marks: parseInt(marks) };
    students.push(newStudent);
    renderTable();
    clearForm();
    showMessage("Student added successfully", "success");
}

function deleteStudent(index) {
    students.splice(index, 1);
    renderTable();
    showMessage("Student deleted successfully", "success");
}

function editStudent(index) {
    const student = students[index];
    document.getElementById("stuId").value = student.id;
    document.getElementById("stuId").disabled = true;
    document.getElementById("stuName").value = student.name;
    document.getElementById("stuCourse").value = student.course;
    document.getElementById("stuMarks").value = student.marks;

    document.querySelector("button[onclick='addStudent()']").style.display = 'none';
    document.getElementById("updateBtn").style.display = 'inline-block';
    document.getElementById("cancelBtn").style.display = 'inline-block';
}

function updateStudent() {
    const id = document.getElementById("stuId").value;
    const name = document.getElementById("stuName").value;
    const course = document.getElementById("stuCourse").value;
    const marks = document.getElementById("stuMarks").value;

    const index = students.findIndex(s => s.id === id);
    if (index === -1) {
        showMessage("Student not found", "error");
        return;
    }

    students[index] = { id, name, course, marks: parseInt(marks) };
    renderTable();
    cancelEdit();
    showMessage("Student updated successfully", "success");
}

function cancelEdit() {
    clearForm();
    document.getElementById("stuId").disabled = false;
    document.querySelector("button[onclick='addStudent()']").style.display = 'inline-block';
    document.getElementById("updateBtn").style.display = 'none';
    document.getElementById("cancelBtn").style.display = 'none';
}

function clearForm() {
    document.getElementById("stuId").value = "";
    document.getElementById("stuName").value = "";
    document.getElementById("stuCourse").value = "";
    document.getElementById("stuMarks").value = "";
}

function showMessage(msg, type) {
    const box = document.getElementById("messageBox");
    box.textContent = msg;
    box.style.display = 'block';
    box.style.backgroundColor = type === 'error' ? '#f8d7da' : '#d4edda';
    box.style.color = type === 'error' ? '#721c24' : '#155724';

    setTimeout(() => {
        box.style.display = 'none';
    }, 3000);
}
