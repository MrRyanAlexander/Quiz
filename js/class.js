/*!
 * Dynamic jQuery Quiz
 * http://github.com/MrRyanAlexander/Quiz
 *
 * @updated October 6, 2013
 *
 * @author Ryan Alexander - http://www.ryan-alexander.com
 * @license MIT
 */

    

$(document).ready(function () {

    //create log 
    function log(t){
        console.log(t);
    }

    //questions
    var q = [
        {
        question: "Who is the President of the United States today?", 
        choices: ["George W. Bush", "John MCain", "Barack Obama", "Tony Blair"], 
        correctAnswer: "Barack Obama"},
        {
        question: "Which of these is Javascript proper?", 
        choices: ["<script></script>", "<script type='text/javascript'><script>", "</script>", "<script type='text/javascript'></script>"], 
        correctAnswer:"<script type='text/javascript'></script>"},
        {
        question: "In 1822, who purposed and began developing the Difference Engine?", 
        choices: ["Tommy Flowers", "John Vincent Atanasoff", "Charles Babbage", "J. Presper Eckert"], 
        correctAnswer:"Charles Babbage"},
        {
        question: "In 2009, who created the Node.js platform that is built on top of Google Chromes V8 Engin?", 
        choices: ["Urban Hafner", "Ryan Dahl", "Abe Fettig", "Joshaven Potter"], 
        correctAnswer:"Ryan Dahl"},
        {
        question: "In Douglas Engelbarts 1968 presentation entitled, 'The Mother of All Demos', what entity do words makeup?", 
        choices: ["Statement", "Command", "String", "List"], 
        correctAnswer:"Statement"}
        ];
    //store answers
    var storedAnswers = [];
    //log score
    var score = 0;
    //global answer
    var answer ;

    //start quiz
    $("#start").on("click", function(event){
        event.preventDefault;
        $("#start").hide();
        console.log("quiz started");
        $("#quizContainer").removeClass("hidden");
    });

	//populate the page with new question and answers
    $("#question").text(q[0].question);
    $("#A").text(q[0].choices[0]);
    $("#B").text(q[0].choices[1]);
    $("#C").text(q[0].choices[2]);
    $("#D").text(q[0].choices[3]);	

    //next question
    $("#A,#B,#C,#D").on("click", function(event){
        event.preventDefault;
        if(q.length >= 1){

        //get and store the users answer
        answer = $(this).text();
        storedAnswers.push(answer);
        log("Answer = "+answer);
        log("Stored Answers = "+storedAnswers);
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
        //remove the question it's done
        q.shift();
        //get the next question
        $("#question").text(q[0].question);
                $("#A").text(q[0].choices[0]);
                $("#B").text(q[0].choices[1]);
                $("#C").text(q[0].choices[2]);
                $("#D").text(q[0].choices[3]);
        log("POPPED" + q.length);
        //log(an);
        log("There are "+ q.length + " questions remaining");

        } else {

        //hide all the buttons, calculate percent and show end message
        //get the answer and store it
        answer = $(this).text();
        storedAnswers.push(answer);
        //remove the final question
        q.shift();
        log("Answer = "+answer);
        log("Stored Answers = "+storedAnswers);
        log("There are "+ q.length + " questions remaining");
        log("Correct Answer = "+correctANswer);
        log("The current score is : "+score);
        //hide the buttons
        $("#A,#B,#C,#D").hide();
        //calculate users final score
        var percent = score / 5 * 100;
        //show the users results
        var display = storedAnswers.join("-");
        $("#question").text("THE END" +"You scored "+percent+"% and Your answers " + display);
        }

        //end
    });
                
});
