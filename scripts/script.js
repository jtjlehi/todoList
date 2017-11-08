let allLists = {
    listContainer: {},
    listNameArray: [],

    addList: function (listName) {
        let listNavElement = document.getElementById('todoListDrawerListCont');

        let listsArray = allLists.listNameArray;
        listsArray.push(listName);

        let index = listsArray.length;

        document.getElementById('mainContent').innerHTML += domElements("listScreenCont", listName, index);

        let listCont = document.getElementById('list' + index + 'Cont');//defining the dom element that is the list Container

        allLists.listContainer["list" + index] = new List(listName, index, listCont);

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
        this.listIndex = listIndex;
        this.completedTasks = [];
        this.listContainer = listCont;
        this.domElement = domElements("listScreen", name, listIndex);
        this.displayed = false;
    }
    displayList() {
        this.listContainer.innerHTML = this.domElement;
        this.displayed = true;
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
        let taskIndex = this.tasks + 1;
        let task = new listItem(listItem, this.listIndex, taskIndex);
        this.tasks.push(task);
    }
    completeItem(taskId) {
        this.completedTasks.push(this.tasks[taskId]);

    }
    displayListTools(listIndex) {
        
    }
}
class ListItem {
    constructor(task, list, index) {
        this.task = task;
        this.listIndex = list;
        this.index = index;
    }
}

function displayCheckMark(element) {
    element.innerHTML = domElements("checkMark");
}

function removeCheckMark(element) {
    element.innerHTML = `<span></span>`;
}

function displayAllListArray() {
    allLists.listNameArray.forEach(function (value, index) {
        document.getElementById('toDoList').innerHTML +=
            `<div class="listNames" id="list${index}">${value}</div>'`;
    });
}
function displayTask(task, listIndex) {
    let container = document.getElementById('list' + listIndex + 'taskContainer');
    container.innerHTML +=
        "<div>";
}

function domElements(domEl, listNameOrTask, index) {

    let elements = {
        "listItem":
        `<a id="list${index}Drawer" class="mdl-navigation__link">${listNameOrTask}</a>`,

        "listScreen":
        `<div class='mdl-card listDisplay mdl-shadow--2dp'>
            <div class='mdl-card__title'>
                <h1 class='mdl-card__title-text'>${listNameOrTask}</h1>
            </div>
            <div class='taskContainer' id='${index}TaskContainer'>
                <div class="taskAdder">
                    <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                        <input class="mdl-textfield__input" type="text"
                        id="list${index}TaskAdder"
                        onkeyup="allLists.listContainer['list${index}'].addTask()">
                        <label class="mdl-textfield__label"
                        for="list${index}TaskAdder">Add Task to ${listNameOrTask}</label>
                    </div>
                </div>
            </div>
        </div>`,

        "listScreenCont":
        `<div id="list${index}Cont"></div>`,

        "checkMark":
        `<i class="material-icons checkMark">done</i>`,

        "task":
        `<div class="task">
                    <span>${listNameOrTask}</span>
                    <div class="checkMarkCont"
                    onmouseenter="displayCheckMark(this)"
                    onmouseleave="removeCheckMark(this)"
                    onclick="">
                        <span></span>
                    </div>
                </div>`

    };
    return elements[domEl]
}
