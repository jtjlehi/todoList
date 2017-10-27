let allLists = {
    listContainer: [],
    listNameArray: [],
    addList: function (listName) {
        this.listNameArray.push(listName);
        let divIndex = this.listNameArray.length;
        this.listContainer.push(new List(listName, divIndex));
        document.getElementById('todoListBarCont').innerHTML +=
            '<div id="list' + divIndex + '">' + listName + '</div>';
    },
    removeList: function (listName) {
        delete this.listContainer[listName];
    }
};
class List {
    constructor(name, listDivIndex) {
        this.name = name;
        this.tasks = [];
        this.completedTasks = [];
        this.domElemement = document.getElementById('list'+ listDivIndex);
    }
    changeListName(newName) {
        this.name = newName;
        this.domElemement.innerHTML = newName;
    }
    addItem(listItem) {
        this.tasks[listItem.index] += listItem;
    }
    completeItem() {
        this.completedTasks += listItem;
    }
}
class listItem {
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