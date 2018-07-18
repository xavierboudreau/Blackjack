//Blackjack JavaScript. Authors: Xavier Boudreau and Ryan Steed
//Supported in Mozilla Firefox; not fully supported (beyond first round) in Chrome and Safari due to "use strict"; javascript requirement.


var instruct = "";
var deck = [2,3,4,5,6,7,8,9,10,10,10,10,11];
var shoe = [];
var rShoe = [];
var rDeck = [];
var Csuit = ""; 
var Csymbol = "";
var Cvalue = 0;
var f = 0;
var s = 0;
var dealerCards = [];
var userCards = [];
var dealerTotal = 0;
var userTotal = 0;
var bet = 0;
var chips = 100;
var tCard = "";

deck = deck.concat(deck, deck, deck);

//Converts card attributes into object with attributes.
function Card(nSuit, nSymbol, nValue)
{
    "use strict";
    this.suit = "";
    this.symbol = "";
    this.value = 0;
    this.changeCard = function (nSuit, nSymbol, nValue)
        {
            this.suit = nSuit;
            this.symbol = nSymbol;
            this.value = nValue;
        };  
}
function say(instruct)
{
    "use strict";
    document.getElementById("instructions").innerHTML = "<td id='instructions' colspan='4'>" + instruct + "</td>";
}
//Alerts through text on screen

//Create deck:
function createDeck()
{ 
    for(i=0;i<deck.length;i+=1)
    {
        tCard = new Card(Csuit, Csymbol, Cvalue);
        if (((deck.length)/4)>i)
        {
            Csuit = "Hearts";
        }
        else if ((((deck.length)/4)*2)>i)
        {
            Csuit = "Diamonds"; 
        }
        else if ((((deck.length)/4)*3)>i)
        { 
            Csuit = "Spades";
        }
        else
        {
            Csuit = "Clubs";
        }    
//Assigns suits.
        Cvalue = deck[f];
        if (f<=8)
        {    
            Csymbol = Cvalue + "";
        }
        else if (f==9)
        {    
            Csymbol = "J";
            Cvalue = 10;
        }
        else if (f==10)
        {
            Csymbol = "Q";
            Cvalue = 10;
        }
        else if (f==11)
        {
            Csymbol = "K";
            Cvalue = 10;
        }
        else if (f==12)
        {
            Csymbol = "A";
            Cvalue = 11;
        }
//Assigns symbols.
        tCard.changeCard(Csuit, Csymbol, Cvalue);
        rDeck.push(tCard);
        f++;
        tCard.toString();
        if (f==13)
        {
            f=0;
        }
//Adds created cards to deck.
    }
}
createDeck();
function AddDecksToShoe()
{
    "use strict";
    shoe = [];
    for(i=0; i<6;i+=1)
    {
        shoe.push(rDeck);
    }
}
//Adds decks to shoe.

function shuffleShoe()
{   
    "use strict";
    var a=0;
    var c=0;
    var d=0;
    var randomDeck = 0;
    var randomCard = 0;
    var temp1, temp2 = 0;
    
    while (d<6) 
    {
        randomDeck=Math.floor((Math.random()*(shoe.length-1))+0);
        randomCard=Math.floor((Math.random()*(rDeck.length-1))+0);
        temp1 = shoe[d][c];
        temp2 = shoe[randomDeck][randomCard];
        shoe[d][c] = temp2;
        shoe[randomDeck][randomCard] = temp1;
        c++;
        if ((c%52)==0 && c!=0)
        {
            d++;
            c=0;
        }
    }
//Shuffles cards inside of shoe.
    c=0;
    d=0;
    while (a<=(5*rDeck.length))
    {
        rShoe[a] = shoe[d][c];
        a++;
        c++;
        if ((c%52)==0 && c!=0)
        {
            d++;
            c=0;
        }
    }
//Removes array within array.
}

function Sbet()
{   
    "use strict";
    document.getElementById("increase").disabled=false;
}
//Disables Increase Button.

function increase()
{
    "use strict";
    if (bet >= chips)
    {
        document.getElementById("increase").disabled=true;
        bet = chips;
    }
    else
    {
        document.getElementById("decrease").disabled=false;
        bet+=1;
        document.getElementById("submitBet").disabled=false;
    }
    nBet();
}
//Increases bet and disables bet submission buttons at max bet.

function decrease()
{
    "use strict";
    if (bet<=1)
    {
        document.getElementById("decrease").disabled=true;
        bet = 1;
    }
    else
    {
        document.getElementById("increase").disabled=false;
        bet--;
        document.getElementById("submitBet").disabled=false;
    }
    nBet();
}
//Decreases bet and disables submission buttons at min bet.

function submitBet()
{
    "use strict";
    document.getElementById("increase").disabled=true;
    document.getElementById("decrease").disabled=true;
    chips -= bet;
    document.getElementById("submitBet").disabled=true;
    deal();
    nChips();
}
//Submits bet. Deals cards on submission..

function deal()
{
    "use strict";
    var t = 500;
//Sets card deal delay
 
    if (rShoe.length<16)
    {
        new AddDecksToShoe();
        shuffleShoe();
    }
//Reshuffles shoe when low on cards.

    window.setTimeout(dSlot1, t);
    window.setTimeout(pSlot1, t*2);
    window.setTimeout(dSlot2, t*3);
    window.setTimeout(pSlot2, t*4);
    window.setTimeout(updateTotal, t*5);
//Sets deal delay, and assigns cards to slots.

    dealerCards.push(rShoe.pop());    
    userCards.push(rShoe.pop());
    dealerCards.push(rShoe.pop()); 
    userCards.push(rShoe.pop()); 
//Adds cards to hands.

    for (i=0;i<userCards.length;i+=1)
    {
        if ((cardTotal(userCards))>21 && userCards[i].value==11)
        {
            userCards[i].value = 1;    
            break;
        }
    }
    for (i=0;i<dealerCards.length;i+=1)
    {
        if ((cardTotal(dealerCards))>21 && dealerCards[i].value==11)
        {
            dealerCards[i].value = 1;    
            break;
        }
    }
//Makes Ace worth 1 when over 21.
    
    if (cardTotal(dealerCards) == 21 && cardTotal(userCards) == 21)
    {
        push();
    }
    else if (cardTotal(dealerCards) == 21)
    {     
        displayCard(dealerCards[0],1,"d");
        loss();
    }
    else if (cardTotal(userCards) == 21)
    {
        win();
    }
    else
    {
        document.getElementById("hit").disabled=false;
        document.getElementById("stand").disabled=false;
        document.getElementById("surrender").disabled=false;
    }    
//Sets outcomes for Blackjacks.
}

function dSlot1()
{
    "use strict";
    document.getElementById("dSlot1").innerHTML = "<img src='cardBack.jpg' alt='Card Back' class='cardBack'/>";
}
function pSlot1()
{
    "use strict";
    displayCard(userCards[(userCards.length)-1],1,"p");
}
function dSlot2()
{    
    "use strict";
    displayCard(dealerCards[(dealerCards.length)-1],2,"d");
}
function pSlot2()
{
    "use strict";
    displayCard(userCards[userCards.length - 2],2,"p");
}    
//Assings card to particular slot when called above.

function updateTotal()
{
    "use strict";
    say("Player Total:   " + cardTotal(userCards)); 
}
//Displays card total for player during game.

function loss()
{
    "use strict";
    say("Dealer has " + cardTotal(dealerCards) + "; Player Loses.");
    bet = 0;
    document.getElementById("newRound").disabled=false;
    document.getElementById("hit").disabled=true;
    document.getElementById("stand").disabled=true;
    document.getElementById("surrender").disabled=true;
    nChips();
}
function win()
{
    "use strict";
    say("Dealer has " + cardTotal(dealerCards) + "; Player Wins!");
    chips += (bet*2);
    bet = 0;
    document.getElementById("newRound").disabled=false;
    document.getElementById("hit").disabled=true;
    document.getElementById("stand").disabled=true;
    document.getElementById("surrender").disabled=true;
    nChips();
}
function push()
{
    "use strict";
    say("It's a push... bet returned.");
    chips += (bet);
    bet = 0;
    document.getElementById("newRound").disabled=false;
    document.getElementById("hit").disabled=true;
    document.getElementById("stand").disabled=true;
    document.getElementById("surrender").disabled=true;
}
function surrender()
{
    "use strict";
    say("Player surrendered; half refunded.");
    chips += Math.floor(0.5*bet);
    bet = 0;
    document.getElementById("hit").disabled=true;
    document.getElementById("stand").disabled=true;
    document.getElementById("surrender").disabled=true;
    document.getElementById("newRound").disabled=false;
    nChips();
    displayCard(dealerCards[0],1,"d");
}
//Sets onscreen alert and chip total for win, loss, push, and surrender.

function cardTotal(hand)
{
    "use strict";
    var total=0;
    for(i=0;i<hand.length;i+=1)
    {
        total += hand[i].value;
    }
    return total;
}
//Calculates card numerical total.

function hit()
{
    "use strict";
    var trashCan = 0;
    var i=0;
    userCards.push(rShoe.pop());
    displayCard(userCards[userCards.length-1],s + 3,"p");
//Adds and displays user card when hit.
    for (i=0;i<userCards.length;i+=1)
    {
        if ((cardTotal(userCards))>21 && userCards[i].value==11)
        {
            userCards[i].value = 1;    
            break;
        }
    }
    if ((cardTotal(userCards))>21)
    {
        loss();
        return ;
    }
    if ((cardTotal(userCards))==21)
    { 
        win();
    }
    document.getElementById("surrender").disabled=true;
    s = s + 1;
    say("Player Total:   " + cardTotal(userCards));
//Sets possible outcomes after hit.
}

function stand()
{
    displayCard(dealerCards[0],1,"d");
//Flips over facedown dealer card.

    while (cardTotal(dealerCards)<16)
    {
        dealerCards.push(rShoe[0]);
        displayCard(dealerCards[(dealerCards.length)-1],3,"d");
    }
//Sets Dealer behavior and adds cards to hand on hit.

    if (cardTotal(userCards)>cardTotal(dealerCards))
    {
        win();
        return ;
    }
    var i=0;
    for (i=0;i<dealerCards.length;i++)
    {
        if (cardTotal(dealerCards)>21 && dealerCards[i].value==11)
        {
            dealerCards[i].value = 1;    
            break;
        }
    }
    if (cardTotal(dealerCards)>21)
    {
        win();
    }
    else if (cardTotal(userCards)<cardTotal(dealerCards))
    {
        loss();
    }
    else if (cardTotal(userCards)==cardTotal(dealerCards))
    {
        push();
    }
//Sets outcomes after dealer's turn.
    nChips();
//Updates chip count.
}
function newRound()
{
    document.getElementById("table").innerHTML = "<table class='table' id='table'><tr class='cards'><th>Dealer</th><td class='card1'><img id='dSlot1'/><br/></td><td><img id='dSlot2'/></td><td><img id='dSlot3'/></td> <td><img id='dSlot4'/></td><td><img id='dSlot5'/></td></tr><tr class='cards'><th>Player</th><td><img id='pSlot1'/></td><td><img id='pSlot2'/></td><td><img id='pSlot3'/></td><td><img id='pSlot4'/></td><td><img id='pSlot5'/></td></tr></table>";
//Resets table display for New Round.
    
    userCards = [];
    dealerCards = [];
    document.getElementById("newRound").disabled=true;
    if (chips==0)
    {
        document.getElementById("increase").disabled=true;
        say("You're broke. Leave.");
        return ;
    }
//Kicks player out if they have no money!
    
    if (rShoe.length<16)
    {
        AddDecksToShoe();
        shuffleShoe();
        alert("Reshuffling");
    }

    say("Please submit a bet.");
    Sbet();
    s = 0;
//Resets slot, bet, and reshuffles deck if necessary.
}

function newGame()
{
    document.getElementById('titleScreen').style.display='none';
    document.getElementById('game').style.display='block';
    document.getElementById("newRound").disabled=true;
    AddDecksToShoe();
    shuffleShoe();
    Sbet();
    nChips();
}
//Begins new game when logo is selected; removes title screen and displays table.

function nChips()
{
    var sChips = "Chips:  " + chips;
    document.getElementById("chips").innerHTML = "<p>" + sChips + "</p>";
}   
//Updates displayed chip count when called.

function displayCard(card, slot, person)
{
    var template = "<img class='cardFrontTemplate' src='cardFront.jpg' alt='card'/>";
    var symbol = "<span class='symbol'>" + card.symbol + "</span>";
    var suitTop = "";
    var suitBottom = "";
    if (card.suit == "Hearts")
    {
        suitTop = "<img class='suitTop' src='heart.png' alt='Hearts'/>";
        suitBottom = "<img class='suitBottom' src='heart.png' alt='Hearts'/>";
    }
    else if (card.suit == "Spades")
    {
        suitTop = "<img class='suitTop' src='spade.gif' alt='Spades'/>";
        suitBottom = "<img class='suitBottom' src='spade.gif' alt='Spades'/>";
    }
    else if (card.suit == "Clubs")
    {
        suitTop = "<img class='suitTop' src='club.jpg' alt='Clubs'/>";
        suitBottom = "<img class='suitBottom' src='club.jpg' alt='Clubs'/>";
    }
    else if (card.suit == "Diamonds")
    {
        suitTop = "<img class='suitTop' src='diamond.jpg' alt='Diamonds'/>";
        suitBottom = "<img class='suitBottom' src='diamond.jpg' alt='Diamonds'/>";
    }
    document.getElementById(person + "Slot" + slot).innerHTML = template + symbol + suitTop + suitBottom;
}
//Displays card image in slot depending on card attributes.

function nBet()
{
    var sBet = "" + bet;
    document.getElementById("bet").innerHTML = "<td>" + sBet + "</td>";
}
//Updates bet display when called.

function soundOff()
{
    document.getElementById("thorn").pause();
    document.getElementById("JordanB").pause();
    document.getElementById("impromptu").pause();
    document.getElementById("blood").pause();
}
//Pauses all tracks.

function thorn()
{
    soundOff();
    document.getElementById("thorn").play();
}
function JordanB()
{
    soundOff();
    document.getElementById("JordanB").play();
}
function impromptu()
{
    soundOff();
    document.getElementById("impromptu").play();
}
function blood()
{
    soundOff();
    document.getElementById("blood").play();
}
//Starts tracks when called.

