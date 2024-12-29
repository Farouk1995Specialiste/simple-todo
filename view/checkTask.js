/* -----------------------------------------------------------------------
 * <copyright company="Microsoft Corporation">
 *   Copyright (c) Microsoft Corporation.  All rights reserved.
 * </copyright>
 * ----------------------------------------------------------------------- */

class CheckTask {

    weekTasksContainer = document.querySelector('#week');
    homeTasksContainer = document.querySelector('#home');
    todayTasksContainer = document.querySelector('#today');
    taskLists = document.querySelectorAll('.task-list')
    bool = true;
    addHandlerCheckTask(handler) {
       
            this.taskLists.forEach(list => {
                list.addEventListener('click', (e)=>{
                    const  checkItem = e.target.closest('#check-task');
                    if (!checkItem) return;
                    this.bool = checkItem.checked;
                    const task = checkItem.parentElement.parentElement
                 
                    handler(this.bool,task);
                })

        })
    }
  
}
export default new CheckTask()



