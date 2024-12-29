

import taskList from './view/taskList.js';
import model from './model.js';
import addTask from './view/addTask.js';
import { countHomeTask, countTodayTask, countWeekTask,_updateBtn,_modal,_overlay} from './view/selectors.js'
import Details from './view/detailsOfTask.js'
import checkTask from './view/checkTask.js';
import Modal from './view/modalView.js'
import Note from './view/addNote.js'
import deleteTask from './view/deleteTask.js';
import editTask from './view/editTask.js';

function handleTaskAddition(input) {
  let sectionID = taskList.sectionID
  
  model.addItem({ ...input, sectionId: sectionID });


  addTask.randerTasksToHome(model.getAllItems());

  const uncompltetedTasks = model.getAllItems().filter(task => !task.completed);

  addTask.diplayNumberOfTasks(uncompltetedTasks,countHomeTask)
  
  renderTasksForSection(sectionID);
   


}

// render tasks for each setion

function renderTasksForSection(section) {
  const data = model.getFilterData(section);
  const uncompltetedTasks = data.filter(task => !task.completed);

  if (section === 'week') {
    addTask.randerTasksToWeek(data);
    addTask.diplayNumberOfTasks(uncompltetedTasks, countWeekTask);


  } else if (section === 'today') {
    addTask.randerTasksToToday(data);
    addTask.diplayNumberOfTasks(uncompltetedTasks, countTodayTask);


  }
}

// display details of task
function handleDetailsOfTask(taskId) {
 
  
 const task = model.getAllItems().find(item => item.id === taskId);
 if (!task) {
    console.error(`Task with ID ${taskId} not found.`);

    return;
  }
  //console.log(task);
    Details.renderDetails([task]);

}


//
function renderAndUpdateTaskCount() {

  addTask.randerTasksToHome(model.getAllItems());
  const uncompltetedTasks = model.getAllItems().filter(task => !task.completed);
  addTask.diplayNumberOfTasks(uncompltetedTasks, countHomeTask)


  renderTasksForSection('week');
  renderTasksForSection('today');
}

// check task 
function handleCheckTask(bool, taskElement) {
  const taskId = +taskElement.dataset.id;

  model.updateTask(taskId,{ completed: bool });
  
  renderAndUpdateTaskCount()
}

// handler for note

function handleNote(input) {
  model.addNote(input)
//  console.log(model.getAllNotes());
  Note.renderNote(model.getAllNotes());
}

function handleDeleteTask(taskId) {

  model.deleteTask(taskId)
  renderAndUpdateTaskCount()

}

function handleEditTask(taskId) {
  // Fetch task data from the model
  const taskData = model.editTask(taskId);

  if (taskData) {
      // Pre-fill the modal with the task data
      editTask.editInput(taskData);
    _updateBtn.addEventListener('click', () => {
      const updatedTaskDetails = addTask.getInputValues();
      if (!updatedTaskDetails) return;
      console.log(updatedTaskDetails);
      
      model.updateTask(taskId, {
        title: updatedTaskDetails.title,
        details: updatedTaskDetails.details,
        dueDate: updatedTaskDetails.dueDate,
        priority: updatedTaskDetails.priority

      })
      console.log(model.getAllItems());
      
      renderAndUpdateTaskCount();
      _modal.classList.remove('visible');
      _overlay.style.display = 'none';
      addTask.clearInputs()
    },
      { once: true });
  }
}


/* close modal show modal toggle list */
function handleToggleLists() {
//console.log('A list was toggled!');
}

function handleShowModal() {
  
//console.log('The modal was shown!');
}

function handleCloseModal() {
   // console.log('The modal was closed!');
}
function handlePriority() {
 //// console.log('priority');
  
}
  
function init() {
  addTask.addHandlerPriorityButton(handlePriority)
  Details.addHandlerCloseModal(handleCloseModal);
  taskList.addHandlerToggleLists(handleToggleLists);
  Modal.addHandlerToggleLists(handleToggleLists)
  taskList.addHanslerShowModal(handleShowModal);
  taskList.addHandlerCloseModal(handleCloseModal);
  renderAndUpdateTaskCount()
  Note.renderNote(model.getAllNotes());

}

addTask.addHandlergetValue(handleTaskAddition);
init()
Details.addHandlerOfDetails(handleDetailsOfTask);
checkTask.addHandlerCheckTask(handleCheckTask)
Note.addHandlerGetNote(handleNote)
deleteTask.addHandlerDeleteTask(handleDeleteTask)
editTask.addHandlerEditTask(handleEditTask)

