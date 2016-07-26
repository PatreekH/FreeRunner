var box = $('.box');
var hurdle = $('.hurdle');
var boxPos = {width: 20, height: 20}
var hurdlePos = {width: 30, height: 30}

$( document ).ready(function() {
    $('.hurdle').animate({
        left: '-=1800'
    }, 3000);

});

$(document).keydown(function(e) {
    switch (e.which) {
    case 32:
        jump();
        break;
    }
});

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

function jump(){
        $('.box').animate({
            top: '-=75'
        }, 350); 
        fall()
}

function fall(){
     $('.box').animate({
         top: '+=75'
     }, 600);
}

var newHurdle = setInterval(function(){
    $('.hurdle').css('left', '1700');
    $('.hurdle').animate({
        left: '-=1800'
    }, 3000);
}, 4000);
