var time = 4;
			var waitingTime = 999999;
			var started = false;
			var ended = false;
			var arduinoInput;

			$(".reset").click(function(){
				location.reload();
			});

			function go(){
				started = true;
				$(".getReady").hide();
				var countdownTimer = setInterval(countdown, 1000);
				function countdown(){
					if ($(".shake-circles").is(':hidden')) {
						time--;
					}
					$(".countdown").html(time);
					if (time <= 0){
						$(".buildup").hide();
						$(".shake-circles").show();
						var something = setInterval(increaseAIScore, 100);
						var somethingelse = setInterval(increaseHumanScore, 100);
					} else {
						$(".shake-circles").hide();
					}
				}

				setTimeout(function(){
					$("#myModal").modal('show');
					$(".winner").show();
					ended = true;
					if (scoreAI > humanScore){
						$(".winner").html("Golden State Fans Win!");
					} else {
						$(".winner").html("Raptors Fans Win!");
					}
					// $(".shake-circles").hide();
				}, 15000);
				
			}

			var scoreAI = 0;
			var humanScore = 0;
			var windowWidth, computerWidth, humanWidth;
			if (started == false) {
				windowWidth = $(window).width();
				computerWidth = ($(".computer").width() * 1/100) * windowWidth;
				humanWidth = ($(".yourscore").width() * 1/100) * windowWidth;
				console.log(computerWidth);
			}

			function increaseAIScore(){
				if (scoreAI >= 0 && scoreAI < 30000 && ended == false){
					scoreAI += 16;
					 humanScore += 1;
				}
				// console.log(scoreAI);
				$(".computer-score").html(scoreAI);
				if (started == true){
					windowWidth = $(window).width();
					computerWidth = $(".computer").width();
					humanWidth = $(".yourscore").width();
				}
				
				if (ended == false){
					console.log(computerWidth);
				}
				// $(".computer").css("width", currentWidth + scoreAI/10);

				if ( (humanScore > scoreAI) && ((computerWidth + humanWidth) <= windowWidth && (humanWidth > 1) ) ) {
					$(".computer").width(computerWidth - scoreAI/100);
					$(".yourscore").width(humanWidth + scoreAI/100);
				} else if ( (humanScore < scoreAI) && ((computerWidth + humanWidth) <= windowWidth) && (humanWidth > 1) ){
					$(".computer").width(computerWidth + scoreAI/100);
					$(".yourscore").width(humanWidth - scoreAI/100);
				} else if ( (humanScore == scoreAI) && ((computerWidth + humanWidth) <= windowWidth) && (humanWidth > 1) ){
					$(".computer").width("50%");
					$(".yourscore").width("50%");
				}
				if (humanWidth < 3) {
					$(".yourscore").hide();
				} else {
					$(".yourscore").show();
				}
				if (computerWidth < 3) {
					$(".computer").hide();
				} else {
					$(".computer").show();
				}

			}
			function increaseHumanScore(){
				//humanScore = humanScore + arduinoInput;
				$(".yourscore").html(humanScore);
			}
			if (ended == false){
				increaseAIScore();
			}
			
		var label, serverResponse;	// UI elements
		var input = [];
		
		function setup() {
			getData(3);								// make a request back to the server
		}

		function windowResized() {
		  //resizeCanvas(windowWidth, windowHeight);
		}
		
		// this function makes a call to the server:
  		function getData(channel) {
  			httpGet('/device/' + channel, update);
  		}
  		
  		// update the page when the server responds:
  		function update(data) {
  			// serverResponse.html(data);
	  		arduinoInput = parseInt(data);
	  		// if (ended == false){
	  			humanScore = humanScore + arduinoInput;
	  		// }
	  		input[0] = data;
	  		getData(3);							// make another call to the server
	  		console.log(data);
  		}
  		
  		//$("#circle").css("width", data);
  		$(document).ready(function() {

		 });