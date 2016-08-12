var box = $('.box');
var boxPos = {width: 30, height: 30};
var hurdlePos = {width: 30, height: 30};

var s = 0;
var p = 0;
var t = 0;

var score = 0;

var launch = false;
var lane = 1;

var h1counter = 0;
var h2counter = 0;
var h3counter = 0;
var h4counter = 0;
var h5counter = 0;

//after animation deleteHurdle function will add 1 to hurdle value then delete
//lower ledge to fall too
//add pitfalls
//change box catch dimensions

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
    case 80:
        pause();
        break;
    }
});

function start(){
    if (launch == false){
        $('#start').remove();
        $('#ledge-pic').animate({
            left: "-=550px"
        }, 3000);
        $('#ledge-block').animate({
            left: "-=550px"
        }, 3000);
        $('#ledge-block2').animate({
            left: "-=550px"
        }, 3000);
        createHerd();
        startScore();
        launch = true;
        var laneCheck = setInterval(function(){
            if (lane == 1){
                $('.h1z').css("z-index", "5");
                $('.h2z').css("z-index", "5");
            } else if (lane == 2){
                $('.h1z').css("z-index", "3");
                $('.h2z').css("z-index", "5");
                $('.h3z').css("z-index", "5");
            } else if (lane == 3){
                $('.h1z').css("z-index", "2");
                $('.h2z').css("z-index", "3");
                $('.h3z').css("z-index", "5");
                $('.h4z').css("z-index", "5");
            } else if (lane == 4){
                $('.h2z').css("z-index", "2");
                $('.h3z').css("z-index", "3");
                $('.h4z').css("z-index", "5");
                $('.h5z').css("z-index", "5");
            } else if (lane == 5){
                $('.h4z').css("z-index", "3");
                $('.h5z').css("z-index", "5");
            }
        }, 1);
    } else {
        console.log("Game already started!");
    }
}

function pause(){
    alert("PAUSE")
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

//Code for Score

function startScore(){
    $("#scoreDiv").html('<h3>Score: <span id="score"></span></h3>')
    var score = setInterval(function(){
        score += 1;
        $('#score').html(score);
    }, 10);
}

//Code for Hurdles

function createHerd(){
    var herd = 0;
    /*var herdInterval = Math.floor(Math.random() * (2500 - 1200)) + 1200;*/
    var createHerdOfHurdles = setInterval(function(){
        herd += 1;
        console.log("===== Herd: " + herd + "=====")
        createHurdles();
    }, 1800); 
}

function createHurdles(){

    var interval1 = Math.floor(Math.random() * (3700 - 1500)) + 1200;
    var interval2 = Math.floor(Math.random() * (3700 - 1500)) + 1200;
    var interval3 = Math.floor(Math.random() * (2700 - 1500)) + 1200;
    var interval4 = Math.floor(Math.random() * (3700 - 1500)) + 1200;
    var interval5 = Math.floor(Math.random() * (3700 - 1500)) + 1200;

    console.log("Int1: " + interval1);
    console.log("Int2: " + interval2);
    console.log("Int3: " + interval3);
    console.log("Int4: " + interval4);
    console.log("Int5: " + interval5);
    console.log("=============");

    var newBoxPos = box.position();

    var newHurdle1 = setTimeout(function(){

        h1counter++;

        $('.lane').append('<div class="h1z hurdle" id="hurdle1-' + h1counter + '" style="position:fixed;left:110%;top:40%;">' + '<img id="hcube" src="hcube.png">' + '</div>');
        
        $('#hurdle1-' + h1counter).animate({
            left: '-=120%'
        }, 10000, 'linear');

        var hurdle1 = $('#hurdle1-' + h1counter);

        var update1 = setInterval(function(){

            var newHurdlePos1 = hurdle1.position();

            newBoxPos = box.position();

            if (newBoxPos.top < newHurdlePos1.top + hurdlePos.width && newBoxPos.top + boxPos.width > newHurdlePos1.top && newBoxPos.left < newHurdlePos1.left + hurdlePos.height && boxPos.height + newBoxPos.left > newHurdlePos1.left && lane == 1) {
                alert("Collision! with 1");
                location.reload();
            }

        }, 1);

    }, interval1);

    var newHurdle2 = setTimeout(function(){

        h2counter++;

        $('.lane').append('<div class="h2z hurdle" id="hurdle2-' + h2counter + '" style="position:fixed;left:108%;top:43%;">' + '<img id="hcube" src="hcube.png">' + '</div>');
        
        $('#hurdle2-' + h2counter).animate({
            left: '-=120%'
        }, 10000, 'linear');

        var hurdle2 = $('#hurdle2-' + h2counter);

        var update2 = setInterval(function(){

            var newHurdlePos2 = hurdle2.position();

            newBoxPos = box.position();

            if (newBoxPos.top < newHurdlePos2.top + hurdlePos.width && newBoxPos.top + boxPos.width > newHurdlePos2.top && newBoxPos.left < newHurdlePos2.left + hurdlePos.height && boxPos.height + newBoxPos.left > newHurdlePos2.left && lane == 2) {
                alert("Collision! with 2");
                location.reload();
            }

        }, 1);

    }, interval2);

    var newHurdle3 = setTimeout(function(){

        h3counter++;

        $('.lane').append('<div class="h3z hurdle" id="hurdle3-' + h3counter + '" style="position:fixed;left:106%;top:46%;">' + '<img id="hcube" src="hcube.png">' + '</div>');
        
        $('#hurdle3-' + h3counter).animate({
            left: '-=120%'
        }, 10000, 'linear');

        var hurdle3 = $('#hurdle3-' + h3counter);

        var update3 = setInterval(function(){

            var newHurdlePos3 = hurdle3.position();

            newBoxPos = box.position();

            if (newBoxPos.top < newHurdlePos3.top + hurdlePos.width && newBoxPos.top + boxPos.width > newHurdlePos3.top && newBoxPos.left < newHurdlePos3.left + hurdlePos.height && boxPos.height + newBoxPos.left > newHurdlePos3.left && lane == 3) {
                alert("Collision! with 3");
                location.reload();
            }

        }, 1);

    }, interval3);

    var newHurdle4 = setTimeout(function(){

        h4counter++;

        $('.lane').append('<div class="h4z hurdle" id="hurdle4-' + h4counter + '" style="position:fixed;left:104%;top:49%;">' + '<img id="hcube" src="hcube.png">' + '</div>');
        
        $('#hurdle4-' + h4counter).animate({
            left: '-=120%'
        }, 10000, 'linear');

        var hurdle4 = $('#hurdle4-' + h4counter);

        var update4 = setInterval(function(){

            var newHurdlePos4 = hurdle4.position();

            newBoxPos = box.position();

            if (newBoxPos.top < newHurdlePos4.top + hurdlePos.width && newBoxPos.top + boxPos.width > newHurdlePos4.top && newBoxPos.left < newHurdlePos4.left + hurdlePos.height && boxPos.height + newBoxPos.left > newHurdlePos4.left && lane == 4) {
                alert("Collision! with 4");
                location.reload();
            }

        }, 1);

    }, interval4);

    var newHurdle5 = setTimeout(function(){

        h5counter++;

        $('.lane').append('<div class="h5z hurdle" id="hurdle5-' + h5counter + '" style="position:fixed;left:102%;top:52%;">' + '<img id="hcube" src="hcube.png">' + '</div>');
        
        $('#hurdle5-' + h5counter).animate({
        left: '-=120%'
        }, 10000, 'linear');

        var hurdle5 = $('#hurdle5-' + h5counter);

        var update5 = setInterval(function(){

            var newHurdlePos5 = hurdle5.position();

            newBoxPos = box.position();

            if (newBoxPos.top < newHurdlePos5.top + hurdlePos.width && newBoxPos.top + boxPos.width > newHurdlePos5.top && newBoxPos.left < newHurdlePos5.left + hurdlePos.height && boxPos.height + newBoxPos.left > newHurdlePos5.left && lane == 5) {
                alert("Collision! with 5");
                location.reload();
            }

        }, 1);

    }, interval5);

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
