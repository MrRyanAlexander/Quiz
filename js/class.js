//$(document).ready(function() {
//  $(".see-photos").on("click", function(event) {
//    event.preventDefault();
//    $(this).closest(".tour").find(".photos").slideToggle();
//  });
//  $(".photos").on("mouseenter", "li", function(){
//  	//$(this).closest(".tour").find("span").fadeUp();
//  	$(this).find("span").slideToggle();


	var q = [
	 	{
    	question: "1Who is Prime Minister of the United Kingdom?", 
    	choices: ["David Cameron", "Gordon Brown", "Winston Churchill", "Tony Blair"], 
    	correctAnswer:0,
    	storedAnswer:"",
    	answered:false},
    	{
    	question: "2Who is Prime Minister of the United Kingdom?", 
    	choices: ["David Cameron", "Gordon Brown", "Winston Churchill", "Tony Blair"], 
    	correctAnswer:0,
    	storedAnswer:"",
    	answered:false},
    	{
    	question: "3Who is Prime Minister of the United Kingdom?", 
    	choices: ["David Cameron", "Gordon Brown", "Winston Churchill", "Tony Blair"], 
    	correctAnswer:0,
    	storedAnswer:"",
    	answered:false},
    	{
    	question: "4Who is Prime Minister of the United Kingdom?", 
    	choices: ["David Cameron", "Gordon Brown", "Winston Churchill", "Tony Blair"], 
    	correctAnswer:0,
    	storedAnswer:"",
    	answered:false},
    	{
    	question: "5Who is Prime Minister of the United Kingdom?", 
    	choices: ["David Cameron", "Gordon Brown", "Winston Churchill", "Tony Blair"], 
    	correctAnswer:0,
    	storedAnswer:"",
    	answered:false}
    	];

$(document).ready(function () {

		$(window).on("load",function(){
			$("#next").hide();
		});
		
        $("#start").on("click", function(event){
        	event.preventDefault;

    		$("#start").hide();
    		$("#next").show();
    		Quiz();
        });

        $("#next").on("click", function(event){
        	event.preventDefault;
        	
        	Quiz();
        
        });

    	function Quiz(question, answer){
    		for(var i=0; i<q.length; i++){
    			switch(q[i].answered){

    				case false:
    				$("#quizQuestions").removeClass("hidden").find(".questions").text(q[i].question);
    				$("#rad1").text(q[i].choices[0]);
    				$("#rad2").text(q[i].choices[1]);
    				$("#rad3").text(q[i].choices[2]);
    				$("#rad4").text(q[i].choices[3]);
    				break;
    				
    				case true:
    				$("#next").hide();
    				$("#quizQuestions").addClass("hidden");
    				$("#done").removeClass("hidden");
    				break;
    			}
    		}
    	}
});
