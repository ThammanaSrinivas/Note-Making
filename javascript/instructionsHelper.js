let listOfInstructions = document.getElementsByClassName("listOfInstructions")[0];
listOfInstructions.innerHTML =`
 
    <div class="listOfInstructionsTitle">
      Instructions
    </div>
    
    <div class="setOfInstructions">
      <hr>
      Note: Inorder to store/track your progress select the SAVE button. 
      <img width="32px" src="images/save.png" alt="">
      <hr> <br>
      To edit a note select the area where you want to edit. (heading/body of a note)
      <br><br>
      To add a note select plus button. <img width="32px" src="images/plus.png" alt="">
      <br><br>
      To remove a note select close button. <img width="32px" src="images/close.png" alt="">
      <hr>
    </div>

    <div class="questionsAndAnswers">
      <div class="questionsAndAnswersTitle">
        Questions And Answers
      </div>
      <div class="setOfQuestionsAndAnswers">
        Q1. Where are the notebooks saved? 
        <hr>
        NoteBooks are stored in browser's local storage.
        The server retrieve the data from the browser's local storage and display the notes.
        So, Whenever the website is loaded, previously saved notes are displayed.
        <br><br><br>
        Q2. How to use the NoteMaking App?
        <hr>
        step1: Add, Delete and Edit the notes.
        <br>
        step2: Save the notes for future use.
      </div> 
    </div>
     
    <div class="instruction-close close">
      <img class="instruction-close-btn close-btn" src="images/close.png" alt="close"> 
      <span class="closeTipText">close</span> 
    </div>

`;