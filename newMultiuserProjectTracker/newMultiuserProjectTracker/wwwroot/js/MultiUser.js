//"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/MultiUserHub").build();
connection.onclose(() => setTimeout(startSignalRConnection(connection), 5000));

connection.start().catch(function (err) {
    return console.error(err.toString());
});

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById("indexChooseGroup").addEventListener("click", showProject, false);

});


function showProject() {
    var x = document.getElementById("projects");
    if (x.style.display === "none") {
        x.style.display = "block";
    }
    else {
        x.style.display = "none";
    }
}

//CREATE GROUP
document.getElementById("createGroupSubmit").on("click", ShowNewGroupElements, false);
function ShowNewGroupElements() {

    //Hide Other Elements
    document.getElementById("chooseGroupDiv").style.display = "none";
    document.getElementById("projects").style.display = "none";
    document.getElementById("lblchoosGrp").style.display = "none";
    document.getElementById("orBreak").style.display = "none";

    //Display Needed Elements
    document.getElementById("newGroupNameDiv").style.display = "block";
    document.getElementById("createGroupSubmitDiv").style.display = "none";

};


document.getElementById("submitNewGroup").on("click", ShowNewGroupBoard, false);
function ShowNewGroupBoard() {

    var groupName = document.getElementById("newGroupName").value;
    if (groupName === "") {
        alert('Attention: Please enter a group name!');
        return;
    } else {
        connection.invoke("CreateGroup", groupName).catch(function (err) {
            return console.error(err.toString());
        });

        document.getElementById("newGroupNameDiv").style.display = "none";
        document.getElementById("newGroupCreatedDiv").style.display = "block";
        document.getElementById("lblGroupName").innerText = groupName;

        showNewProject(); 
    }

    event.preventDefault();
};

function showNewProject() {
    //TODO: Do we want a number of new elements?
    var x = document.getElementById("projects");
    if (x.style.display === "none") {
        x.style.display = "block";
    }
    else {
        x.style.display = "none";
    }
}

function newWorkItem() {

    var br = document.createElement("BR");

    var clone = document.createElement("textarea");

    var lock = document.createElement("button");
    var lockt = document.createTextNode("Lock");       // Create a text node
    lock.appendChild(lockt);
    //document.body.appendChild(lock);
    //clone.appendChild(lock);

    var unlock = document.createElement("button");
    var unlockt = document.createTextNode("Unlock");
    unlock.appendChild(unlockt);
    //document.body.appendChild(unlock);
    //clone.appendChild(unlock);

    document.getElementById("table").appendChild(clone);

    document.getElementById("table").appendChild(lock); 
    document.getElementById("table").appendChild(unlock); 

    //var row = document.getElementById("projects"); 
    var table = document.getElementById("table"); 
    //var clone = row.cloneNode(true); 
    //clone.id = "newID"; 

    table.appendChild(clone); 

    /*
     *
     *     var row = document.getElementById("rowToClone"); // find row to copy
     var table = document.getElementById("tracklist"); // find table to append to
     var clone = row.cloneNode(true); // copy children too
     clone.id = "newID"; // change id or other attributes/contents
     table.appendChild(clone); // add new row to end of table
     */

}


