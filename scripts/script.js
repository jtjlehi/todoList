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
        this.domElement.innerHTML = newName;
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
    displayListTools(listIndex) {
        
    }
}
//shortens code by making a shorter reference
function addTask(listIndex, taskName, keyPressed) {
    if(keyPressed.keyCode === 13) {
        allLists.listContainer['list' + listIndex].addTask(taskName);
    }
}
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
        this.checkIsGreen = false;
    }
}

//check mark animation
function displayCheckMark(element, listIndex, taskIndex) {
    let task = allLists.listContainer['list' + listIndex].tasks[taskIndex];
    if(!task.checkIsGreen) {
        element.firstElementChild.className = `material-icons checkMark`;
    }
}
function removeCheckMark(element, listIndex, taskIndex) {
    let task = allLists.listContainer['list' + listIndex].tasks[taskIndex];
    if(!task.checkIsGreen) {
        element.firstElementChild.className = `material-icons checkMark hidden`;
    }
}
function turnCheckGreen(element, listIndex, taskIndex) {
    let task = allLists.listContainer['list' + listIndex].tasks[taskIndex];
    element.firstElementChild.className = "material-icons checkMark green";
    task.checkIsGreen = true;
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
                <h1 class='mdl-card__title-text'>${listNameOrTask}</h1>
            </div>
            <div class='taskContainer' id='${listIndex}TaskContainer'>
                <div class="taskAdder">
                    <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label" id="list${listIndex}Search">
                        <input class="mdl-textfield__input" type="text"
                        id="list${listIndex}TaskAdder"
                        onkeyup="addTask(${listIndex}, this.value, event)">
                        <label class="mdl-textfield__label"
                        for="list${listIndex}TaskAdder">Add Task to ${listNameOrTask}</label>
                    </div>
                </div>
            </div>
        </div>`,

        "listScreenCont":
            `<div id="list${listIndex}Cont" class="listCont"></div>`,

        "task":
        `<div class="task">
            <span>${listNameOrTask}</span>
            <div class="checkMarkCont"
            onmouseenter="displayCheckMark(this, ${listIndex}, ${taskIndex})"
            onmouseleave="removeCheckMark(this, ${listIndex}, ${taskIndex})"
            onclick="completeTask(this, ${listIndex}, ${taskIndex})">
                <i class="material-icons checkMark hidden">done</i>
            </div>
        </div>`

    };
    return elements[domEl]
}
//clean up the add task input
function cleanInput(element) {
    element.parentNode.className = ""
}