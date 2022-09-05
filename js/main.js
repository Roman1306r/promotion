const menuLinks = document.querySelectorAll('.menu__column')
const animateParagraf = document.querySelector('.header__description')
const headerTitle = document.querySelector('.header_title')
const readMore = document.querySelector('.about__text-btn')
const photoInfo = document.querySelector('.photo__info')
const btnDown = document.querySelector('.btn')
const portfolioBtn = document.querySelector('.portfolio__btn')
const hiddenImgPortfolio = document.querySelectorAll('.portfolio__row.hidden')
const  btnPortfolioText  = document.querySelector('.text')
const textarea = document.querySelector('textarea')
const counterTextarea = document.querySelector('.count')
counterTextarea.innerHTML = `${0} / 400`
textarea.addEventListener('input', (e) => {
    counterTextarea.innerHTML = `${textarea.value.length} / 400` 
})



const headerLogo = document.querySelector('.header__logo')
const aboutTitle = document.querySelector('.about__title')
const portfolioTitle = document.querySelector('.portfolio__top h2')
const priceLink = document.querySelector('.price__link')
const price = document.querySelector('.price')




window.addEventListener('load', (e)=> {
  animateParagraf.classList.add('p_anim')
  headerTitle.classList.add('light')
  btnDown.classList.add('act')

 //Коэффиценты
  const forHeader= 10;
//Скорость анимации
const speed = 0.07;

//Начальные переменные
let positionX = 0, positionY = 0;
let coordXprocent = 0, coordYprocent = 0;

function setMouseParallaxStyle(){
    const distX = coordXprocent - positionX;
    const distY = coordYprocent - positionY;
    positionX = positionX + (distX * speed)
    positionY = positionY + (distY * speed)
    //Передаем стили
    headerLogo.style.cssText = `transform: translate(${positionX/forHeader}%, ${positionY/forHeader}%);`
    aboutTitle.style.cssText = `transform: translate(${positionX/forHeader}%, ${positionY/forHeader}%);`
    portfolioTitle.style.cssText = `transform: translate(${positionX/forHeader}%, ${positionY/forHeader}%);`
    // priceLink.style.cssText = `transform: translate(${positionX/forHeader}%, ${positionY/forHeader}%);`
    requestAnimationFrame(setMouseParallaxStyle)
}
if(!(window.innerWidth < 1000)) setMouseParallaxStyle();


window.addEventListener('mousemove', function scroll(e) {
    //Получение ширины и высоты блока
    const parallaxWidth = body.offsetWidth;
    const parallaxHeigth = body.offsetHeight;
    


    //Ноль по середине

    const coordX = e.pageX - parallaxWidth / 2;
    const coordY = e.pageY - parallaxHeigth / 2;

    //Получаем проценты
    coordXprocent = coordX / parallaxWidth * 100;
    coordYprocent = coordY / parallaxHeigth * 100;
    
});

if(window.innerWidth < 1000)  window.removeEventListener('mousemove', scroll)
})





if(menuLinks.length > 0) {
  for (let i = 0; i < menuLinks.length; i++) {
    const link = menuLinks[i];
    link.addEventListener('click', function (e){
      menuLinks.forEach(item => item.classList.remove('act'))
      link.classList.add('act')
    })
  }
}
readMore.addEventListener('click', (e) => photoInfo.classList.toggle('act'))
if (hiddenImgPortfolio.length > 0){
  for (let j = 0; j < hiddenImgPortfolio.length; j++) {
    const item = hiddenImgPortfolio[j];
    portfolioBtn.addEventListener('click', (e) => {
      e.preventDefault()
      item.classList.toggle('open')
      
      if(btnPortfolioText.textContent === 'HIDE') {
        btnPortfolioText.textContent = 'READ MORE'
      } else {
        btnPortfolioText.textContent = 'HIDE'
      }  
    })
    
  }
}



// Кнопка вверх
const upButton = document.querySelector('.up')
window.addEventListener("scroll", () => {
    window.pageYOffset > 400 ? upButton.classList.add('act') : upButton.classList.remove('act');
});
upButton.onclick = () => window.scrollTo(0, 0);













const animItems = document.querySelectorAll('.anim__items');
if(animItems.length>0) {
    window.addEventListener('scroll', animOnScroll)
    function animOnScroll () {
        for(let i = 0; i < animItems.length; i++) {
            const animItem = animItems[i];
            const animItemHeight = animItem.offsetHeight;
            const animItemOffset = offSet(animItem).top;
            const animStart = 4;

            let animItemPoint = window.innerHeight - animItemHeight / animStart;
            if (animItemHeight > window.innerHeight) {
                animItemPoint = window.innerHeight - window.innerHeight / animStart;  
            }

            if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)){
                animItem.classList.add('active') ;
            } else {
                if (!animItem.classList.contains('anim-no-hide')) {
                    animItem.classList.remove('active') 
                }
            }
        }
    }
    function offSet(el) {
        const rect = el.getBoundingClientRect(),
        scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
        scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return {  top: rect.top + scrollTop, left: rect.left + scrollLeft}
    }
    setTimeout(()=> {
        animOnScroll ()
    }, 1000)
}








const popupLinks = document.querySelectorAll('.popup__link')
const body = document.querySelector('body')
const lockPadding = document.querySelectorAll('.lock-padding')
let unlock = true;
const timeout = 800;
// навешиваем клик на сслылку которая будет открывать попап
if(popupLinks.length > 0) {
    for (let index = 0; index < popupLinks.length; index++) {
        const popupLink = popupLinks[index];
        popupLink.addEventListener('click', function(e) {
            const popupName = popupLink.getAttribute('href').replace('#', '') 
            const currentPopup = document.getElementById(popupName)
            popupOpen(currentPopup)
            e.preventDefault()
        })
    }
}
// навешиваем клик на все кнопки которые будут закрывать попап
const popusCloseIcon = document.querySelectorAll('.close-popup')
if (popusCloseIcon.length > 0 ) {
    for (let index = 0; index < popusCloseIcon.length; index++) {
        const el = popusCloseIcon[index]
        el.addEventListener('click', function(e) {
            popupClose(el.closest('.popup'));
            e.preventDefault()
        })
    }
}
// Функция открытия попапа
function popupOpen(currentPopup) {
    if (currentPopup && unlock) {
        const popupActive = document.querySelector('.popup.open')
        if(popupActive) {
            popupClose(popupActive, false)
        } else {
            bodyLock()
        }
        currentPopup.classList.add('open')
        currentPopup.addEventListener('click', function(e) {
            if(!e.target.closest('.popup__content')) {
                popupClose(e.target.closest('.popup'))
            }
        })
     }
}
// Функция закрытия попапа
function popupClose(popupActive, doUnlock = true) {
    if(unlock) {
        popupActive.classList.remove('open');
        if(doUnlock) {
            bodyUnLock()
        }
    }
}
// Функция блокировки скролла
function bodyLock() {
    const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
        for (let index = 0; index < lockPadding.length; index++) {
        const el = lockPadding[index]
        el.style.paddingRigth = lockPaddingValue
        }
        body.style.paddingRight = lockPaddingValue;
        body.classList.add('lock');
        unlock = false;
        setTimeout(function () {
            unlock = true
        }, timeout)
}
// Функция разблокировки скролла
function bodyUnLock() {
    setTimeout(function () {
        if (lockPadding.length > 0) {
        for(let index; index < lockPadding.length; index++) {
            const el = lockPadding[index];
            el.style.paddingRight = '0px';
            }
         }
        body.style.paddingRight = '0px';
        body.classList.remove('lock');
    }, timeout)
    unlock = false
     setTimeout(function () {
    unlock = true
}, timeout)
}
// Закрытие попапа при нажатии на ESC
document.addEventListener('keydown', function(e) {
   if (e.which === 27) {
       const popupActive = document.querySelector('.popup.open')
       popupClose(popupActive)
   }
})
const backBtn = document.querySelector('.price__close__btn')
backBtn.addEventListener('click', (e)=> {
    const popupActive = document.querySelector('.popup.open')
    popupClose(popupActive)
})





$(document).ready(function() {
	//E-mail Ajax Send
	$("form").submit(function() { //Change
		var th = $(this);
		$.ajax({
			type: "POST",
			url: "mail.php", //Change
			data: th.serialize()
		}).done(function() {
			body.classList.add('down')
            setTimeout(()=> {
            body.classList.remove('down')
            }, 3000)
			setTimeout(function() {
				// Done Functions
				th.trigger("reset");
			}, 1000);
		});
		return false;
	});

});






  