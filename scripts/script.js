let allLists = {
    listContainer: {},
    listNameArray: [],
    addList: function (listName) {
        allLists.listNameArray.push(listName);
        let index = allLists.listNameArray.length;
        allLists.listContainer["list" + index] = new List(listName, index);
        document.getElementById('todoListDrawerListCont').innerHTML +=
            '<a id="list' + index + '" class="mdl-navigation__link" onclick="displayList()">' + listName + '</a>';
    },
    removeList: function (listIndex) {
        document.getElementById(listIndex);
        delete allLists.listContainer[listIndex];
    }
};
class List {
    constructor(name, listIndex) {
        this.name = name;
        this.tasks = [];
        this.listIndex = listIndex;
        this.completedTasks = [];
        this.domElemement = document.getElementById('list'+ listIndex);
    }
    changeListName(newName) {
        this.name = newName;
        this.domElemement.innerHTML = newName;
    }
    addItem(listItem) {
        this.tasks[listItem.index] += listItem;
    }
    completeItem(listItem) {
        this.completedTasks.push(listItem);
    }
    displayListTools(listIndex) {
        
    }
    displayList(listName) {

    }
}
class ListItem {
    constructor(task, list, index) {
        this.task = task;
        this.list = list;
        this.index = index;
    }
    addDateAndTime(date, time) {
        this.date = date;
        this.time = time;
    }
}
function displayAllListArray() {
    allLists.listNameArray.forEach(function (value, index) {
        document.getElementById('toDoList').innerHTML +=
            '<div class="listNames" id="list' + index + '">' + value + '</div>';
    });
}
function createNewList(listName) {
    allLists.addList(listName);
}
function displayList(listName) {
    document.getElementById('mainContent').innerHTML +=
        "<div class='mdl-card listDisplay mdl-shadow--2dp'>" +
            "<div class='mdl-card__title'>" +
                "<h1 class='mdl-card__title'>" + listName + "</h1>" +
            "</div>" +
            "<div class='taskContainer' id='" + listName + "taskContainer'>" +

            "</div>" +
        "</div>";
    allLists.listContainer[listName].tasks.forEach(function (value, index, array) {

    })
}
function displayTask(task, listIndex) {
    let container = document.getElementById(listName + 'taskContainer');
    container.innerHTML +=
        "<div>";
}