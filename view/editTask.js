
import { _overlay,_modal, textAreaOne,textAreaTwo,dateInput} from "./selectors.js";
class EditTask {
  
    _btnActveColor = document.querySelectorAll('.btn');
  
  get taskLists() {
    return   document.querySelectorAll('.task-list');
  }
    addHandlerEditTask(handler) {
       
            this.taskLists.forEach(list => {
                list.addEventListener('click', (e)=>{
                    const  editBtn = e.target.closest('#edit-task');
                    if (!editBtn) return;
                    const task = editBtn.parentElement.parentElement
                    console.log(task);
                    
                 const taskId = +task.dataset.id;
                    //  console.log(taskId);
                    handler(taskId,task);

                  _overlay.style.display = 'block';
                  _modal.classList.add('visible');
                })

        })
    }
    editInput(data) {
    
        if (data && data.title) {
          //  console.log(data);
            
            textAreaOne.value = data.title; // Update the text content
            textAreaTwo.value = data.details;
            dateInput.value = data.dueDate;
            this._btnActveColor.forEach(btn => {
                if (btn.dataset.color === data.priority) {
                    btn.classList.add('activeC')
                }
                
            })
            
          } else {
            console.error("Invalid data provided to editInput.");
          }
     
        
       
        
       
  }

}
export default new EditTask();