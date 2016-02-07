var app = (function(){
	var fImgName = $(".addProject__img-text"),		// span - с текстом, в будущем содержащим имя выбранного файла.	
		hiddenImgInp = $("[type='file']"),			// наш импут-файл, который должен быть как-то скрыт.
		fakeInput = $(".fakeInput"),				// div который должен выглядить как инпут-файл., дословно фейк-инпут.
		items = $("form").find('input, textarea').not('[type="submit"], [type="file"], [type="reset"]');  // коллекция эллементов инпут\текст-ареа в теге "form", не являющимся субмитом, выбр.файлом, ресетом.

	var init = function(){
		setUpListeners();
		crutchesForBadBrowsers();
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

		$("form").on("submit", formValidation);

		$("form").on("reset", hideAllErrors);
	};

	var closePopup = function(e) { //== Ф-ция закрытия попапа ==
		e.preventDefault();
		$("#popUpAdd").fadeOut();  
	};

	var openPopup = function(e) { //== Ф-ция открытия попапа ==
		$("#popUpAdd").fadeTo(500, 1);
	};

	function closePopupWhileOut(e) { //== Ф-ция закрытия попапа при нажатии вне самого попапа (по темному полю) ==
		var div = $(".popup-inner");  // див = контейнер для нашей формы и он внутри затемненного поля.
		if (!div.is(e.target) && div.has(e.target).length === 0) { // Если среди элементов div НЕ содержиться элемента *текущая цель* (дословно - если это не наш DIV) и (для точности результата) *текущая цель* не является потомком ДИВа, то прячем попап. 
			$("#popUpAdd").fadeOut(); 
		} 
	}

	var imgNameToDiv = function(e) { //== Ф-ция для отображении именя файлы в фейкИнпуте, он же обычный див ==
		var indexForSlice = hiddenImgInp.val().lastIndexOf('\\'); 	// В имени файла (а он покажется вместе с путёт), находим последний *\* и запомиаем его индекс
		fImgName.html(hiddenImgInp.val().substring(indexForSlice+1));  // Обрезаем имя файла с индекса см.выше + 1, в итоге получим имя без пути. 
	}

	var hideErrorWhilePressKey = function(e) { //== Ф-ция удаление тултипов-ошибок для события ввода чего-либо в поле ==
		deleteError($(this));
	}

	var formValidation = function(e) { //== Ф-ция валидации формы ==
		e.preventDefault();
		var notbadForm = true,	// Наш флаг
			form = $(this);

		items.each(function(indx){	// Перебор инпутов
			if ($(this).val().trim() == "") {
				createError($(this));
				notbadForm = false;
			} else {
				deleteError($(this));
			}
		});

		if (fImgName.html() == "Загрузите изображение") { // Отдельная проверка для фейкИнпута
			createError(fakeInput);
			notbadForm = false;
		} else {
			deleteError(fakeInput);
		}

		if (notbadForm) {  // Если все норм, то исполняем ф-цию отправки формы
			sendForm(form);
		}
	}

	function createError(item){ //== Ф-ция создания тултипов-ошибок ==
		if (!item.hasClass("HaveError")) { // Проверка нашего флага, если текущий инпут имеет класс "HaveError", то делаем, если нет, то ничего не делаем.
			var myTop,
				myDirection = item.parent().outerWidth() + 5,
			    newDiv = $("<div>"),      // Создаем динамически элемент div.
			    newDiv2 = $("<div>"),	  // Создаем динамически элемент div.
			    textData = item.attr("data-error");   // Берем значение из ДАТА атрибута

		    item.css("border", "2px solid #e0ac98").addClass('HaveError');  // Текущему инпуту навешиваем красный бордер и создаем флаг на нем, он же класс "HaveError"
		    newDiv.appendTo(item.parent()).addClass('errorBody');;  // Добавляем нами созданный див1 к родителю текущего инпута и задаем ему, предварительно созданный в css класс (тело ошибки)
			newDiv2.appendTo(item.parent());		// Добавляем нами созданный див2 к родителю текущего инпута
			item.siblings('.errorBody').text(textData);  // В тело нашей ошибки закладываем текс с дата атрибута

			if(item.attr("data-direction")) {    // Проверка, если есть "data-direction" текущего инпута, то делаем... если нет, то делаем else.. (Проверка, чтобы определить с какой стороны выводить ошибку лево или право)
				newDiv2.addClass('errorHeadRight'); // Задаем див2 данный класс - *стрелочка* смотрит налево - .
				myTop = item.position().top + item.outerHeight(true)/2 - newDiv.innerHeight()/2; 	// Позиционирование: Выщитываем, чтобы *стрелочка* показывала по центру именно инпута. (расстояние от инпута до верхней границы контейнера + высота инпута деленная на два - высота созданного дива деленная на два)
				newDiv.css({ "top" : myTop+"px", "left" : myDirection+9+"px"}); 	// Позиционирование: присваиваем значения топ и лефт для див1.
				newDiv2.css({ "top" : myTop+"px", "left" : myDirection+"px"}); 		// Позиционирование: присваиваем значения топ и лефт для див2.

			} else {
				newDiv2.addClass('errorHead'); 	// Задаем див2 данный класс - *стрелочка* смотрит направо - .
				myTop = item.position().top + item.outerHeight(true)/2 - newDiv.innerHeight()/2;
				newDiv.css({ "top" : myTop+"px", "right" : myDirection+9+"px"});	// Позиционирование: присваиваем значения топ и лефт для див1.
				newDiv2.css({ "top" : myTop+"px", "right" : myDirection+"px"}); 	// Позиционирование: присваиваем значения топ и лефт для див2.
			}	
		} 
	};

	function deleteError(item){ //== Ф-ция удаления тултипов ==
		item.removeClass('HaveError');					// Удаляем наш флаг-класс.
		item.siblings(".errorBody").remove();			// Удаляем тело тултипа
		item.siblings(".errorHead").remove();			// Удаляем стрелку тултипа
		item.siblings(".errorHeadRight").remove();		// Удаляем стрелку тултипа
		item.css("border", "");							// Убираем красную рамку
	}

	function hideAllErrors(){ //== Ф-ция удаления ошибок при нажатии РЕСЕТ
		items.each(function(indx){
			if ($(this).val().trim() == "") {
				deleteError($(this));
			};
		});
	}

	function sendForm(form){ //== Ф-ция отправки данных формы на сервер
		var  url = form.attr('action'),
			 data = form.serializeArray();

		$.ajax({
			url: url,
			type: 'POST',
			dataType: 'json',
			data: data
		}).done(function(data){
			console.log(data);		
		}).fail( function(){
			console.log("Проблемка..");
		});
	}

	function crutchesForBadBrowsers(){ // == Ф-ция определяет, если нет какой-то ф-ции в браузере, то делаем её ручками.
	if (!Modernizr.placeholder){
 		$('input, textarea').placeholder(); // Плейсхолдеры для ИЕ8
	}

	if(typeof String.prototype.trim !== 'function') { // Если в браузере нет ф-ции trim(), то сделаем её.
	  String.prototype.trim = function() {
	    return this.replace(/^\s+|\s+$/g, ''); 
	  }
	}
};

	return {
		init:init
	}
}());

$(document).ready(function(){
	app.init();
});
