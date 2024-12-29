
import { textAreaOne,textAreaTwo,_addToToDoBtn,dateInput,_modal,_overlay,todaySection, homeSection, weekSection} from "./selectors.js";
import taskList from './taskList.js';

class AddTask {
    _btnActveColor = document.querySelectorAll('.btn');
    _btnColor;

    getInputValues() {
      
      
        const newTodo = {
            title: textAreaOne.value.trim(),
            details: textAreaTwo.value.trim(),
            dueDate: dateInput.value,
            priority: this._btnColor,
            sectionId: taskList.sectionID,
            id: Date.now(),
            completed:false
        }
        
        if (!newTodo.title || !newTodo.details || !newTodo.dueDate) {
            alert('All fields are required!');
            return null;
        }
        return newTodo;
    }
    clearInputs() {
        textAreaOne.value = textAreaTwo.value =dateInput.value = '';
        this._btnActveColor.forEach(btn => btn.classList.remove('activeC'));   

    }

    renderTasksToSection(data,parentSection,taskContainer) {
        const taskHTML = this._generateTaskHTML(data);
        taskContainer.innerHTML = taskHTML;
        parentSection.appendChild(taskContainer )
    }
    randerTasksToHome(data) {
        const homeTasksContainer = document.querySelector('#home .task-list');
        this.renderTasksToSection(data,homeSection,homeTasksContainer)
    }
    randerTasksToWeek(data) {
        const weekTasksContainer = document.querySelector('#week .task-list');
        this.renderTasksToSection(data,weekSection,weekTasksContainer)
    }
    randerTasksToToday(data) {
        const todayTasksContainer = document.querySelector('#today .task-list');
        this.renderTasksToSection(data, todaySection, todayTasksContainer);

   }
    _generateTaskHTML(data) {
      
        return data.map(task => {
          return  `
           <div class="task ${task.priority} ${task.completed?"add-border":""}" data-id="${task.id}">
                <div class="chek-task">
                <input type="checkbox"  id="check-task" ${task.completed ? "checked" : ""} >
                 <span class="task-title">${task.title}</span>
                </div>
                <div class="task-info">
                    <button class="todo-detail" data-id="${task.id}" >Details</button>
                    <span class="date-add">${task.dueDate}</span>
                    <i class="fas fa-trash" id="delete-task"></i>
                     <i class="fas fa-edit" id="edit-task"></i>

                </div>
            </div>`
            
        }).join("")
       
        
   }
    diplayNumberOfTasks(data,parent) {
        parent.innerHTML = data.length;
        parent.style.visibility='visible'
   }
    addHandlerPriorityButton(handler) {
    
        this._btnActveColor.forEach(btn =>
            btn.addEventListener('click', () => {
               this._btnActveColor.forEach(btn => btn.classList.remove('activeC'));   
                btn.classList.add('activeC');
                this._btnColor = btn.dataset.color;
           //    console.log(this._btnColor);
               
                
                handler(this._btnColor)
            }))
        
    }

    addHandlergetValue(handler) {
        _addToToDoBtn.addEventListener('click', (e) => {
            e.preventDefault()
    
            const inputValues = this.getInputValues();
            if (!inputValues) return;
            handler(inputValues);
    
            this.clearInputs();
    
            _modal.classList.remove('visible');
            _overlay.style.display = 'none';    
        })
       
        }
}
export default new AddTask();