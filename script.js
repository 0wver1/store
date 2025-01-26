// Update navigation functionality
document.querySelectorAll('.nav-button').forEach(button => {
    button.addEventListener('click', () => {
        document.querySelector('.nav-button.active').classList.remove('active');
        button.classList.add('active');
        document.querySelector('section:not([style*="display: none"])').style.display = 'none';
        document.getElementById(button.dataset.target + '-section').style.display = 'block';
    });
});

// Timer Functionality
let timer;
let timerActive = false;
let totalSeconds = 0;
document.getElementById('timer-start').addEventListener('click', startTimer);
document.getElementById('timer-stop').addEventListener('click', stopTimer);
document.getElementById('timer-reset').addEventListener('click', resetTimer);

function startTimer() {
    if (timerActive) return;
    
    if (totalSeconds === 0) {
        const hours = parseInt(document.getElementById('timer-hours').value) || 0;
        const minutes = parseInt(document.getElementById('timer-minutes').value) || 0;
        const seconds = parseInt(document.getElementById('timer-seconds').value) || 0;
        
        totalSeconds = (hours * 3600) + (minutes * 60) + seconds;
        
        if (totalSeconds <= 0) return;
    }

    timerActive = true;
    toggleTimerButtons(true);
    
    const inputs = document.querySelectorAll('#timer-hours, #timer-minutes, #timer-seconds');
    inputs.forEach(input => input.disabled = true);

    timer = setInterval(() => {
        if (totalSeconds <= 0) {
            clearInterval(timer);
            alert('Timer Completed!');
            timerActive = false;
            toggleTimerButtons(false);
            resetTimerInputs();
            inputs.forEach(input => input.disabled = false);
            return;
        }
        totalSeconds--;
        updateTimerDisplay();
    }, 1000);
}

function stopTimer() {
    clearInterval(timer);
    timerActive = false;
    toggleTimerButtons(false);
}

function resetTimer() {
    clearInterval(timer);
    timerActive = false;
    totalSeconds = 0;
    resetTimerInputs();
    document.getElementById('timer-display').textContent = '00:00:00';
    toggleTimerButtons(false);
    const inputs = document.querySelectorAll('#timer-hours, #timer-minutes, #timer-seconds');
    inputs.forEach(input => input.disabled = false);
    if (progressBar) {
        progressBar.style.strokeDashoffset = timerCircumference;
    }
}

function updateTimerDisplay() {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    document.getElementById('timer-display').textContent = 
        `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function resetTimerInputs() {
    document.getElementById('timer-hours').value = '';
    document.getElementById('timer-minutes').value = '';
    document.getElementById('timer-seconds').value = '';
}

function toggleTimerButtons(running) {
    document.getElementById('timer-stop').disabled = !running;
    document.getElementById('timer-start').disabled = running;
}

// Stopwatch Functionality
let stopwatchRunning = false;
let startTime;
let elapsedTime = 0;
let timerInterval;

document.getElementById('stopwatch-start').addEventListener('click', toggleStopwatch);
document.getElementById('stopwatch-stop').addEventListener('click', stopStopwatch);
document.getElementById('stopwatch-reset').addEventListener('click', resetStopwatch);

function toggleStopwatch() {
    if (!stopwatchRunning) {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateStopwatch, 10);
        document.getElementById('stopwatch-start').textContent = 'Pause';
        toggleStopwatchButtons(true);
    } else {
        clearInterval(timerInterval);
        document.getElementById('stopwatch-start').textContent = 'Resume';
        toggleStopwatchButtons(false);
    }
    stopwatchRunning = !stopwatchRunning;
}

function stopStopwatch() {
    clearInterval(timerInterval);
    stopwatchRunning = false;
    elapsedTime = 0;
    document.getElementById('stopwatch-display').textContent = '00:00:00.00';
    document.getElementById('stopwatch-start').textContent = 'Start';
    toggleStopwatchButtons(false);
}

function resetStopwatch() {
    clearInterval(timerInterval);
    stopwatchRunning = false;
    elapsedTime = 0;
    document.getElementById('stopwatch-display').textContent = '00:00:00.00';
    document.getElementById('stopwatch-start').textContent = 'Start';
    toggleStopwatchButtons(false);
}

function updateStopwatch() {
    elapsedTime = Date.now() - startTime;
    document.getElementById('stopwatch-display').textContent = formatStopwatchTime(elapsedTime);
}

function formatStopwatchTime(ms) {
    const date = new Date(ms);
    return date.toISOString().substr(11, 8) + '.' + Math.floor(ms % 1000 / 10).toString().padStart(2, '0');
}

function toggleStopwatchButtons(running) {
    // Removed reference to non-existent lap button
    document.getElementById('stopwatch-stop').disabled = !running;
}

// Tasks Functionality
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

document.getElementById('task-add').addEventListener('click', addTask);
document.getElementById('task-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});

function addTask() {
    const taskInput = document.getElementById('task-input');
    const text = taskInput.value.trim();
    if (text) {
        tasks.push({ text, completed: false });
        taskInput.value = '';
        saveTasks();
        renderTasks();
    }
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';
    
    tasks.forEach((task, index) => {
        const taskItem = document.createElement('li');
        taskItem.className = 'task-item';
        taskItem.innerHTML = `
            <input type="checkbox" 
                   ${task.completed ? 'checked' : ''} 
                   onchange="toggleTask(${index})">
            <span class="task-text ${task.completed ? 'completed' : ''}">${task.text}</span>
            <button class="btn btn-icon" onclick="deleteTask(${index})">
                <i class="fas fa-trash"></i>
            </button>
        `;
        taskList.appendChild(taskItem);
    });
}

// Theme Toggle
document.getElementById('theme-toggle').addEventListener('click', toggleTheme);

function toggleTheme() {
    const isDark = document.body.classList.toggle('dark-theme');
    const themeIcon = document.getElementById('theme-toggle').querySelector('i');
    themeIcon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    
    // Update CSS variables
    const root = document.documentElement;
    if (isDark) {
        root.style.setProperty('--bg-color', '#000');
        root.style.setProperty('--text-color', '#fff');
        root.style.setProperty('--card-bg-color', 'rgba(28, 28, 30, 0.85)');
    } else {
        root.style.setProperty('--bg-color', '#f9f9f9');
        root.style.setProperty('--text-color', '#000');
        root.style.setProperty('--card-bg-color', 'rgba(255, 255, 255, 0.85)');
    }
}

// Initialize theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
    document.querySelector('#theme-toggle i').className = 'fas fa-sun';
}

// Initial Render
renderTasks();
