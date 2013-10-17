/*!
* created by: Ryan Alexander on Oct 5, 2013
* contact: lazyguymedia@gmail.com
* website: ryan-alexander.com
*
* created quiz
* implemented results page
* inplemented localStorage
* implemented cross browser compatability update
* implemented next & back buttons
* implemented number of tries until the end
* implemented forced questions
* need - implemented Json file, deleted JS object
* need - implemented User Signup and Login Authentication
* need - implemented Twitter Bootstrap
* need ? 
*
*
*
*
*
*
*
*
*/

$(document).ready(function() {

	//questions //futur JSON
    var q = [
        {
        question: "Who is the President of the United States today?", 
        choices: ["George W. Bush", "John MCain", "Barack Obama", "Tony Blair"], 
        correctAnswer: "Barack Obama",
        userAnswer: []},
        {
        question: "Which of these is Javascript proper?", 
        choices: ['javascript', 'menow', 'mitorinor', 'bugnappingler'], 
        correctAnswer:'mitorinor',
        userAnswer: []},
        {
        question: "In 1822, who purposed and began developing the Difference Engine?", 
        choices: ["Tommy Flowers", "John Vincent Atanasoff", "Charles Babbage", "J. Presper Eckert"], 
        correctAnswer:"Charles Babbage",
        userAnswer: []},
        {
        question: "In 2009, who created the Node.js platform that is built on top of Google Chromes V8 Engine?", 
        choices: ["Urban Hafner", "Ryan Dahl", "Abe Fettig", "Joshaven Potter"], 
        correctAnswer:"Ryan Dahl",
        userAnswer: []},
        {
        question: "In Douglas Engelbarts 1968 presentation entitled, 'The Mother of All Demos', what entity do words makeup?", 
        choices: ["Statement", "Command", "String", "List"], 
        correctAnswer:"Statement",
        userAnswer: []}
        ];
	var currentQuestion = 0;
	var score = 0;
	var numQuestions = q.length;
	var tries = 0;
	var triesLeft = 3;

	//hide on load
	$('#results, .quizContainer, #restart').hide();
	
	//start quiz button
	$('#start').click(function(e){
		e.preventDefault();
		$(this).fadeOut(100);
		$('.quizContainer').fadeIn('slow');
		$('#back, #submit').hide();
		loadData();	
	});

	//back button
	$("#back").click(function(e){
		e.preventDefault();
		$('.quizContainer').hide().fadeIn('slow');
		//prevent position from going negative. Change to 1 to hide (this) first. 
		if(currentQuestion == 0){
			//do something
			$(this).fadeOut('slow');
			alert("You're at the beginning, answer some questions or change some answer and click next to move forward! You have "+triesLeft+" tries remaining!");
		}else{
			storeData();
			currentQuestion--;
			loadData();
			$('#next').fadeIn('slow');
		}	
	});


    $("#next").click(function(e){
        e.preventDefault();
        //force user to answer question
        if($('input[name=choices]:checked').length > 0){

	        $('.quizContainer').hide().fadeIn('slow');
	        //prevent position from going beyond questions
	            if(currentQuestion == numQuestions -1){
                	storeData();
                	$('#next, #back, .question, .choiceList').fadeOut('slow');
                    tries++;//only allow 3 tries to complete quiz
                        if(tries < 3){
							results();
							$('#results, #restart').fadeIn('slow');
						}else{
							results();
							$('#results').fadeIn('slow');
						}
                        triesLeft--;
                        alert("You've reached the end of this try. You have "+ triesLeft + " tries remaining!");
	            }else{                        
	                storeData();
	                currentQuestion++;
	                loadData();
	                $('#back').fadeIn('slow');
	                }
        }else{
        	alert("Oops! You forgot to answer this question.");
        }   
    });

	//hidden restart button
	$('#restart').click(function(e){
		e.preventDefault();
		//reset();
		currentQuestion = 0;
		$('#back, #submit, #restart, #results').hide();
		$('.question, .choiceList, #next').fadeIn('slow');
		loadData();
	});

	function reset(){
		var num = document.getElementById('1');
		var answer = document.getElementById('2');
		num.parentNode.removeChild(num);
		answer.parentNode.removeChild(answer);
	}
	//generate results
	function results(){
		for(i=0; i<numQuestions; i++){
			log(i + " : " + q[i].userAnswer);

		var table = document.getElementById('results');
		
		var tableRow1 = document.getElementById('tr1');
		var tableRow2 = document.getElementById('tr2');

		var tdNum = document.createElement('td');
		var tdAnswer = document.createElement('td');
		var qNum = i + 1;
		var num = document.createTextNode("Question : " + qNum);
		var answer = document.createTextNode(q[i].userAnswer);

		tdNum.appendChild(num);
		tdAnswer.appendChild(answer);

		tableRow1.appendChild(tdNum);
		tableRow2.appendChild(tdAnswer);

		table.appendChild(tableRow1);
		table.appendChild(tableRow2);

		document.body.appendChild(table);

		}
		log("Your score = " + score / numQuestions * 100 + "%");
	}

	//load q&a data
    function loadData(){

	    	var question = q[currentQuestion].question;
	    	var numChoices = q[currentQuestion].choices.length;
	    	var correctAnswer = q[currentQuestion].correctAnswer;


			// Set the questionClass text to the current question
		    $('.question').fadeIn('slow');
		    $('.question').text(question);
		
			//Fade the buttons with question
			$('.buttons').fadeIn('slow');
			
		    // Remove all current <li> elements (if any)
		    $('.choiceList').find("li").remove();

		    var i, choice, userAnswer, localAnswer, localVal, tag;
		    for (i = 0; i < numChoices; i ++) {
		        choice = q[currentQuestion].choices[i];

		        if(localStorage.getItem("answer " + currentQuestion) == null || 
		           localStorage.getItem("answer " + currentQuestion) == undefined ){

		        	localAnswer = "not answered";
		        	localVal = "no value";
		        	log("Local Answer: " + localAnswer); 
		        	log("Local Value: " + localVal);
		    	}else{
		    		localAnswer = localStorage.getItem("answer " + currentQuestion);
		    		localVal = localStorage.getItem("value " + currentQuestion);
		    		log("Local Answer: " + localAnswer); 
		        	log("Local Value: " + localVal);
		    	}
		
		        // If we already have a user answer for this choice then check the radio button
		        if ( i == localVal ) {
		            tag = '<li><input type="radio" value=' + localVal + ' id=' + localVal + ' checked=true name="choices" ><label for=' + localVal + '>'+choice+'</label></li>';
		        	//break;
		        	log("radio checked");
		        } else {
		            tag = '<li><input type="radio" value=' + i + ' id=' + i + ' name="choices" ><label for=' + i + '>'+choice+'</label></li>';
		        	//break;
		        	log("radio not checked");
		        }
		        //log(tag);
		        $(tag).appendTo('.choiceList').fadeIn('slow');
	    	} 		
    }
    	
    //store data locally	
    function storeData(){
    	if($('input[name=choices]:checked').length > 0){
				var txt = $('input:radio:checked + label').text(); //checked text 
		       	var val = $('input:radio:checked').val(); //checked value
		       	//log(val); log(txt);

		       	if(q[currentQuestion].userAnswer.length == 0){
		       		q[currentQuestion].userAnswer.push(txt); //store in array
		       			if(q[currentQuestion].userAnswer == q[currentQuestion].correctAnswer){
		       				score++;
		       			}else if(q[currentQuestion].userAnswer != q[currentQuestion].correctAnswer){
		       				if(score > 0){
		       					score--;
		       				}
		       			}
		       			log("The current score = " + score);
		        }

		       	localStorage.setItem("answer " + currentQuestion, txt); 
		       	localStorage.setItem("value " + currentQuestion, val);
		    }
    }

    //create log 
    function log(t){
        console.log(t);
    }

});