/* ----------------- Matching Game main DOM Manipulation using jQuery v3.3.1 ----------------- 
    Matching Game *** Alexandre Furstenberger  

   * Created by Alexandre Furstenberger
   * Date: February 2018
   * Project: developed as a project for Udacity's Front End Web Developer Nanodegree
   * Using jQuery v3.3.1

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


$(function () {

    // create the grid array
    gridCardsArray = createGrid(); 

    // start cards with objects IDs and Icon values
    initCards();

    // add event listener for card click
    $('.card').click(clickCard);

});


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

    //get card ID from the DOM element
    const cardID = parseInt($(this).attr('id'),10);

    // find index if grid cards array matching the card ID
    const indexCurrentCard = gridCardsArray.findIndex(i => i.getCardID() === cardID);
    
    // execute this code if the clicked card is not matched yet
    if (!gridCardsArray[indexCurrentCard].cardMatched()) {

        //get card icon to show when clicked
        const iconText = gridCardsArray[indexCurrentCard].getCardIcon();

        // show card value
        $(this).find('i').text(iconText);

        // set background color for face up pattern
        $(this).toggleClass('faceup');

        // search in the cards object array for another clicked card
        const indexClickedPair = gridCardsArray.findIndex(i => i.cardClicked() === true);

        // call function to compare values
        compareIcons(indexCurrentCard, indexClickedPair)
    
    }

}


function compareIcons(iCurrent, iPair) {

    // if there is a non matched and clicked card program will compare icon values
    if (iPair === -1) {

        // if it is the first card of the pair clicked then set clicked status to true and move on
        gridCardsArray[iCurrent].setClickedStatus(true);

    } else {

        // if it is the second card of the pair clicked reset the clicked status and move for comparison
        gridCardsArray[iCurrent].setClickedStatus(false);
        gridCardsArray[iPair].setClickedStatus(false);

        // compare if icons are the same
        if (gridCardsArray[iCurrent].getCardIcon() === gridCardsArray[iPair].getCardIcon()) {

            // if icons equal then set matched status to true
            gridCardsArray[iCurrent].setMatchedStatus(true);
            gridCardsArray[iPair].setMatchedStatus(true);

            //play some animation here

        } else {

            // get current clicked card id for DOM manuipulation
            const currentID = gridCardsArray[iCurrent].getCardID();

            // if icons different then set background color for face down pattern and hide icons
            $('#' + currentID).toggleClass('faceup');  // disable faceup class from clicked element
            $('#' + currentID).find('i').text('');     // erase text so player cannot access values via dev tools from clicked element

            // get previously clicked card id for DOM manuipulation
            const pairID = gridCardsArray[iPair].getCardID();

            // set background color for face down pattern and hide icons
            $('#' + pairID).toggleClass('faceup'); // disable faceup class from previously clicked element
            $('#' + pairID).find('i').text('');    // erase text so player cannot access values via dev tools from previously clicked element

        }

    }

} 

