document.getElementById('username').addEventListener('keyup', checkAvailability);

let debounceTimer;

function checkAvailability() {
    const username = document.getElementById('username').value.trim();
    const feedback = document.getElementById('usernameFeedback');
    const submitBtn = document.getElementById('submitBtn');

    // Reset state
    feedback.textContent = '';
    feedback.className = 'feedback';
    submitBtn.disabled = true;

    if (username.length === 0) {
        return;
    }

    // Show loading
    feedback.innerHTML = '<span class="spinner"></span> Checking...';

    // Debounce
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
        performAjaxCheck(username);
    }, 500); // 500ms delay
}

function performAjaxCheck(username) {
    const feedback = document.getElementById('usernameFeedback');
    const submitBtn = document.getElementById('submitBtn');

    // Simulate network delay for realism
    setTimeout(() => {
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                const existingUsernames = JSON.parse(this.responseText);

                if (existingUsernames.includes(username)) {
                    feedback.innerHTML = '<i class="fas fa-times-circle"></i> Username already taken';
                    feedback.className = 'feedback error';
                    submitBtn.disabled = true;
                } else {
                    feedback.innerHTML = '<i class="fas fa-check-circle"></i> Username available';
                    feedback.className = 'feedback success';
                    submitBtn.disabled = false;
                }
            }
        };
        xhr.open("GET", "usernames.json", true);
        xhr.send();
    }, 500); // Simulate 500ms network latency
}
