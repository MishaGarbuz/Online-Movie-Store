console.log('Client Side Javascript File is loaded')

const loginForm = document.querySelector('form')
const username =  document.querySelector('#userName')
const password =  document.querySelector('#password')

$(document).ready(function() {
	var source = $("nav-img").attr('src');
	console.log(source);
	var notHover = String(source).includes("hover");
	if (notHover == true) {
		return; }
	else {
			$(".nav-img").hover(function(){
				$(this).attr("src", function(index, attr){
					return attr.replace(".png", "-hover.png").replace("Base_Side_Bar", "Hover_Side_Bar");
				});
				}, function(){
				$(this).attr("src", function(index, attr){
					return attr.replace("-hover.png", ".png").replace("Hover_Side_Bar", "Base_Side_Bar");
				});
			});
		 }
	});

loginForm.addEventListener('submit',(e) => {
    e.preventDefault()
    const enteredUsername = username.value
    
})


console.log(username);
console.log(password);
