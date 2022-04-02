// Подключение функционала "Чертогов Фрилансера"
import { isMobile } from "./functions.js";
// Подключение списка активных модулей
import { flsModules } from "./modules.js";

//=======================================================================
// Добавляем код для открытия/закрытия меню через бургер
const iconMenu = document.querySelector('.menu__icon');
const menuBody = document.querySelector('.menu__body');
if (iconMenu) {
	iconMenu.addEventListener("click", function (e) {
		document.body.classList.toggle('_lock'); // добавляем класс замок - запрещаем прокручиваться странице при открытом меню
		// для решения обращаемся к body и доавляем "overflow: hidden;"
		iconMenu.classList.toggle('_active'); // при обращении к бургеру добавляем класс _active
		menuBody.classList.toggle('_active'); // при обращении к бургеру добавляем класс _active
	});
}
//=======================================================================
//========================================================================================================================================================
//========================================================================================================================================================
//Скрытие навигационной полосы header при прокрутке вниз
// Добавитть в файле header.htm id="navbar" (<header id="navbar" data-lp class="header">)
var prevScrollpos = window.pageYOffset;
window.onscroll = function () {
	var currentScrollPos = window.pageYOffset;
	if (prevScrollpos > currentScrollPos) {
		document.getElementById("navbar").style.top = "0";
	} else {
		document.getElementById("navbar").style.top = "-84px";
	}
	prevScrollpos = currentScrollPos;
}

//====================================================================================
//============================================================
//============================================================
// Прокрутка при открытом меню бургера
// Прокрутка при клике time
//Соберем в константу все ссылки у которых есть атрибут data-goto
const menuLinks = document.querySelectorAll('.menu__link[data-goto]');
// Проверим наличие таких ссылок
if (menuLinks.length > 0) {
	menuLinks.forEach(menuLink => {
		menuLink.addEventListener("click", onMenuLinkClick);
	});

	function onMenuLinkClick(e) {//необходимо получить объект на который мы кликаем
		const menuLink = e.target;
		//console.log(menuLink);
		if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
			const gotoBlock = document.querySelector(menuLink.dataset.goto);
			// надо учесть высоту шапки, чтобы доезд объекта был точным
			const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('.header').offsetHeight;

			// ЧТОБЫ При обращении к пункту меню убиралось и страница прокручивалась к нужному пункту 
			if (iconMenu.classList.contains('_active')) {
				document.body.classList.remove('_lock'); // разрешаем прокручиваться странице 
				iconMenu.classList.remove('_active');// при обращении к бургеру убираем класс _active
				menuBody.classList.remove('_active');
			} // при обращении к бургеру убираем класс _active
			

			// Этот кусочек кода и заставит прокрутиться страницы к нужному месту
			window.scrollTo({
				top: gotoBlockValue,
				behavior: "smooth"
			});
			// После выполнения прокрутки отключаем ссылку
			e.preventDefault();
		}
	}
}
//=================================================================================