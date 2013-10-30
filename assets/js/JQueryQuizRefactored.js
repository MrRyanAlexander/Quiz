/*!
* created by: Ryan Alexander on Oct 5, 2013
* contact: lazyguymedia@gmail.com
* website: ryan-alexander.com
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
* began implementing prototype patern
* updated for local and bypass Access-Control-Allow-Origin if error
*/
//needed to define some global variables
//if remote JSON is available, use it, else use global object.
//var q = [];
//var q = [
    {
    "question": "Who is the President of the United States of America today?",
    "choices": [
      "George W. Bush", 
      "John MCain", 
      "Barack Obama", 
      "Tony Blair"
    ],
    "correctAnswer": "Barack Obama",
    "answered": false,
    "correct": false,
    "userAnswer": []
    },
    {
    "question": "In 1995, a project named Mocha was started by?",
    "choices": [
      "John Backus", 
      "Brendan Eich", 
      "Guido van Rossum", 
      "Rasmus Lerdorf"
    ],
    "correctAnswer": "Brendan Eich",
    "answered": false,
    "correct": false,
    "userAnswer": []
    },
    {
    "question": "In 1822, who purposed and began developing the Difference Engine?",
    "choices": [
      "Tommy Flowers", 
      "John Vincent Atanasoff", 
      "Charles Babbage", 
      "J. Presper Eckert"
    ],
    "correctAnswer": "Charles Babbage",
    "answered": false,
    "correct": false,
    "userAnswer": []
    },
    {
    "question": "In 2009, who created the Node.js platform that is built on top of Google Chromes V8 Engine?",
    "choices": [
      "Urban Hafner", 
      "Ryan Dahl", 
      "Abe Fettig", 
      "Joshaven Potter"
    ],
    "correctAnswer": "Ryan Dahl",
    "answered": false,
    "correct": false,
    "userAnswer": []
    },
    {
    "question": "In Douglas Engelbarts 1968 presentation entitled, 'The Mother of All Demos', what entity do words makeup?",
    "choices": [
      "Statement", 
      "Command", 
      "String", 
      "List"
    ],
    "correctAnswer": "Statement",
    "answered": false,
    "correct": false,
    "userAnswer": []
    }
	];
//shared between files
var currentQuestion =0, score =0;
//begin quiz code
$(document).ready(function() {
	//ready the remote JSON for use in this
	function getJSON(){
    	$.ajaxSetup({ cache: false }); //what is this doing? 
    	try{
		$.getJSON("assets/js/questions.json", function(data){
            //loop through array 
        	$.each(data, function(index, d){
            	q.push(d);
        	});
        	}).error(function(jqXHR, textStatus, errorThrown){  
    	});
        }catch(e){
        	console.log("Not using remote JSON");	
    	}
    }
    getJSON();
	//log each try, starting with 3 and restart true/false
	var tries =0, triesLeft =3,restart =false;
	//set login button text to signup if no username or password
	varLoginSignup();
	//start quiz button/login/signup
	$(".form-signin").submit(function(event) {
    	event.preventDefault();
		var user = new User($("#username").val(), $("#password").val(), "testemail@mail.com");
    	if(!user.secureLogin()){
    		alert("Wrong username or password");
    	}else{
    		alert("Quiz Started!");
    		quizQuestion = new Question(q[currentQuestion].question, q[currentQuestion].choices, q[currentQuestion].correctAnswer, q[currentQuestion].answered);
    		quizQuestion.displayQuestion();
    	}
	});
	//back button
	$("#back").click(function(e){
		e.preventDefault();
		$('.form-quiz-question, .form-quiz-choiceList').hide().fadeIn('fast');
		//prevent position from going negative. Change to 1 to hide (this) first. 
		if(currentQuestion == 0){
			//do something
			$(this).fadeOut('fast');
			alert("You're at the beginning, answer some questions or change some answer and click next to move forward! You have "+triesLeft+" tries remaining!");
		}else{
			quizQuestion.storeData();
			currentQuestion--;
			quizQuestion = new Question(q[currentQuestion].question, q[currentQuestion].choices, q[currentQuestion].correctAnswer, q[currentQuestion].answered, q[currentQuestion].userAnswer);
			quizQuestion.displayQuestion();
			$('#next').fadeIn('fast');
		}	
	});
	//next button
    $("#next").click(function(e){
        e.preventDefault();
        //force user to answer question
        if($('input[name=choices]:checked').length > 0){

	        $('.form-quiz-question, .form-quiz-choiceList').hide().fadeIn('fast');
	        //prevent position from going beyond questions
	            if(currentQuestion == q.length -1){
                	quizQuestion.storeData();
                	$('.form-quiz').fadeOut('fast');
                		//only allow 3 tries to complete quiz
                    	tries++;
                    	if(score == q.length){
                    		results();
                    		$('.form-quiz, #restart').hide();
							$('#form-results, #form-score').fadeIn('fast');
                    	}else if(tries < 3){
                    		triesLeft--;
                    		alert("You've reached the end of this try. You have "+ triesLeft + " tries remaining!");
							results();
							$('.form-quiz').hide();
							$('#form-results, #form-score, #restart').fadeIn('fast');
						}else{
							triesLeft--;
							alert("You've reached the end of this try. You have "+ triesLeft + " tries remaining!");
							results();
							$('.form-quiz, #restart').hide();
							$('#form-results, #form-score').fadeIn('fast');
						}
                        log("tries left: "+triesLeft+ "&" + tries + " tries already used!");
	            }else{                        
	                quizQuestion.storeData();
	                currentQuestion++;
					quizQuestion = new Question(q[currentQuestion].question, q[currentQuestion].choices, q[currentQuestion].correctAnswer, q[currentQuestion].answered, q[currentQuestion].userAnswer);
	                quizQuestion.displayQuestion();
	                $('#back').fadeIn('fast');
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
		$('.form-quiz, #next').fadeIn('fast');
		$('#back, #form-results').hide();
		localStorage.setItem("score", score);
		localStorage.setItem("currentQuestion", currentQuestion); 
		quizQuestion = new Question(q[currentQuestion].question, q[currentQuestion].choices, q[currentQuestion].correctAnswer, q[currentQuestion].answered, q[currentQuestion].userAnswer);
		quizQuestion.displayQuestion();
		restart = false;
	});
	//generate the results page
	function results(){
        var con = document.getElementsByClassName('container')[0];
		var div = document.getElementById('form-results');
		var scoreDiv = document.getElementById('form-score');
		var qAndA = document.createElement('div');
		qAndA.id = 'qAndA';
		qAndA.style.marginTop = '30px';
		qAndA.style.textAlign = 'center';
		qAndA.style.fontSize = '20px';
		qAndA.style.color = 'black';
		//if the user has no tries left, show final results
		//this is the end so style it out different like THE END.. :) :) 
		if(score != q.length && tries == 3){
			scoreDiv.style.marginTop = '30px';
			scoreDiv.style.textAlign = 'center';
			scoreDiv.style.fontSize = '50px';
			scoreDiv.style.color = '#023EBF'; 
			var theEnd = document.createTextNode(score / q.length * 100 + "% Good Try!");       
            scoreDiv.appendChild(theEnd);
            div.appendChild(scoreDiv);
        }else if(score == q.length){
        	scoreDiv.style.marginTop = '30px';
			scoreDiv.style.textAlign = 'center';
			scoreDiv.style.fontSize = '50px';
			scoreDiv.style.color = '#0FB500';
			var theEnd = document.createTextNode(score / q.length * 100 + "% Perfect!");
            scoreDiv.appendChild(theEnd);	
            div.appendChild(scoreDiv);
		}else{
			scoreDiv.style.marginTop = '30px';
			scoreDiv.style.textAlign = 'center';
			scoreDiv.style.fontSize = '40px';
			scoreDiv.style.color = '#F20F0F';
			var userScore = document.createTextNode(score / q.length * 100 + "% Try Again?");
			scoreDiv.appendChild(userScore);
			div.appendChild(scoreDiv);
			log('Some answers are incorrect and there are ' +triesLeft+' tries remaining');
		}

			for(var i=0; i<q.length; i++){
				var questionUL = document.createElement('ul');
				var answerLi = document.createElement('li');
				var br = document.createElement('br');
				answerLi.style.listStyleType = "none";
				//for each question, create a text node to show the user
				var questions = document.createTextNode(q[i].question);
				//if user has reached the end show correct answers
				questionUL.appendChild(questions);
				if(q[i].correct == false && tries == 3){
					var answer = document.createTextNode("You answered : " + localStorage.getItem("answer " + i) + " ,but the correct answer is : " + q[i].correctAnswer);     
                	answerLi.appendChild(answer);
				//otherwise only show the users answer and not the correct answer 
            	}else{
					var answer = document.createTextNode("You answered : " + localStorage.getItem("answer " + i));
                	answerLi.appendChild(answer);
				}
				qAndA.appendChild(br);
				qAndA.appendChild(questionUL);
				qAndA.appendChild(br);
				qAndA.appendChild(answerLi);
				qAndA.appendChild(br);
				//div.appendChild(scoreDiv);
				div.appendChild(qAndA);
                
			}
            con.appendChild(div);
		//log("Your score = " + score / q.length * 100 + "%");
	}
	//refresh the results page
 	function removeResults(){
 		if(restart){ 
				$('#qAndA').remove();
				$('#form-score').text('');
			}
 	}	
	//find out if user signed up before and if true show their login info on load
	function varLoginSignup(){
		var username = localStorage.getItem("user");
    	var password = localStorage.getItem("password");
    	if(username == null || username == undefined){
    		$('#login').text('Signup');
    		$('.form-signin-heading-2').hide();
    	}else if(username != null || username != undefined){
    		if(currentQuestion == 0){
    			$('#login').text('Login');
    			$('.form-signin-heading-2').text("Welcome back " + username + "!").fadeIn('fast');
    		}
    	}
    }
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
	function inheritPrototype(childObject, parentObject) {
    	// As discussed above, we use the Crockford’s method to copy the properties and methods from the parentObject onto the childObject
		// So the copyOfParent object now has everything the parentObject has 
    	var copyOfParent = Object.create(parentObject.prototype);

    	//Then we set the constructor of this new object to point to the childObject.
		//This step is necessary because the preceding step overwrote the childObject constructor when it overwrote the childObject prototype (during the Object.create() process)
    	copyOfParent.constructor = childObject;

    	// Then we set the childObject prototype to copyOfParent, so that the childObject can in turn inherit everything from copyOfParent (from parentObject)
   		childObject.prototype = copyOfParent;
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