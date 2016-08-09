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


//create 5 rows
//create barriers for each lane side (if box top < this then boxtop==this else do animation)
//dynamically have hurdles entering page
//only detect the current lane hurdles

$(document).keydown(function(e) {
    switch (e.which) {
    case 40:
        up();
        break;
    case 38:
        down();
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
}

function jump(){
    $('.box').animate({
        top: '-=100'
    }, 150, 'linear');
    fall()
}

function fall(){
    $('.box').animate({
        top: '+=100'
    }, 150, 'linear'); 
}

function up(){
    $('.box').animate({
        top: '+=22',
        left: '-=22'
    }, 150, 'linear'); 
}

function down(){
     $('.box').animate({
        top: '-=22',
        left: '+=22'
     }, 150, 'linear');
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
    $('.lane').append('<div class="hurdle" id="hurdle2' + i + '" style="position:fixed;left:108%;top:43%;">' + '<img id="hcube" src="hcube.png">' + '</div>');
    moveHurdle();
    update();
}

function moveHurdle(){
    z += 1;
    $('#hurdle' + z).animate({
        left: '-=165%'
    }, 15000, 'linear');
    $('#hurdle2' + z).animate({
        left: '-=165%'
    }, 15000, 'linear');
    // .remove();
}

function update() {
    k += 1;
    var hurdle = $('#hurdle' + k);
    var update = setInterval(function(){
        var newHurdlePos = hurdle.position();
        var newBoxPos = box.position();
        if (newBoxPos.top < newHurdlePos.top + hurdlePos.width &&
       newBoxPos.top + boxPos.width > newHurdlePos.top &&
       newBoxPos.left < newHurdlePos.left + hurdlePos.height &&
       boxPos.height + newBoxPos.left > newHurdlePos.left) {
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
