let employees = [];

// Load XML data on page load
window.onload = function() {
    loadXML();
};

function loadXML() {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            parseXML(this);
        }
    };
    xhr.open("GET", "employees.xml", true);
    xhr.send();
}

function parseXML(xml) {
    const xmlDoc = xml.responseXML;
    const empNodes = xmlDoc.getElementsByTagName("employee");
    
    employees = []; // Reset local array
    for (let i = 0; i < empNodes.length; i++) {
        const emp = {
            id: empNodes[i].getElementsByTagName("id")[0].childNodes[0].nodeValue,
            name: empNodes[i].getElementsByTagName("name")[0].childNodes[0].nodeValue,
            department: empNodes[i].getElementsByTagName("department")[0].childNodes[0].nodeValue,
            salary: empNodes[i].getElementsByTagName("salary")[0].childNodes[0].nodeValue
        };
        employees.push(emp);
    }
    renderTable();
}

function renderTable() {
    const tableBody = document.querySelector("#employeeTable tbody");
    tableBody.innerHTML = "";
    
    employees.forEach((emp, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${emp.id}</td>
            <td>${emp.name}</td>
            <td>${emp.department}</td>
            <td>${emp.salary}</td>
            <td>
                <button class="delete-btn" onclick="deleteEmployee(${index})">Delete</button>
                <button class="update-btn" onclick="editEmployee(${index})">Edit</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function addEmployee() {
    const id = document.getElementById("empId").value;
    const name = document.getElementById("empName").value;
    const dept = document.getElementById("empDept").value;
    const salary = document.getElementById("empSalary").value;

    if (!id || !name || !dept || !salary) {
        showMessage("Please fill all fields", "error");
        return;
    }

    // Check if ID already exists
    if (employees.some(e => e.id === id)) {
        showMessage("Employee ID already exists", "error");
        return;
    }

    const newEmp = { id, name, department: dept, salary };
    employees.push(newEmp);
    renderTable();
    clearForm();
    showMessage("Employee added successfully", "success");
}

function deleteEmployee(index) {
    employees.splice(index, 1);
    renderTable();
    showMessage("Employee deleted successfully", "success");
}

function editEmployee(index) {
    const emp = employees[index];
    document.getElementById("empId").value = emp.id;
    document.getElementById("empId").disabled = true; // ID cannot be changed during edit usually, or we can allow it. Let's disable for simplicity of tracking.
    document.getElementById("empName").value = emp.name;
    document.getElementById("empDept").value = emp.department;
    document.getElementById("empSalary").value = emp.salary;
    
    // Change Add button to Update mode conceptually, or just use a separate Update button in UI.
    // I added an Update button in HTML, initially visible. Let's make it smarter.
    // Ideally we should toggle visibility.
    // For now, the user can click 'Update Employee' which reads the ID and updates.
}

function updateEmployee() {
    const id = document.getElementById("empId").value;
    const name = document.getElementById("empName").value;
    const dept = document.getElementById("empDept").value;
    const salary = document.getElementById("empSalary").value;

    const index = employees.findIndex(e => e.id === id);
    if (index === -1) {
        showMessage("Employee not found to update", "error");
        return;
    }

    employees[index] = { id, name, department: dept, salary };
    renderTable();
    clearForm();
    document.getElementById("empId").disabled = false;
    showMessage("Employee updated successfully", "success");
}

function clearForm() {
    document.getElementById("empId").value = "";
    document.getElementById("empName").value = "";
    document.getElementById("empDept").value = "";
    document.getElementById("empSalary").value = "";
    document.getElementById("empId").disabled = false;
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
