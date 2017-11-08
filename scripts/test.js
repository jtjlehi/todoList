function testAddList(name, testNumber) {
    //run the function
    let firstLength = allLists.listNameArray.length;

    allLists.addList(name);

    let newArrayLength = allLists.listNameArray.length;

    let createdObject = allLists.listContainer["list" + newArrayLength];
    //test it does the correct stuff
    function testAddsArray() {
        return newArrayLength === firstLength + 1;
    }
    function testArrayHasName() {
        return allLists.listNameArray[firstLength] === name;
    }
    function testObjectCont() {
        return createdObject.constructor === List;
    }
    function testObjectName() {
        return createdObject.name === name;
    }
    function testObjectArrays() {
        return createdObject.tasks instanceof Array && createdObject.completedTasks instanceof Array;
    }
    function testObjectDomElement() {
        return createdObject.domElemement === domElements.listItem["list" + newArrayLength];
    }
    //actual test
    QUnit.test("List Test " + testNumber, function (assert) {
        assert.ok(testAddsArray(), "A list was successfully added to the array.");
        assert.ok(testArrayHasName(), "The correct name was passed");
        assert.ok(testObjectCont(), "the Object is held in the correct container");
        assert.ok(testObjectName(), "the Object has the correct Name");
        assert.ok(testObjectArrays(), "the Object has both arrays");
        assert.ok(testObjectDomElement(), "the Object has the correct Dom Element");
    });
}
testAddList("hello", 1);
testAddList("goodBye", 2);
