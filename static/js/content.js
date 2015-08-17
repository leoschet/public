var menu = document.getElementById('menu');
var menuChilds = menu.children;

var topContentText = document.getElementById('tc-text');
var botContentText = document.getElementById('bc-text');

var index;
var curElement;
for(index = 0; index < menuChilds.length; index += 1) {
	curElement = menuChilds[index].children[0];
	
	curElement.addEventListener('click', function() {
		menuMovement();

		if(this.text == 'PORTFOLIO') {
			topContentText.textContent = 'portfolio';
			botContentText.textContent = 'portfolio';

		} else if (this.text == 'ABOUT') {
			topContentText.textContent = 'about';
			botContentText.textContent = 'about';

		} else {
			topContentText.textContent = 'contact';
			botContentText.textContent = 'contact';
		} 
	});
}