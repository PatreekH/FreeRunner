var box = $('.box');
var boxPos = {width: 20, height: 20}
var hurdlePos = {width: 20, height: 20}
var i = 0;
var z = 0;
var k = 0;

//Uncomment "newHurdle" to start hurdle creation

$(document).keydown(function(e) {
    switch (e.which) {
    case 32:
        jump();
        break;
    case 83:
        start();
        break;
    }
});

function start(){
    $('#start').remove();
    $('#ledge-div').animate({
        left: "-=50%"
    }, 10000);
    $('#ledge-block').animate({
        left: "-=50%"
    }, 10000);
}

function jump(){
    $('.box').animate({
        top: '-=85'
    }, 350); 
        fall()
}

function fall(){
     $('.box').animate({
         top: '+=85'
     }, 800);
}

/*var newHurdle = setInterval(function(){
    createHurdle();
}, 1500);*/

function createHurdle(){
    i += 1;
    $('.lane').append('<div class="hurdle" id="hurdle' + i + '" style="position:fixed;left:110%;top:42%;">' + '</div>');
    moveHurdle();
    update();
}

function moveHurdle(){
    z += 1;
    $('#hurdle' + z).animate({
        left: '-=120%'
    }, 7000);
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
        }
    }, 1);
}
