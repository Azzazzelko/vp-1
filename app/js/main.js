if (!Modernizr.placeholder){
 	$('input, textarea').placeholder();
}

var app = (function(){
	var popUpAddButton = $("#add-site"),
		popUpAdd = $("#popUpAdd"),
		popUpClose = $("#popUpClose"),
		popUpSubmit = $("#popUpSubmit"),
		form = $("form"),
	    fImg = $(".addProject__img"),
		fImgName = $(".addProject__img-text"),
		fImgInp = $("[name=img]"),
		fName = $("[name=name]"),
		fEmail = $("[name=email]"),
		fCode = $("[name=code]"),
		fUrl = $("[name=url]"),
		fAbout = $("[name=about]"),
		feedSubmit = $("#feedback-submit"), 
		feedReset = $("#feedback-reset"),
	 	items = form.find('input, textarea').not('[type="submit"], [type="file"], [type="reset"]');

	var init = function(){
		setUpListeners();
	};

	var setUpListeners = function(){

		popUpAddButton.on("click", openF);

		popUpClose.on("click", closeF);

		fImgInp.on("change", function(e) {
			imgNameToDiv(); 
			removeErrorFromFile();
		});

		items.on("keydown", hideErrorWhilePressKey);

		popUpSubmit.on("click", formValidation);

		feedSubmit.on("click", formValidation);

		feedReset.on("click", hideAllErrors);

	};

	var closeF = function(e) {
		e.preventDefault();
		popUpAdd.fadeOut();
	};

	var openF = function(e) {
		popUpAdd.fadeTo(500, 1);
	};

	var imgNameToDiv = function(e) {
		var indexForSlice = fImgInp.val().lastIndexOf('\\');
		fImgName.html(fImgInp.val().substring(indexForSlice+1));
	}

	var removeErrorFromFile = function() {
		hideError("errorImg");
		fImg.removeClass('ErrorBorder');
	}

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

	var hideErrorWhilePressKey = function(e) {
		var item = e.target;
		if (item.name == "url") {
			hideError("errorUrl");
			fUrl.removeClass('ErrorBorder');
		}
		if (item.name == "name") {
			hideError("errorName");
			fName.removeClass('ErrorBorder');
		}
		if (item.name == "about") {
			hideError("errorAbout");
			fAbout.removeClass('ErrorBorder');
		}
		if (item.name == "email") {
			hideError("errorEmail");
			fEmail.removeClass('ErrorBorder');
		}
		if (item.name == "code") {
			hideError("errorCode");
			fCode.removeClass('ErrorBorder');
		}
	}

	var hideAllErrors = function(e) {
			hideError("errorUrl");
			fUrl.removeClass('ErrorBorder');
		
			hideError("errorName");
			fName.removeClass('ErrorBorder');
		
			hideError("errorAbout");
			fAbout.removeClass('ErrorBorder');
		
			hideError("errorEmail");
			fEmail.removeClass('ErrorBorder');
		
			hideError("errorCode");
			fCode.removeClass('ErrorBorder');	
	}

	var formValidation = function() {
		var badForm = false;

		if ((fEmail.length != 0) && (fEmail.val().indexOf("@") < 0)) {
			showError("errorEmail");
			fEmail.addClass('ErrorBorder');
			badForm = true;
		} else {
			hideError("errorEmail");
			fEmail.removeClass('ErrorBorder');
		}

		if ((fCode.length != 0) && ($.trim(fCode.val()) == "")) {
			showError("errorCode");
			fCode.addClass('ErrorBorder');
			badForm = true;
		} else {
			hideError("errorCode");
			fCode.removeClass('ErrorBorder');
		}

		if ((fName.length != 0) && ($.trim(fName.val()) == "")) {
			showError("errorName");
			fName.addClass('ErrorBorder');
			badForm = true;
		} else {
			hideError("errorName");
			fName.removeClass('ErrorBorder');
		}

		if ((fUrl.length != 0) && ($.trim(fUrl.val()) == "")) {
			showError("errorUrl");
			fUrl.addClass('ErrorBorder');
			badForm = true;
		} else {
			hideError("errorUrl");
			fUrl.removeClass('ErrorBorder');
		}

		if ((fAbout.length != 0) && ($.trim(fAbout.val()) == "")) {
			showError("errorAbout");
			fAbout.addClass('ErrorBorder');
			badForm = true;
		} else {
			hideError("errorAbout");
			fAbout.removeClass('ErrorBorder');
		}

		if ((fImgName.length != 0) && (fImgName.html() == "Загрузите изображение")) {
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
		
	}

	return {
		init:init
	}
}());

$(document).ready(function(){
	app.init();
});
