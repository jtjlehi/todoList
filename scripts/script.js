class list {
    constructor(name) {
        this.name = name;
        this.tasks = [];
        this.completedTasks = [];
    }
    addList() {

    }
    removeList() {

    }
    changeListName(newName) {
        this.name = newName;
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