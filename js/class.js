//$(document).ready(function() {
//  $(".see-photos").on("click", function(event) {
//    event.preventDefault();
//    $(this).closest(".tour").find(".photos").slideToggle();
//  });
//  $(".photos").on("mouseenter", "li", function(){
//  	//$(this).closest(".tour").find("span").fadeUp();
//  	$(this).find("span").slideToggle();
/*!
 * Dynamic jQuery Quiz
 * http://github.com/MrRyanAlexander/Quiz
 *
 * @updated September 23, 2013
 *
 * @author Ryan Alexander - http://www.ryan-alexander.com
 * @license MIT
 */

/*!start = start quiz
*  start = hide start button
*  start = get quiz question
*  start = show first unanswered question 
*  
*  [ main quiz ]
*  
*  next = get current selection
*  next = match selection to correct answer
*  next = store answer
*  next = update question to answered to prevent it from being asked again
*  next = get next answered question
*  next = go to next question
*  
*  if next cannot find an unaswered question we have reached the end
*  hide quiz and show results
*  show button to restart quiz
*/ 
    function log(t){
        console.log(t);
    }

	var q = [
	 	{
    	question: "1Who is Prime Minister of the United Kingdom?", 
    	choices: ["David Cameron", "Gordon Brown", "Winston Churchill", "Tony Blair"], 
    	correctAnswer: "David Cameron",
    	storedAnswer:"",
    	answered:false},
    	{
    	question: "2Who is Prime Minister of the United Kingdom?", 
    	choices: ["David Cameron", "Gordon Brown", "Winston Churchill", "Tony Blair"], 
    	correctAnswer:"Gordon Brown",
    	storedAnswer:"",
    	answered:false},
    	{
    	question: "3Who is Prime Minister of the United Kingdom?", 
    	choices: ["David Cameron", "Gordon Brown", "Winston Churchill", "Tony Blair"], 
    	correctAnswer:"Gordon Brown",
    	storedAnswer:"",
    	answered:false},
    	{
    	question: "4Who is Prime Minister of the United Kingdom?", 
    	choices: ["David Cameron", "Gordon Brown", "Winston Churchill", "Tony Blair"], 
    	correctAnswer:"David Cameron",
    	storedAnswer:"",
    	answered:false},
    	{
    	question: "5Who is Prime Minister of the United Kingdom?", 
    	choices: ["David Cameron", "Gordon Brown", "Winston Churchill", "Tony Blair"], 
    	correctAnswer:"David Cameron",
    	storedAnswer:"",
    	answered:false}
    	];
    var storedAnswers = [];
    var score = 0;
    var answer ;

$(document).ready(function () {
		
    $("#start").on("click", function(event){
        event.preventDefault;
        if(q.length > 0){
    	$("#start").hide();
        console.log("quiz started");
    	$("#quizContainer").removeClass("hidden");
        }
    });


    $("#A,#B,#C,#D").on("click", function(event){
        event.preventDefault;
        if(q.length > 1){
        /*!
        *  next = get button user clicks
        *  next = match selection to correct answer
        *  next = store answer
        *  next = update question to answered to prevent it from being asked again
        *  next = get next unanswered question
        *  next = go to next question
        */ 
        //get and store the users answer
        answer = $(this).text();
        storedAnswers.push(answer);
        q.shift();
        $("#question").text(q[0].question);
                $("#A").text(q[0].choices[0]);
                $("#B").text(q[0].choices[1]);
                $("#C").text(q[0].choices[2]);
                $("#D").text(q[0].choices[3]);
        log("POPPED" + q.length);
        //log(an);
        log("Answer = "+answer);
        log("Stored Answers = "+storedAnswers);
        log("There are "+ q.length + " questions remaining");
        } else {
            //hide all the buttons and show end message
        answer = $(this).text();
        storedAnswers.push(answer);
        q.shift();
        //log("---------------");
        //log("POPPED" + q.length);
        //log(an);
        log("Answer = "+answer);
        log("Stored Answers = "+storedAnswers);
        log("There are "+ q.length + " questions remaining");
        log("Correct Answer = "+correctANswer);
        log("The current score is : "+score);
        q.shift();
        log("---------------");
        log("POPPED" + q.length);
            $("#A,#B,#C,#D").hide();
            $("#question").text("THE END");
        }

        //get the correct answer 
            var correctANswer = q[0].correctAnswer;
            log("Correct Answer = "+correctANswer);
            //compare users answer with correct answer
            if(answer == correctANswer){
                score++; //add to score
                log("The current score is : "+score);
            }else if(answer != correctANswer){
                score--; //subtract from score
                log("The current score is : "+score);
            }

            //remove question 
            //log( q.shift() );//.pop();
            //log("There are "+ q.length + " questions remaining");
    });

        //for(var i=0; i<q.length; i++){
            //if(q.length > 0){

                //populate new question and answers
                $("#question").text(q[0].question);
                $("#A").text(q[0].choices[0]);
                $("#B").text(q[0].choices[1]);
                $("#C").text(q[0].choices[2]);
                $("#D").text(q[0].choices[3]);

//               //get the correct answer 
//               var correctANswer = q[0].correctAnswer;
//               log("Correct Answer = "+correctANswer);
//               //compare users answer with correct answer
//               if(answer == correctANswer){
//                   score++; //add to score
//                   log("The current score is : "+score);
//               }else if(answer != correctANswer){
//                   score--; //subtract from score
//                   log("The current score is : "+score);
//               }

//               //remove question 
//               //log( q.shift() );//.pop();
//               log("There are "+ q.length + " questions remaining");

//               

//           }else {
//               //hide all the buttons and show end message
//               $("#A,#B,#C,#D").hide();
//               $("#question").text("THE END");
//           }
//       //}
//
    

});
