let allLists = {
    listContainer: {},
    listNameArray: [],

    addList: function (listName) {
        //defines the list element
        let listNavElement = document.getElementById('todoListDrawerListCont');
        //points to the allList array of names for easier code and adds the list name to it.
        let listsArray = allLists.listNameArray;
        listsArray.push(listName);
        //defines the list's index for a specific pointer
        let index = listsArray.length;
        //adds a container for the list
        document.getElementById('mainContent').innerHTML += domElements("listScreenCont", listName, index);
        //defining the dom element that is the list Container
        let listCont = document.getElementById('list' + index + 'Cont');
        //actually create the list
        allLists.listContainer["list" + index] = new List(listName, index, listCont);
        //puts the list into the navigation drawer
        listNavElement.innerHTML += domElements("listItem", listName, index);
        allLists.listContainer["list" + index].toggleList();
    },

    removeList: function (listIndex) {
        document.getElementById('list' + listIndex + 'Drawer');
        delete allLists.listContainer[listIndex];
    }
};
//How the list is actually added
function addList() {
    let listName = document.getElementById('newListName').value;
    if (listName !== "") {
        allLists.addList(listName);
        toggleMenu('newListScreen');
    }
}
function enterList(event) {
    if(event.keyCode === 13) {
        addList();
    }
}
//display any menu
function toggleMenu(menuId) {
    let menuContainer = document.getElementById(menuId);
    if(menuContainer.className === "shadowDiv hidden") {
        menuContainer.className = "shadowDiv";
    }
    else {
        menuContainer.className = "shadowDiv hidden";
    }
}
//How the task editor is displayed
function editTask(task, listIndex, taskIndex) {
    document.getElementById('editTaskScreen').className = 'shadowDiv';
    document.getElementById('taskName').value = task;
    document.getElementById('taskEditButtons').innerHTML =
        domElements('taskEditButtons',task, listIndex, taskIndex);
}
//List Constructor
class List {
    constructor(name, listIndex, listCont) {
        this.name = name;
        this.tasks = [];
        this.completedTasks = [];
        this.listIndex = listIndex;
        this.listContainer = listCont;
        this.domElement = domElements("listScreen", name, listIndex);
        this.taskDispCont = document.getElementById(listIndex + 'taskContainer');
        this.displayed = false;
    }
    displayList() {
        let allListContainers = document.getElementsByClassName('listCont');
        for(let i = 0; i < allListContainers.length; i ++) {
            allListContainers[i].innerHTML = '<span></span>'
        }
        this.listContainer.innerHTML = this.domElement;
        this.displayed = true;
        componentHandler.upgradeDom();
    }
    hideList() {
        this.listContainer.innerHTML = `<span></span>`;
        this.displayed = false;
    }
    toggleList() {
        if(this.displayed === false) {
            this.displayList();
        }
        else this.hideList();
    }
    changeListName(newName) {
        allLists.listNameArray[this.listIndex] = newName;
        this.name = newName;
        document.getElementById('list' + this.listIndex + 'Drawer').innerHTML = newName;
    }
    addTask(listItem) {
        let taskIndex = this.tasks.length;
        let task = new ListItem(listItem, this.listIndex, taskIndex);
        task.domContainer.innerHTML += task.domEl;
        this.tasks.push(task);
    }
    completeTask(taskIndex) {
        this.completedTasks.push(this.tasks[taskIndex]);
    }
    clearCompletedTasks() {
        this.tasks.forEach(function (value, index) {
            if(value.isComplete) {
                document.getElementById('task' + index).innerHTML = "";
            }
        });
    }
    displayListTools(listIndex) {
        
    }
}
//shortens code by making a shorter reference
//clearCompletedLists shortened
function clearCompleted(listIndex) {
    allLists.listContainer['list' + listIndex].clearCompletedTasks();
}
//addTask shortened
function addTask(listIndex, element, keyPressed) {
    let taskName = element.value;
    if(keyPressed.keyCode === 13 && taskName !== "") {
        allLists.listContainer['list' + listIndex].addTask(taskName);
        cleanInput(listIndex);
    }
}
//completeTask shortened
function completeTask(element, listIndex, taskIndex) {
    allLists.listContainer['list' + listIndex].completeTask(taskIndex);
    turnCheckGreen(element, listIndex, taskIndex);
}
//defining the list Item Constructor
class ListItem {
    constructor(task, list, index) {
        this.task = task;
        this.listIndex = list;
        this.index = index;
        this.domContainer = document.getElementById(list + 'TaskContainer');
        this.domEl = domElements("task", task, list, index);
        this.isComplete = false;
        this.isImportant = false;
    }
    makeChanges() {
        //grab values from the task editor
        this.task = document.getElementById('taskName').value;
        this.isComplete = document.getElementById('taskName').checked;
        this.isImportant = document.getElementById('taskName').checked;
        //turn the check mark green
        if(this.isComplete) {
            completeTask("task" + this.index + "check", this.listIndex, this.index);
        }
        document.getElementById('task' + this.index + 'Label'). innerHTML = this.task;
    }
}
//shorter reference to the make changes method
function makeChanges(listIndex, taskIndex) {
    if(document.getElementById('taskName'))
    allLists.listContainer['list' + listIndex].tasks[taskIndex].makeChanges();
    toggleMenu('editTaskScreen');
}
function changeListName(listIndex, newName) {
    allLists.listContainer['list' + listIndex].changeListName(newName);
    document.getElementById('list' + listIndex + 'Header').innerHTML = newName;
    document.getElementById('list' + listIndex + 'TaskAdderLabel').innerHTML = newName;
}
//check mark animation
function displayCheckMark(element, listIndex, taskIndex) {
    let task = allLists.listContainer['list' + listIndex].tasks[taskIndex];
    if(!task.isComplete) {
        element.firstElementChild.className = `material-icons checkMark`;
    }
}
function removeCheckMark(element, listIndex, taskIndex) {
    let task = allLists.listContainer['list' + listIndex].tasks[taskIndex];
    if(!task.isComplete) {
        element.firstElementChild.className = `material-icons checkMark hidden`;
    }
}
function turnCheckGreen(element, listIndex, taskIndex) {
    let task = allLists.listContainer['list' + listIndex].tasks[taskIndex];
    element.firstElementChild.className = "material-icons checkMark green";
    task.isComplete = true;
}
function toggleChangeListName(listIndex) {
    let newListNameInput = document.getElementById('newListInpCont' + listIndex);
    let listName = document.getElementById('list' + listIndex + 'Header');
    if(newListNameInput.className === '') {
        newListNameInput.className = 'hidden';
        listName.className = 'mdl-card__title-text';
    }
    else {
        newListNameInput.className = '';
        listName.className = 'hidden';
    }
}
function stopNameChange(event, listIndex) {
    if(event.keyCode === 13) {
        toggleChangeListName(listIndex);
    }
}
//a way to access the dom elements without writing them out in my code
function domElements(domEl, listNameOrTask, listIndex, taskIndex) {
    //the Element I access
    let elements = {
        "listItem":
        `<a id="list${listIndex}Drawer" class="mdl-navigation__link">${listNameOrTask}</a>`,

        "listScreen":
        `<div class='mdl-card listDisplay mdl-shadow--2dp'>
            <div class='mdl-card__title'>
                <div class="hidden" id="newListInpCont${listIndex}">
                    <div class="mdl-textfield mdl-js-textfield newNameInput">
                        <input 
                        class="mdl-textfield__input" 
                        type="text"
                        id="newListNameInput"
                        value="${listNameOrTask}"
                        onkeyup="changeListName(${listIndex}, this.value);
                        stopNameChange(event, ${listIndex})">
                    </div>
                </div>
                <h1 
                id='list${listIndex}Header'
                class='mdl-card__title-text'
                onclick="toggleChangeListName(${listIndex})">
                    ${listNameOrTask}
                </h1>
            </div>
            <div class='taskContainer' id='${listIndex}TaskContainer'>
                <div class="taskAdder">
                    <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label" id="list${listIndex}Search">
                        <input class="mdl-textfield__input" type="text"
                        id="list${listIndex}TaskAdder"
                        onkeyup="addTask(${listIndex}, this, event)">
                        <label 
                        class="mdl-textfield__label"
                        for="list${listIndex}TaskAdder"
                        >
                        Add Task to 
                        <span id="list${listIndex}TaskAdderLabel">
                            ${listNameOrTask}
                        </span>
                        </label>
                    </div>
                </div>
            </div>
            <button 
            class="mdl-button mdl-js-button mdl-button--raised" 
            onclick="clearCompleted(${listIndex})">
                Clear Completed Items
            </button>
        </div>`,

        "listScreenCont":
            `<div id="list${listIndex}Cont" class="listCont"></div>`,

        "task":
        `<div class="task" id="task${taskIndex}">
            <div
            class="taskClickCont"
            onclick="editTask(this.firstElementChild.textContent, ${listIndex}, ${taskIndex})">
                <span id="task${taskIndex}Label">${listNameOrTask}</span>
            </div>
            <div class="checkMarkCont" id="task${taskIndex}Check"
            onmouseenter="displayCheckMark(this, ${listIndex}, ${taskIndex})"
            onmouseleave="removeCheckMark(this, ${listIndex}, ${taskIndex})"
            onclick="completeTask(this, ${listIndex}, ${taskIndex})">
                <i class="material-icons checkMark hidden">done</i>
            </div>
        </div>`,
        "taskEditButtons":
        `<button
        class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--raised"
        id="confirmTaskChanges" onclick="makeChanges(${listIndex}, ${taskIndex})">
            Confirm Changes
        </button>
        <button
        class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--raised"
        onclick="toggleMenu('editTaskScreen')">
            Cancel
        </button>`

    };
    return elements[domEl]
}
//clean up the add task input
function cleanInput(listIndex) {
    let elToChange = document.getElementById('list' + listIndex + 'Search');
    //elToChange.className = "mdl-textfield mdl-js-textfield mdl-textfield--floating-label";
    elToChange.removeAttribute("data-upgraded");
    componentHandler.upgradeDom();
}
