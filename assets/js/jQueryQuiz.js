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
* implemented User Signup and Login Authentication via localStorage 
* implemented Twitter Bootstrap
*/

$(document).ready(function() {

	var currentQuestion = 0,
	    score = 0,
	    tries = 0,
	    triesLeft = 3,
	    restart = false,
	    signedUp = false,
	    q = [];

    //hide on load
	$('#form-results, .form-quiz, #restart').hide();

	//Get JSON (need to find out a secure way to handle this because
	//the way I am calling it here exposes the JSON file to the world)
	getJSON();

	//set login button text to signup if no username or password
	varLoginSignup();

	//start quiz button
	$(".form-signin").submit(function(e) {
    	e.preventDefault();
    	loginSignupAuth();
    	varLoginSignup();
	});
	
	//back button
	$("#back").click(function(e){
		e.preventDefault();
		$('.form-quiz').hide().fadeIn('slow');
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

	//next button
    $("#next").click(function(e){
        e.preventDefault();
        //force user to answer question
        if($('input[name=choices]:checked').length > 0){

	        $('.form-quiz').hide().fadeIn('slow');
	        //prevent position from going beyond questions
	            if(currentQuestion == q.length -1){
                	storeData();
                	$('#next, #back, .form-quiz-question, .form-quiz-choiceList').fadeOut('slow');
                    tries++;//only allow 3 tries to complete quiz
                        if(tries < 3){
							results();
							$('#form-results, #restart').fadeIn('slow');
						}else{
							results();
							$('#form-results').fadeIn('slow');
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
		$('#back, #restart, .form-results').hide();
		$('.form-quiz-question, .form-quiz-choiceList, #next').fadeIn('slow');
		loadData();
		restart = false;
	});

	//generate the results page
	function results(){
                var con = document.getElementsByClassName('container')[0];
		var div = document.getElementById('form-results');
		var scoreDiv = document.getElementById('form-score');

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
                                con.appendChild(div);
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

    //load q&a data
    function loadData(){

    		$('#login, .form-signin').fadeOut(100);
			$('.form-quiz').fadeIn('slow');
			$('#back, #submit').hide();

	    	var question = q[currentQuestion].question;
	    	var numChoices = q[currentQuestion].choices.length;
	    	var correctAnswer = q[currentQuestion].correctAnswer;

			// Set the questionClass text to the current question
		    $('.form-quiz-question').fadeIn('slow');
		    $('.form-quiz-question').text(question);
		
			//Fade the buttons with question
			$('#back, #next').fadeIn('slow');
			
		    // Remove all current <li> elements (if any)
		    $('.form-quiz-choiceList').find("li").remove();

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
		        $(tag).appendTo('.form-quiz-choiceList').fadeIn('slow');
	    	} 		
    }
    
    //authenticate users post login
    function authenticateLogin(){
		return loadData();
	}

	function loginSignupAuth(){
		//get the username and password the user submits
		var username = $("#username").val();
	    var password = $("#password").val();
	    //get the stored username and password. If nothing is stored this returns null or undefined 
	    var storedUsername = localStorage.getItem("user");
    	var storedPassword = localStorage.getItem("password");
    	//find out if user has never signed up and if not store their login data
		if(storedUsername == null && storedPassword == null || storedUsername == undefined && storedPassword == undefined){
	    	localStorage.setItem("user", username);
	    	localStorage.setItem("password", password);
	    	cookieUtil.set("user", username, null, null, null, false);
	    	cookieUtil.set("password", password, null, null, null, false);
	    	log('user :'+username+'just signed up with pass:'+password);
	    //if the user has signed up before
	 	}else if(storedUsername != null && storedPassword != null || storedUsername != undefined && storedPassword != undefined){
	 		//find out if the entered user and pass do not match the stored user and pass
	 		if(username != storedUsername && password != storedPassword){
	 			//if the login data does not match alert the user of her error
	 		    alert("Oops you entered the wrong username or password");
	 		//if the login details are correct return success, which in this case is my auth func
	 		}else if(username == storedUsername && password == storedPassword){
	 			return authenticateLogin();
	 		}
	 	}
	}	

	//find out if user signed up before and if true show their login info on load
	function varLoginSignup(){
		var username = localStorage.getItem("user");
    	var password = localStorage.getItem("password");
    	if(username == null || username == undefined){
    		$('#login').text('Signup');
    	}else if(username != null || username != undefined){
    		if(currentQuestion == 0){
    			$('#login').text('Login');
    		}else{
    		$('.form-signin-heading-2').text("Welcome back " + username + "!").fadeIn('slow');
    		}
    	}
    }

    //get questions from external JSON file
    function getJSON(){
    	$.ajaxSetup({ cache: false }); //what is this doing? 
		$.getJSON("assets/js/questions.json", function(data){
            //loop through array 
        	$.each(data, function(index, d){
            	q.push(d);
        	});
        	}).error(function(jqXHR, textStatus, errorThrown){  
            log("error occurred!");
    	});
    }

    var randomVar = [{"question":"What is your name", "choices":["A","B","C"], "correntAnswer":"B"}];
    createJsonFile();

    function createJsonFile() {
    	// some jQuery to write to file
    	$.ajax({
        	type : "POST",
        	url : "assets/php/json.php",
        	dataType : 'json',
        	data : {
            	json : randomVar //create this
        	},
        	success: function(data) {
            questions = data;
        	},
        	// This forces the Ajax callback to respond only when completed
        	async: false 	
    	});
    	console.log("Wrote the JSON file OK! ")
	}

    //handle cookies
    var cookieUtil = {
		get: function (name){
			var cookieName = encodeURIComponent(name) + "=",
			cookieStart = document.cookie.indexOf(cookieName),
			cookieValue = null;
			if (cookieStart > -1){
				var cookieEnd = document.cookie.indexOf(";", cookieStart);
			if (cookieEnd == -1){
				cookieEnd = document.cookie.length;
			}
			cookieValue = decodeURIComponent(document.cookie.substring(cookieStart
			+ cookieName.length, cookieEnd));
			}
			return cookieValue;
		},
		set: function (name, value, expires, path, domain, secure) {
			var cookieText = encodeURIComponent(name) + "=" +
			encodeURIComponent(value);
			if (expires instanceof Date) {
				cookieText += "; expires=" + expires.toGMTString();
			}
			if (path) {
				cookieText += "; path=" + path;
			}
			if (domain) {
				cookieText += "; domain=" + domain;
			}
			if (secure) {
				cookieText += "; secure";
			}
			document.cookie = cookieText;
		},
		unset: function (name, path, domain, secure){
			this.set(name, "", new Date(0), path, domain, secure);
		}
};

   //create log 
    function log(t){
        console.log(t);
    }
});