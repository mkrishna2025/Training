var calculator = {
	addition: function(x, y){
		return parseInt(x) + parseInt(y);
	},
	additionFromControl: function(x, y){
		return parseInt(document.getElementById(x).value) + parseInt(document.getElementById(y).value);
	},
	subtraction: function(x, y){
		return x - y;
	}
}; 