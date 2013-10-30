function Question(theQuestion, theChoices, theCorrectAnswer, answered, userAnswer) {
    // Initialize the instance properties
    this.question = theQuestion;
    this.choices = theChoices;
    this.correctAnswer = theCorrectAnswer;
    this.userAnswer = userAnswer;
    this.answered = answered;
    this.currentQuestion = currentQuestion;
    // private properties: these cannot be changed by instances
    var newDate = new Date(),
    	// Constant variable: available to all instances through the instance method below. This is also a private property.
        QUIZ_CREATED_DATE = newDate.toLocaleDateString();
	// This is the only way to access the private QUIZ_CREATED_DATE variable 
	// This is an example of a privilege method: it can access private properties and it can be called publicly
    this.getQuizDate = function () {
        return QUIZ_CREATED_DATE;
    };
    //logging all the details for reference
    console.log("question :" + this.question +"\n"+
    			"choices :" + this.choices +"\n"+
    			"correctAnswer :" + this.correctAnswer +"\n"+
    			"userAnswer :" + this.userAnswer +"\n"+
    			"answered :" + this.answered +"\n"+
    			"currentQuestion :" + this.currentQuestion);
}
 // Define the prototype methods that will be inherited
Question.prototype = {
	constructor: Question,
	displayQuestion: function () {
		$('#login, .form-signin').fadeOut(100);
		$('.form-quiz, #back, #next').fadeIn('fast');
		var question = this.question;
		$('.form-quiz-question').text(question);		
		$('.form-quiz-choiceList').find("li").remove();
	    var numChoices = this.choices.length;
	    var correctAnswer = this.correctAnswer;
		var i, choice, userAnswer, localAnswer, localVal, tag;
		    for (i = 0; i < numChoices; i ++) {
		        choice = this.choices[i];
		        if(localStorage.getItem("answer " + this.currentQuestion) == null || 
		           localStorage.getItem("answer " + this.currentQuestion) == undefined ){
		        	localAnswer = "not answered";
		        	localVal = "no value";
		    	}else{
		    		localAnswer = localStorage.getItem("answer " + this.currentQuestion);
		    		localVal = localStorage.getItem("value " + this.currentQuestion);
		    	}		
		        //find out if the user has already answered this question before and if so, select that radio button. 
		        if ( i == localVal ) {
		            tag = '<li><label for="' + localVal + '">'+choice+'</label><input type="radio" value="' + localVal + '" id="' + localVal + '" name="choices" checked=true ></li>';
		        } else {
		            tag = '<li><label for="' + i + '">'+choice+'</label><input type="radio" value="' + i + '" id="' + i + '" name="choices" ></li>';
		        }
		        //append the tab to the .choiceList and fade in fast
		        $(tag).appendTo('.form-quiz-choiceList').fadeIn('fast');
	    	}
	},
	storeData: function () {
		if($('input[name=choices]:checked').length > 0){
			var txt = $('input:radio:checked').prev().text(); //store checked text 
		    var val = $('input:radio:checked').val(); //store checked value
			if( !q[currentQuestion].answered ){
				//if not answered, set to answered
				q[currentQuestion].answered = true;
				//if the question has never been answered, stored the values 
		    	localStorage.setItem("answer " + this.currentQuestion, txt); 
		    	localStorage.setItem("value " + this.currentQuestion, val);
		    	//store answer in userAnswer array, but this is not needed
		    	if( this.userAnswer.length == 0 ){
		       		this.userAnswer.push(txt);
		    	}
		    	//if the answer is correct increase the score
		    	if( localStorage.getItem("answer " + this.currentQuestion) == this.correctAnswer ){
		    		//if the score is not to high increase it
		    		if( score < q.length ){
		       			score++;
		       			q[currentQuestion].correct = true;
		       			localStorage.setItem("score ", score);
		       			this.correct = true;
		        	}
		    	}
		    //if the question has been answered before
		    }else if( q[currentQuestion].answered ){
		    	//localStorage.setItem("answer " + this.currentQuestion, txt); 
		    	//localStorage.setItem("value " + this.currentQuestion, val);
		    	//below I assume the user answered the question correct at some point
		    	//if the selected answer doesn't match the previous answer
		    	//and the selected answer is not correct, reduce score
		    	if( txt != localStorage.getItem("answer " + this.currentQuestion) &&
		    		txt != this.correctAnswer ){
		    		this.userAnswer.pop();
		    		this.userAnswer.push(txt);
		    		localStorage.setItem("answer " + this.currentQuestion, txt);
		    		localStorage.setItem("value " + this.currentQuestion, val);
		    		score--;
		    		q[currentQuestion].correct = false;
		    		localStorage.setItem("score ", score);
		       		this.correct = false;
		       	//if the selected answer does not match the previous answer,
		       	//and the selected answer is correct, increase the score. 
		       	}else if( txt != localStorage.getItem("answer " + this.currentQuestion) &&
		       		 	  txt == this.correctAnswer){
		       		this.userAnswer.pop();
		    		this.userAnswer.push(txt);
		       		localStorage.setItem("answer " + this.currentQuestion, txt);
		       		localStorage.setItem("value " + this.currentQuestion, val);
		       		score++;
		       		q[currentQuestion].correct = true;
		       		localStorage.setItem("score", score);
		       		this.correct = true;
		       	}
		    }
		}
	}
};