let createNewNote = function(event=null,head='',body='') {
  // for add button 'click' (mouseClick Object) is 1st parameter hence event is extremely important 
  // even though it is not used

  let newNote = document.createElement('div');
  newNote.innerHTML = `
    <div class="note"> 
      <div class="options">
        <div class="close">
          <img class="close-btn" src="images/close.png" alt="close"> 
          <span class="closeTipText">Delete</span> 
        </div>
      </div>
      <div class="noteHead"> 
        <textarea class="noteHeadInput"></textarea> 
      </div> 
      <div class="noteBody"> 
        <textarea class="noteBodyInput"></textarea> 
      </div> 
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
  let listOfInstructions = document.getElementsByClassName("listOfInstructions")[0];  // because i know the length of the array is 1
  listOfInstructions.style.visibility = "visible";  
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