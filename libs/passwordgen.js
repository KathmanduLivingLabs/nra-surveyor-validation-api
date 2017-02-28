module.exports = {

	generate: function() {

		var possibleChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

		var pwd = "";

		var passwordLength = 5;

		for (var length = 0; length < passwordLength; length++) {
			pwd = pwd + possibleChars[Math.floor(Math.random() * possibleChars.length)];
		}

		return pwd;

	}
}