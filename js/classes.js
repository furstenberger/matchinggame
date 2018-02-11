/* ----------------- Matching Game App Classes ----------------- 
    Matching Game *** Alexandre Furstenberger  

   * Created by Alexandre Furstenberger
   * Date: February 2018
   * Project: developed as a project for Udacity's Front End Web Developer Nanodegree 

*/

/* Sections
   ========================================================================== */


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


