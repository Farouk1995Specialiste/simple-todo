

class Model {
    constructor() {
        this.data =  this._loadFromLocalStorage() || [];
        this.notes = this.loadNoteFormLocal() || [];
        
    }

    addItem(item) {
        this.data.push(item);
        this.saveTasksToLocalStorage();
    }
    
    updateTask(taskId,updates) {
        const taskIndex = this.data.findIndex(task => +task.id === taskId);
        
        if (taskIndex !== -1) {
            this.data[taskIndex] = { ...this.data[taskIndex], ...updates };
            this.saveTasksToLocalStorage()
         //   console.log(this.data[taskIndex]);
            
        } else {
            console.error(`Task with ID ${taskId} not found.`);
        }
    }
    deleteTask(taskId) {
        const taskIndex = this.data.findIndex(task => +task.id === +taskId)
        if (taskIndex !== -1) {
            this.data.splice(taskIndex, 1);
            this.saveTasks()
        }
    }
    editTask(taskId) {
        const taskIndex = this.data.findIndex(task => +task.id === +taskId)
         
        if (taskIndex !== -1) {
         //   this.saveTasks()
            return  this.data[taskIndex]
        }
    }
    getAllItems = () => this.data;
    
    getFilterData = (section) => this.data.filter(item => item.sectionId === section);
    
    saveTasksToLocalStorage() {
        localStorage.setItem('tasks', JSON.stringify(this.data));
    }
    _loadFromLocalStorage() {
        const tasks = localStorage.getItem('tasks');
        return tasks ? JSON.parse(tasks) : null;

      }
    addNote(note){
        this.notes.push(note);
        this.saveNoteToLocal();
    }

    getAllNotes = () => this.notes;
    
    saveNoteToLocal() {
        localStorage.setItem('notes', JSON.stringify(this.notes));
   
    }
    loadNoteFormLocal() {
        const notes = localStorage.getItem('notes');
        return notes ? JSON.parse(notes) : null;
   }
}
export default new Model();