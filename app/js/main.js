if (!Modernizr.placeholder){
 	$('input, textarea').placeholder();
}

var app = (function(){
	var fImgName = $(".addProject__img-text"),
		hiddenImgInp = $("[type='file']"),
		fakeInput = $(".fakeInput"),
		items = $("form").find('input, textarea').not('[type="submit"], [type="file"], [type="reset"]');

	var init = function(){
		setUpListeners();
	};

	var setUpListeners = function(){
		$("#add-site").on("click", openPopup);

		$("#popUpClose").on("click", closePopup);
	
		$(document).mousedown(closePopupWhileOut);

		hiddenImgInp.on("change", function(e) {
			imgNameToDiv(); 
			deleteError(fakeInput);
		});

		items.on("keydown", hideErrorWhilePressKey);

		$("#popUpSubmit").on("click", formValidation);

		$("#feedback-submit").on("click", formValidation);

		$("#feedback-reset").on("click", hideAllErrors);

	};

	var closePopup = function(e) {
		e.preventDefault();
		$("#popUpAdd").fadeOut();
	};

	var openPopup = function(e) {
		$("#popUpAdd").fadeTo(500, 1);
	};

	function closePopupWhileOut(e) {
		var div = $(".popup-inner"); 
		if (!div.is(e.target) && div.has(e.target).length === 0) { 
			$("#popUpAdd").fadeOut(); 
		}
	}

	var imgNameToDiv = function(e) {
		var indexForSlice = hiddenImgInp.val().lastIndexOf('\\');
		fImgName.html(hiddenImgInp.val().substring(indexForSlice+1));
	}

	var hideErrorWhilePressKey = function(e) {
		deleteError($(this));
	}

	var formValidation = function(e) {
		var badForm = false;

		items.each(function(indx){
			if ($(this).val().trim() == "") {
				createError($(this));
				badForm = true;
			} else {
				deleteError($(this));
			}
		});

		if (fImgName.html() == "Загрузите изображение") {
			createError(fakeInput);
			badForm = true;
		} else {
			deleteError(fakeInput);
		}

		if (badForm) {
			e.preventDefault();
		}
	}

	function createError(item){
		var myTop,
			myRight,
		    newDiv = $("<div>"),
		    newDiv2 = $("<div>"),
		    textData = item.attr("data-error");
		if(item.attr("data-direction")) {
			if (item.attr("class").indexOf("HaveError") < 0) {
				item.css("border", "2px solid #e0ac98").addClass('HaveError');
				newDiv.appendTo(item.parent());
				newDiv2.appendTo(item.parent());
				newDiv.addClass('errorBody');
				newDiv2.addClass('errorHeadRight'); 
				item.siblings('.errorBody').text(textData);
				myRight = item.parent().outerWidth() + 5;
				myTop = item.position().top + item.outerHeight(true)/2 - newDiv.innerHeight()/2;
				newDiv.css({ "top" : myTop+"px", "left" : myRight+9+"px"});
				newDiv2.css({ "top" : myTop+"px", "left" : myRight+"px"})
			}

		} else {
			if (item.attr("class").indexOf("HaveError") < 0) {
				item.css("border", "2px solid #e0ac98").addClass('HaveError');
				newDiv.appendTo(item.parent());
				newDiv2.appendTo(item.parent());
				newDiv.addClass('errorBody');
				newDiv2.addClass('errorHead'); 
				item.siblings('.errorBody').text(textData);
				myRight = item.parent().outerWidth() + 5;
				myTop = item.position().top + item.outerHeight(true)/2 - newDiv.innerHeight()/2;
				newDiv.css({ "top" : myTop+"px", "right" : myRight+9+"px"});
				newDiv2.css({ "top" : myTop+"px", "right" : myRight+"px"})
			}
		}	
	};

	function deleteError(item){
		item.removeClass('HaveError');
		item.siblings(".errorBody").remove();
		item.siblings(".errorHead").remove();
		item.siblings(".errorHeadRight").remove();
		item.css("border", "");
	}

	function hideAllErrors(){
		items.each(function(indx){
			if ($(this).val().trim() == "") {
				deleteError($(this));
			};
		});
	}

	return {
		init:init
	}
}());

$(document).ready(function(){
	app.init();
});
