let students = [];
let isEditing = false;

// Load students on page load
document.addEventListener("DOMContentLoaded", function () {
    loadStudents();
});

function loadStudents() {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            students = JSON.parse(this.responseText);
            renderTable();
        } else if (this.readyState == 4) {
            showMessage("Failed to load data", "error");
        }
    };
    xhr.open("GET", "students.json", true);
    xhr.send();
}

function renderTable() {
    const tbody = document.querySelector("#studentTable tbody");
    tbody.innerHTML = "";

    students.forEach((student, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.department}</td>
            <td>${student.marks}</td>
            <td>
                <button class="action-btn edit-btn" onclick="editStudent('${student.id}')"><i class="fas fa-edit"></i> Edit</button>
                <button class="action-btn delete-btn" onclick="deleteStudent('${student.id}')"><i class="fas fa-trash"></i> Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function addStudent() {
    const id = document.getElementById("stuId").value.trim();
    const name = document.getElementById("stuName").value.trim();
    const dept = document.getElementById("stuDept").value.trim();
    const marks = document.getElementById("stuMarks").value.trim();

    if (!id || !name || !dept || !marks) {
        showMessage("Please fill all fields", "error");
        return;
    }

    if (students.some(s => s.id === id)) {
        showMessage("Student ID already exists", "error");
        return;
    }

    const newStudent = { id, name, department: dept, marks: parseInt(marks) };
    students.push(newStudent); // simulating DB insert
    renderTable();
    clearForm();
    showMessage("Student added successfully", "success");
}

function deleteStudent(id) {
    if (confirm("Are you sure?")) {
        students = students.filter(s => s.id !== id); // split logic
        renderTable();
        showMessage("Student deleted successfully", "success");
    }
}

function editStudent(id) {
    const student = students.find(s => s.id === id);
    if (student) {
        document.getElementById("stuId").value = student.id;
        document.getElementById("stuId").disabled = true;
        document.getElementById("stuName").value = student.name;
        document.getElementById("stuDept").value = student.department;
        document.getElementById("stuMarks").value = student.marks;

        document.getElementById("submitBtn").style.display = "none";
        document.getElementById("updateBtn").style.display = "inline-block";
        document.getElementById("cancelBtn").style.display = "inline-block";
        isEditing = true;
    }
}

function updateStudent() {
    const id = document.getElementById("stuId").value;
    const name = document.getElementById("stuName").value;
    const dept = document.getElementById("stuDept").value;
    const marks = document.getElementById("stuMarks").value;

    const index = students.findIndex(s => s.id === id);
    if (index !== -1) {
        students[index] = { id, name, department: dept, marks: parseInt(marks) };
        renderTable();
        cancelEdit();
        showMessage("Student updated successfully", "success");
    } else {
        showMessage("Student not found", "error");
    }
}

function cancelEdit() {
    clearForm();
    document.getElementById("stuId").disabled = false;
    document.getElementById("submitBtn").style.display = "inline-block";
    document.getElementById("updateBtn").style.display = "none";
    document.getElementById("cancelBtn").style.display = "none";
    isEditing = false;
}

function clearForm() {
    document.getElementById("stuId").value = "";
    document.getElementById("stuName").value = "";
    document.getElementById("stuDept").value = "";
    document.getElementById("stuMarks").value = "";
}

function showMessage(msg, type) {
    const msgDiv = document.getElementById("message");
    msgDiv.textContent = msg;
    msgDiv.className = `message ${type}`;
    msgDiv.style.display = "block";
    setTimeout(() => {
        msgDiv.style.display = "none";
    }, 3000);
}
