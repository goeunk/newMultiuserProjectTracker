"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/MultiUserHub").build();

connection.start().catch(function (err) {
    return console.error(err.toString());
});


connection.on("UpdateText", function (textboxId, message) {
    console.log("update text: " + message);
    document.getElementById(textboxId).value = message;
});


connection.on("LockTextBox", function (textBoxId) {
    console.log("text box is locked : " + textBoxId);
    document.getElementById(textBoxId).disabled = true;
});

connection.on("UnlockText", function (textBoxId) {
    console.log("text box is unlocked : " + textBoxId);
    document.getElementById(textBoxId).disabled = false;
});

connection.on("CreateNewTextBox", function (textBoxId) {
    console.log("create new text box : " + textBoxId);
    CreateNewWorkObject(textBoxId);
});

var onKeyupFunction = function (event) {
    var element = this.id;
    var text = this.value;
    //console.log(event);
    //console.log("element id : " + element)
    connection.invoke("UpdateTextBox", element, text).catch(function (err) {
        return console.error(err.toString);
    });
};

var onFocus = function (event) {
    var elementId = this.id;
    connection.invoke("LockText", elementId).catch(function (err) {
        return console.error(err.toString);
    });
};

var onBlur = function (event) {
    var elementId = this.id;
    connection.invoke("UnlockText", elementId).catch(function (err) {
        return console.error(err.toString);
    });
}

//document.getElementById("messagesList").addEventListener("keyup", onKeyupFunction);
//document.getElementById("messagesList2").addEventListener("keyup", onKeyupFunction);
//document.getElementById("messagesList").addEventListener("focus", onFocus);
//document.getElementById("messagesList2").addEventListener("focus", onFocus);
//document.getElementById("messagesList").addEventListener("blur", onBlur);
//document.getElementById("messagesList2").addEventListener("blur", onBlur);


function ChooseGroup() {

    //document.getElementById("messagesList").style.display = "block";
    //CreateNewWorkObject();
    var elementid = "messagesList" + countMyself();
    connection.invoke("CreateNewTextBox", elementid).catch(function (err) {
        return console.error(err.toString);
    });
}

function CreateNewWorkObject(textid) {
    var textarea = document.createElement("TEXTAREA");
    textarea.addEventListener("blur", onBlur);
    textarea.addEventListener("focus", onFocus);
    textarea.addEventListener("keyup", onKeyupFunction);

    textarea.setAttribute("id", textid);
    document.body.appendChild(textarea);
}

function countMyself() {

    connection.invoke("Increment", elementid).catch(function (err) {
        return console.error(err.toString);

    // Check to see if the counter has been initialized
    if (typeof countMyself.counter == 'undefined') {
        // It has not... perform the initialization
        countMyself.counter = 0;
    }

    // Do something stupid to indicate the value
    console.log(++countMyself.counter);
    return countMyself.counter;

}




////"use strict";

//var connection = new signalR.HubConnectionBuilder().withUrl("/MultiUserHub").build();
//connection.onclose(() => setTimeout(startSignalRConnection(connection), 5000));

////document.onload(() => getElementById("messagesList").style.display = hidden);


//connection.start().catch(function (err) {
//    return console.error(err.toString());
//});

//document.addEventListener("DOMContentLoaded", function () {
//    document.getElementById("indexChooseGroup").addEventListener("click", showProject, false);
   
//});

//document.getElementById("messagesList").addEventListener("keyup", onKeyupFunction);
//document.getElementById("messagesList").addEventListener("focus", onFocus);
//document.getElementById("messagesList").addEventListener("blur", onBlur);

//function showProject() {

//    var groupSelect = document.getElementById("selectChooseGroup").text;
//    var groupName = groupSelect.options[groupSelect.selectedIndex].text;


//    connection.invoke("GetProjectWithGroupName", groupName).catch(function(err) {
//        return console.error(err.toString());
//    });

//    var x = document.getElementById("messagesList");
//    if (x.style.display === "none") {
//        x.style.display = "block";
//    }
//    else {
//        x.style.display = "none";
//    }
//}

////CREATE GROUP
//var nl = document.getElementById("createGroupSubmit");
//if (nl) {
//    nl.addEventListener("click", ShowNewGroupElements, false);
//}

//function ShowNewGroupElements() {

//    //Hide Other Elements
//    document.getElementById("chooseGroupDiv").style.display = "none";
//    document.getElementById("messagesList").style.display = "none";
//    document.getElementById("lblchoosGrp").style.display = "none";
//    document.getElementById("orBreak").style.display = "none";

//    //Display Needed Elements
//    document.getElementById("newGroupNameDiv").style.display = "block";
//    document.getElementById("createGroupSubmitDiv").style.display = "none";

//};

//var nl = document.getElementById("submitNewGroup");
//if (nl) {
//    nl.addEventListener("click", ShowNewGroupBoard, false);
//}
//function ShowNewGroupBoard() {

//    var groupName = document.getElementById("newGroupName").value;
//    if (groupName === "") {
//        alert('Attention: Please enter a group name!');
//    } else {
//        connection.invoke("CreateGroup", groupName).catch(function (err) {
//            return console.error(err.toString());
//        });

//        document.getElementById("newGroupNameDiv").style.display = "none";
//        document.getElementById("newGroupCreatedDiv").style.display = "block";
//        document.getElementById("lblGroupName").innerText = groupName;

//        showNewProject(); 
//    }

//    //event.preventDefault();
//};

//function showNewProject() {
//    //TODO: Do we want a number of new elements?
//    var x = document.getElementById("messagesList");
//    if (x.style.display === "none") {
//        x.style.display = "block";
//    }
//    else {
//        x.style.display = "none";
//    }
//}

////function newWorkItem() {

////    var br = document.createElement("BR");

////    var clone = document.createElement("textarea");

////    var lock = document.createElement("button");
////    var lockt = document.createTextNode("Lock");       // Create a text node
////    lock.appendChild(lockt);
////    //document.body.appendChild(lock);
////    //clone.appendChild(lock);

////    var unlock = document.createElement("button");
////    var unlockt = document.createTextNode("Unlock");
////    unlock.appendChild(unlockt);
////    //document.body.appendChild(unlock);
////    //clone.appendChild(unlock);

////    document.getElementById("table").appendChild(clone);

////    document.getElementById("table").appendChild(lock); 
////    document.getElementById("table").appendChild(unlock); 

////    //var row = document.getElementById("messagesList");
////    var table = document.getElementById("table"); 
////    //var clone = row.cloneNode(true); 
////    //clone.id = "newID"; 

////    table.appendChild(clone); 

////    /*
////     *
////     *     var row = document.getElementById("rowToClone"); // find row to copy
////     var table = document.getElementById("tracklist"); // find table to append to
////     var clone = row.cloneNode(true); // copy children too
////     clone.id = "newID"; // change id or other attributes/contents
////     table.appendChild(clone); // add new row to end of table
////     */

////}