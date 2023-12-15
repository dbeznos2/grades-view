let amountSemesters = 0;

function addSemester() {
  if (amountSemesters >= 8) {
    alert("You can't add more than 8 semesters.");
    return;
  }

  amountSemesters++;

  let templateSem = document
    .querySelector("#template_semester")
    .content.cloneNode(true);

  let divSem = document.querySelector(".div_sem");

  divSem.appendChild(templateSem);

  let sem = divSem.lastElementChild;
  setupSemester(sem);
}

function setupSemester(sem) {
  let semName = sem.querySelector("dt");
  semName.innerText = `Semester ${amountSemesters}`;

  let addNote = sem.querySelector("button");
  let noteInput = sem.querySelector("input");

  addNote.addEventListener(
    "click",
    handleAddNoteClick.bind(null, sem, noteInput),
  );
  noteInput.addEventListener(
    "keydown",
    handleNoteInputKeydown.bind(null, sem, noteInput),
  );
}

function handleAddNoteClick(sem, noteInput, event) {
  const noteValue = validateNoteInput(noteInput.value);
  if (noteValue !== null) {
    nouvelleNote(noteValue, sem);
    noteInput.value = "";
    calculateSemesterAverage(sem);
  }
}

function handleNoteInputKeydown(sem, noteInput, event) {
  if (event.key === "Enter") {
    const noteValue = validateNoteInput(noteInput.value);
    if (noteValue !== null) {
      nouvelleNote(noteValue, sem);
      noteInput.value = "";
      calculateSemesterAverage(sem);
    }
  }
}

function validateNoteInput(value) {
  const noteValue = parseFloat(value);
  if (isNaN(noteValue) || noteValue < 1 || noteValue > 6) {
    alert("Please enter a valid grade between 1 and 6.");
    return null;
  }
  return noteValue;
}

function nouvelleNote(note, semester) {
  let noteStock = semester.querySelector("dd > div");

  let templateDot = createTemplateClone(`#${selectDotColor(note)}-dot-svg`);
  let templateNote = createTemplateClone("#noteSpan");

  let span = templateNote.querySelector("span");
  span.textContent = note;

  let dot = templateDot.querySelector("svg");
  span.insertBefore(dot, span.firstChild);

  noteStock.appendChild(templateNote);
}

function calculateSemesterAverage(semester) {
  let allNotes = semester.querySelectorAll("dd > div:first-child > span");
  let total = 0;
  let count = 0;

  allNotes.forEach((note) => {
    const noteValue = parseFloat(note.textContent);
    if (!isNaN(noteValue) && noteValue >= 1 && noteValue <= 6) {
      total += noteValue;
      count++;
    }
  });

  const average = count === 0 ? 0 : total / count;

  const moyenneSpan = semester.querySelector(".Moyenne");

  let templateDot = createTemplateClone(`#${selectDotColor(average)}-dot-svg`);

  const dot = templateDot.querySelector("svg");
  moyenneSpan.textContent = "";
  moyenneSpan.appendChild(dot);

  const averageText = document.createTextNode(rounded(average, 0.5));
  moyenneSpan.appendChild(averageText);

  generalAverage();
}

function createTemplateClone(selector) {
  return document.querySelector(selector).content.cloneNode(true);
}

function rounded(num, pre) {
  return Math.round(num / pre) * pre;
}

function generalAverage() {
  let allSemAverage = document.querySelectorAll(".div_sem .Moyenne");
  let gradesTotal = 0;
  let semesterTotal = 0;

  allSemAverage.forEach((e) => {
    const note = Number(e.textContent);
    if (note > 0) {
      gradesTotal += note;
      semesterTotal++;
    }
  });

  const overallAverage = semesterTotal > 0 ? gradesTotal / semesterTotal : 0;

  const globalAverage = document.querySelector("#globalAverage");

  globalAverage.textContent = "";

  let templateDot = createTemplateClone(
    `#${selectDotColor(overallAverage)}-dot-svg`,
  );

  const dot = templateDot.querySelector("svg");
  globalAverage.appendChild(dot);

  const overallAverageText = document.createTextNode(
    rounded(overallAverage, 0.5),
  );
  globalAverage.appendChild(overallAverageText);
}

let addSemButton = document.querySelector("#add_sem");
addSemButton.addEventListener("click", function (event) {
  if (amountSemesters < 8) {
    addSemester();
  }
});

/*
simplifying dots
*/
function selectDotColor(value) {
  if (value < 4) return "red";
  if (value > 4) return "green";
  return "orange";
}
