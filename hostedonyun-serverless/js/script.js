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
				refresh();
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
					} else if (humanScore > scoreAI) {
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

			}

			function increaseAIScore(){
				refresh();
				if (scoreAI >= 0 && scoreAI < 80000 && ended == false){
					scoreAI += 36;
					 // humanScore += 15;
				}
				// console.log(scoreAI);
				$(".computer-score").html(scoreAI);
				if (started == true){
					windowWidth = $(window).width();
					computerWidth = $(".computer").width();
					humanWidth = $(".yourscore").width();
				}
				
				if (ended == false){

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
				humanScore = humanScore + arduinoInput;
				$(".yourscore").html(humanScore);
			}
			if (ended == false){
				increaseAIScore();
			}
			
		var label, serverResponse;	// UI elements
		var input = [];
		


		function windowResized() {
		  //resizeCanvas(windowWidth, windowHeight);
		}
		
  		
  		// update the page when the server responds:
  		function update(data) {
  			// serverResponse.html(data);
	 // 		arduinoInput = parseInt(data);
	  		// if (ended == false){
	  			//refresh();
	  			 // humanScore = humanScore + arduinoInput;
	  		// }
	  		input[0] = data;
	  		getData(3);							// make another call to the server

  		}

  		function refresh() {
  			// console.log("hit refresh");
            $('#content').load('/arduino/accelerometer', function(result){
            	var fromtheArduino = $('#content').html();
            	arduinoInput = parseInt(fromtheArduino);

            });
            // humanScore = humanScore + arduinoInput;
        }

  		//$("#circle").css("width", data);
  		$(document).ready(function() {

		 });