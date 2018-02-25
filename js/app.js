/* ----------------- Matching Game main DOM Manipulation using jQuery v3.3.1 ----------------- 
    Matching Game *** Alexandre Furstenberger  

   * Created by Alexandre Furstenberger
   * Date: February 2018
   * Project: developed as a project for Udacity's Front End Web Developer Nanodegree
   * jQuery v3.3.1
   * Bootstrap v4.0

*/

/* Sections
   ======================================================================================== */

   /*  Define array of icons to sort through the cards. For each game a random call will 
    bring a different icon for the game from the array.
    There will be more icons than the total of possible pairs so the user experience is enhanced. 
*/
const cardIcons = ['android', 'airplanemode_active', 'cake', 'casino', 'cloud_queue', 'directions_run',
    'directions_transit', 'free_breakfast', 'keyboard_voice', 'public', 'sentiment_very_satisfied',
    'wifi', 'visibility', 'videogame_asset', 'verified_user', 'thumb_up', 'star', 'signal_wifi_4_bar',
    'signal_cellular_null', 'signal_cellular_4_bar', 'sentiment_very_dissatisfied', 'sentiment_neutral'];

//  Define grid size. Grid size equal (# of rows) * (# of columns)    
const gridSize = 16;

// array for cards storage
let gridCardsArray = [];

// cards faced up counter
let cardFaceUpCount = 0;

// timer for the game
let myTimer = null;
let timerStart = null;

$(document).ready(function () {


    // start game creation
    startGame();

    // add event listener for card click
    $('.card').click(clickCard);

    $('#restart').click(restartGame);

    $('.btn-secondary').click(restartGame);

});

// start game function - start card grid and initialize cards
function startGame(){

    // create the grid array
    gridCardsArray = createGrid();

    // start cards with objects IDs and Icon values
    initCards();

}

// restart game without refreshing page
function restartGame() {


    // reset DOM to original status
    clearInterval(myTimer); // stop time counter
    myTimer = null;
    cardFaceUpCount = 0;
    $('#timer').text('0 Seconds'); // reset counter text
    $('.deck').find('i').remove(); // remove all icons
    $('.card').removeClass('flip faceup matched'); //remove previously added classes
    $('#moves').text(0); // reset move counter
    $('#star-score').find('i').text('star'); // reset stars value
    

    // start game again
    startGame();

}



// --------------- card grid creation function --------------

function createGrid() {

    // create grid card array to store objects
    let cardsArray = [];

    // randomly selects icons for grid cards
    const shuffled = cardIcons.sort(() => .5 - Math.random()); // shuffle  
    let selected = shuffled.slice(0, gridSize / 2); //get sub-array of first n elements AFTER shuffle

    let idTag = 0; // creates IDs for the objects for their constructors

    // create grid cards objects and store them in the array
    for (i = 0; i < selected.length; i++) {

        // create the cards pair with same icons but different IDs
        let firstCard = new gridCard(selected[i], idTag);       // create the first card
        let secondCard = new gridCard(selected[i], idTag + 1);    // create the second card
        cardsArray.push(firstCard, secondCard);

        idTag = idTag + 2; // increment idTag 

    }

    // shuffle array after creation

    cardsArray = cardsArray.sort(() => .5 - Math.random()); // shuffle 

    return cardsArray;

}

// manipulate DOM to add the attribute ID with value equal to all cards
function initCards() {

    //iterates over all card DOM elements
    let cards = $('.card').each(function(index){
        
        // set DOM element ID attribute with object ID property
        $(this).attr('id', gridCardsArray[index].getCardID());

        // create child for card Icon as per materialize library and add classes
        let cardIcon = $('<i>').toggleClass('material-icons panel-heading');
        // append child element to cards
        $(this).append(cardIcon);

    });
    
}

function clickCard() {

    
    //start game timer
    
    if (myTimer == null) {
    
        timerStart = new Date;

        myTimer = setInterval(function () {
            $('#timer').text(Math.round((new Date - timerStart) / 1000, 0) + " Seconds");
        }, 1000);

    }

    //unbind click event to avoid clicks between animations
    $('.card').unbind('click');

    //get card ID from the DOM element
    const cardID = parseInt($(this).attr('id'),10);

    // find index if grid cards array matching the card ID
    const indexCurrentCard = gridCardsArray.findIndex(i => i.getCardID() === cardID);
    
    // execute this code if the clicked card is not matched yet
    if (!gridCardsArray[indexCurrentCard].cardMatched()) {

        //get card icon to show when clicked
        const iconText = gridCardsArray[indexCurrentCard].getCardIcon();

        // set background color and flip the card
        $(this).addClass('flip faceup').find('i').text(iconText);

        // search in the cards object array for another clicked card
        const indexClickedPair = gridCardsArray.findIndex(i => i.cardClicked() === true);

       // call function to compare values - wait 1 second for player to see cards
        if (indexClickedPair === -1) {

            // if it is the first card of the pair clicked then set clicked status to true and move on
            gridCardsArray[indexCurrentCard].setClickedStatus(true);
        }
        else {

            // if there is a non matched and clicked card program will compare icon values
            // wait 1 sec for player to see card
            setTimeout(function(){
                
                // test if the card clicked is repeated. 
                if (indexCurrentCard !== indexClickedPair) {

                    compareIcons(indexCurrentCard, indexClickedPair);

                } //If yes, return the function 
                else return;

                // add score count
                score();

                // if all cards face up call end game message
                if (cardFaceUpCount === gridCardsArray.length) { 

                    endGame();

                    clearInterval(timeCounter);

                }

            }, 1000);
        }

    }

    //rebind click after routine completion
    $('.card').click(clickCard);

}

function compareIcons(iCurrent, iPair) {
    
    // if it is the second card of the pair clicked reset the clicked status and move for comparison
    gridCardsArray[iCurrent].setClickedStatus(false);
    gridCardsArray[iPair].setClickedStatus(false);

    // get current clicked card id for DOM manuipulation
    const currentID = gridCardsArray[iCurrent].getCardID();
    // get previously clicked card id for DOM manuipulation
    const pairID = gridCardsArray[iPair].getCardID();

    // set jQuery elements to variables - avoid multiple querys over DOM
    let currentCard = $('#' + currentID);
    let pairCard = $('#' + pairID);

    // compare if icons are the same
    if (gridCardsArray[iCurrent].getCardIcon() === gridCardsArray[iPair].getCardIcon()) {

        // if icons equal then set matched status to true
        gridCardsArray[iCurrent].setMatchedStatus(true);
        gridCardsArray[iPair].setMatchedStatus(true);

        // add right background
        animateCardRight(currentCard);
        animateCardRight(pairCard);

        cardFaceUpCount = cardFaceUpCount + 2;

    } else {
       
        
        // set red animation for the wrong matched pair
        animateCardWrong(currentCard);
        animateCardWrong(pairCard);

    }

} 

function animateCardWrong (cardAnimated) {

    // add red effect to cards
    cardAnimated.addClass('wrong');

    // code to execute after animation ends
    cardAnimated.one('webkitAnimationEnd oanimationend msAnimationEnd animationend',
        function (e) {
            
            // unbind event to prevent other animation ends to come over this function
            cardAnimated.off('webkitAnimationEnd oanimationend msAnimationEnd animationend');

            cardAnimated.find('i').text(''); // erase text so player cannot access values via dev tools from clicked element
            // if icons different then set background color for face down pattern and hide icons
            cardAnimated.removeClass('wrong faceup flip');
            //cardAnimated.removeClass('faceup'); // disable faceup class from clicked element

        });

}

// add new background color for matched cards
function animateCardRight(cardAnimated) {

    // add blue effect to cards
    cardAnimated.toggleClass('matched');

}

function score() {

    //update score
    let movesCounter = $('#moves');

    counter = movesCounter.text();

    counter++;

    movesCounter.text(counter); 

    starScore(counter);
    
}

function starScore(currentScore) {

    // 3    stars for 13 or less movements
    // 2.5  stars for 14 to 16 movements
    // 2    stars for 17 to 19 movements
    // 1.5  stars for 20 to 22 movements
    // 1    star  for 23 to 25 movements
    // 0.5  star  for 26 to 28 movements
    // 0    star  for 29 or more movements

    if (currentScore >= 14 && currentScore <= 16) {
        $('#star3').find('i').text('star_half');
        return;
    }
    if (currentScore >= 17 && currentScore <= 19) {
        $('#star3').find('i').text('star_border');
        return;
    }
    if (currentScore >= 20 && currentScore <= 22){
        $('#star2').find('i').text('star_half');
        return;
    }
    if (currentScore >= 23 && currentScore <= 25) {
        $('#star2').find('i').text('star_border');
        return;
    }
    if (currentScore >= 26 && currentScore <= 28) {
        $('#star1').find('i').text('star_half');
        return;
    } 
    if (currentScore >= 29) {
        $('#star1').find('i').text('star_border');
        return;
    }

}

// count stars and and get score to show on modal
function endGame() {

    let moveCount = $("#moves").text();

    clearInterval(myTimer);
    myTimer = null;

    let timeCount = $('#timer').text();

    console.log(timeCount)

    const starScore = $("#star-score").find('i');
    let halfStar = 0;
    let fullStar = 0;
    cardFaceUpCount = 0;
    
    // count stars
    starScore.each(function (index) {
        if ($(this).text() === 'star_half') { halfStar = 0.5; }
        if ($(this).text() === 'star') { fullStar++; }
    });

    let totalStars = halfStar + fullStar

    $("#win-msg").replaceWith("<p>With " + moveCount + " moves, " + totalStars + " stars in " + timeCount +"</p><p>Woooooo!</p>");
    $('#winModal').modal('show');

}