if (!Modernizr.placeholder){
 	$('input, textarea').placeholder();
}

// ПопАп..

var popUpAddButton = $("#add-site");
var popUpAdd = $("#popUpAdd");
var popUpSubmit = $("#popUpSubmit");
var popUpClose = $("#popUpClose");

popUpAddButton.on("click", function(e) {
	popUpAdd.fadeTo(500, 1);
})

popUpSubmit.on("click", function(e) {
	popUpAdd.fadeOut();
})

popUpClose.on("click", function(e) {
	popUpAdd.fadeOut();
	return false;
})


// ..END
