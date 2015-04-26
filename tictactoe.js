/* @Author :Soham Talukdar */

var TicTacToe = function(divcontainerId){   //Defined the main class TicTacToe which basically defines the game-board and starts the game.
	this.divId=divcontainerId;
	document.getElementById("TEXT").innerHTML = "MAY THE FORCE BE WITH YOU";
	this.players=["X" ,"O"]; // Defining the players as X and O.
	this.isGameDone=false;   //Checking whether the game has been won by someone.
	this.currentPlayer=0;	
	var boxes = document.querySelectorAll("#my_div button"); // got the array of boxes defined in the my_div container.
	var cellArray = new Array();
	for(var i=0;i<boxes.length;i++){
		cellArray[i]= new Cell(i,boxes,this);
	}

}
var Cell = function(position,boxes,referencePointer){  // Defined the Cell class which basically sets the 9 div buttons and renders them. 
	var pos=position;
	var square=boxes;
	var baseClass=referencePointer;
	var cellObj= this;       //This basically gets me the Cell Object i am working on,or the user has clicked.
	square[pos].addEventListener("click", function(){
		if (baseClass.isGameDone){     //To check whether someone has already won the game
			document.getElementById("TEXT").innerHTML = "GAME OVER. PRESS REFRESH FOR A NEW ROUND";	
			return;
		}
		else if (!cellObj.isValidCell(this)) {
			console.log("Invalid choice");
			document.getElementById("TEXT").innerHTML = "INVALID CHOICE,CLICK ON ANY OTHER SQUARE";
		} 
		else {
			document.getElementById("TEXT").innerHTML = "MAY THE FORCE BE WITH YOU";
			var display=new ShowText(square[pos]);       //Filling the clicked square with a player
			display.setMessage(baseClass.players[baseClass.currentPlayer]);
			baseClass.isGameDone= cellObj.isThereAWinner(square,baseClass.players,baseClass.currentPlayer);
			if(baseClass.isGameDone){                    //To check whether someone has won
				console.log(baseClass.players[baseClass.currentPlayer]+" WON");
				document.getElementById("TEXT").innerHTML = "CONGRATS&nbsp"+baseClass.players[baseClass.currentPlayer];
			}
			else if(cellObj.isDraw(square)){               //To check whether the board is full.
				console.log("GAME IS A  DRAW");
				document.getElementById("TEXT").innerHTML = "GAME DRAWN";
				baseClass.isGameDone=true;
			}
			baseClass.currentPlayer=baseClass.currentPlayer+1;
			baseClass.currentPlayer=baseClass.currentPlayer%2;
		}
	});
}

Cell.prototype.isValidCell= function(butn){ //Method of the Cell class to check whether a player has already marked a square.
	if(butn.innerHTML.length==0){
		return true;
	}
	else return false;
}

Cell.prototype.isDraw= function(square){ //Method of the Cell class to check for a draw.
	var sqr=square;
	for(var i=0;i<sqr.length;i++){
		if (sqr[i].innerHTML.length==0){
			return false;
		}
	}
	return true;
}

Cell.prototype.isThereAWinner= function(square,player,currentPlayer){ //Method to check if we have a winner.
	var squares= square;
	var players= player;
	var currentTurn= currentPlayer;
	//The generic code to check all the diagonals and the sides of the square board to know if we have a winner.
	if (squares[0].innerHTML == players[currentTurn] &&
			squares[1].innerHTML == players[currentTurn] &&
			squares[2].innerHTML == players[currentTurn])
		return true;
	if (squares[3].innerHTML == players[currentTurn] &&
			squares[4].innerHTML == players[currentTurn] &&
			squares[5].innerHTML == players[currentTurn])
		return true;
	if (squares[6].innerHTML == players[currentTurn] &&
			squares[7].innerHTML == players[currentTurn] &&
			squares[8].innerHTML == players[currentTurn])
		return true;
	if (squares[0].innerHTML == players[currentTurn] &&
			squares[3].innerHTML == players[currentTurn] &&
			squares[6].innerHTML == players[currentTurn])
		return true;
	if (squares[1].innerHTML == players[currentTurn] &&
			squares[4].innerHTML == players[currentTurn] &&
			squares[7].innerHTML == players[currentTurn])
		return true;
	if (squares[2].innerHTML == players[currentTurn] &&
			squares[5].innerHTML == players[currentTurn] &&
			squares[8].innerHTML == players[currentTurn])
		return true;
	if (squares[0].innerHTML == players[currentTurn] &&
			squares[4].innerHTML == players[currentTurn] &&
			squares[8].innerHTML == players[currentTurn])
		return true;
	if (squares[2].innerHTML == players[currentTurn] &&
			squares[4].innerHTML == players[currentTurn] &&
			squares[6].innerHTML == players[currentTurn])
		return true;
	return false;
}


var ShowText = function(text) {  //This class is used everywhere to display Text in any particular container.
	var putText= text;
	function setResult(message){
		putText.innerHTML= message;
	}
	return {setMessage:setResult}
}