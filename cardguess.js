/*jslint indent: 2*/
var suitnames = ['Hearts', 'Diamonds', 'Spades', 'Clubs'];
var numbers = ['Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight',
    'Nine', 'Ten', 'Jack', 'Queen', 'King', 'Ace'];
var cardImages = [['cards/51.png', 'cards/47.png', 'cards/43.png', 'cards/39.png', 'cards/35.png', 'cards/31.png', 'cards/27.png', 'cards/23.png', 'cards/19.png', 'cards/15.png', 'cards/11.png', 'cards/7.png', 'cards/3.png'], 
  ['cards/52.png', 'cards/48.png', 'cards/44.png', 'cards/40.png', 'cards/36.png', 'cards/32.png', 'cards/28.png', 'cards/24.png', 'cards/20.png', 'cards/16.png', 'cards/12.png', 'cards/8.png', 'cards/4.png'], 
  ['cards/50.png', 'cards/46.png', 'cards/42.png', 'cards/38.png', 'cards/34.png', 'cards/30.png', 'cards/26.png', 'cards/22.png', 'cards/18.png', 'cards/14.png', 'cards/10.png', 'cards/6.png', 'cards/2.png'], 
  ['cards/49.png', 'cards/45.png', 'cards/41.png', 'cards/37.png', 'cards/33.png', 'cards/29.png', 'cards/25.png', 'cards/21.png', 'cards/17.png', 'cards/13.png', 'cards/9.png', 'cards/5.png', 'cards/1.png']]


function Deck() {
  this.cards = [];
  this.count = function() {
    this.cards.length;
  };

  this.init = function() {
    for (r =  1; r <= 13; r++) {
      for (s = 1; s <= 4; s++) {
        this.cards.push(new Card(s, r))
        }
    }
    this.shuffle()
  };

  this.shuffle = function() {
    var copy = [], n = this.cards.length, rand, take;
    while (n) {
      rand = Math.floor(Math.random() * n--);
      take = this.cards.splice(rand, 1)[0];
      copy.push(take)
    }
    return this.cards = copy;
  }
}

function Card(suit, rank) {
  this.rank = rank;
  this.suit = suit;
  this.show = function() {
    console.log('You pulled a ' + numbers[this.rank - 1] + " of " + suitnames[this.suit - 1])
  };
  this.imagePath = function() {return cardImages[this.suit - 1][this.rank - 1]

  };
  this.label = function() {return numbers[this.rank - 1] + " of " + suitnames[this.suit - 1]
  }
};

function War(deck) {
  this.dealOne = function(deck) {
    var midDeck, oneDeal;
    midDeck = deck.cards.length / 2
    oneDeal = deck.cards.slice(0, midDeck);
    return oneDeal;
  };

  this.dealTwo = function(deck) {
    var midDeck, twoDeal
    midDeck = deck.cards.length / 2
    twoDeal = deck.cards.slice(midDeck, 52)
    return twoDeal 
  }

  this.checkPop = function(cards){
    if(cards.length > null){
      return cards.pop()        
        $("#onecardnum ").append(this.playerOne.length)
        $("#onecard").append("<p>" + playerOnecard.imagePath() + "</p>")
        $("#twocardnum ").append(this.playerTwo.length)
        $("#twocard").append("<p>" + playerTwocard.imagePath() + "</p>")
    } else {
      return null

    }
  }
  this.checkUnshift = function(cards, card){
    if (card != 0){ 
      cards.unshift(card)
    }
  }
  
  var oneName = $("#nameone").val()
  var twoName = $("#nametwo").val()

    this.round = function() {
    var tiePile = []
    var done = false
    $("#deckOne").replaceWith('<div id="deckOne"><img src="cards/b2fv.png"></img></div>')
    $("#deckTwo").replaceWith('<div id="deckTwo"><img src="cards/b2fv.png"></img></div>')
    $("#tieOne").replaceWith('<div id="tieOne"></div>')
    $("#tieTwo").replaceWith('<div id="tieTwo"></div>')
    
    while(!done && this.playerOne.length > 0 && this.playerTwo.length > 0) {
      var playerOnecard = this.playerOne.pop()
      var playerTwocard = this.playerTwo.pop()

      if (playerOnecard.rank > playerTwocard.rank) {

        this.playerOne.unshift(playerOnecard)
        this.playerOne.unshift(playerTwocard)

        $("#onecardnum ").text(this.playerOne.length)
        $("#onecard").replaceWith('<div id="onecard"><img src="' + playerOnecard.imagePath() + '"/></div>')
        $("#twocardnum ").text(this.playerTwo.length)
        $("#twocard").replaceWith('<div id="twocard"><img src="' + playerTwocard.imagePath() + '"/></div>')
        this.playerOne = tiePile.concat(this.playerOne)
        tiePile = []
        done = true
        

      }
      else if (playerOnecard.rank <  playerTwocard.rank) {

        this.playerTwo.unshift(playerOnecard)
        this.playerTwo.unshift(playerTwocard)

        $("#onecardnum ").text(this.playerOne.length)
        $("#onecard").replaceWith('<div id="onecard"><img src="' + playerOnecard.imagePath() + '"/></div>')
        $("#twocardnum ").text(this.playerTwo.length)
        $("#twocard").replaceWith('<div id="twocard"><img src="' + playerTwocard.imagePath() + '"/></div>')
        this.playerTwo = tiePile.concat(this.playerTwo)
        tiePile = []
        done = true
        
      }
      else {
        console.log("tie")
        tiePile.push(playerOnecard, playerTwocard)
        $("#onecardnum ").text(this.playerOne.length)
        $("#onecard").replaceWith('<div id="onecard"><img src="' + playerOnecard.imagePath() + '"/></div>')
        $("#twocardnum ").text(this.playerTwo.length)
        $("#twocard").replaceWith('<div id="twocard"><img src="' + playerTwocard.imagePath() + '"/></div>')
        $("#tieOne").replaceWith('<div id="tieOne"><img src="cards/b2fv.png"></img></div>')
        $("#tieTwo").replaceWith('<div id="tieTwo"><img src="cards/b2fv.png"></img></div>')
        this.checkUnshift(tiePile, this.checkPop(this.playerOne))
        this.checkUnshift(tiePile, this.checkPop(this.playerOne))
        this.checkUnshift(tiePile, this.checkPop(this.playerOne))
        this.checkUnshift(tiePile, this.checkPop(this.playerTwo))
        this.checkUnshift(tiePile, this.checkPop(this.playerTwo))
        this.checkUnshift(tiePile, this.checkPop(this.playerTwo))
        ;


        } 
      }
    }
  

    // this.play = function(){
    // var roundCount = 1
    // while(this.playerOne.length > 0 && this.playerTwo.length > 0){
    //   this.round()
    //   if(roundCount++ % 1 == 0) {
    //     $("#onecardnum ").append(this.playerOne.length)
    //     $("#twocardnum ").append(this.playerTwo.length)
    //     // console.log(oneName + ' currently has ' + this.playerOne.length + ' cards. ' 
    //     //   + twoName + ' currently has ' + this.playerTwo.length + ' cards')
    //     }
    //   } 
       
    //   if(this.playerOne.length > this.playerTwo.length) {
    //     console.log(oneName + ' wins!!')
    //     $("#yes").append($("#nameone").val() + " wins!!!!")
    //   } 
    //   else if(this.playerOne.length < this.playerTwo.length) {
    //     console.log(twoName +  ' wins!')
    //     $("#yes").append($("#nametwo").val() + " wins!!!!")
    //   }
    // }
  this.roundcount = 1 
  this.playoneround = function(){this.round()     
    if(this.roundCount++ % 1 == 0)
     if(this.playerTwo.length == 0) {
          $("#yes").append($("#nameone").val() + " wins!!!!")
      } 
        else if(this.playerOne.length == 0) {
          $("#yes").append($("#nametwo").val() + " wins!!!!")
    }
  }

  this.playerOne = this.dealOne(deck)
  this.playerTwo = this.dealTwo(deck)
}

var d, w
$(document).ready(function(){
  d = new Deck();
  d.init();
  w = new War(d)
  $("#btn1").click(function(){
    $(".start").slideUp("slow"),
    $(".game").fadeIn("fast")
    });
  $("#btn2").click(function(){
  w.playoneround() 
  $("#nameon").text($("#nameone").val())
  $("#nametw").text($("#nametwo").val())
  });
}) 
// $(document).ready(function(){
//   RUN() 
// });
