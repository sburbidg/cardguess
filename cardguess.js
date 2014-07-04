/*jslint indent: 2*/
var suitnames = ['Hearts', 'Diamonds', 'Spades', 'Clubs'];
var numbers = ['Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight',
    'Nine', 'Ten', 'Jack', 'Queen', 'King', 'Ace'];



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
  this.label = function() {return numbers[this.rank - 1] + " of " + suitnames[this.suit - 1]
  };
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
        $("#onecard").append("<p>" + playerOnecard.label() + "</p>")
        $("#twocardnum ").append(this.playerTwo.length)
        $("#twocard").append("<p>" + playerTwocard.label() + "</p>")
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
    
    while(!done && this.playerOne.length > 0 && this.playerTwo.length > 0) {
      var playerOnecard = this.playerOne.pop()
      var playerTwocard = this.playerTwo.pop()

      if (playerOnecard.rank > playerTwocard.rank) {
        console.log( oneName + ' played a ' + playerOnecard.label() + ' and ' + twoName + ' played a ' + playerTwocard.label() + '. ' + oneName + ' takes the cards.')
        this.playerOne.unshift(playerOnecard)
        this.playerOne.unshift(playerTwocard)
        $("#onecardnum ").append(this.playerOne.length)
        $("#onecard").append("<p>" + playerOnecard.label() + "</p>")
        $("#twocardnum ").append(this.playerTwo.length)
        $("#twocard").append("<p>" + playerTwocard.label() + "</p>")
        this.playerOne = tiePile.concat(this.playerOne)
        tiePile = []
        done = true

      }
      else if (playerOnecard.rank <  playerTwocard.rank) {
        this.playerTwo.unshift(playerOnecard)
        this.playerTwo.unshift(playerTwocard)
        $("#onecardnum ").append(this.playerOne.length)
        $("#onecard").append("<p>" + playerOnecard.label() + "</p>")
        $("#twocardnum ").append(this.playerTwo.length)
        $("#twocard").append("<p>" + playerTwocard.label() + "</p>")
        this.playerTwo = tiePile.concat(this.playerTwo)
        tiePile = []
        done = true
      }
      else {
          console.log(oneName + ' played a ' + playerOnecard.label() + ' and ' + twoName + ' played a ' +  playerTwocard.label() + '. It\'s a tie. Put down three cards each and try again.');
        tiePile.push(playerOnecard, playerTwocard)
        $("#onecardnum ").append(this.playerOne.length)
        $("#onecard").append("<p>" + playerOnecard.label() + "</p>")
        $("#twocardnum ").append(this.playerTwo.length)
        $("#twocard").append("<p>" + playerTwocard.label() + "</p>")
        this.checkUnshift(tiePile, this.checkPop(this.playerOne))
        this.checkUnshift(tiePile, this.checkPop(this.playerOne))
        this.checkUnshift(tiePile, this.checkPop(this.playerOne))
        this.checkUnshift(tiePile, this.checkPop(this.playerTwo))
        this.checkUnshift(tiePile, this.checkPop(this.playerTwo))
        this.checkUnshift(tiePile, this.checkPop(this.playerTwo));


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

   if(this.playerOne.length > this.playerTwo.length) {
        console.log(oneName + ' wins!!')
        $("#yes").append($("#nameone").val() + " wins!!!!")
      } 
      else if(this.playerOne.length < this.playerTwo.length) {
        console.log(twoName +  ' wins!')
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
    $("#start").hide();
    $("#btn2").click(function(){
    w.playoneround(function(){
      $('#table tr').slice(1).remove()
    })
    });
  })
}) 
// $(document).ready(function(){
//   RUN() 
// });
