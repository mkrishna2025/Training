var Framework = {
	version: 2.0,
	GetCmp: function(id){
		return document.getElementById(id) || document.getElementsByName(id)[0];
	},
	GetValue: function(id){
		var component = Framework.GetCmp(id);
		return component.value;
	},
	SetValue: function(id, value){
		Framework.GetCmp(id).value = value;
	},
	GetNumericValue: function(id){
		var value = Framework.GetValue(id);
		if(value == ''){
			value = 0;
		}
		return parseInt(value);
	},
	Disable: function(id){
		var element = Framework.GetCmp(id);
		element.disabled = true;
	},
	create: function(options){
		
		var instance = new Framework.UIControls();
		
		var defaultStyle = "width:200px;height:200px;background-color:yellow;";
		
		var style = options.style || defaultStyle;
		
		var items = options.items || [];
		
		if(options.type == 'container'){
			var panel = instance.createPanel({style: style, id: options.id});
			for(var index in items){
				var item = items[index];
				var element;
				if(item.type == 'textBox'){
					element = instance.createTextBox({id: item.id});
				} else if (item.type == 'numberBox'){
					element = instance.createNumberBox({id: item.id});
				}else if (item.type == 'label'){
					element = instance.createLabel({text: item.text });
				} else if (item.type == 'button'){
					element = instance.createButton({text:item.text, handler: item.handler});
				}
				if(element){
					var listeners = item.listeners || {};
					for(var index in listeners){
						/*console.log(index);
						console.log(listeners[index]);*/
						element.addEventListener(index, listeners[index]);
					}
					
					panel.appendChild(element);
				}
			}
			var listeners = options.listeners || {};
			for(var index in listeners) {
				panel.addEventListener(index, listeners[index]);
			}
			
			var container = document.getElementById(options.render);
			container.appendChild(panel);
			
		} else if(options.type == 'button'){
			var container = document.getElementById(options.render);
			container.appendChild(instance.createButton('Submit'));
		}
		
	},
	// Example of class
	UIControls: function(){
		// Example for private method
		var createElement = function(inputItem){
			var element = document.createElement(inputItem);
			return element;
		}
		
		return {
			createLabel: function(options){
				var element = createElement("Label");
				//newlabel.setAttribute("for",id_from_input);
				element.innerHTML = options.text;
				return element;
			},
			createTextBox: function(options){
				var element = createElement('input');// document.createElement('input');
				if(options.id){
					element.setAttribute("id", options.id);
				}
				element.type = "text"; 
				return element;
			},
			createNumberBox: function(options){
				/*var instance = new Framework.UIControls();
				var element = instance.createTextBox(options);
				*/
				var element = this.createTextBox(options);
				element.type = "number"; 
				element.addEventListener('keyup', function(e){
					this.value = this.value.replace(/[^0-9.]/g,'');
				});
				
				return element;
			},
			createButton: function(options){
				var element = createElement("BUTTON");        // Create a <button> element
				var textNode = document.createTextNode(options.text);       // Create a text node
				element.appendChild(textNode);                                // Append the text to <button>
				
				element.addEventListener('click', options.handler, false);
				
				return element;
			},
			createDropDown: function(array){
				
				//Create and append select list
				var selectList = createElement("select");
				
				//Create and append the options
				for(var index in array){
					var item = array[index];
					var option = createElement("option");
					option.value = item;
					option.text = item;
					selectList.appendChild(option);
				}
				
				return selectList;
			},
			createPanel: function(options){
				var div = createElement("div");
				
				div.style = options.style || "width:200px;height:200px;background-color:red;";
				
				if(options.id){
					div.setAttribute("id", options.id);
				}
				

				//div.className = "notice";
				//div.style.display = "none";

				// test case, append the div to the body
				return div;
			}
		};
	},
	FArrayOld: function(options){
		options = options || {};
		var items = options.items || [];
		return {
			add: function(item){
				items.push(item);
			},
			get: function(index){
				return items[index];
			},
			size: function(){
				return items.length;
			}
		}
	},
	FArray: function(options){
		options = options || {};
		
		this.items = options.items || [];
		
		this.add = function(item){
			this.items.push(item);
		};
		this.get = function(index){
			return this.items[index];
		};
		this.size = function(){
			return this.items.length;
		};
	},
	FNumericArray: function(options){
		Framework.FArray.call(this, options);
		this.add = function(item){
			if(!isNaN(item)){
				this.items.push(item);
			}
		}
	},
	Extend: function(oldClass, props){
		oldClass.call(this);
		props = props || {};
		for(var index in props){
			var prop = props[index];
			this[index] = prop;
		}
	}
}

Framework.FNumericArrayInherited = Framework.Extend(Framework.FArray, {
	add: function(item){
		if(!isNaN(item)){
			this.items.push(item);
		}
	}
});