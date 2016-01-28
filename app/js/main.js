if (!Modernizr.placeholder){
 	$('input, textarea').placeholder();
}

// ПопАп..

var popUpAddButton = $("#add-site"),
	popUpAdd = $("#popUpAdd"),
	popUpClose = $("#popUpClose");

popUpAddButton.on("click", function(e) {
	popUpAdd.fadeTo(500, 1);
})

popUpClose.on("click", function(e) {
	popUpAdd.fadeOut();
	return false;
})

// ..END

// Form Validation
var fName = $("[name=projectName]"),
	fImg = $("[name=projectImg]"),
	fUrl = $("[name=projectURL]"),
	fAbout = $("[name=projectAbout]"),
	form = $("[name=addProjectForm"),
	popUpSubmit = $("#popUpSubmit");

var showError = function(NameClass) {
    var AA = '"append"',
		code1 = "form.append('<style class=" + AA + ">." + NameClass + ":before{display: block;}</style>')";
		code2 = "form.append('<style class=" + AA + ">." + NameClass + ":after{display: block;}</style>')";
	eval(code1);
	eval(code2);
};

var hideError = function(NameClass) {
	 var AA = '"append"',
		code1 = "form.append('<style class=" + AA + ">." + NameClass + ":before{display: none;}</style>')";
		code2 = "form.append('<style class=" + AA + ">." + NameClass + ":after{display: none;}</style>')";
	eval(code1);
	eval(code2);
};

popUpSubmit.on("click", function(e) {
	var badForm = false;
	if (fName.val() == "") {
		showError("errorName");
		fName.addClass('ErrorBorder');
		badForm = true;
	} else {
		hideError("errorName");
		fName.removeClass('ErrorBorder');
	}

	if (fUrl.val() == "") {
		showError("errorUrl");
		fUrl.addClass('ErrorBorder');
		badForm = true;
	} else {
		hideError("errorUrl");
		fUrl.removeClass('ErrorBorder');
	}

	if (fAbout.val() == "") {
		showError("errorAbout");
		fAbout.addClass('ErrorBorder');
		badForm = true;
	} else {
		hideError("errorAbout");
		fAbout.removeClass('ErrorBorder');
	}

	if (badForm) {
		return false;
	}
	alert ("Форма заполнена успешно!");
})

// Validation..END