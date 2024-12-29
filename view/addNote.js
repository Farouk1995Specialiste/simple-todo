/* -----------------------------------------------------------------------
 * <copyright company="Microsoft Corporation">
 *   Copyright (c) Microsoft Corporation.  All rights reserved.
 * </copyright>
 * ----------------------------------------------------------------------- */
import { _overlay,_modal } from "./selectors.js";
class Note {
    _noteTitle = document.getElementById('textarea-title');
    _noteDes = document.getElementById('textarea-desc');
    _addBtn= document.getElementById('create-note');
    _noteContainer = document.getElementById('notes-container')
    getInputOfNote() {
        const newNote = {
            title: this._noteTitle.value.trim(),
            desc:this._noteDes.value.trim()
        }
        if (!newNote.title || !newNote.desc) {
            alert('All fields are required!');
            return null;
        }
        return newNote;
    }
        clearInputs() {
            this._noteTitle.value = this._noteDes.value='';
            
    
    }

    renderNote(data) {
        const noteHTML = this.generateHTML(data);
        this._noteContainer.innerHTML = ''
        this._noteContainer.insertAdjacentHTML('afterbegin',noteHTML)

    }
    generateHTML(data) {
        return data.map(note => {
        
            return ` <div class="note">

                <div class="info">
                 <h3 id="title" contenteditable="true">${note.title}</h3>
                 <span class="close" id="close">
                    <i class="fas fa-close"></i>
                </span>
                </div>

                <p class="description" contenteditable="true">${note.desc}</p>
                </div>`
        }).join("");
    }
    addHandlerGetNote(handler) {
        this._addBtn.addEventListener('click', e => {
            e.preventDefault();
            const inputs = this.getInputOfNote();
            if (!inputs) return;
            handler(inputs)
              
            this.clearInputs();
             _modal.classList.remove('visible');
             _overlay.style.display = 'none'; 
        })
    }

}

export default new Note();