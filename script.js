const mainDisplay = document.getElementById("main-display");
const addExerciseButton = document.getElementById("add-exercises");
const cancelButton = document.getElementById("cancel-button");
const restButton = document.querySelector(".rest-button");
const finishButton = document.querySelector(".finish-button");
const timeElapsed = document.querySelector(".time-elapsed");
const addSetButton = document.querySelector(".add-set-btn");
const stopwatch = document.querySelector(".time-elapsed");
stopwatch.textContent = "00:00";
let totalTimeElapsed = 0;
const formatTime = (time) => {
  return time >= 10 ? time : `0${time}`;
};
const updateTimeElapsed = () => {
  hours = Math.floor(totalTimeElapsed / 3600);
  minutes = Math.floor((totalTimeElapsed - hours * 60) / 60);
  seconds = Math.floor(totalTimeElapsed - hours * 3600 - minutes * 60);
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

function setTimer(
  time = 100,
  dialog = document.getElementById("rest-timer-dialog")
) {
  const timeRemaining = time;
  const timer = dialog.children[1];
  dialog.showModal();

  const updateTimer = () => {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining - minutes * 60;
    timer.textContent = `${minutes}:${seconds}`;

    if (timeRemaining == 0) {
      clearInterval(timeInterval);
      timer.textContent = `TIME'S UP!`;
    } else {
      timeRemaining--;
    }
  };
  const timeInterval = setInterval(updateTimer, 1000);
  updateTimer();
}

restButton.addEventListener("click", setTimer);

const commitTest = 69;
