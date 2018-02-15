/* ----------------- Matching Game Class Collection ----------------- 
    Matching Game *** Alexandre Furstenberger  

   * Created by Alexandre Furstenberger
   * Date: February 2018
   * Project: developed as a project for Udacity's Front End Web Developer Nanodegree

*/

/**
* @description Represents a grid card
* @constructor
* @param {string} icon - The card image to be shown when faced up
* @param {string} id - Card identification
*/

let gridCard = function (icon, id){

    this.cardIcon = icon;               // assign which icon object will show once faced up
    this.cardID = id;                   // identify object 
    this.isClicked = false;             // define card status if clicked
    this.isMatched = false;             // define card status if matched

}

/* --------------- read functions --------------- */

/**
* @description Gets card icon value
* @returns {number} icon value
*/
gridCard.prototype.getCardIcon = function(){
    return this.cardIcon;    
}

/**
* @description Gets card ID
* @returns {number} card ID
*/
gridCard.prototype.getCardID = function () {
    return this.cardID;
}

/**
* @description Gets card clicked status
* @returns {bool} is clicked flag
*/
gridCard.prototype.cardClicked = function () {
    return this.isClicked;
}

/**
* @description Gets card matched status
* @returns {bool} is matched flag
*/
// get card mathed status
gridCard.prototype.cardMatched = function () {
    return this.isMatched;
}

/* --------------- write functions -------------- */
/**
* @description Change card clicked status
* @param {bool} status flag
*/
gridCard.prototype.setClickedStatus = function(status){
    this.isClicked = status;
}

/**
* @description Change card matched status
* @param {bool} status flag
*/
gridCard.prototype.setMatchedStatus = function (status) {
    this.isMatched = status;
}

