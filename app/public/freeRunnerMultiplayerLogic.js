//FREE RUNNER
//b Hernandez

var box = $('.box');
var box2 = $('.box2');
var boxPos = {width: 30, height: 30};
var hurdlePos = {width: 30, height: 30};
var coinPos = {width: 30, height: 30};

//Window measurments for responsive gameplay
var windowHeightSize = $(window).height();
var windowWidthSize = $(window).width();
var laneWrapperHeight = $('.laneWrapper').height();
var laneWrapperWidth = $('.laneWrapper').width();

console.log(windowHeightSize + " " + windowWidthSize);

//1% of the height and width of the on load browser size
var onePercentH = windowHeightSize / 100;
var onePercentW = windowWidthSize / 100;

//Top and Bottom lane measurements based on screen size
var percent15 = parseFloat(onePercentH * 15); 
var laneTop = (percent15 + 169);
var laneBottom = (percent15 + 256);
var lane2Top = (percent15 + 51);
var lane2Bottom = (percent15 + 117);

//Determines the speed of obsticales based on screen width
//184.32 a second
var percent120 = parseFloat(onePercentW * 120);
console.log("120% of screen: " + percent120);
var findSpeed = (percent120 / 184.32);
console.log("Speed: " + findSpeed);
var speedRound = Math.round(findSpeed);
console.log("Speed Rounded: " + speedRound);
var speed = speedRound * 1000;



var score = 0;
var loggedIn;

//Tracks the hurdle to delete when animation is complete
var lane1hurdlesPassed = 0;
var lane2hurdlesPassed = 0;
var lane3hurdlesPassed = 0;
var lane4hurdlesPassed = 0;
var lane5hurdlesPassed = 0;

var lane2_1hurdlesPassed = 0;
var lane2_2hurdlesPassed = 0;
var lane2_3hurdlesPassed = 0;
var lane2_4hurdlesPassed = 0;
var lane2_5hurdlesPassed = 0;

var launch = false;
var lane = 1;
var lane2 = 1;

var name;

//Global counters to track each hurdle that is produced (lanes 1 - 5)
//
var h1counter = 0;
var h2counter = 0;
var h3counter = 0;
var h4counter = 0;
var h5counter = 0;

//tracks the coins generated counter and coins collected during gameplay
var coinCounter = 0;
var coinsCollected = 0;

//Intervals for obsticales, global for placement comparison
var interval1;
var interval2;
var interval3;
var interval4;
var interval5;

//Tracks navbar dropdowns (0 = closed, 1 = open)
var profileStatus = 0;
var shopStatus = 0;
var loginStatus = 0;
/*var logOutStatus = 0;
var signUpStatus = 0;*/



//=======TODO LIST:
//after animation deleteHurdle function will add 1 to hurdle value then delete -- done
//function startLaneDetection for lane collision check to avoid over movement -- done
//cant access any nav buttons while game is started -- done
//user authentication --done
//sign up working correctly -- done
//setup store/profile/signup modal and login div -- done
//put hat on character -- done
//selected hat stays on character after run and on login -- done
//responsive gameplay --done
//onkeydown, if counter >= 5, stop animation -- done
//build algo for wall error -- done


//change box catch dimensions -- see prototype
    //media query box top
//build algo to stop coin and hurdle collision -- attempted
    //--combine hurdle and coin generator to make chain of events, pitfalls as well

//fix item purchase while active glitch
//user is able to remove hat
//battle tab
// --battle tab switches to single player while on battle page
//look into background ideas
//add intructions for non mem and mem
//send user name to mongodb as is, then when cross ref, setLowercase
//look into websockets

//add pitfalls
//alert to refresh window after resizing
//increase in difficulty?

//==========


//Function to grab difference between two numbers
function diff(a,b){return Math.abs(a-b);};

//Code for nav

    //Code for login dropdown

$('#loginBtn').on('click', function() {
    if (loginStatus == 0 && launch == false){
        $('#loginDiv').animate({
            top: "38px"
        }, 500);
        loginStatus += 1;
    } else if (loginStatus == 1 && launch == false){
        $('#loginDiv').animate({
            top: "-150px"
        }, 500);
        loginStatus = 0;
    } else if (launch == true){
        console.log("Game has already started");
    }
});

$("#submitLoginInfo").on("click", function(){
    var usernameInput = $("#usernameInput").val().trim();
    var passwordInput = $("#passwordInput").val().trim();
    console.log(usernameInput + " " + passwordInput);
    loginAttempt(usernameInput, passwordInput);
    return false;
});

$("#signUp").on("click", function(){
	/*signUpStatus += 1;*/
	$('#signUpModal').modal('show');
});

$("#submitNewUser").on("click", function(){
	var usernameSignUp = $("#signupUserName").val().trim();
    var passwordSignUp = $("#signupPassword").val().trim();
    var passwordCheck = $("#signupPasswordCheck").val().trim();
    var usernameCharCountCheck = $.trim($("#signupUserName").val());
    var passwordCharCountCheck = $.trim($("#signupPassword").val());
    /*console.log("HERE  " + usernameCharCountCheck + "PS" + passwordCharCountCheck);*/
    if (usernameCharCountCheck <= 0 || passwordCharCountCheck <= 0){
    	alert('Please fill out both forms');
    } else if (passwordSignUp != passwordCheck){
    	alert('Passwords do not match')
    } else {
	    $.ajax({

	        method: 'POST',

	        url: '/submitNewUser',

	        data: {
	            newUser: usernameSignUp,
	            newPass: passwordSignUp
	        },

	        success: function(response){
		        console.log(response);
		        if (response == 'success'){
		        	alert('Successfully signed up! You may now login!');
		        	/*location.reload();*/
                    $('#signUpModal').modal('hide');
		        } else {
		        	alert('Error');
		        }
	        }

	    });
    }
});

$("#loginAccept").on("click", function(){
	location.reload();
});

$("#logOutRequest").on("click", function(){
	/*logOutStatus += 1;*/
	$('#logOutModal').modal('show');
});

$("#logOutConfirm").on("click", function(){
	$.ajax({

        method: 'GET',

        url: '/logout',

        success: function(response){
        	if (response == "success"){
        		alert("You have logged out");
        		location.reload();
        	}
        }

    });
});

    //==================

    //Code for battle button
$('#battleBtn').on('click', function(){

});

    //==================

    //Code for profile dropdown

$('#profileBtn').on('click', function(){
    if (profileStatus == 0 && launch == false){
        $('#profileDiv').animate({
            top: "38px"
        }, 500);
        profileStatus += 1;
    } else if (profileStatus == 1 && launch == false){
        $('#profileDiv').animate({
            top: "-150px"
        }, 500);
        profileStatus = 0;
    } else if (launch == true){
        console.log("Game has already started");
    }
});

$('#hatPlaceHolder').on('click', function(){
    $('#spot' + currentHat).html("<img data-id='1' id='itemPorfile" + currentHat + "pic' class='hatProfile' src='css/images/hat" + currentHat + ".png'>");
});

$('.pItem').on('click', function(){
	var hatId = $(this).attr('data-id');
	var purchasedCheck = $('#itemProfile' + hatId + 'pic').attr('data-id');

	if (purchasedCheck != 1){
		console.log("You don't have this hat!");
	} else {
		if (currentHat != null){
			$('#spot' + currentHat).html("<img data-id='1' id='itemProfile" + currentHat + "pic' class='hatProfile' src='css/images/hat" + currentHat + ".png'>");
		}
		selectHat(hatId);
	}
});

var currentHat;

function selectHat(itemId){
	currentHat = itemId;
	$('#currentHat').remove();
	$('#spot' + itemId).empty();
	$('#spot' + itemId).html("ON");
	$('.box').append("<img id='currentHat' class='hat' src='css/images/hat" + itemId + ".png'>");
    currentHatUpdate(itemId);
}

function currentHatUpdate(itemId){
    $.ajax({

        method: 'POST',

        url: '/updateCurrentHat',

        data: {
                currentUser: name,
                currentHat: itemId
        },

        success: function(response){
            console.log(response + "what is this")
        }

    });
}

    //==================

    //Code for High Score dropdown

$('#hsBtn').on('click',  function() {
    if (profileStatus == 0 && launch == false){
        $('#highscoreDiv').animate({
            top: "38px"
        }, 500);
        profileStatus += 1;
    } else if (profileStatus == 1 && launch == false){
        $('#highscoreDiv').animate({
            top: "-150px"
        }, 500);
        profileStatus = 0;
    } else if (launch == true){
        console.log("Game has already started");
    }
});

    //==================

    //Code for shop modal

$('#shopBtn').on('click', function() {
    if (launch == false){
        $('#shopModal').modal('show');
    } else if (launch == true){
        console.log("Game has already started");
    }
});

var nextSlide = 2;
var currentSlide = 1;
var itemDataId = 1;
var previousSlide = 0;

function itemSlide(){
    $('#item' + currentSlide + "pic").addClass('currentItem');
    $('#item' + currentSlide + "pic").removeClass('notSelected');
    $('#item' + previousSlide + "pic").addClass('notSelected');
    $('#item' + previousSlide + "pic").removeClass('currentItem');
    $('#item' + nextSlide + "pic").addClass('notSelected');
    $('#item' + nextSlide + "pic").removeClass('currentItem');
};

$('#shopSelectRight').on('click', function(){
    if (currentSlide == 4){
        console.log('no more items left!');
    } else {
        $('.itemDiv').animate({
            marginLeft: "-=138"
        }, 250);
        itemDataId += 1;
        $("#purchaseItem").attr("data-id", itemDataId);
        currentSlide += 1;
        previousSlide += 1;
        nextSlide += 1;
        itemSlide();
    }

});

$('#shopSelectLeft').on('click', function(){
if (currentSlide == 0){
        console.log('no more items left!');
    } else {
        $('.itemDiv').animate({
            marginLeft: "+=138"
        }, 250);
        itemDataId -= 1;
        $("#purchaseItem").attr("data-id", itemDataId);
        currentSlide -= 1;
        previousSlide -= 1;
        nextSlide -= 1;
        itemSlide();
    }
});

$('#purchaseItem').on('click', function(){
    var itemId = $(this).attr('data-id');
    var cost = $('#price' + itemDataId).attr('data-id');
    makePurchase(itemId, cost);
});

    //==================

    //Code for user commands

$(document).keyup(function(e) {
    switch (e.which) {
    case 40:
        var box1Pos = box.position();
        down(box1Pos, '.box', laneBottom, 1);
        break;
    case 38:
        var box1Pos = box.position();
        up(box1Pos,'.box', laneTop, 1);
        break;
    case 87:
        var box2Pos = box2.position();
        up(box2Pos,'.box2', lane2Top, 2);
        break;
    case 83:
        var box2Pos = box2.position();
        down(box2Pos,'.box2', lane2Bottom, 2);
        break;
    case 32:
        /*jump();*/
        break;
    case 80:
        /*pause();*/
        break;
    }
});

var map = {16: false, 83: false};
$(document).keydown(function(e) {
    if (e.keyCode in map) {
        map[e.keyCode] = true;
        if (map[16] && map[83]) {
	        if (loginStatus == 1){
	   			console.log("Can't start while tabs are open");
	    	} else {
	    		start();
	    	}
        }
    }
}).keyup(function(e) {
    if (e.keyCode in map) {
        map[e.keyCode] = false;
    }
});

function start(){
    if (launch == false){
        $('#start').remove();
        $('.ledge-pic').animate({
            left: "-=650px"
        }, 3000);
        $('.ledge-block').animate({
            left: "-=650px"
        }, 3000);
        $('.ledge-block2').animate({
            left: "-=650px"
        }, 3000);

        $('.ledge-pic2').animate({
            left: "-=650px"
        }, 3000);
        $('.ledge-block1-2').animate({
            left: "-=650px"
        }, 3000);
        $('.ledge-block2-2').animate({
            left: "-=650px"
        }, 3000);

        createHerd();
        startScore();

        if (loggedIn == true){
        	startCoinGenerator();
        } else {
            $('#loginDiv').animate({
                top: "-=150px"
            }, 500);
            loginStatus = 0;    
        }

        launch = true;

        $('#profileDiv').animate({
            top: "-=150px"
        }, 500);
        profileStatus = 0;

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
                $('.h3z').css("z-index", "4");
                $('.h4z').css("z-index", "5");
            } else if (lane == 4){
                $('.h1z').css("z-index", "1");
                $('.h2z').css("z-index", "2");
                $('.h3z').css("z-index", "3");
                $('.h4z').css("z-index", "4");
                $('.h5z').css("z-index", "5");
            } else if (lane == 5){
                $('.h4z').css("z-index", "3");
                $('.h5z').css("z-index", "5");
            }
            if (lane2 == 1){
                $('.h1z').css("z-index", "5");
                $('.h2z').css("z-index", "5");
            } else if (lane2 == 2){
                $('.h1z').css("z-index", "3");
                $('.h2z').css("z-index", "5");
                $('.h3z').css("z-index", "5");
            } else if (lane2 == 3){
                $('.h1z').css("z-index", "2");
                $('.h2z').css("z-index", "3");
                $('.h3z').css("z-index", "4");
                $('.h4z').css("z-index", "5");
            } else if (lane2 == 4){
                $('.h1z').css("z-index", "1");
                $('.h2z').css("z-index", "2");
                $('.h3z').css("z-index", "3");
                $('.h4z').css("z-index", "4");
                $('.h5z').css("z-index", "5");
            } else if (lane2 == 5){
                $('.h4z').css("z-index", "3");
                $('.h5z').css("z-index", "5");
            }
        }, 1);

        var barrierCheck = setInterval(function(){
            var posCheck = box.position();
            if (posCheck.top <= parseFloat(laneTop) && lane == 1){
                $('.box').stop();
            } else if (posCheck.top >= parseFloat(laneBottom) && lane == 5){
                $('.box').stop();
            }

        }, 1);

    } else {
        console.log("Game already started!");
    }
}

function pause(){
    alert("PAUSE");
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

function up(pos, box, laneTop, boxlane){
/*    var pos = box.position();*/
    console.log(pos.top + " " + laneTop);

    if (pos.top <= parseFloat(laneTop)){
        console.log("Fall");
    } else if (pos.top > laneTop /*&& launch == true*/) {
        $(box).animate({
            top: '-=22',
            left: '+=22'
        }, 150, 'linear'); 
    }

    if (boxlane == 1){
        if (lane <= 1){
            console.log("Fall");
        } else {
            lane--;
            console.log("lane: " + lane);
        }
    } else if (boxlane == 2){
        if (lane2 <= 1){
            console.log("Fall");
        } else {
            lane2--;
            console.log("lane: " + lane2);
        }  
    }
}

function down(pos, box, laneBottom, boxlane){
/*    var pos = box.position();*/
    console.log(pos.top + " " + laneBottom)
    if (pos.top >= parseFloat(laneBottom)){
        console.log("Fall");
    } else if (pos.top < laneBottom /*&& launch == true*/) {
        $(box).animate({
            top: '+=22',
            left: '-=22'
        }, 150, 'linear'); 
    }

    if (boxlane == 1){
        if (lane >= 5){
            console.log("Fall");
        } else {
            lane++;
            console.log("lane: " + lane);
        }
    } else if (boxlane == 2){
        if (lane2 >= 5){
            console.log("Fall");
        } else {
            lane2++;
            console.log("lane: " + lane2);
        }  
    }
}

//Code for Score

function startScore(){
    /*$("#scoreDiv").html('<h3>Score: <span id="score"></span></h3>')*/
    var scoreInt = setInterval(function(){
        score += 1;
        /*$('#score').html(score);*/
    }, 10);
}

//Code for Coins

function startCoinGenerator(){
    var coinsGenerated = 0;
    var generateCoins = setInterval(function(){
        coinsGenerated += 1;
        console.log("Coins generated: " + coinsGenerated);
        coinCheck();
    }, 1800); 
}

function coinCheck(){
    //Time until next coin
    var nextCoin = Math.floor(Math.random() * (3000 - 2500)) + 2500;

    //Picks random lane
    var coinLane = Math.floor(Math.random() * (5 - 1)) + 1;
    
    if (diff(nextCoin, interval1) < 400 && coinLane == 1 || 
        diff(nextCoin, interval2) < 400 && coinLane == 2 || 
        diff(nextCoin, interval3) < 400 && coinLane == 3 ||
        diff(nextCoin, interval4) < 400 && coinLane == 4 ||
        diff(nextCoin, interval5) < 400 && coinLane == 5){
        console.log("ERROR coin was delayed due to unauthorized placement");
        nextCoin += 150;
        coinGenerator(nextCoin, coinLane);
        console.log("Coin interval: " + nextCoin);
    } else {
        coinGenerator(nextCoin, coinLane);
        console.log("Coin interval: " + nextCoin);
    }
}

function coinGenerator(nextCoin, coinLane){

        var nextCoinTimer = setTimeout(function(){

            coinCounter++;

            if (coinLane == 1){
                $('.lane').append('<div class="h1z hurdle" id="coin-' + coinCounter + '" style="position:fixed;left:110%;top:168.5px;">' + '<img id="hcube" src="css/images/coin.png">' + '</div>');
            } else if (coinLane == 2){
                $('.lane').append('<div class="h2z hurdle" id="coin-' + coinCounter + '" style="position:fixed;left:108%;top:191.4px;">' + '<img id="hcube" src="css/images/coin.png">' + '</div>');
            } else if (coinLane == 3){
                $('.lane').append('<div class="h3z hurdle" id="coin-' + coinCounter + '" style="position:fixed;left:106%;top:214.3px;">' + '<img id="hcube" src="css/images/coin.png">' + '</div>');
            } else if (coinLane == 4){
                $('.lane').append('<div class="h4z hurdle" id="coin-' + coinCounter + '" style="position:fixed;left:104%;top:237.2px;">' + '<img id="hcube" src="css/images/coin.png">' + '</div>');
            } else if (coinLane == 5){
                $('.lane').append('<div class="h5z hurdle" id="coin-' + coinCounter + '" style="position:fixed;left:102%;top:260.1px;">' + '<img id="hcube" src="css/images/coin.png">' + '</div>');
            }
            
            $('#coin-' + coinCounter).animate({
                left: '-=120%'
            }, speed, 'linear');

            var coin = $('#coin-' + coinCounter);

            var updateCoin = setInterval(function(){

                var newCoin = coin.position();

                newBoxPos = box.position();

                if (newBoxPos.top < newCoin.top + coinPos.width && newBoxPos.top + boxPos.width > newCoin.top && newBoxPos.left < newCoin.left + coinPos.height && boxPos.height + newBoxPos.left > newCoin.left && lane == coinLane) {
                    coin.remove();
                    coinsCollected += 1;
                    score += 100;
                }

            }, 1);
        }, nextCoin);
}

//Code for Hurdles

function createHerd(){
    var herd = 0;
    /*var herdInterval = Math.floor(Math.random() * (1800 - 1600)) + 1600;*/
    var createHerdOfHurdles = setInterval(function(){
        herd += 1;
        console.log("===== Herd: " + herd + "=====")
        createIntervals();
    }, 1800); 
}

function createIntervals(){

    interval1 = Math.floor(Math.random() * (3000 - 1500)) + 1500;
    interval2 = Math.floor(Math.random() * (3000 - 1500)) + 1500;
    interval3 = Math.floor(Math.random() * (3000 - 1500)) + 1500;
    interval4 = Math.floor(Math.random() * (3000 - 1500)) + 1500;
    interval5 = Math.floor(Math.random() * (3000 - 1500)) + 1500;

    if (diff(interval1, interval2) < 500 && diff(interval2, interval3) < 500 && diff(interval3, interval4) < 500 && diff(interval4, interval5) < 500){
        console.log("#ERROR: WALL CREATED#");
        interval1 += 700;
        interval3 += 700;
/*        console.log("Int1: " + interval1 + " +700 delay");
        console.log("Int2: " + interval2);
        console.log("Int3: " + interval3 + " +700 delay");
        console.log("Int4: " + interval4);
        console.log("Int5: " + interval5);
        console.log("=====Wall Fixed=====");*/
        createHurdles(interval1, interval2, interval3, interval4, interval5);
        createHurdles2(interval1, interval2, interval3, interval4, interval5);
    } else {
        createHurdles(interval1, interval2, interval3, interval4, interval5);
        createHurdles2(interval1, interval2, interval3, interval4, interval5);
/*        console.log("Int1: " + interval1);
        console.log("Int2: " + interval2);
        console.log("Int3: " + interval3);
        console.log("Int4: " + interval4);
        console.log("Int5: " + interval5);
        console.log("====================");*/
    }

}

    //rate of speed per 1 second for 130% of window width /10000
    //algo for box position from top

function createHurdles(interval1, interval2, interval3, interval4, interval5){

    var newBoxPos = box.position();

    var newHurdle1 = setTimeout(function(){

        h1counter++;

        $('.lane').append('<div class="h1z hurdle" id="hurdle1-' + h1counter + '" style="position:fixed;left:110%;top:168.5px;">' + '<img id="hcube" src="css/images/hcube.png">' + '</div>');
        
        $('#hurdle1-' + h1counter).animate({
            left: '-=120%'
        }, speed, 'linear', function(){
            lane1hurdlesPassed++;
            $('#hurdle1-' + lane1hurdlesPassed).remove();
        });

        var hurdle1 = $('#hurdle1-' + h1counter);

        var update1 = setInterval(function(){

            var newHurdlePos1 = hurdle1.position();

            newBoxPos = box.position();

            if (newBoxPos.top < newHurdlePos1.top + hurdlePos.width && newBoxPos.top + boxPos.width > newHurdlePos1.top && newBoxPos.left < newHurdlePos1.left + hurdlePos.height && boxPos.height + newBoxPos.left > newHurdlePos1.left && lane == 1) {
            	removeHurdles(h1counter, 1);
                alert("Collision! with lane 1! Score: " + score + " " + "Coins Collected: " + coinsCollected  + " hurdle: 1-" + h1counter);
                if (loggedIn == true){
                    updateAfterRun();
                }
                location.reload();
            }

        }, 1);

    }, interval1);

    var newHurdle2 = setTimeout(function(){

        h2counter++;

        $('.lane').append('<div class="h2z hurdle" id="hurdle2-' + h2counter + '" style="position:fixed;left:108%;top:191.4px;">' + '<img id="hcube" src="css/images/hcube.png">' + '</div>');
        
        $('#hurdle2-' + h2counter).animate({
            left: '-=120%'
        }, speed, 'linear', function(){
            lane2hurdlesPassed++;
            $('#hurdle2-' + lane2hurdlesPassed).remove();
        });

        var hurdle2 = $('#hurdle2-' + h2counter);

        var update2 = setInterval(function(){

            var newHurdlePos2 = hurdle2.position();

            newBoxPos = box.position();

            if (newBoxPos.top < newHurdlePos2.top + hurdlePos.width && newBoxPos.top + boxPos.width > newHurdlePos2.top && newBoxPos.left < newHurdlePos2.left + hurdlePos.height && boxPos.height + newBoxPos.left > newHurdlePos2.left && lane == 2) {
            	removeHurdles(h2counter, 2);
                alert("Collision! with lane 2! Score: " + score + " " + "Coins Collected: " + coinsCollected  + " hurdle: 2-" + h2counter);
                if (loggedIn == true){
                    updateAfterRun();
                }
                location.reload();
            }

        }, 1);

    }, interval2);

    var newHurdle3 = setTimeout(function(){

        h3counter++;

        $('.lane').append('<div class="h3z hurdle" id="hurdle3-' + h3counter + '" style="position:fixed;left:106%;top:214.3px;">' + '<img id="hcube" src="css/images/hcube.png">' + '</div>');
        
        $('#hurdle3-' + h3counter).animate({
            left: '-=120%'
        }, speed, 'linear', function(){
            lane3hurdlesPassed++;
            $('#hurdle3-' + lane3hurdlesPassed).remove();
        });

        var hurdle3 = $('#hurdle3-' + h3counter);

        var update3 = setInterval(function(){

            var newHurdlePos3 = hurdle3.position();

            newBoxPos = box.position();

            if (newBoxPos.top < newHurdlePos3.top + hurdlePos.width && newBoxPos.top + boxPos.width > newHurdlePos3.top && newBoxPos.left < newHurdlePos3.left + hurdlePos.height && boxPos.height + newBoxPos.left > newHurdlePos3.left && lane == 3) {
                removeHurdles(h3counter, 3);
                alert("Collision! with lane 3! Score: " + score + " " + "Coins Collected: " + coinsCollected  + " hurdle: 3-" + h3counter);
                if (loggedIn == true){
                    updateAfterRun();
                }
                location.reload();
            }

        }, 1);

    }, interval3);

    var newHurdle4 = setTimeout(function(){

        h4counter++;

        $('.lane').append('<div class="h4z hurdle" id="hurdle4-' + h4counter + '" style="position:fixed;left:104%;top:237.2px;">' + '<img id="hcube" src="css/images/hcube.png">' + '</div>');
        
        $('#hurdle4-' + h4counter).animate({
            left: '-=120%'
        }, speed, 'linear', function(){
            lane4hurdlesPassed++;
            $('#hurdle4-' + lane4hurdlesPassed).remove();
        });

        var hurdle4 = $('#hurdle4-' + h4counter);

        var update4 = setInterval(function(){

            var newHurdlePos4 = hurdle4.position();

            newBoxPos = box.position();

            if (newBoxPos.top < newHurdlePos4.top + hurdlePos.width && newBoxPos.top + boxPos.width > newHurdlePos4.top && newBoxPos.left < newHurdlePos4.left + hurdlePos.height && boxPos.height + newBoxPos.left > newHurdlePos4.left && lane == 4) {
                removeHurdles(h4counter, 4);
                alert("Collision! with lane 4! Score: " + score + " " + "Coins Collected: " + coinsCollected  + " hurdle: 4-" + h4counter);
                if (loggedIn == true){
                    updateAfterRun();
                }
                location.reload();
            }

        }, 1);

    }, interval4);

    var newHurdle5 = setTimeout(function(){

        h5counter++;

        $('.lane').append('<div class="h5z hurdle" id="hurdle5-' + h5counter + '" style="position:fixed;left:102%;top:260.1px;">' + '<img id="hcube" src="css/images/hcube.png">' + '</div>');
        
        $('#hurdle5-' + h5counter).animate({
        left: '-=120%'
        }, speed, 'linear', function(){
            lane5hurdlesPassed++;
            $('#hurdle5-' + lane5hurdlesPassed).remove();
        });

        var hurdle5 = $('#hurdle5-' + h5counter);

        var update5 = setInterval(function(){

            var newHurdlePos5 = hurdle5.position();

            newBoxPos = box.position();

            if (newBoxPos.top < newHurdlePos5.top + hurdlePos.width && newBoxPos.top + boxPos.width > newHurdlePos5.top && newBoxPos.left < newHurdlePos5.left + hurdlePos.height && boxPos.height + newBoxPos.left > newHurdlePos5.left && lane == 5) {
               	removeHurdles(h5counter, 5);
                alert("Collision! with lane 5! Score: " + score + " " + "Coins Collected: " + coinsCollected + " hurdle: 5-" + h5counter);
                if (loggedIn == true){
                    updateAfterRun();
                }
                location.reload();
            }

        }, 1);

    }, interval5);

}





//======================================================================================






function createHurdles2(interval1, interval2, interval3, interval4, interval5){

    var newBox2Pos = box2.position();

    var newHurdle2_1 = setTimeout(function(){

        h1counter++;

        $('.lane2').append('<div class="h1z hurdle" id="hurdle2_1-' + h1counter + '" style="position:fixed;left:110%;top:168.5px;">' + '<img id="hcube" src="css/images/hcube.png">' + '</div>');
        
        $('#hurdle2_1-' + h1counter).animate({
            left: '-=120%'
        }, speed, 'linear', function(){
            lane2_1hurdlesPassed++;
            $('#hurdle2_1-' + lane1hurdlesPassed).remove();
        });

        var hurdle2_1 = $('#hurdle2_1-' + h1counter);

        var update2_1 = setInterval(function(){

            var newHurdlePos2_1 = hurdle2_1.position();

            newBox2Pos = box2.position();

            if (newBox2Pos.top < newHurdlePos2_1.top + hurdlePos.width && newBox2Pos.top + boxPos.width > newHurdlePos2_1.top && newBox2Pos.left < newHurdlePos2_1.left + hurdlePos.height && boxPos.height + newBox2Pos.left > newHurdlePos2_1.left && lane == 1) {
                removeHurdles(h1counter, 1, 2);
                alert("Collision! with box 2 lane 1! Score: " + score + " " + "Coins Collected: " + coinsCollected  + " hurdle: 1-" + h1counter);
                if (loggedIn == true){
                    updateAfterRun();
                }
                location.reload();
            }

        }, 1);

    }, interval1);

    var newHurdle2_2 = setTimeout(function(){

        h2counter++;

        $('.lane2').append('<div class="h2z hurdle" id="hurdle2_2-' + h2counter + '" style="position:fixed;left:108%;top:191.4px;">' + '<img id="hcube" src="css/images/hcube.png">' + '</div>');
        
        $('#hurdle2_2-' + h2counter).animate({
            left: '-=120%'
        }, speed, 'linear', function(){
            lane2_2hurdlesPassed++;
            $('#hurdle2_2-' + lane2hurdlesPassed).remove();
        });

        var hurdle2_2 = $('#hurdle2_2-' + h2counter);

        var update2_2 = setInterval(function(){

            var newHurdlePos2_2 = hurdle2_2.position();

            newBox2Pos = box2.position();

            if (newBox2Pos.top < newHurdlePos2_2.top + hurdlePos.width && newBox2Pos.top + boxPos.width > newHurdlePos2_2.top && newBox2Pos.left < newHurdlePos2_2.left + hurdlePos.height && boxPos.height + newBox2Pos.left > newHurdlePos2_2.left && lane == 2) {
                removeHurdles(h2counter, 2, 2);
                alert("Collision! with box 2 lane 2! Score: " + score + " " + "Coins Collected: " + coinsCollected  + " hurdle: 2-" + h2counter);
                if (loggedIn == true){
                    updateAfterRun();
                }
                location.reload();
            }

        }, 1);

    }, interval2);

    var newHurdle2_3 = setTimeout(function(){

        h3counter++;

        $('.lane2').append('<div class="h3z hurdle" id="hurdle2_3-' + h3counter + '" style="position:fixed;left:106%;top:214.3px;">' + '<img id="hcube" src="css/images/hcube.png">' + '</div>');
        
        $('#hurdle2_3-' + h3counter).animate({
            left: '-=120%'
        }, speed, 'linear', function(){
            lane2_3hurdlesPassed++;
            $('#hurdle2_3-' + lane3hurdlesPassed).remove();
        });

        var hurdle2_3 = $('#hurdle2_3-' + h3counter);

        var update2_3 = setInterval(function(){

            var newHurdlePos2_3 = hurdle2_3.position();

            newBox2Pos = box2.position();

            if (newBox2Pos.top < newHurdlePos2_3.top + hurdlePos.width && newBox2Pos.top + boxPos.width > newHurdlePos2_3.top && newBox2Pos.left < newHurdlePos2_3.left + hurdlePos.height && boxPos.height + newBox2Pos.left > newHurdlePos2_3.left && lane == 3) {
                removeHurdles(h3counter, 3, 2);
                alert("Collision! with box 2 lane 3! Score: " + score + " " + "Coins Collected: " + coinsCollected  + " hurdle: 3-" + h3counter);
                if (loggedIn == true){
                    updateAfterRun();
                }
                location.reload();
            }

        }, 1);

    }, interval3);

    var newHurdle2_4 = setTimeout(function(){

        h4counter++;

        $('.lane2').append('<div class="h4z hurdle" id="hurdle2_4-' + h4counter + '" style="position:fixed;left:104%;top:237.2px;">' + '<img id="hcube" src="css/images/hcube.png">' + '</div>');
        
        $('#hurdle2_4-' + h4counter).animate({
            left: '-=120%'
        }, speed, 'linear', function(){
            lane2_4hurdlesPassed++;
            $('#hurdle2_4-' + lane4hurdlesPassed).remove();
        });

        var hurdle2_4 = $('#hurdle2_4-' + h4counter);

        var update2_4 = setInterval(function(){

            var newHurdlePos2_4 = hurdle2_4.position();

            newBox2Pos = box2.position();

            if (newBox2Pos.top < newHurdlePos2_4.top + hurdlePos.width && newBox2Pos.top + boxPos.width > newHurdlePos2_4.top && newBox2Pos.left < newHurdlePos2_4.left + hurdlePos.height && boxPos.height + newBox2Pos.left > newHurdlePos2_4.left && lane == 4) {
                removeHurdles(h4counter, 4, 2);
                alert("Collision! with box 2 lane 4! Score: " + score + " " + "Coins Collected: " + coinsCollected  + " hurdle: 4-" + h4counter);
                if (loggedIn == true){
                    updateAfterRun();
                }
                location.reload();
            }

        }, 1);

    }, interval4);

    var newHurdle2_5 = setTimeout(function(){

        h5counter++;

        $('.lane2').append('<div class="h5z hurdle" id="hurdle2_5-' + h5counter + '" style="position:fixed;left:102%;top:260.1px;">' + '<img id="hcube" src="css/images/hcube.png">' + '</div>');
        
        $('#hurdle2_5-' + h5counter).animate({
        left: '-=120%'
        }, speed, 'linear', function(){
            lane2_5hurdlesPassed++;
            $('#hurdle2_5-' + lane5hurdlesPassed).remove();
        });

        var hurdle2_5 = $('#hurdle2_5-' + h5counter);

        var update2_5 = setInterval(function(){

            var newHurdlePos2_5 = hurdle2_5.position();

            newBox2Pos = box.position();

            if (newBox2Pos.top < newHurdlePos2_5.top + hurdlePos.width && newBox2Pos.top + boxPos.width > newHurdlePos2_5.top && newBox2Pos.left < newHurdlePos2_5.left + hurdlePos.height && boxPos.height + newBox2Pos.left > newHurdlePos2_5.left && lane == 5) {
                removeHurdles(h5counter, 5, 2);
                alert("Collision! with box 2 lane 5! Score: " + score + " " + "Coins Collected: " + coinsCollected + " hurdle: 5-" + h5counter);
                if (loggedIn == true){
                    updateAfterRun();
                }
                location.reload();
            }

        }, 1);

    }, interval5);

}

//Removes all hurdles on collision to avoid double or endless collisions
function removeHurdles(counter, lane, box){
    if (box == 1){
        for (i = 0; i < counter; i++){
            $('#hurdle' + lane + '-' + i).remove(); 
        }  
    } else if (box == 2){
        for (i = 0; i < counter; i++){
            $('#hurdle2_' + lane + '-' + i).remove(); 
        }  
    }

}

//routes for data

    //grabs user name on page load (testing purposes)

isAuthenticated();

function isAuthenticated(){
    $.ajax({

        method: 'GET',

        url: '/isAuthenticated',

        success: function(response){
            console.log(response);
            //user is not signed in
            if (response == "invalid"){
            	$(".homeBtn").hide();
                /*$(".homeBtn").attr("id","loginBtn");*/
                $("#battleBtn").hide();
                $("#shopBtn").hide();
                $("#hsBtn").hide();
                $("#optionsBtn").hide();

            } else {
                console.log(response);
                loggedIn = true;
                name = response.user
                grabUserData(name);
                grabHighScoreData();
                $("#loginBtn").hide();
                $(".homeBtn").show();
                $("#battleBtn").show();
                $("#shopBtn").show();
                $("#hsBtn").show();
                $("#optionsBtn").show();
            }
        }

    });
}

function loginAttempt(username, password){
    $.ajax({

        method: 'POST',

        url: '/loginAttempt',

        data: {
            user: username,
            pass: password
        },
        success: function(response){
            console.log(response)
            if (response == 'success'){
                $('#successModal').modal('show');
            } else if (response == 'invalid'){
                $('#unsuccessModal').modal('show');
            }
            
            //if response success reload page
        }

    });
}

function grabHighScoreData(){
    $.ajax({

        method: 'GET',

        url: '/highScoreData',

        success: function(response){
            console.log(response);

            $('.rank1name').append(response.rank1[0]);
            $('.rank1score').html(response.rank1[1]);

            $('.rank2name').append(response.rank2[0]);
            $('.rank2score').html(response.rank2[1]);

            $('.rank3name').append(response.rank3[0]);
            $('.rank3score').html(response.rank3[1]);

            $('.rank4name').append(response.rank4[0]);
            $('.rank4score').html(response.rank4[1]);

            $('.rank5name').append(response.rank5[0]);
            $('.rank5score').html(response.rank5[1]);
        }

    });
}

function grabUserData(username){
    $.ajax({

        method: 'POST',

        url: '/userData',

        data: {
            username: username
        },

        success: function(response){
            /*console.log("HERE" + response)*/
            $('#profileHs').html(response.score);
            $('#profileCoins').html(response.coins);
            $('#userName').html(response.username);

            for (i = 0; i < response.items.length; i++){

               if (response.items[i] == true){
                $("#spot" + i).html("<img data-id='1' id='itemProfile" + i + "pic' class='hatProfile' src='css/images/hat" + i + ".png'>")
               } else if (response.items[i] == false) {
                $("#spot" + i).empty();
                console.log('Not purchased yet');
               } else if (response.items[i] == 'active'){
                $('.box').append("<img id='currentHat' class='hat' src='css/images/hat" + i + ".png'>");
                $('#spot' + i).html("<div id='hatPlaceHolder'>ON</div>");
                currentHat = i;
               }

            }
        }

    });
}

function updateAfterRun(){
    $.ajax({

        method: 'POST',

        url: '/updateAfterRun',

        data: {
            username: name,
            coinsCollected: coinsCollected,
            score: parseInt(score)
        },
        success: function(response){
           /* console.log(response)*/
            $('#profileHs').html(response.score);
            $('#profileCoins').html(response.coins);
        }

    });
}

function makePurchase(itemId, cost){
    console.log(cost);
    $.ajax({

        method: 'POST',

        url: '/makePurchase',

        data: {
            itemId: itemId,
            cost: cost,
            username: name
        },

        success: function(response){
            if (response.ok == 1){
            	alert('Successfully purchased item!')
                updateAllItemData();
            } else if (response == 'insufficient'){
                alert('Not enough coins');
            } else if (response == 'owned'){
            	alert('You already own that item!');
            }
        }

    });
}

function updateAllItemData(){
    $.ajax({

        method: 'POST',

        url: '/userData',

        data: {
            username: name
        },

        success: function(response){
            $('#profileCoins').html(response.coins);

            for (i = 0; i < response.items.length; i++){
                console.log(response.items[i]);
               if (response.items[i] == true){
                $("#spot" + i).html("<img data-id='1' id='itemProfile" + i + "pic' class='hatProfile' src='css/images/hat" + i + ".png'>");
               } /*else if (response.items[i] == 'active'){
                $('.box').append("<img id='currentHat' class='hat' src='css/images/hat" + i + ".png'>");
                $('#spot' + i).html("ON");
                currentHat = i;
               }*/
               else {
                console.log('Not purchased yet');
               }

            }

        }

    });
}



//==========Code for dropoffs=============

/*var newDropOff = setInterval(function(){
    createDrop();
}, 10000);*/

/*function createDrop(){
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
*/
/*var deleteDropOff = setInterval(function(){
    t += 1;
    $('#dropoff' + t).remove();
    $('#ledge-pic2' + t).remove();
}, 15000);*/

//===========================================
