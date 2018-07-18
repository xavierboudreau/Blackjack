//Blackjack JavaScript. Authors: Xavier Boudreau and Ryan Steed
function Card(suit, symbol, value)
{
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
var instruct = "";
var deck = [2,3,4,5,6,7,8,9,10,10,10,10,11];
var shoe = [];
var rShoe = [];
var rDeck= [];
var Csuit = ""; 
var Csymbol = "";
var Cvalue = 0;
var f = 0;
var deck = deck.concat(deck, deck, deck);
var s = 0;
function say(instruct)
{
    document.getElementById("instructions").innerHTML = "<td id='instructions' colspan='4'>" + instruct + "</td>";
}
//Creates deck
for(var i=0;i<deck.length;i++)
{
var tCard = new Card(Csuit, Csymbol, Cvalue);
    if (((deck.length)/4)>i)
    {
        nSuit = "Hearts";
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
    var Cvalue = deck[f];
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
    //alert(tCard.suit + " " + tCard.symbol + " " + tCard.value);
    //alert(rDeck[i].suit + " " + rDeck[i].symbol);
    if (f==13)
    {
        f=0;
    }
}
//Creates cards.
var dealerCards = [];
var userCards = [];
var dealerTotal = 0;
var userTotal = 0;
function AddDecksToShoe() //Should always be called before shuffleShoe()
{
    shoe = [];
    for(var i=0; i<6;i++)
    {
        shoe.push(rDeck);
    }
}
function shuffleShoe()
{   
    var c=0;
    var d=0;
    var randomDeck = 0;
    var randomCard = 0;
    var temp1, temp2 = 0;
    while (d<6) //shuffles the cards inside of shoe
    {
        randomDeck=Math.floor((Math.random()*(shoe.length-1))+0);
        randomCard=Math.floor((Math.random()*(rDeck.length-1))+0);
        // shoe[rDeck][rDeck/Card]
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
    c=0;
    d=0;
    a=0;
    while (a<=(5*rDeck.length)) //gets rid of array inside of array
    {
        //alert(d);
        //alert(c);
        rShoe[a] = shoe[d][c];
        //alert(rShoe[a].suit + " " + rShoe[a].symbol);
        a++;
        c++;
        if ((c%52)==0 && c!=0)
        {
            d++;
            c=0;
        }
    }
}
var bet = 0;
function Sbet()
{   
    document.getElementById("increase").disabled=false;
}
function increase()
{
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
function decrease()
{
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
/*
var submitted = false;
function checkSubmission()
{
    alert("Submission is being checked, submission is: "+submitted);
    if(submitted)
    {  
        return;
    }
    setTimeout(checkSubmission,8000);
}
*/
function submitBet()
{
    document.getElementById("increase").disabled=true;
    document.getElementById("decrease").disabled=true;
    chips -= bet;
    //alert("You bet "+bet+" chips.");
    document.getElementById("submitBet").disabled=true;
    deal();
    //alert("After deal(), there are: "+chips);
    nChips();
}
function deal()
{
    //var trashCan = 0;
    var t = 500
    //sets card deal delay
    if (rShoe.length<16)
    {
        //alert("Shuffling Deck");
        AddDecksToShoe();
        shuffleShoe();
    }
    
    window.setTimeout(dSlot1, t);
    window.setTimeout(pSlot1, t*2);
    window.setTimeout(dSlot2, t*3);
    window.setTimeout(pSlot2, t*4);
    window.setTimeout(updateTotal, t*5);
    
    //alert("Dealer is about to recieve a "+rShoe[(rShoe.length)-1].symbol+rShoe[(rShoe.length)-1].suit);
    dealerCards.push(rShoe.pop());    
    userCards.push(rShoe.pop());
    dealerCards.push(rShoe.pop()); 
    userCards.push(rShoe.pop()); 
    function dSlot1()
    {
        document.getElementById("dSlot1").innerHTML = "<img src='cardBack.jpg' alt='Card Back' class='cardBack'/>"
    }
    //alert("Dealer recieved a "+dealerCards[(dealerCards.length)-1].symbol+dealerCards[(dealerCards.length)-1].suit); 
    if ((cardTotal(dealerCards) == 21) && ((cardTotal(userCards) == 21)))
    {
        say("You both have Blackjack!");
        push(); //flip cards over, say push
    }
    else if (cardTotal(dealerCards) == 21)
    {
        say("Dealer has Blackjack.");
        loss(); //flip cards over, say dealer wins, blackjack
    }
    else if (cardTotal(userCards) == 21)
    {
        say("You have Blackjack!");
        win(); //flip cards over, say user wins, blackjack
    }
    else
    {
        document.getElementById("hit").disabled=false;
        document.getElementById("stand").disabled=false;
        document.getElementById("surrender").disabled=false;
    }    
}
alert("User is about to recieve a "+rShoe[(rShoe.length)-1].symbol+rShoe[(rShoe.length)-1].suit);
    function pSlot1()
    {
        displayCard(userCards[(userCards.length)-1],1,"p");
    }
    //alert("User recieved a "+userCards[userCards.length-1].symbol+userCards[userCards.length-1].suit);
    //alert("Dealer is about to recieve a "+rShoe[(rShoe.length)-1].symbol+rShoe[(rShoe.length)-1].suit);
    function dSlot2()
    {    
        displayCard(dealerCards[(dealerCards.length)-1],2,"d");
    }
    //alert("Dealer recieved a "+dealerCards[dealerCards.length-1].symbol+dealerCards[dealerCards.length-1].suit);
    //alert("User is about to recieve a "+rShoe[(rShoe.length)-1].symbol+rShoe[(rShoe.length)-1].suit);
    function pSlot2()
    {
        displayCard(userCards[userCards.length - 2],2,"p");
    }    
    function updateTotal()
    {
        say("Player Total:   " + cardTotal(userCards)); 
    }
    //alert("User recieved a "+userCards[userCards.length-1].symbol+userCards[userCards.length-1].suit);
   function loss()
{
    //alert("Dealer wins");
    say("Dealer had " + cardTotal(dealerCards) + "; Player Loses.");
    bet = 0;
    document.getElementById("newRound").disabled=false;
    document.getElementById("hit").disabled=true;
    document.getElementById("stand").disabled=true;
    document.getElementById("surrender").disabled=true;
    //nChips();
    displayCard(dealerCards[0],1,"d");
}
function win()
{
    //alert("You win");
    say("Dealer had " + cardTotal(dealerCards) + "; Player Wins!");
    chips += (bet*2);
    bet = 0;
    document.getElementById("newRound").disabled=false;
    document.getElementById("hit").disabled=true;
    document.getElementById("stand").disabled=true;
    document.getElementById("surrender").disabled=true;
    //nChips();
    displayCard(dealerCards[0],1,"d");
}
function push()
{
    //alert("Push");
    say("It's a push...");
    chips += (bet);
    bet = 0;
    document.getElementById("newRound").disabled=false;
    document.getElementById("hit").disabled=true;
    document.getElementById("stand").disabled=true;
    document.getElementById("surrender").disabled=true;
}
function cardTotal(hand)
{
    var total=0;
    for(i=0;i<hand.length;i++)
    {
        total += hand[i].value;
    }
    return total;
}
function hit() //Should not be run if outcome has already been reached
{
    var trashCan = 0;
    userCards.push(rShoe.pop());
    //alert("User recevied a "+userCards[userCards.length-1].symbol+userCards[userCards.length-1].suit);
    //alert("Total is now: "+cardTotal(userCards));
    displayCard(userCards[userCards.length-1],s + 3,"p");
    if ((cardTotal(userCards))>21)
    {
        alert("You Busted")
        loss();
    }
    if ((cardTotal(userCards))==21)
        win();
    document.getElementById("surrender").disabled=true;
    s = s + 1;
    say("Player Total:   " + cardTotal(userCards));
}
function stand()
{
    //alert("Dealer's card total is "+cardTotal(dealerCards));
    while (cardTotal(dealerCards)<16)
    {
        //alert("Dealer's card value is "+cardTotal(dealerCards)+" adding another card");
        dealerCards.push(rShoe[0]);
        //alert("After card was added his cards add up to"+cardTotal(dealerCards));
        displayCard(dealerCards[(dealerCards.length)-1],3,"d");
    }
    if (cardTotal(userCards)>cardTotal(dealerCards))
    {
        //alert("User total is "+cardTotal(userCards));
        //alert("Dealer total is "+cardTotal(dealerCards));
        win();
    }
    if (cardTotal(dealerCards)>21)
    {
        win();
    }
    else if (cardTotal(userCards)<cardTotal(dealerCards))
    {
        //alert("User total is "+cardTotal(userCards));
        //alert("Dealer total is "+cardTotal(dealerCards));
        loss();
    }
    else
    {
        //alert("User total is "+cardTotal(userCards));
        //alert("Dealer total is "+cardTotal(dealerCards));
        push();
    }
    nChips();
}
function surrender()
{
    //alert("You surrendered, half of bet is returned");
    say("Player surrendered; half refunded.");
    chips += Math.floor(.5*bet);
    bet = 0;
    document.getElementById("hit").disabled=true;
    document.getElementById("stand").disabled=true;
    document.getElementById("surrender").disabled=true;
    document.getElementById("newRound").disabled=false;
    //nChips();
    displayCard(dealerCards[0],1,d);
}

//document.getElementById("increase").disabled=true;
//document.getElementById("decrease").disabled=true;
//document.getElementById("submitBet").disabled=true;
var chips = 1000;
function newRound()
{
    document.getElementById("table").innerHTML = "<table class='table' id='table'><tr class='cards'><th>Dealer</th><td class='card1'><img id='dSlot1'/><br/></td><td><img id='dSlot2'/></td><td><img id='dSlot3'/></td> <td><img id='dSlot4'/></td><td><img id='dSlot5'/></td></tr><tr class='cards'><th>Player</th><td><img id='pSlot1'/></td><td><img id='pSlot2'/></td><td><img id='pSlot3'/></td><td><img id='pSlot4'/></td><td><img id='pSlot5'/></td></tr></table>"
    userCards = [];
    dealerCards = [];
    document.getElementById("newRound").disabled=true;
    if (rShoe.length<16)
    {
        //alert("Shuffling Deck");
        AddDecksToShoe();
        shuffleShoe();
    }
    say("Please submit a bet.");
    Sbet();
    s = 0;
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
function nChips()
{
    var sChips = "Chips:  " + chips;
    document.getElementById("chips").innerHTML = "<p>" + sChips + "</p>";
}   
function displayCard(card, slot, person)
{
    var template = "<img class='cardFrontTemplate' src='cardFront.jpg' alt='card'/>";
    var symbol = "<span class='symbol'>" + card.symbol + "</span>";
    var suitTop = "";
    var suitBottom = "";
    alert(card.suit+card.symbol);
    /*if (card.suit == card.suit)
    {    
        suitTop = "<img class='suitTop' src='heart.png' alt='Hearts'/>";
        suitBottom = "<img class='suitBottom' src='heart.png' alt='Hearts'/>";
    }
    */
    if (card.suit == "Hearts")
    {
        suitTop = "<img class='suitTop' src='heart.png' alt='Hearts'/>";
        suitBottom = "<img class='suitBottom' src='heart.png' alt='Hearts'/>";
    }
    else if (card.suit = "Spades")
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
function nBet()
{
    var sBet = "" + bet;
    document.getElementById("bet").innerHTML = "<td>" + sBet + "</td>";
}

