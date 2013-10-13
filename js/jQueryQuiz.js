$(document).ready(function() {

	//questions
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
        userAnswer: []},
        ];

	var currentQuestion = 0;
	var score = 0;
	var numQuestions = q.length;

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
		//prevent position from going negative
		if(currentQuestion == 0){
			//do something
			$('#back').fadeOut('slow');
			alert("You're at the beginning, answer some questions and click next to move forward!");
		}else{
			storeData();
			currentQuestion--;
			loadData();
			$('#next').fadeIn('slow');
		log("Clicked back and the score is: " + score);
		log("Clicked back and the question is: " + currentQuestion);
		}
		
	});

    //next button
	$("#next").click(function(e){
		e.preventDefault();
		$('.quizContainer').hide().fadeIn('slow');
		//prevent position from going beyond questions
		if(currentQuestion == numQuestions -1){
			storeData();
			//alert("You've reached the end of the quiz. Congrats!");
			$('#next').fadeOut('slow');
			$('#submit').fadeIn('slow');
		}else{			
			storeData();
			currentQuestion++;
			loadData();
			$('#back').fadeIn('slow');
		log("Clicked next and the score is: " + score);
		log("Clicked next and the question is: " + currentQuestion);
		}
		
	});

	//hidden submit button
	$('#submit').click(function(e){
		e.preventDefault();
		$('.quizContainer').fadeOut('fast');
		$('.buttons').fadeOut('fast');
		$('#results').fadeIn('slow');
		results();
		$('#restart').fadeIn('slow');
	});

	$('#restart').click(function(e){
		e.preventDefault();
		currentQuestion = 0;
		$('#back, #submit, #restart, #results').hide();
		$('#next, .quizContainer').fadeIn('slow');
		loadData();
	});

	function results(){
		for(i=0; i<numQuestions; i++){
			log(i + " : " + q[i].userAnswer);

		var table = document.getElementById('results');
		
		var tableRow1 = document.getElementById('tr1');
		var tableRow2 = document.getElementById('tr2');

		var tdNum = document.createElement('td');
		var tdAnswer = document.createElement('td');

		var num = document.createTextNode(i);
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
		    $('.question').hide().fadeIn('slow');
		    $('.question').text(question);
		
			//Fade the buttons with question
			$('.buttons').hide().fadeIn('slow');
			
		    // Remove all current <li> elements (if any)
		    $('.choiceList').find("li").remove();

		    var i, choice, userAnswer, localAnswer, localVal, tag;
		    for (i = 0; i < numChoices; i ++) {
		        choice = q[currentQuestion].choices[i];
		        userAnswer = q[currentQuestion].userAnswer; 
		        localAnswer = localStorage.getItem("answer " + currentQuestion);
		        localVal = localStorage.getItem("value " + currentQuestion);
		        log("Local Answer: " + localAnswer); 
		        log("Local Value: " + localVal);
		
		        // If we already have a user answer for this choice then check the radio button
		        if ( i == localVal ) {
		            tag = '<li><input type="radio" value=' + localVal + ' id=' + localVal + ' checked=true name="choices" ><label for=' + localVal + '>'+choice+'</label</li>';
		        	//break;
		        	log("radio checked");
		        } else {
		            tag = '<li><input type="radio" value=' + i + ' id=' + i + ' name="choices" ><label for=' + i + '>'+choice+'</label</li>';
		        	//break;
		        	log("radio not checked");
		        }
		        //log(tag);
		        $(tag).appendTo('.choiceList').hide().fadeIn('slow');
	    	} 
			
    }
    	
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