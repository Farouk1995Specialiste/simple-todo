
/* -----------------------------------------------------------------------
 * <copyright company="Microsoft Corporation">
 *   Copyright (c) Microsoft Corporation.  All rights reserved.
 * </copyright>
 * ----------------------------------------------------------------------- */
import { detailsContainer,_overlay } from './selectors.js';
class Details {

    weekTasksContainer = document.querySelector('#week .task-list');
    homeTasksContainer = document.querySelector('#home .task-list');
    todayTasksContainer = document.querySelector('#today .task-list');
  
    addHandlerOfDetails(handler) {
        [this.homeTasksContainer, this.weekTasksContainer, this.todayTasksContainer]
            .forEach(section => {
                section.addEventListener('click', (e)=>{
                    const todoDetail = e.target.closest('.todo-detail');
                    if (!todoDetail) return;

                    const taskId = +todoDetail.dataset.id;
                    if (!taskId) return;
                  //  console.log(taskId);
                    
                    handler(taskId);
                })

        })
        
    }
    renderDetails(data) {
        const detailHTML = this.generateHTML(data);
         detailsContainer.innerHTML = detailHTML; // Add task details to the container
        detailsContainer.classList.add('close-details');
        _overlay.style.display = 'block';
    
    }
    
    generateHTML(data) {
        return data.map(task => {
            console.log(task);
            return `
            <div>
        <h3 class="title">${task.title}</h3>
        <span class="close" id="close">
            <i class="fas fa-close"></i>
        </span>
       </div>
        <p>Section:<strong>${task.sectionId}</strong></p>
        <p>Priority:<strong>${task.priority}</strong></p>
        <p>DueDate :<strong>${task.dueDate}</strong></p>
        <p>Details:<strong>${task.details}</strong></p>
           `
           
        }).join("");
        
     }
     
    addHandlerCloseModal(handler) {
        detailsContainer.addEventListener('click', e=> {
            const closeBtn = e.target.closest('#close');

            if (!closeBtn) return;
            _overlay.style.display = 'none';
            detailsContainer.classList.remove('close-details');
            handler();
        })
  }
 }

export default new Details()