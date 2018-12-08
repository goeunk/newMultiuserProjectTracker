//"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/MultiUserHub").build();
var Bears, Beets, Battlestar;
var chart;


connection.on("ReceiveMessage", function (user, message) {
    var msg = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    var encodedMsg = user + " says " + msg;
    var li = document.createElement("li");
    li.textContent = encodedMsg;
    document.getElementById("messagesList").appendChild(li);

});


var li = document.createElement("li");
connection.on("ReceiveResults", function (bears, beets, battlestar) {
    //var li = document.createElement("li");
    //    var encodedMsg = "Bears: " + bears + "\n" + "Beets: " + beets + "\n" + "Battlestar Gallactica: " + battlestar;
    //    li.textContent = encodedMsg;
    //document.getElementById("resultsList").appendChild(li);

    chart = new CanvasJS.Chart("chartContainer",
        {
            theme: "dark2", // "light1", "light2", "dark1", "dark2"
            exportEnabled: true,
            animationEnabled: true,
            title: {
                text: "Survey"
            },
            data: [
                {
                    type: "column",
                    startAngle: 25,
                    toolTipContent: "<b>{label}</b>: {y}%",
                    showInLegend: "true",
                    legendText: "{label}",
                    indexLabelFontSize: 16,
                    indexLabel: "{label} - {y}",
                    dataPoints: [
                        { y: bears, label: "Bears" },
                        { y: beets, label: "Beets" },
                        { y: battlestar, label: "Battlestar Gallactica" },
                    ]
                }
            ]
        });
    chart.render();
});


connection.start().catch(function (err) {
    return console.error(err.toString());
});


document.getElementById("submitButton").addEventListener("click", function (event) {

    var bears = document.getElementById("bears").checked;
    var beets = document.getElementById("beets").checked;
    var battlestar = document.getElementById("battlestar").checked;

    if (!bears && !beets && !battlestar) {
        alert('Attention: Please make a selection!');
    }

    connection.invoke("SendResults", bears, beets, battlestar).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});


