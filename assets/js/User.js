function User(theName, password, theEmail) {
		
	this.name = theName;
	this.password = password;
	this.email = theEmail;
	this.quizScores = [];
	this.currentScore = 0;	
	//privately store login data
	var storeLogin = function(user, pass){
		localStorage.setItem("user", user);
	    localStorage.setItem("password", pass);
	};
	//ONLY STORE LOGIN DATA IF NONE IS PRESENT
	var storedUsername = localStorage.getItem("user");
    var storedPassword = localStorage.getItem("password");
	if(storedUsername == null && storedPassword == null 
	|| storedUsername == undefined && storedPassword == undefined){
	storeLogin(this.name, this.password);
	}
}
User.prototype = {
	constructor: User,
	addScore: function(score){
		this.quizScores.push(score);
	},
	getScore: function(){
		return this.quizScores;
	},
	secureLogin:function(){
		if(localStorage.getItem("user") == this.name &&
		   localStorage.getItem("password") == this.password){
			return true;
		}else{
			return false;
		}
	}
};