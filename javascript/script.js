let moveSelected = false;
let sourceIdx = 0;
let destinationIdx = 0;

let createNewNote = function(event=null,head='',body='') {
  // for add button 'click' (mouseClick Object) is 1st parameter hence event is extremely important 
  // even though it is not used

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

  bottomContainer = document.querySelector(".bottom-container");
  let noteHeadInput = newNote.querySelector(".noteHeadInput");
  let noteBodyInput = newNote.querySelector(".noteBodyInput");
  noteHeadInput.value = head;
  noteBodyInput.value = body;
  bottomContainer.appendChild(newNote);

  let closeButton = newNote.querySelector(".close-btn");
  closeButton.addEventListener("click",function() {
    newNote.remove();
  });

  moveNotes = function() {
    let notesArray = document.querySelectorAll(".note"); 
    let length = notesArray.length;
    // to find sourceIdx
    for(let i=0;i<length;++i) {
      if(newNote == notesArray[i]) {
        sourceIdx = i;
        break;
      }  
    }
    moveSelected = true;
  };

  ifMoveIsActivated = function() {
    if(moveSelected) {
      let notesArray = document.querySelectorAll(".note"); 
      let length = notesArray.length;
      //to find destinationIdx
      for(let i=0;i<length;++i) {
        if(newNote == notesArray[i]) {   
          destinationIdx = i;
          break;
        }
      }
      
      // the moving part
      let tempHead = notesArray[sourceIdx].querySelector(".noteHeadInput").value;
      let tempBody = notesArray[sourceIdx].querySelector(".noteBodyInput").value;
      //case i (if source<dest)
      if(sourceIdx<destinationIdx) {
        let i=sourceIdx;
        for(;i<destinationIdx;++i) {
          notesArray[i].querySelector(".noteHeadInput").value = notesArray[i+1].querySelector(".noteHeadInput").value;
          notesArray[i].querySelector(".noteBodyInput").value = notesArray[i+1].querySelector(".noteBodyInput").value;
        } 
        notesArray[i].querySelector(".noteHeadInput").value = tempHead;
        notesArray[i].querySelector(".noteBodyInput").value = tempBody;
      }
      //case ii (if sourceIdx>=destinationIdx)
      else {
        let i=sourceIdx;
        for(;i>destinationIdx;--i) {
          notesArray[i].querySelector(".noteHeadInput").value = notesArray[i-1].querySelector(".noteHeadInput").value;
          notesArray[i].querySelector(".noteBodyInput").value = notesArray[i-1].querySelector(".noteBodyInput").value;
        } 
        notesArray[i].querySelector(".noteHeadInput").value = tempHead;
        notesArray[i].querySelector(".noteBodyInput").value = tempBody;
      }
      moveSelected = false;
    } 
  };

  newNote.querySelector(".editSection").addEventListener("click",ifMoveIsActivated);

  let moveButton = newNote.querySelector(".move-btn");
  moveButton.addEventListener("click",moveNotes);

};

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

showInstructions = function() {
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
  if(localStorage.getItem("head"+i)==null)  break;
  createNewNote(null,localStorage.getItem("head"+i),localStorage.getItem("body"+i));  
}

let add = document.querySelector(".add-btn");
add.addEventListener('click',createNewNote);

let save = document.querySelector(".save-btn");
save.addEventListener('click',saveNotes);

let instructions = document.querySelector(".instructions-btn");
instructions.addEventListener('click',showInstructions); 