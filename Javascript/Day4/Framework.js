var Framework = {
	GetCmp: function(id){
		return document.getElementById(id) || document.getElementsByName(id)[0];
	},
	Disable: function(id){
		var element = Framework.GetCmp(id);
		element.disabled = true;
	},
	UIControls: function(){
		return {
			createTextBox: function( ){
				var element = document.createElement('input'); 
				element.type = "text"; 
				return element;
			},
			createButton: function(label){
				var element = document.createElement("BUTTON");        // Create a <button> element
				var textNode = document.createTextNode(label);       // Create a text node
				element.appendChild(textNode);                                // Append the text to <button>
				return element;
			},
			createDropDown: function(array){
				
				//Create and append select list
				var selectList = document.createElement("select");
				
				//Create and append the options
				for(var index in array){
					var item = array[index];
					var option = document.createElement("option");
					option.value = item;
					option.text = item;
					selectList.appendChild(option);
				}
				
				
				/*for (var i = 0; i < array.length; i++) {
					var option = document.createElement("option");
					option.value = array[i];
					option.text = array[i];
					selectList.appendChild(option);
				}*/
				
				return selectList;
			}
		};
	}
}