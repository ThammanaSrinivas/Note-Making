let moveSelected = false;
let sourceIdx = 0;
let destinationIdx = 0;
let currentDraggedNote = null;

let createNewNote = function(event=null,head='',body='') {
  let newNote = document.createElement('div');
  newNote.classList.add("note");
  newNote.innerHTML = `
    <div class="options">
      <div class="move">
        <img class="move-btn" src="images/move.png" alt="move"> 
        <span class="moveTipText">Move</span> 
      </div>
      <div class="close">
        <img class="close-btn" src="images/close.png" alt="close"> 
        <span class="closeTipText">Delete</span> 
      </div>
    </div>
    <div class="editSection">
      <textarea class="noteHeadInput"></textarea> 
      <textarea class="noteBodyInput"></textarea> 
    </div>
  `;

  let bottomContainer = document.querySelector(".bottom-container");
  let noteHeadInput = newNote.querySelector(".noteHeadInput");
  let noteBodyInput = newNote.querySelector(".noteBodyInput");
  noteHeadInput.value = head;
  noteBodyInput.value = body;
  bottomContainer.appendChild(newNote);

  // Prevent dragging on textareas
  noteHeadInput.addEventListener('mousedown', (e) => {
    e.stopPropagation();
  });

  noteBodyInput.addEventListener('mousedown', (e) => {
    e.stopPropagation();
  });

  let closeButton = newNote.querySelector(".close-btn");
  closeButton.addEventListener("click", function() {
    newNote.remove();
  });

  let moveButton = newNote.querySelector(".move-btn");
  
  moveButton.addEventListener('mousedown', function(e) {
    moveSelected = true;
    currentDraggedNote = newNote;
    newNote.setAttribute('draggable', 'true');
    
    // Find source index
    let notesArray = document.querySelectorAll(".note");
    for(let i = 0; i < notesArray.length; i++) {
      if(newNote === notesArray[i]) {
        sourceIdx = i;
        break;
      }
    }
  });

  newNote.addEventListener('dragstart', function(e) {
    if (!moveSelected) {
      e.preventDefault();
      return;
    }
    newNote.classList.add('dragging');
    
    // Create empty drag image
    let dragImg = document.createElement('div');
    dragImg.style.width = '0';
    dragImg.style.height = '0';
    document.body.appendChild(dragImg);
    e.dataTransfer.setDragImage(dragImg, 0, 0);
    document.body.removeChild(dragImg);
  });

  newNote.addEventListener('dragend', function() {
    moveSelected = false;
    newNote.classList.remove('dragging');
    newNote.setAttribute('draggable', 'false');
    currentDraggedNote = null;
  });

  newNote.addEventListener('dragover', function(e) {
    if (!moveSelected || newNote === currentDraggedNote) return;
    e.preventDefault();
  });

  newNote.addEventListener('drop', function(e) {
    if (!moveSelected || newNote === currentDraggedNote) return;
    e.preventDefault();
    
    // Find destination index
    let notesArray = document.querySelectorAll(".note");
    for(let i = 0; i < notesArray.length; i++) {
      if(newNote === notesArray[i]) {
        destinationIdx = i;
        break;
      }
    }

    // Perform the move
    if(sourceIdx !== destinationIdx) {
      let tempHead = notesArray[sourceIdx].querySelector(".noteHeadInput").value;
      let tempBody = notesArray[sourceIdx].querySelector(".noteBodyInput").value;
      
      if(sourceIdx < destinationIdx) {
        for(let i = sourceIdx; i < destinationIdx; i++) {
          notesArray[i].querySelector(".noteHeadInput").value = notesArray[i+1].querySelector(".noteHeadInput").value;
          notesArray[i].querySelector(".noteBodyInput").value = notesArray[i+1].querySelector(".noteBodyInput").value;
        }
      } else {
        for(let i = sourceIdx; i > destinationIdx; i--) {
          notesArray[i].querySelector(".noteHeadInput").value = notesArray[i-1].querySelector(".noteHeadInput").value;
          notesArray[i].querySelector(".noteBodyInput").value = notesArray[i-1].querySelector(".noteBodyInput").value;
        }
      }
      
      notesArray[destinationIdx].querySelector(".noteHeadInput").value = tempHead;
      notesArray[destinationIdx].querySelector(".noteBodyInput").value = tempBody;
    }
    
    moveSelected = false;
  });
};

// The rest of your code remains the same
let saveNotes = function() {
  let notesArray = document.querySelectorAll(".note");
  let length = notesArray.length;
  for(let i=0;i<length;++i) {
    let noteHeadInput = notesArray[i].querySelector(".noteHeadInput"); 
    let noteBodyInput = notesArray[i].querySelector(".noteBodyInput"); 
    localStorage.setItem("head"+i,noteHeadInput.value);
    localStorage.setItem("body"+i,noteBodyInput.value); 
  }
  // to remove previously saved notes
  for(let i=length;;++i) {
    if(localStorage.getItem("head"+i)==null)  break;
    localStorage.removeItem("head"+i);
    localStorage.removeItem("body"+i);
  }
  alert("Notebooks are saved successfully");
}

let showInstructions = function() {
  let listOfInstructions = document.getElementsByClassName("listOfInstructions");  
  listOfInstructions[0].style.visibility = "visible";  // because i know the length of the array is 1
  let body = document.getElementsByTagName("BODY")[0];
  body.style.overflowY = "hidden";
  

  let instructionCloseBtn = document.querySelector(".instruction-close-btn");
  instructionCloseBtn.addEventListener('click',function() {
    listOfInstructions[0].style.visibility = "hidden";
    body.style.overflowY = "scroll";
  });
}


//load notes
for(let i=0;;++i) {
  if(localStorage.getItem("head"+i)==null) break;
  createNewNote(null,localStorage.getItem("head"+i),localStorage.getItem("body"+i));  
}

let add = document.querySelector(".add-btn");
add.addEventListener('click', createNewNote);

let save = document.querySelector(".save-btn");
save.addEventListener('click', saveNotes);

let instructions = document.querySelector(".instructions-btn");
instructions.addEventListener('click', showInstructions);