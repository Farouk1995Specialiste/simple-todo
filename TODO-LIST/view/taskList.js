import { _close, _big__nav, _modal, _overlay, _show__modal, _taskCategories, sections } from "./selectors.js";

class TaskList {
    constructor() {
        this._sectionID = null;
    }

    // Listen for the section toggle event and store the active section
    addHandlerToggleLists(handler) {
        _big__nav.addEventListener('click', e => {
            const btn = e.target.closest('.task-category');
            if (!btn) return;
            _taskCategories.forEach(btn => btn.classList.remove('active'));
            btn.classList.add('active');

            // Update the active section ID based on the button clicked
            this._sectionID = e.target.dataset.show;
            if (!this._sectionID) return;

            sections.forEach(section => section.classList.add('show'));
            sections.forEach(section => {
                if (section.classList.contains(this._sectionID)) {
                    section.classList.remove('show');
                }
            });

            // Run the handler to render the tasks for the active section
            handler();
        });
    }

    // Getter for the active section ID
    get sectionID() {
        return this._sectionID;
    }

    // Modal handling
    addHanslerShowModal(handler) {
        _show__modal.addEventListener('click', () => {
            _overlay.style.display = 'block';
            _modal.classList.add('visible');
            handler();
        });
    }

    addHandlerCloseModal(handler) {
        _close.addEventListener('click', () => {
            _overlay.style.display = 'none';
            _modal.classList.remove('visible');
            handler();
        });
    }
}

const taskList = new TaskList();
export default taskList;
