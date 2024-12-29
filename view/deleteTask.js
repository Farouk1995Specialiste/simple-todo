/* -----------------------------------------------------------------------
 * <copyright company="Microsoft Corporation">
 *   Copyright (c) Microsoft Corporation.  All rights reserved.
 * </copyright>
 * ----------------------------------------------------------------------- */

class DeleteTask {


    taskLists = document.querySelectorAll('.task-list')
    addHandlerDeleteTask(handler) {
       
            this.taskLists.forEach(list => {
                list.addEventListener('click', (e)=>{
                    const  deleteBtn = e.target.closest('#delete-task');
                    if (!deleteBtn) return;
                    const task = deleteBtn.parentElement.parentElement
                    console.log(task);
                    
                 const taskId = +task.dataset.id;
                 console.log(taskId);
                 
                    handler(taskId);
                })

        })
    }
}

export default new DeleteTask()