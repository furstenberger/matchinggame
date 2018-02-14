/* ----------------- Matching Game Class Collection ----------------- 
    Matching Game *** Alexandre Furstenberger  

   * Created by Alexandre Furstenberger
   * Date: February 2018
   * Project: developed as a project for Udacity's Front End Web Developer Nanodegree
   * Using jQuery v3.3.1

*/

/* Sections
   ======================================================================================== */

/**
* @description Represents a grid card
* @constructor
* @param {string} icon - The card image to be shown when faced up
* @param {string} id - Card identification
*/


let gridCard = function (icon, id){

    this.cardIcon = icon;               // assign which icon object will show once faced up
    this.cardID = id;                   // identify object 
    this.cardColor = 'darkslategray';   // define default card color faced down
    this.isClicked = false;             // define card status if clicked
    this.isMatched = false;             // define card status if matched

}

/* --------------- read functions --------------- */

// get access to card icon value
gridCard.prototype.getCardIcon = function(){
    return this.cardIcon;    
}

// get card ID
gridCard.prototype.getCardID = function () {
    return this.cardID;
}

// get card color
gridCard.prototype.getCardColor = function () {
    return this.cardColor;
}

// get card clicked status
gridCard.prototype.cardClicked = function () {
    return this.isClicked;
}

// get card mathed status
gridCard.prototype.cardMatched = function () {
    return this.isMatched;
}

/* --------------- write functions -------------- */

// change card icon text
gridCard.prototype.setCardText = function (icon) {
    this.cardIcon = icon;
}

// change card color
gridCard.prototype.setCardColor = function (color) {
    this.cardColor = color;
}

// change card clicked status
gridCard.prototype.setClickedStatus = function(status){
    this.isClicked = status;
}

// change card matched status
gridCard.prototype.setMatchedStatus = function (status) {
    this.isMatched = status;
}

