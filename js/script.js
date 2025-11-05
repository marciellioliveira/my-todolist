$(document).ready(() => {

	let tasksCount = 0;

	//Select Elements
	const removeAllButton = $("#removeAll");
	const myList = $("#myList");
	const newTaskInput = $("#new-task");
	const addTaskButton = $("#addTask");

	//Button 'ClearAll' starts hidden
	removeAllButton.hide();

	//Update Button's visibility
	function updateRemoveButtonsVisibility() {
		if(tasksCount > 0) {
			removeAllButton.show();
		} else {
			removeAllButton.hide();
		}
	}

	function createNewTask(value) {

		tasksCount += 1;
		const element = $(`<li class='list-item-task mb-2' data-id='${tasksCount}'>`);
		element.append(`<span class='task-text'>${value}</span>`);
		const actionsDiv = $("<div class='task-actions d-flex justify-content-end align-items-center gap-2'></div>");
		const completeBtn = $("<button class='btn btn-sm btn-outline-success custom-btn-action'>Done</button>");
		const deleteBtn = $("<button class='btn btn-sm btn-outline-danger custom-btn-action'>X</button>");

		actionsDiv.append(completeBtn, deleteBtn);
		element.append(actionsDiv);

		return element;
	}


	//Add new Task
	addTaskButton.on("click", (e) => {

		e.preventDefault();
		let value = newTaskInput.val().trim();

		if(value !== "") {

			const newElement = createNewTask(value);
			myList.append(newElement);

			newTaskInput.val("");

		}

		updateRemoveButtonsVisibility();

	});

	myList.on("click", ".custom-btn-action", function() {
        const $button = $(this);
        const $listItem = $button.closest('li'); 

        if ($button.text().includes("Done")) {
          
            $listItem.toggleClass('completed');
            
            if ($listItem.hasClass('completed')) {
                 $button.text("Undo");
                 $button.removeClass('btn-outline-success').addClass('btn-outline-secondary');
            } else {
                 $button.text("Done");
                 $button.removeClass('btn-outline-secondary').addClass('btn-outline-success');
            }

        } else if ($button.text().includes("X")) {
   
            $listItem.remove();
            tasksCount--;
        }
        
        updateRemoveButtonVisibility();
    });


	removeAllButton.on("click", () => {
		myList.find('.list-item-task').remove(); 
		tasksCount = 0;
		updateRemoveButtonVisibility();
	});

	newTaskInput.on("keypress", function(e) {
        if(e.which === 13) { 
            addButton.click();
        }
    });
});