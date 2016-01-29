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
	e.preventDefault();
	popUpAdd.fadeOut();
})

// ..END

// Form Validation Add Project

// Кнопка Загрузки картинки...
var fImg = $(".addProject__img"),
	fImgName = $(".addProject__img-text"),
	fImgInp = $("[name=img]");

fImgInp.on("change", function(e) {
	var indexForSlice = fImgInp.val().lastIndexOf('\\');
	fImgName.html(fImgInp.val().substring(indexForSlice+1));
});
// Кнопка Загрузки картинки...END

var fName = $("[name=projectName]"),
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
	if ($.trim(fName.val()) == "") {
		showError("errorName");
		fName.addClass('ErrorBorder');
		badForm = true;
	} else {
		hideError("errorName");
		fName.removeClass('ErrorBorder');
	}

	if ($.trim(fUrl.val()) == "") {
		showError("errorUrl");
		fUrl.addClass('ErrorBorder');
		badForm = true;
	} else {
		hideError("errorUrl");
		fUrl.removeClass('ErrorBorder');
	}

	if ($.trim(fAbout.val()) == "") {
		showError("errorAbout");
		fAbout.addClass('ErrorBorder');
		badForm = true;
	} else {
		hideError("errorAbout");
		fAbout.removeClass('ErrorBorder');
	}

	if (fImgName.html() == "Загрузите изображение") {
		showError("errorImg");
		fImg.addClass('ErrorBorder');
		badForm = true;
	} else {
		hideError("errorImg");
		fImg.removeClass('ErrorBorder');
	}

	if (badForm) {
		return false;
	}
	alert ("Форма заполнена успешно!");
})

// Validation..END

var items = form.find('input, textarea').not('[type="submit"], [type="file"]');

items.on("keydown", function(e){
	var item = e.target;
	if (item.name == "projectURL") {
		hideError("errorUrl");
		fUrl.removeClass('ErrorBorder');
	}
	if (item.name == "projectName") {
		hideError("errorName");
		fName.removeClass('ErrorBorder');
	}
	if (item.name == "projectAbout") {
		hideError("errorAbout");
		fAbout.removeClass('ErrorBorder');
	}
});


fImgInp.on("change", function(e) {
	hideError("errorImg");
	fImg.removeClass('ErrorBorder');
})
