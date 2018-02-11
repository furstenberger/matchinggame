/* ----------------- JavaScript for Matching Game ----------------- 
    Matching Game *** Alexandre Furstenberger  

   * Created by Alexandre Furstenberger
   * Date: February 2018
   * Project: developed as a project for Udacity's Front End Web Developer Nanodegree 

*/

/* Sections
   ========================================================================== */

/*  Define array of icons to sort through the cards. For each game a random call will 
    bring a different icon for the game from the array.
    There will be more icons than the total of possible pairs so the user experience is enhanced. 
*/
const cardIcons = ['android', 'airplanemode_active', 'cake', 'casino', 'cloud_queue', 'directions_run',
    'directions_transit', 'free_breakfast', 'keyboard_voice', 'public', 'sentiment_very_satisfied',
    'wifi', 'visibility', 'videogame_asset', 'verified_user', 'thumb_up', 'star', 'signal_wifi_4_bar', 
    'signal_cellular_null', 'signal_cellular_4_bar', 'sentiment_very_dissatisfied', 'sentiment_neutral' ];

//  Define grid size. Grid size equal (# of rows) * (# of columns)    
const gridSize = 16;

//  Define superclass for grid cards
let gridCard = function (icon, id){

    this.cardText = icon;               // assign which icon object will show once faced up
    this.cardID = id;                   // identify object 
    this.cardColor = 'darkslategray';   // define default card color faced down
    this.isFacedDown = true;            // define default card status: all faced down when game starts

}

/* --------------- read functions --------------- */

// get access to card icon value
gridCard.prototype.getCardIcon = function(){
    return this.cardIcons;    
}

// get card ID
gridCard.prototype.getCardID = function () {
    return this.cardID;
}

// get card color
gridCard.prototype.getCardColor = function () {
    return this.cardColor;
}

// get card color
gridCard.prototype.getCardStatus = function () {
    return this.isFacedDown;
}

/* --------------- write functions -------------- */

// change card color
gridCard.prototype.setCardText = function (icon) {
    this.cardText = icon;
}

// change card color
gridCard.prototype.setCardColor = function (color) {
    this.cardColor = color;
}

// change card color
gridCard.prototype.setCardStatus = function(status){
    this.isFacedDown = status;
}

// --------------- card grid creation --------------

// create grid cards objects

// randomly selects icons for grid cards
const shuffled = cardIcons.sort(() => .5 - Math.random()); // shuffle  
let selected = shuffled.slice(0, gridSize/2 ); //get sub-array of first n elements AFTER shuffle

// array for cards storage
let gridCardsArray = [];

let idTag = 0; // creates IDs for the objects for their constructors

// create grid cards objects and store them in the array
for (i = 0; i < selected.length ; i++) {

    // create the cards pair with same icons but different IDs
    let firstCard = new gridCard(selected[i], idTag);       // create the first card
    let secondCard = new gridCard(selected[i], idTag + 1);    // create the second card
    gridCardsArray.push(firstCard, secondCard);

    idTag = idTag + 2; // increment idTag 

}
