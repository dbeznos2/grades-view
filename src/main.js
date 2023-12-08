let amountSemesters = 0;
let amountAverage = 0;

export function addSem() {

    amountSemesters ++;

    let templateSem = document.querySelector("#template_semester").content.cloneNode(true);

    let divSem = document.querySelector(".div_sem")

    divSem.appendChild(templateSem)

}

addSem()