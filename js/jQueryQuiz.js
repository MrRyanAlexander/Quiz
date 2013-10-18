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
* implemented Json file, deleted JS object
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

	var currentQuestion = 0;
	var score = 0;
	var tries = 0;
	var triesLeft = 3;
	var restart = false;

    //questions get from JSON - store in q[] not working locally 
    var q = [];

    $.ajaxSetup({ cache: false }); //what is this doing? 

	$.getJSON("/js/questions.json", function(data){
            //loop through array 
        $.each(data, function(index, d){
            q.push(d);
        });
 
        }).error(function(jqXHR, textStatus, errorThrown){  //assign handler 
            log("error occurred!");
    });
	

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
                        log("tries left :" + triesLeft);
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

	//hidden try again button
	$('#restart').click(function(e){
		e.preventDefault();
		restart = true; 
		removeResults();
		currentQuestion = 0;
		score = 0;
		$('#back, #submit, #restart, #results').hide();
		$('.question, .choiceList, #next').fadeIn('slow');
		loadData();
		restart = false;
	});

	//generate the results page
	function results(){
		var div = document.getElementById('results');
		div.style.marginLeft = '100px';
		var scoreDiv = document.getElementById('score');
		scoreDiv.style.marginLeft = '150px';

		var table = document.createElement('table');
		table.id = 'qAndA';
		table.border = '2px';
		table.style.textAlign = 'center';
		table.style.fontSize = '20px';
		table.style.color = 'black';

		var table0 = document.createElement('table');
		table0.id = 'scores';
		table0.border = '5px';
		table0.style.textAlign = 'center';
		table0.style.fontSize = '40px';
		table0.style.color = 'green';

		var tr = document.createElement('tr');
		var td = document.createElement('td');
		var userScore = document.createTextNode(score / q.length * 100 + "%");

		td.appendChild(userScore);
		td.appendChild(theEnd);
		tr.appendChild(td);
		table0.appendChild(tr);
		scoreDiv.appendChild(table0);

			for(var i=0; i<q.length; i++){
				var tableRow1 = document.createElement('tr');
				var tableRow2 = document.createElement('tr');
	
				var tdNum = document.createElement('td');
				var tdAnswer = document.createElement('td');
				var num = document.createTextNode(q[i].question);
				//if user has reached the end show correct answers
				if(q[i].correct == false && tries == 3){
					var answer = document.createTextNode("You answered : " + localStorage.getItem("answer " + i) + " ,but the correct answer is : " + q[i].correctAnswer);     
                	tdAnswer.appendChild(answer);
				//otherwise only show the users answer and not the correct answer 
            	}else{
					var answer = document.createTextNode("You answered : " + localStorage.getItem("answer " + i));
                	tdAnswer.appendChild(answer);
				}

				tdNum.appendChild(num);	
				tableRow1.appendChild(tdNum);
				tableRow2.appendChild(tdAnswer);
	
				table.appendChild(tableRow1);
				table.appendChild(tableRow2);

				div.appendChild(table);	
			}

			var perfectScore = false;
			//check for perfect score
            
            if(score == q.length){
            	perfectScore = true;
            }
            //if the user has no tries left, show final results
			//this is the end so style it out different like THE END.. :) :) 
			if(perfectScore == false && tries == 3){
				table0.border = '10px';
				table0.style.fontSize = '100px';
				table0.style.color = 'blue';
				var theEnd = document.createTextNode("THE END");       
                td.appendChild(theEnd);

            }else if(perfectScore == true && tries == 3){
				table0.border = '30px';
				table0.style.fontSize = '150px';
				table0.style.color = 'red';
				var theEnd = document.createTextNode("Perfect Score *THE END*");
                td.appendChild(theEnd);	
			//otherwise only show the users answer and not the correct answer 
			}else{
				log('something is not the END');
			}
	//log("Your score = " + score / q.length * 100 + "%");
	}

	//refresh the results page
 	function removeResults(){
 		if(restart){ 
				$('#qAndA').remove();
				$('#scores').remove();
			}
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
		    	}else{
		    		localAnswer = localStorage.getItem("answer " + currentQuestion);
		    		localVal = localStorage.getItem("value " + currentQuestion);
		    	}
		
		        //find out if the user has already answered this question before and if so, select that radio button. 
		        if ( i == localVal ) {
		            tag = '<li><input type="radio" value=' + localVal + ' id=' + localVal + ' checked=true name="choices" ><label for=' + localVal + '>'+choice+'</label></li>';
		        } else {
		            tag = '<li><input type="radio" value=' + i + ' id=' + i + ' name="choices" ><label for=' + i + '>'+choice+'</label></li>';
		        }
		        //append the tab to the .choiceList and fade in slow
		        $(tag).appendTo('.choiceList').fadeIn('slow');
	    	} 		
    }
    	
    //store data locally	
    function storeData(){
    	//find out if the user has clicked the radio button
    	if($('input[name=choices]:checked').length > 0){
			var txt = $('input:radio:checked + label').text(); //store checked text 
		    var val = $('input:radio:checked').val(); //store checked value
		    //log(val); log(txt);
			//store the users answer and the checked value in localStorage
		    localStorage.setItem("answer " + currentQuestion, txt); 
		    localStorage.setItem("value " + currentQuestion, val);
		    //find out if the user has answered the question before, currently 
		    //this statement is only checking to see if there is one answer and 
		    //if so will proceed to the next step
		    if(q[currentQuestion].userAnswer.length == 0){
		       	q[currentQuestion].userAnswer.push(txt); //if 0 store in array
		    }
		       	//find out if the users localStorage answer is correct 
		       	if(localStorage.getItem("answer " + currentQuestion) == q[currentQuestion].correctAnswer){
		       		//add to the score
		       		score++;
		       		//set the users answer to correct
		       		q[currentQuestion].correct = true;
		       	//if the user got the question wrong
		       	}
		      log(q[currentQuestion].userAnswer);
		    //log(q[currentQuestion].correct);
		    //log(localStorage.getItem("answer " + currentQuestion));
		    //log("The current score = " + score);
		    //log("The current question is : " + currentQuestion);
		}
    }

    //create log 
    function log(t){
        console.log(t);
    }

});