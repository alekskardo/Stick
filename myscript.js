let count = Number(window.localStorage.getItem("count"));
if (!count) {
  window.localStorage.setItem("count", "0");
}

function createNote(noteTitle, noteBody) {
  document.getElementById("no-notes").classList.add("hidden");

  let li = document.createElement("li");
  let a = document.createElement("a");
  let h2 = document.createElement("h2");
  let p = document.createElement("p");
  let xButton = document.createElement("Button");

  xButton.classList.add("delete");
  let xText = document.createTextNode("X");
  let h2TN = document.createTextNode(noteTitle);
  let pTN = document.createTextNode(noteBody);

  h2.appendChild(h2TN);
  p.appendChild(pTN);
  xButton.appendChild(xText);

  a.append(h2, p, xButton);
  a.setAttribute("href", "#");

  li.appendChild(a);

  document.getElementById("notes").appendChild(li);
}

function createNoteFromInput(e) {
  e.preventDefault();

  let noteTitle = document.getElementById("new-note-title-input").value;
  let noteBody = document.getElementById("new-note-body-input").value;

  document.getElementById("new-note-title-input").value = "";
  document.getElementById("new-note-body-input").value = "";

  count += 1;
  window.localStorage.setItem("count", count);
  window.localStorage.setItem(noteTitle, noteBody);
  createNote(noteTitle, noteBody);
}

function removeItem(e) {
  if (e.target.classList.contains("delete")) {
    if (confirm("Are you sure you wanna delete the note?")) {
      let li = e.target.parentElement.parentElement;
      let ul = document.getElementById("notes");

      ul.removeChild(li);
    }
  }
  count -= 1;
  if (count < 1) {
    document.getElementById("no-notes").className = "";
  }
}

for (i = 0; i < count + 1; i++) {
  let noteTitle = window.localStorage.key(i);
  let noteBody = window.localStorage.getItem(noteTitle);
  if (noteTitle !== "count" && noteTitle){
    createNote(noteTitle, noteBody);  
  } 
}

document
  .getElementById("inputForm")
  .addEventListener("submit", createNoteFromInput, false);

document.getElementById("notes").addEventListener("click", removeItem);
