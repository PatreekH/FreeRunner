var box = $('.box');
var boxPos = {width: 30, height: 30};
var hurdlePos = {width: 30, height: 30};
var coinPos = {width: 30, height: 30};

var s = 0;
var p = 0;
var t = 0;

var score = 0;

/*$('#highscoreDiv').hide();*/

//Testing purposes only
var name = "todd";

var launch = false;
var lane = 1;

var h1counter = 0;
var h2counter = 0;
var h3counter = 0;
var h4counter = 0;
var h5counter = 0;
var coinCounter = 0;

var coinsCollected = 0;


//Tracks navbar dropdowns (0 = closed, 1 = open)
var profileStatus = 0;
var shopStatus = 0;

//Window measurments for responsive gameplay
var windowSize = $(window).height();
console.log(windowSize);
var onePercent = windowSize / 100;
console.log(onePercent);

//after animation deleteHurdle function will add 1 to hurdle value then delete
//100% responsive
//add pitfalls
//change box catch dimensions
//cant access any nav buttons while game is started
//alert to refresh window after resizing
//build algo for wall error (if int between here and here = to this and so on, pick random 2 to push back)
//send data to mongodb as all lower case, then when cross ref, setLowercase

//Code for nav

    //Code for login

$('#loginBtn').click(function() {
    if (loginStatus == 0 && launch == false){
        $('#loginDiv').animate({
            top: "38px"
        }, 500);
        loginStatus += 1;
    } else if (profileStatus == 1 && launch == false){
        $('#loginDiv').animate({
            top: "-150px"
        }, 500);
        loginStatus = 0;
    } else if (launch == true){
        console.log("Game has already started");
    }
});

    //Code for profile dropdown

$('#profileBtn').click(function() {
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

    //Code for High Score dropdown

$('#hsBtn').click(function() {
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

    //Code for shop dropdown

$('#shopBtn').click(function() {
    if (shopStatus == 0 && launch == false){
        $('#shopDiv').animate({
            top: "38px"
        }, 500);
        shopStatus += 1;
    } else if (shopStatus == 1 && launch == false){
        $('#shopDiv').animate({
            top: "-150px"
        }, 500);
        shopStatus = 0;
    } else if (launch == true){
        console.log("Game has already started");
    }
});

$('#item0Btn').mouseover(function() {
    $('#item0Btn').css({
        backgroundColor:'grey'
    });
});

$('#item0Btn').mouseout(function() {
    $('#item0Btn').css({
        backgroundColor:'white'
    });
});

$('#item1Btn').mouseover(function() {
    $('#item1Btn').css({
        backgroundColor:'grey'
    });
});

$('#item1Btn').mouseout(function() {
    $('#item1Btn').css({
        backgroundColor:'white'
    });
});

$('#item2Btn').mouseover(function() {
    $('#item2Btn').css({
        backgroundColor:'grey'
    });
});

$('#item2Btn').mouseout(function() {
    $('#item2Btn').css({
        backgroundColor:'white'
    });
});

$('#item3Btn').mouseover(function() {
    $('#item3Btn').css({
        backgroundColor:'grey'
    });
});

$('#item3Btn').mouseout(function() {
    $('#item3Btn').css({
        backgroundColor:'white'
    });
});

$('#item4Btn').mouseover(function() {
    $('#item4Btn').css({
        backgroundColor:'grey'
    });
});

$('#item4Btn').mouseout(function() {
    $('#item4Btn').css({
        backgroundColor:'white'
    });
});

$('#item0Btn').on('click', function(){
    var itemId = $(this).attr('data-id');
    var cost = $('#price1').attr('data-id');
    makePurchase(itemId, cost);
});

$('#item1Btn').on('click', function(){
    var itemId = $(this).attr('data-id');
    var cost = $('#price2').attr('data-id');
    makePurchase(itemId, cost);
});

$('#item2Btn').on('click', function(){
    var itemId = $(this).attr('data-id');
    var cost = $('#price3').attr('data-id');
    makePurchase(itemId, cost);
});

$('#item3Btn').on('click', function(){
    var itemId = $(this).attr('data-id');
    var cost = $('#price4').attr('data-id');
    makePurchase(itemId, cost);
});

$('#item4Btn').on('click', function(){
    var itemId = $(this).attr('data-id');
    var cost = $('#price5').attr('data-id');
    makePurchase(itemId, cost);
});

/*$('#item1Btn').on('click', function(){
    var itemId = $(this).attr('data-id');
    itemUpdate(itemId);
});*/

//Code for user commands

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
        /*pause();*/
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
        startCoinGenerator();
        startScore();
        /*grabHighScoreData();*/

        launch = true;

        $('#profileDiv').animate({
            top: "-=150px"
        }, 500);
        profileStatus = 0;

        $('#shopDiv').animate({
            top: "-150px"
        }, 500);
        shopStatus = 0;

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
    var laneTop = parseFloat(onePercent * 40);
    console.log(laneTop);

    if (pos.top <= parseFloat(laneTop) && launch == true) {
        alert("You Fell!");
        location.reload();
    } else if (pos.top > laneTop && launch == true) {
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
    var laneBottom = parseFloat(onePercent * 51.53);
    console.log(laneBottom);
    if (pos.top >= laneBottom && launch == true) {
        alert("You Fell!");
        location.reload();
    } else if (pos.top < laneBottom && launch == true) {
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
        coinGenerator();
    }, 1800); 
}

function coinGenerator(){
    //Time until next coin
    var nextCoin = Math.floor(Math.random() * (5000 - 2500)) + 2500;
    console.log(nextCoin);

    //Picks random lane
    var coinLane = Math.floor(Math.random() * (5 - 1)) + 1;
    console.log(coinLane);

        var nextCoinTimer = setTimeout(function(){

            coinCounter++;

            if (coinLane == 1){
                $('.lane').append('<div class="h1z hurdle" id="coin-' + coinCounter + '" style="position:fixed;left:110%;top:40%;">' + '<img id="hcube" src="css/images/coin.png">' + '</div>');
            } else if (coinLane == 2){
                $('.lane').append('<div class="h1z hurdle" id="coin-' + coinCounter + '" style="position:fixed;left:108%;top:43%;">' + '<img id="hcube" src="css/images/coin.png">' + '</div>');
            } else if (coinLane == 3){
                $('.lane').append('<div class="h1z hurdle" id="coin-' + coinCounter + '" style="position:fixed;left:106%;top:46%;">' + '<img id="hcube" src="css/images/coin.png">' + '</div>');
            } else if (coinLane == 4){
                $('.lane').append('<div class="h1z hurdle" id="coin-' + coinCounter + '" style="position:fixed;left:104%;top:49%;">' + '<img id="hcube" src="css/images/coin.png">' + '</div>');
            } else if (coinLane == 5){
                $('.lane').append('<div class="h1z hurdle" id="coin-' + coinCounter + '" style="position:fixed;left:102%;top:52%;">' + '<img id="hcube" src="css/images/coin.png">' + '</div>');
            }
            
            $('#coin-' + coinCounter).animate({
                left: '-=120%'
            }, 10000, 'linear');

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

    //rate of speed per 1 second for 130% of window width /10000
    //algo for box position from top

    var newBoxPos = box.position();

    var newHurdle1 = setTimeout(function(){

        h1counter++;

        $('.lane').append('<div class="h1z hurdle" id="hurdle1-' + h1counter + '" style="position:fixed;left:110%;top:40%;">' + '<img id="hcube" src="css/images/hcube.png">' + '</div>');
        
        $('#hurdle1-' + h1counter).animate({
            left: '-=120%'
        }, 10000, 'linear');

        var hurdle1 = $('#hurdle1-' + h1counter);

        var update1 = setInterval(function(){

            var newHurdlePos1 = hurdle1.position();

            newBoxPos = box.position();

            if (newBoxPos.top < newHurdlePos1.top + hurdlePos.width && newBoxPos.top + boxPos.width > newHurdlePos1.top && newBoxPos.left < newHurdlePos1.left + hurdlePos.height && boxPos.height + newBoxPos.left > newHurdlePos1.left && lane == 1) {
                alert("Collision! with lane 1! Score: " + score + " " + "Coins Collected: " + coinsCollected);
                updateAfterRun();
                location.reload();
            }

        }, 1);

    }, interval1);

    var newHurdle2 = setTimeout(function(){

        h2counter++;

        $('.lane').append('<div class="h2z hurdle" id="hurdle2-' + h2counter + '" style="position:fixed;left:108%;top:43%;">' + '<img id="hcube" src="css/images/hcube.png">' + '</div>');
        
        $('#hurdle2-' + h2counter).animate({
            left: '-=120%'
        }, 10000, 'linear');

        var hurdle2 = $('#hurdle2-' + h2counter);

        var update2 = setInterval(function(){

            var newHurdlePos2 = hurdle2.position();

            newBoxPos = box.position();

            if (newBoxPos.top < newHurdlePos2.top + hurdlePos.width && newBoxPos.top + boxPos.width > newHurdlePos2.top && newBoxPos.left < newHurdlePos2.left + hurdlePos.height && boxPos.height + newBoxPos.left > newHurdlePos2.left && lane == 2) {
                alert("Collision! with lane 2! Score: " + score + " " + "Coins Collected: " + coinsCollected);
                updateAfterRun();
                location.reload();
            }

        }, 1);

    }, interval2);

    var newHurdle3 = setTimeout(function(){

        h3counter++;

        $('.lane').append('<div class="h3z hurdle" id="hurdle3-' + h3counter + '" style="position:fixed;left:106%;top:46%;">' + '<img id="hcube" src="css/images/hcube.png">' + '</div>');
        
        $('#hurdle3-' + h3counter).animate({
            left: '-=120%'
        }, 10000, 'linear');

        var hurdle3 = $('#hurdle3-' + h3counter);

        var update3 = setInterval(function(){

            var newHurdlePos3 = hurdle3.position();

            newBoxPos = box.position();

            if (newBoxPos.top < newHurdlePos3.top + hurdlePos.width && newBoxPos.top + boxPos.width > newHurdlePos3.top && newBoxPos.left < newHurdlePos3.left + hurdlePos.height && boxPos.height + newBoxPos.left > newHurdlePos3.left && lane == 3) {
                alert("Collision! with lane 3! Score: " + score + " " + "Coins Collected: " + coinsCollected);
                updateAfterRun();
                location.reload();
            }

        }, 1);

    }, interval3);

    var newHurdle4 = setTimeout(function(){

        h4counter++;

        $('.lane').append('<div class="h4z hurdle" id="hurdle4-' + h4counter + '" style="position:fixed;left:104%;top:49%;">' + '<img id="hcube" src="css/images/hcube.png">' + '</div>');
        
        $('#hurdle4-' + h4counter).animate({
            left: '-=120%'
        }, 10000, 'linear');

        var hurdle4 = $('#hurdle4-' + h4counter);

        var update4 = setInterval(function(){

            var newHurdlePos4 = hurdle4.position();

            newBoxPos = box.position();

            if (newBoxPos.top < newHurdlePos4.top + hurdlePos.width && newBoxPos.top + boxPos.width > newHurdlePos4.top && newBoxPos.left < newHurdlePos4.left + hurdlePos.height && boxPos.height + newBoxPos.left > newHurdlePos4.left && lane == 4) {
                alert("Collision! with lane 4! Score: " + score + " " + "Coins Collected: " + coinsCollected);
                updateAfterRun();
                location.reload();
            }

        }, 1);

    }, interval4);

    var newHurdle5 = setTimeout(function(){

        h5counter++;

        $('.lane').append('<div class="h5z hurdle" id="hurdle5-' + h5counter + '" style="position:fixed;left:102%;top:52%;">' + '<img id="hcube" src="css/images/hcube.png">' + '</div>');
        
        $('#hurdle5-' + h5counter).animate({
        left: '-=120%'
        }, 10000, 'linear');

        var hurdle5 = $('#hurdle5-' + h5counter);

        var update5 = setInterval(function(){

            var newHurdlePos5 = hurdle5.position();

            newBoxPos = box.position();

            if (newBoxPos.top < newHurdlePos5.top + hurdlePos.width && newBoxPos.top + boxPos.width > newHurdlePos5.top && newBoxPos.left < newHurdlePos5.left + hurdlePos.height && boxPos.height + newBoxPos.left > newHurdlePos5.left && lane == 5) {
                alert("Collision! with lane 5! Score: " + score + " " + "Coins Collected: " + coinsCollected);
                updateAfterRun();
                location.reload();
            }

        }, 1);

    }, interval5);

}

//routes for data

    //grabs user name on page load (testing purposes)
grabUserData(name);
grabHighScoreData();

$('#submitUserName').on("click", function(){
    var username = $("#userNameInput").val().trim();
    grabUserData(username);
    return false;
});


function grabHighScoreData(){
    $.ajax({

        method: 'GET',

        url: '/highScoreData',

        success: function(response){
            console.log(response);

            $('#rank1name').append(response.rank1[0]);
            $('#rank1score').html(response.rank1[1]);

            $('#rank2name').append(response.rank2[0]);
            $('#rank2score').html(response.rank2[1]);

            $('#rank3name').append(response.rank3[0]);
            $('#rank3score').html(response.rank3[1]);

            $('#rank4name').append(response.rank4[0]);
            $('#rank4score').html(response.rank4[1]);

            $('#rank5name').append(response.rank5[0]);
            $('#rank5score').html(response.rank5[1]);
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
            $('#profileHs').html(response.score);
            $('#profileCoins').html(response.coins);

            for (i = 0; i < response.items.length; i++){

               if (response.items[i] == true){
                $("#spot" + i).html("<img id='item" + i + "pic' class='hat' src='css/images/hat" + i + ".png'>")
               } else if (response.items[i] == false) {
                $("#spot" + i).empty();
                console.log('Not purchased yet');
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
                updateAllItemData();
            } else if (response.confirmed == false){
                alert('Not enough coins');
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

               if (response.items[i] == true){
                $("#spot" + i).html("<img id='item" + i + "pic' class='hat' src='css/images/hat" + i + ".png'>")
               } else {
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
