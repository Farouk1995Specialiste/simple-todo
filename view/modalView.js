/* -----------------------------------------------------------------------
 * <copyright company="Microsoft Corporation">
 *   Copyright (c) Microsoft Corporation.  All rights reserved.
 * </copyright>
 * ----------------------------------------------------------------------- */
class Modal {
    _nav = document.querySelector('.nav')
    _sections = document.querySelectorAll(".mini-content-nav .section-modal")
    _taskCategories = document.querySelectorAll(".task-category-modal")
     addHandlerToggleLists(handler) {
            this._nav.addEventListener('click', e => {
                const btn = e.target.closest('.task-category-modal');
                if (!btn) return;
                this._taskCategories.forEach(btn => btn.classList.remove('active'));
                btn.classList.add('active');
    
                // Update the active section ID based on the button clicked
                const sectionModal = e.target.dataset.show;

                if (!sectionModal) return;
                
                 this._sections.forEach(section => section.classList.add('show'));
                this._sections.forEach(section => {
                     
                                if (section.classList.contains(sectionModal)) {
                                    section.classList.remove('show');
                                }
                            });
    
                // Run the handler to render the tasks for the active section
                handler();
            });
        }
}
export default new Modal()