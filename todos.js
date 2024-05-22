let addToDoBtn = document.getElementById("addToDoBtn");
let saveTodoButton = document.getElementById("saveTodoButton");

// unordered list  
let todoItemsContainer = document.getElementById("todoItemsContainer");

function getTodoFromLocalStorage() {
    let stringifiedTodo = localStorage.getItem("todoList");
    let parsedTodo = JSON.parse(stringifiedTodo);
    if (parsedTodo === null) {
        return [];
    } else {
        return parsedTodo;
    }
}
let todoList = getTodoFromLocalStorage();
saveTodoButton.onclick = function() {
    localStorage.setItem("todoList", JSON.stringify(todoList));
    getTodoFromLocalStorage();
};



function onTodoStatusChange(labelId, todoId) {
    let labelElement = document.getElementById(labelId);
    labelElement.classList.toggle("checked");
    let todoObjectIndex = todoList.findIndex(function(eachTodo) {
        let eachTodoId = "todo" + eachTodo.uniqueNo;
        if (eachTodoId === todoId) {
            return true;
        } else {
            return false;
        }
    });
    let todoObject = todoList[todoObjectIndex];
    if (todoObject.isChecked === true) {
        todoObject.isChecked = false;
    } else {
        todoObject.isChecked = true;
    }
}

function onDeleteTodo(todoId) {
    let todoElement = document.getElementById(todoId);
    todoItemsContainer.removeChild(todoElement);
    let deleteTodoIndex = todoList.findIndex(function(eachTodo) {
        let eachTodoId = "todo" + eachTodo.uniqueNo;
        if (eachTodoId === todoId) {
            return true;
        } else {
            return false;
        }
    });
    todoList.splice(deleteTodoIndex, 1);
}


function createAndAppendTodo(todo) {
    let labelId = "label" + todo.uniqueNo;
    let checkboxId = "checkbox" + todo.uniqueNo;
    let todoId = "todo" + todo.uniqueNo;
    let todoElement = document.createElement("li");
    todoElement.id = todoId;
    todoElement.classList.add("d-flex", "flex-row", "todo-item-container");
    todoItemsContainer.appendChild(todoElement);
    //checkbox 
    let inputElement = document.createElement("input");
    inputElement.type = "checkbox";
    inputElement.id = checkboxId;
    inputElement.checked = todo.isChecked;
    inputElement.classList.add("checkbox-input");
    inputElement.onclick = function() {
        onTodoStatusChange(labelId, todoId);
    };
    todoElement.appendChild(inputElement);

    //label-container
    let labelContainer = document.createElement("div");
    labelContainer.classList.add("label-container", "d-flex", "flex-row");
    todoElement.appendChild(labelContainer);

    let labelElement = document.createElement("label");
    labelElement.classList.add("checkbox-label");
    labelElement.textContent = todo.text;
    labelElement.id = labelId;
    labelElement.setAttribute("for", checkboxId);
    if (todo.isChecked === true) {
        labelElement.classList.add("checked");
    }
    labelContainer.appendChild(labelElement);


    //delete-icon-container
    let deleteIconContainer = document.createElement("div");
    deleteIconContainer.classList.add("delete-icon-container");
    labelContainer.appendChild(deleteIconContainer);

    //delete-icon
    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("fas", "fa-trash", "delete-icon");
    deleteIcon.onclick = function() {
        onDeleteTodo(todoId);
    };
    deleteIconContainer.appendChild(deleteIcon);

}
for (let eachTodo of todoList) {
    createAndAppendTodo(eachTodo);
}

function onAddToDo() {
    let todosCount = todoList.length;
    todosCount = todosCount + 1;
    let userInputElement = document.getElementById("todoUserInput");
    let userInputValue = userInputElement.value;
    if (userInputValue === "") {
        alert("Enter the valid Input");
        return;
    }
    let newToDo = {
        text: userInputValue,
        uniqueNo: todosCount,
        isChecked: false
    };
    todoList.push(newToDo);
    createAndAppendTodo(newToDo);
    userInputElement.value = "";
}
//user input adding todo item manually
addToDoBtn.onclick = function() {
    onAddToDo();
};