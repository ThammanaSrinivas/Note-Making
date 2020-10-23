let createNewNote = function() {

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
      </div> <div class="noteBody"> 
        <textarea class="noteBodyInput"></textarea> 
      </div> 
    </div>
  `;

  bottomContainer = document.querySelector(".bottom-container");
  bottomContainer.appendChild(newNote);

  let closeButton = newNote.querySelector(".close-btn");
  closeButton.addEventListener("click",function() {
    newNote.remove();
  });
};

let add = document.querySelector(".add-btn");
add.addEventListener('click',createNewNote);
