const mainDisplay = document.getElementById("main-display");
const mainTitle = document.querySelector(".title");
const addExerciseButton = document.getElementById("add-exercises");
const cancelButton = document.getElementById("cancel-button");
const restButton = document.querySelector(".rest-button");
const finishButton = document.querySelector(".finish-button");
const timeElapsed = document.querySelector(".time-elapsed");
const addSetButton = document.querySelector(".add-set-btn");
const stopwatch = document.querySelector(".time-elapsed");
const timeDialog = document.getElementById("rest-timer-dialog");
const primaryDialog = document.querySelector("#primary-dialog");
const timer = document.querySelector("#time-display");
const xAttributes = {};

stopwatch.textContent = "00:00";
let totalTimeElapsed = 0;
const formatTime = (time) => {
  return time >= 10 ? time : `0${time}`;
};
const updateTimeElapsed = () => {
  let hours = Math.floor(totalTimeElapsed / 3600);
  let minutes = Math.floor((totalTimeElapsed - hours * 3600) / 60);
  let seconds = Math.floor(totalTimeElapsed - minutes * 60 - hours * 3600);
  if (hours != 0) {
    stopwatch.textContent = `${formatTime(hours)}:${formatTime(
      minutes
    )}:${formatTime(seconds)}`;
  } else {
    stopwatch.textContent = `${formatTime(minutes)}:${formatTime(seconds)}`;
  }

  totalTimeElapsed++;
};

const timeMaster = setInterval(updateTimeElapsed, 1000);

const exerciseList = [];
cancelButton.addEventListener("click", () => {
  mainDisplay.innerHTML = ``;
});

function showPrimaryDialog() {
  primaryDialog.showModal();
  primaryDialog.style.display = "flex";
}
showPrimaryDialog();
document
  .getElementById("dialog-form-submit")
  .addEventListener("click", (event) => {
    event.preventDefault();
    primaryDialog.close();
    primaryDialog.style.display = "none";
    let xname = document.getElementById("exercise-name-input").value;
    let xmins = document.getElementById("rest-minutes-input").value;
    let xsex = document.getElementById("rest-seconds-input").value;
    let xtime = xsex + xmins * 60;

    xAttributes.name = xname;
    xAttributes.time = xtime;
  });

class Exercise {
  constructor(name = "Placeholder", index) {
    this.exerciseName = name;
    this.index = index;
    this.sets = [
      {
        weight: 0,
        reps: 0,
        complete: false,
      },
    ];
    this.exerciseElement = document.createElement("div");
    this.containerElement = document.createElement("div");
  }
  create() {
    this.exerciseElement.classList.add("exercise");
    mainDisplay.appendChild(this.exerciseElement);
    const name = document.createElement("h3");
    name.classList.add("exercise-name");
    name.textContent = this.exerciseName;
    this.exerciseElement.appendChild(name);
    this.containerElement.classList.add("container");
    this.exerciseElement.appendChild(this.containerElement);
    this.containerElement.innerHTML = `
          <div class="container-header set-header">Set</div>

          <div class="container-header kg-header">Weight</div>

          <div class="container-header reps-header">Reps</div>

          <div class="container-header check-header">
            <i class="fas fa-check"></i>
          </div>`;
    addSet(this.containerElement);
    this.createAddSetBtn();
    this.createDeleteBtn();
  }
  createAddSetBtn() {
    const newButton = document.createElement("button");
    newButton.textContent = "Add Set";
    this.exerciseElement.insertBefore(newButton, this.containerElement);
    newButton.addEventListener("click", () => {
      addSet(this.containerElement);
    });
  }
  createDeleteBtn() {
    const newButton = document.createElement("button");
    newButton.textContent = "Delete";
    this.exerciseElement.insertBefore(newButton, this.containerElement);
    newButton.addEventListener("click", () => {
      this.exerciseElement.style.display = "none";
    });
  }
}

function addSet(target) {
  const newSet = document.createElement("div");
  newSet.classList.add("set");
  newSet.innerHTML = `
            <div class="set-number">1</div>

            <div class="kg-number">
              <input type="text" inputmode="numeric" name="kg" id="kg-number" />
            </div>

            <div class="reps-number">
              <input
                type="text"
                inputmode="numeric"
                name="reps"
                id="reps-number"
              />
            </div>

            <div class="check-set">
              <input type="checkbox" name="check-set" id="check-set" />
            </div>
          `;
  target.appendChild(newSet);
}
const addSetButtonEvent = (event) => {
  const target = event.target.parentElement.nextElementSibling;
  addSet(target);
};

addSetButton.addEventListener("click", addSetButtonEvent);

const createExercise = () => {
  const index = exerciseList.length + 1;
  const newExercise = new Exercise("Placeholder", index);
  exerciseList.push(newExercise);
  newExercise.create();
};

addExerciseButton.addEventListener("click", createExercise);

let isResting = false;
function setTimer(time = 60) {
  let timeRemaining = time;
  timeDialog.style.display = "flex";
  timeDialog.showModal();
  restButton.classList.add("resting");
  isResting = true;
  const updateTimer = () => {
    if (!isResting) {
      clearInterval(timeInterval);
      return;
    }
    let minutes = Math.floor(timeRemaining / 60);
    let seconds = timeRemaining - minutes * 60;
    timer.textContent = `${formatTime(minutes)}:${formatTime(seconds)}`;
    restButton.textContent = `${formatTime(minutes)}:${formatTime(seconds)}`;

    if (timeRemaining == 0) {
      clearInterval(timeInterval);
      timeDialog.style.display = "flex";
      timer.textContent = `TIME'S UP!`;
      restButton.textContent = `Rest`;
      restButton.classList.remove("resting");
      isResting = false;
    } else {
      timeRemaining--;
    }
  };
  const timeInterval = setInterval(updateTimer, 1000);
  updateTimer();
}
document.getElementById("cancel-rest-timer").onclick = unrest;

function unrest() {
  isResting = false;
  timeDialog.close();
  timeDialog.style.display = "none";
  restButton.textContent = "Rest";
  restButton.classList.remove("resting");
}

function restClicked() {
  const computedStyle = window.getComputedStyle(timeDialog);
  const displayType = computedStyle.display;
  if (!isResting) {
    setTimer();
  } else {
  }
}
restButton.addEventListener("click", restClicked);

const commitTest = 69;
