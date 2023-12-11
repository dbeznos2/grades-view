let amountSemesters = 0;
let amountAverage = 0;

export function addSem() {
  console.log("function called");
  amountSemesters++;

  let templateSem = document
    .querySelector("#template_semester")
    .content.cloneNode(true);

  let divSem = document.querySelector(".div_sem");

  divSem.appendChild(templateSem);

  let sem = divSem.lastElementChild;

  let semName = sem.querySelector("dt");
  semName.innerText = "Semester " + amountSemesters;

  let addNote = sem.querySelector("button");
  let noteInput = sem.querySelector("input");

  addNote.addEventListener("click", function (event) {
    nouvelleNote(noteInput.value, sem);
    noteInput.value = "";
  });

  noteInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      nouvelleNote(noteInput.value, sem);
      noteInput.value = "";
    }
  });
}

function nouvelleNote(note, semestre) {
  console.log(note);

  let noteStock = semestre.querySelector("dd > div");

  let templateDot;
  if (note < 4) {
    templateDot = document
      .querySelector("#red-dot-svg")
      .content.cloneNode(true);
  } else if (note > 4) {
    templateDot = document
      .querySelector("#green-dot-svg")
      .content.cloneNode(true);
  } else {
    templateDot = document
      .querySelector("#orange-dot-svg")
      .content.cloneNode(true);
  }

  let templateNote = document
    .querySelector("#noteSpan")
    .content.cloneNode(true);

  let span = templateNote.querySelector("span");
  span.textContent = note;

  // Add the dot directly within the span without changing HTML
  let dot = templateDot.querySelector("svg");
  span.insertBefore(dot, span.firstChild);

  noteStock.appendChild(templateNote);
}

addSem();

let addSemButton = document.querySelector("#add_sem");
addSemButton.addEventListener("click", function (event) {
  if (amountSemesters < 8) {
    addSem();
  }
});
