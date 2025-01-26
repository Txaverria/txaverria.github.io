// Constants
const weeklyTasksContainer = document.getElementById("weekly-tasks-container");
const dailyTasksContainer = document.getElementById("daily-tasks-container");
const calendar = document.getElementById("calendar");
const message = document.getElementById("message");
const calendarMonth = document.getElementById("calendar-month");
const calendarYear = document.getElementById("calendar-year");

// Utility Functions
function getTodayDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function saveToLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function getFromLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}

// Utility function to check if a task is important
function checkIfImportant(text) {
  return (
    text.includes("[important]") ||
    text.includes("[importante]") ||
    text.includes("[imp]") ||
    text.includes("*") ||
    /\bimp\b/i.test(text)
  );
}

// Task Management
function createTaskElement(container, text, completed = false, isDaily = false, completionDate = null) {
  const taskDiv = document.createElement("div");
  taskDiv.className = `task ${completed ? "completed" : ""}`;
  if (isDaily) {
    taskDiv.dataset.completionDate = completionDate; // Restore the completion date
  }

  // Initial check for importance
  const isImportant = checkIfImportant(text);

  taskDiv.innerHTML = `
    <input type="checkbox" ${completed ? "checked" : ""}>
    <textarea class="task-input" rows="1" style="color: ${isImportant ? "#f38ba8" : "#cdd6f4"}">${text}</textarea>
    <span class="trash-icon"><i class="bi bi-x-lg"></i></span>
  `;

  const taskInput = taskDiv.querySelector(".task-input");
  const checkbox = taskDiv.querySelector("input[type='checkbox']");

  // Adjust textarea height dynamically
  const adjustHeight = () => {
    taskInput.style.height = "auto"; // Reset height
    taskInput.style.height = `${taskInput.scrollHeight}px`; // Adjust height
  };
  requestAnimationFrame(adjustHeight);

  taskInput.addEventListener("input", adjustHeight);

  window.addEventListener("resize", adjustHeight);

  // Save tasks on blur
  taskInput.addEventListener("blur", () => saveTasks(container));

  // Handle checkbox change
  checkbox.addEventListener("change", () => {
    taskDiv.classList.toggle("completed");
    if (isDaily) {
      if (checkbox.checked) {
        taskDiv.dataset.completionDate = getTodayDate();
      } else {
        taskDiv.dataset.completionDate = null;
      }
      checkDailyCompletion();
    }

    saveTasks(container);
  });

  // Remove task on trash icon click
  taskDiv.querySelector(".trash-icon").addEventListener("click", () => {
    taskDiv.remove();
    saveTasks(container);
    if (isDaily) checkDailyCompletion();
  });

  // Prevent new lines in textarea
  taskInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      taskInput.blur();
    }
  });

  // Update importance and text color on input change
  taskInput.addEventListener("input", () => {
    const isImportant = checkIfImportant(taskInput.value);
    taskInput.style.color = isImportant ? "#f38ba8" : "#cdd6f4";
  });

  window.addEventListener("resize", adjustHeight);

  container.appendChild(taskDiv);
  saveTasks(container);
}

function saveTasks(container) {
  const tasks = [...container.querySelectorAll(".task")].map((taskDiv) => ({
    text: taskDiv.querySelector("textarea").value,
    completed: taskDiv.querySelector("input[type='checkbox']").checked,
    completionDate: taskDiv.dataset.completionDate || null,
  }));
  saveToLocalStorage(container.id, tasks);
}

function loadTasks(container, isDaily = false) {
  const tasks = getFromLocalStorage(container.id);
  tasks.forEach(({ text, completed, completionDate }) => {
    if (isDaily) {
      // Reset task only if it's marked completed but the completionDate is not today
      if (completed && completionDate !== getTodayDate()) {
        completed = false;
        completionDate = null;
      }
    }
    createTaskElement(container, text, completed, isDaily, completionDate); // Pass the completionDate
  });
}

// Update the static counter
function updateCounter(counter) {
  const counterValue = document.getElementById("counter-value");
  const counterNormalText = document.querySelector(".counter-normal-text");
  counterValue.textContent = counter;

  // Update the text based on the counter value
  if (counter === 1) {
    counterNormalText.textContent = "day with all dailies completed.";
  } else {
    counterNormalText.textContent = "days with all dailies completed.";
  }
}

// Show congratulatory message
// Update the showMessage function
function showMessage() {
  const messageContainer = document.querySelector(".message-container");
  const message = document.getElementById("message");

  message.innerHTML = `
    <div class="message-title-container">
      <span class="message-title">Congratulations!</span>
    </div>
    <p class="message-paragraph">
      <strong>I'm so proud of you!</strong> <br />
      Keep it up and don't be too hard on yourself if you don't achieve everything in a day.
    </p>`;

  // Show the message container
  messageContainer.classList.add("visible");

  // Hide the message after 7 seconds
  setTimeout(() => {
    messageContainer.classList.remove("visible");
  }, 6000);
}

// Daily Completion Logic
function checkDailyCompletion() {
  const tasks = dailyTasksContainer.querySelectorAll(".task");
  const allCompleted = tasks.length > 0 && [...tasks].every((task) => task.querySelector("input[type='checkbox']").checked);

  if (allCompleted) {
    const todayDate = getTodayDate();
    const completedDays = getFromLocalStorage("completedDays");

    // Find the entry for today
    const todayEntry = completedDays.find((entry) => entry.date === todayDate);

    if (!todayEntry) {
      // If today hasn't been marked as completed before, add it to the list
      completedDays.push({ date: todayDate, alreadyMarked: true });
      saveToLocalStorage("completedDays", completedDays);

      // Increment the counter
      const counter = (parseInt(localStorage.getItem("completionCounter")) || 0) + 1;
      localStorage.setItem("completionCounter", counter);

      // Update the static counter
      updateCounter(counter);

      // Trigger confetti and show message
      createConfetti();
      showMessage();
      markCalendarDay(new Date().getDate());
    } else if (!todayEntry.alreadyMarked) {
      // If today has been marked as completed before but not counted, update the flag
      todayEntry.alreadyMarked = true;
      saveToLocalStorage("completedDays", completedDays);

      // Increment the counter
      const counter = parseInt(localStorage.getItem("completionCounter")) || 0;
      localStorage.setItem("completionCounter", counter);

      // Update the static counter
      updateCounter(counter);

      // Trigger confetti and show message
      createConfetti();
      showMessage();
      markCalendarDay(new Date().getDate());
    }
  } else {
    resetCompletionForToday();
  }
}

// Calendar Functions
function generateCalendar() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDay = firstDay.getDay();

  calendarMonth.textContent = new Intl.DateTimeFormat("en-US", { month: "long" }).format(today);
  calendarYear.textContent = year;

  // Clear the calendar
  calendar.innerHTML = `
        <div class="calendar-title">
            <span class="calendar-month">${calendarMonth.textContent}</span>
            <span>${year}</span>
        </div>
    `;

  // Add the days of the week (Sun, Mon, Tue, etc.)
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  daysOfWeek.forEach((day) => {
    const dayElement = document.createElement("div");
    dayElement.className = "calendar-day-of-week";
    dayElement.textContent = day;
    calendar.appendChild(dayElement);
  });

  // Add empty days for the first week
  for (let i = 0; i < startingDay; i++) {
    calendar.appendChild(document.createElement("div")).className = "calendar-day empty";
  }

  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const dayElement = document.createElement("div");
    dayElement.className = "calendar-day";
    dayElement.textContent = day;
    dayElement.setAttribute("data-day", day);
    calendar.appendChild(dayElement);
  }

  // Mark completed days
  const completedDays = getFromLocalStorage("completedDays");
  completedDays.forEach((entry) => {
    const [year, month, day] = entry.date.split("-");
    if (parseInt(year) === today.getFullYear() && parseInt(month) === today.getMonth() + 1) {
      markCalendarDay(parseInt(day));
    }
  });
}
function markCalendarDay(day) {
  const calendarDay = document.querySelector(`.calendar-day[data-day="${day}"]`);
  if (calendarDay) calendarDay.classList.add("completed");
}

function resetCompletionForToday() {
  const today = new Date().getDate();
  const calendarDay = document.querySelector(`.calendar-day[data-day="${today}"]`);
  if (calendarDay) calendarDay.classList.remove("completed");

  const completedDays = getFromLocalStorage("completedDays");
  const todayDate = getTodayDate();
  const updatedCompletedDays = completedDays.map((entry) => {
    if (entry.date === todayDate) {
      return { ...entry, alreadyMarked: false }; // Reset the flag but keep the date
    }
    return entry;
  });
  saveToLocalStorage("completedDays", updatedCompletedDays);
}

// Confetti Animation
function createConfetti() {
  const confettiCount = 100;
  for (let i = 0; i < confettiCount; i++) {
    const confetti = document.createElement("div");
    confetti.className = "confetti";
    confetti.style.left = `${Math.random() * 100}vw`;
    confetti.style.animationDelay = `${Math.random() * 2}s`;
    confetti.style.animationDuration = `${2 + Math.random() * 3}s`;
    document.body.appendChild(confetti);

    confetti.addEventListener("animationend", () => confetti.remove());
  }
}

// Initialize the counter on page load
function initializeCounter() {
  const counter = parseInt(localStorage.getItem("completionCounter")) || 0;
  updateCounter(counter);
}

// Event Listeners
// Function to adjust the height of a textarea
const adjustTextareaHeight = (textarea) => {
  textarea.style.height = "auto"; // Reset height
  textarea.style.height = `${textarea.scrollHeight}px`; // Adjust height
};

// Function to handle the "Enter" key for task creation
const handleEnterKey = (e, container, isDaily = false) => {
  if (e.key === "Enter") {
    if (e.target.value.trim() === "") {
      e.preventDefault(); // Prevent newline if the textarea is empty
    } else if (!e.shiftKey) {
      e.preventDefault(); // Prevent newline if Shift is not pressed
      createTaskElement(container, e.target.value.trim(), false, isDaily);
      e.target.value = "";
      if (isDaily) resetCompletionForToday();
      adjustTextareaHeight(e.target); // Adjust height after clearing the textarea
    }
    // Allow newline if Shift + Enter is pressed and the textarea is not empty
  }
};

// Add event listeners for the weekly task input
const weeklyTaskInput = document.getElementById("weekly-task-input");
weeklyTaskInput.addEventListener("keydown", (e) => handleEnterKey(e, weeklyTasksContainer));
weeklyTaskInput.addEventListener("input", (e) => adjustTextareaHeight(e.target));
window.addEventListener("resize", () => adjustTextareaHeight(weeklyTaskInput));

// Add event listeners for the daily task input
const dailyTaskInput = document.getElementById("daily-task-input");
dailyTaskInput.addEventListener("keydown", (e) => handleEnterKey(e, dailyTasksContainer, true));
dailyTaskInput.addEventListener("input", (e) => adjustTextareaHeight(e.target));
window.addEventListener("resize", () => adjustTextareaHeight(dailyTaskInput));

// Initialize
loadTasks(weeklyTasksContainer);
loadTasks(dailyTasksContainer, true);
generateCalendar();
initializeCounter(); // Initialize the counter on page load
