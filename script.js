
let plusBtn = document.getElementById("plusBtn");
let myNote = document.getElementById("myNote");
let saveBtn = document.getElementById("saveBtn");
let noteHeading = document.getElementById("noteHeading");
let noteText = document.getElementById("noteText");


let editPanel = document.getElementById("editPanel");
let inputHeading = document.getElementById("inputHeading");
let edittext = document.getElementById("edit-text");
let updateBtn = document.getElementById("updateBtn");


plusBtn.addEventListener("click", function(){
    myNote.showModal();
});

function closeNote(){
    myNote.close();
}

let currentNotes = null;
let currentNotId = null;

document.addEventListener("DOMContentLoaded", loadNotes);



saveBtn.addEventListener("click",function(){

    if(noteHeading.value.trim() === "" && noteText.value.trim() === "") return;

    const notId = Date.now().toString();

    const noteData = {
        id: notId,
        title: noteHeading.value,
        text: noteText.value
    };

    createnotElement(noteData);

    saveNoteToStorage(noteData);

        
    noteHeading.value = "";
    noteText.value = "";
    myNote.close();

   
});     

function createnotElement(noteData){

    let notBox = document.createElement("div");
    notBox.classList.add("noteBox");
    notBox.setAttribute("data-id", noteData.id);

    let h2 = document.createElement("h2");
    h2.textContent = noteData.title;

    let p = document.createElement("p");
    p.textContent = noteData.text;

    let deleteBtn = document.createElement("button");
    deleteBtn.classList.add("deleteBtn");

    deleteBtn.addEventListener("click", function(event) {

        event.stopPropagation(); 
        
        notBox.remove(); 
        
        deleteNoteFromStorage(noteData.id);

    });
    



    notBox.appendChild(h2);
    notBox.appendChild(p);
    notBox.appendChild(deleteBtn);

    document.querySelector(".container").appendChild(notBox)

    notBox.addEventListener("click",function(){
    
        currentNotes = { 

            h2Element: h2,
            pElement: p 
        };

        currentNotId = noteData.id;
        
        inputHeading.value = h2.textContent;
        edittext.value = p.textContent;

        editPanel.style.display = "block";
    });


}


updateBtn.addEventListener("click", function(){

    if(currentNotes && currentNotId){

        currentNotes.h2Element.textContent = inputHeading.value;
        currentNotes.pElement.textContent = edittext.value;

        updateNoteInStorage(currentNotId, inputHeading.value, edittext.value);

        editPanel.style.display   = "none";
    }
});


function deleteNoteFromStorage(id) {
    
    let notes = getNotesFromStorage();
    notes = notes.filter(note => note.id !== id);
    localStorage.setItem("myNotes", JSON.stringify(notes));
}


function saveNoteToStorage(noteData) {
    let notes = getNotesFromStorage();
    notes.push(noteData);
    localStorage.setItem("myNotes", JSON.stringify(notes));
}

function getNotesFromStorage() {
    let notes = localStorage.getItem("myNotes");
    return notes ? JSON.parse(notes) : [];
}

function loadNotes() {
    let notes = getNotesFromStorage();
    notes.forEach(note => createnotElement(note));
}
function updateNoteInStorage(id, newTitle, newText) {

    let notes = getNotesFromStorage();

    notes = notes.map(note => {

        if (note.id === id) {
            note.title = newTitle;
            note.text = newText;
        }
        return note;
    });

    localStorage.setItem("myNotes", JSON.stringify(notes));
};


function canceledit(){
    editPanel.style.display = "none";
};



