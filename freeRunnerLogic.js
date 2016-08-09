var box = $('.box');
var boxPos = {width: 30, height: 30};
var hurdlePos = {width: 30, height: 30};
var i = 0;
var z = 0;
var k = 0;
var s = 0;
var p = 0;
var t = 0;
var r = 0;
var rN;
var launch = false;
var lane = 1;


//create 5 rows
//fall of ledges if over lane size
//dynamically have hurdles entering page
//only detect the current lane hurdles

$(document).keydown(function(e) {
    switch (e.which) {
    case 40:
        down();
        break;
    case 38:
        up();
        break;
    case 83:
        start();
        break;
    case 32:
        jump();
        break;
    }
});

function start(){
    if (launch == false){
        $('#start').remove();
        $('#ledge-pic').animate({
            left: "-=250px"
        }, 2000);
        $('#ledge-block').animate({
            left: "-=250px"
        }, 2000);
        $('#ledge-block2').animate({
            left: "-=250px"
        }, 2000);
        newHurdleSection();
        launch = true;
    } else {
        console.log("Game already started!");
    }
}

function jump(){
    $('.box').animate({
        top: '-=100'
    }, 1100);
    fall()
}

function fall(){
    $('.box').animate({
        top: '+=100'
    }, 1100); 
}

function down(){
    var pos = box.position();
    console.log(pos.top);
    if (pos.top >= 393.1875 && launch == true) {
        alert("You Fell!");
        location.reload();
    } else if (pos.top < 393.1875 && launch == true) {
        $('.box').animate({
            top: '+=22',
            left: '-=22'
        }, 150, 'linear'); 
    }

    if (lane >= 5){
        console.log("Fall");
    } else {
        lane++;
        console.log(lane);
    }
}

function up(){
    var pos = box.position();
    console.log(pos.top);

    if (pos.top <= 305.1875 && launch == true) {
        alert("You Fell!");
        location.reload();
    } else if (pos.top > 305.1875 && launch == true) {
        $('.box').animate({
            top: '-=22',
            left: '+=22'
        }, 150, 'linear'); 
    }

    if (lane <= 1){
        console.log("Fall");
    } else {
        lane--;
        console.log(lane);
    }

}

//Randomly creates obsticales
function createRandomNumbers(rN){
    var interval = Math.floor(Math.random() * (2500 - 1200)) + 1200;
    console.log("Num of hurdles: " + rN + " -- interval at: " + interval);
    if (r != rN){
        r += 1;
        var newHurdle = setTimeout(function(){
            createHurdle();
            createRandomNumbers(rN);
        }, interval);
    } else {
        newHurdleSection();
        /*createDrop();*/
        //make dropoff
        //dropoff resets randomNumbers
    }
}

function newHurdleSection(){
    rN = Math.floor((Math.random() * 8) + 3);
    createRandomNumbers(rN);
    r = 0;
}

/*function createObsticales(rN, interval) {
    if (r != rN){
        r += 1;
        var newHurdle = setTimeout(function(){
            createHurdle();
        }, interval);
    } else {
        //make dropoff
        //dropoff resets randomNumbers
    }
}*/

//Code for Hurdles

/*var newHurdle = setInterval(function(){
    createHurdle();
}, 1500);*/

function createHurdle(){
    i += 1;
    $('.lane').append('<div class="hurdle" id="hurdle' + i + '" style="position:fixed;left:110%;top:40%;">' + '<img id="hcube" src="hcube.png">' + '</div>');
    $('.lane').append('<div class="hurdle" id="hurdle2-' + i + '" style="position:fixed;left:108%;top:43%;">' + '<img id="hcube" src="hcube.png">' + '</div>');
    $('.lane').append('<div class="hurdle" id="hurdle3-' + i + '" style="position:fixed;left:106%;top:46%;">' + '<img id="hcube" src="hcube.png">' + '</div>');
    $('.lane').append('<div class="hurdle" id="hurdle4-' + i + '" style="position:fixed;left:104%;top:49%;">' + '<img id="hcube" src="hcube.png">' + '</div>');
    $('.lane').append('<div class="hurdle" id="hurdle5-' + i + '" style="position:fixed;left:102%;top:52%;">' + '<img id="hcube" src="hcube.png">' + '</div>');
    moveHurdle();
    update();
}

function moveHurdle(){
    z += 1;
    $('#hurdle' + z).animate({
        left: '-=165%'
    }, 15000, 'linear');
    $('#hurdle2-' + z).animate({
        left: '-=165%'
    }, 12000, 'linear');
    $('#hurdle3-' + z).animate({
        left: '-=165%'
    }, 19000, 'linear');
    $('#hurdle4-' + z).animate({
        left: '-=165%'
    }, 14000, 'linear');
    $('#hurdle5-' + z).animate({
        left: '-=165%'
    }, 10000, 'linear');
    // .remove();
}

function update() {
    var newBoxPos = box.position();

    var hurdle1 = $('#hurdle' + i);
    var update1 = setInterval(function(){
        var newHurdlePos1 = hurdle1.position();
        newBoxPos = box.position();
        if (newBoxPos.top < newHurdlePos1.top + hurdlePos.width &&
       newBoxPos.top + boxPos.width > newHurdlePos1.top &&
       newBoxPos.left < newHurdlePos1.left + hurdlePos.height &&
       boxPos.height + newBoxPos.left > newHurdlePos1.left && lane == 1) {
            alert("Collision!");
            location.reload();
        }
    }, 1);

    var hurdle2 = $('#hurdle2-' + i);
    var update2 = setInterval(function(){
        var newHurdlePos2 = hurdle2.position();
        newBoxPos = box.position();
        if (newBoxPos.top < newHurdlePos2.top + hurdlePos.width &&
       newBoxPos.top + boxPos.width > newHurdlePos2.top &&
       newBoxPos.left < newHurdlePos2.left + hurdlePos.height &&
       boxPos.height + newBoxPos.left > newHurdlePos2.left && lane == 2) {
            alert("Collision!");
            location.reload();
        }
    }, 1);


    var hurdle3 = $('#hurdle3-' + i);
    var update3 = setInterval(function(){
        var newHurdlePos3 = hurdle3.position();
        newBoxPos = box.position();
        if (newBoxPos.top < newHurdlePos3.top + hurdlePos.width &&
       newBoxPos.top + boxPos.width > newHurdlePos3.top &&
       newBoxPos.left < newHurdlePos3.left + hurdlePos.height &&
       boxPos.height + newBoxPos.left > newHurdlePos3.left && lane == 3) {
            alert("Collision!");
            location.reload();
        }
    }, 1);


    var hurdle4 = $('#hurdle4-' + i);
    var update4 = setInterval(function(){
        var newHurdlePos4 = hurdle4.position();
        newBoxPos = box.position();
        if (newBoxPos.top < newHurdlePos4.top + hurdlePos.width &&
       newBoxPos.top + boxPos.width > newHurdlePos4.top &&
       newBoxPos.left < newHurdlePos4.left + hurdlePos.height &&
       boxPos.height + newBoxPos.left > newHurdlePos4.left && lane == 4) {
            alert("Collision!");
            location.reload();
        }
    }, 1);

    var hurdle5 = $('#hurdle5-' + i);
    var update5 = setInterval(function(){
        var newHurdlePos5 = hurdle5.position();
        newBoxPos = box.position();
        if (newBoxPos.top < newHurdlePos5.top + hurdlePos.width &&
       newBoxPos.top + boxPos.width > newHurdlePos5.top &&
       newBoxPos.left < newHurdlePos5.left + hurdlePos.height &&
       boxPos.height + newBoxPos.left > newHurdlePos5.left && lane == 5) {
            alert("Collision!");
            location.reload();
        }
    }, 1);

}

//==========Code for dropoffs=============

/*var newDropOff = setInterval(function(){
    createDrop();
}, 10000);*/

function createDrop(){
    s += 1;
    $('.lane').append(
        '<img class="drop-off" id="dropoff' + s + '" src="dropoff.png" style="top:40.75%;left:110%;"><img class="ledge-pic2" id="ledge-pic2' + s + '" src="startLedge2.png" style="top:40.50%;left:115%;">'
    );
    moveLedge();
}

function moveLedge(){
    p += 1;
    $('#dropoff' + p).animate({
        left: '-=165%'
    }, 15000, 'linear');
    $('#ledge-pic2' + p).animate({
        left: '-=165%'
    }, 15000, 'linear');
    newHurdleSection();
}

/*var deleteDropOff = setInterval(function(){
    t += 1;
    $('#dropoff' + t).remove();
    $('#ledge-pic2' + t).remove();
}, 15000);*/

//===========================================
