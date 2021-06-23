'use strict';
window.addEventListener('DOMContentLoaded', ()=> {

    console.log('hello world');
    //tabs
    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabsParent = document.querySelector('.tabheader__items');


        //Скрываем все табы
    function HidetabContenr() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
       tabs[i].classList.add('tabheader__item_active');
    }
    HidetabContenr();
    showTabContent();

    tabsParent.addEventListener('click', (e) => {
        const target = e.target;

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                    if (target == item) {
                        HidetabContenr();
                        showTabContent(i);
                    }
            }) ;
        
        }

    });
    //40  Работа с датами
    /*const now = new Date();
    console.log(now.getFullYear()); //2021
    console.log(now.getMonth());
    console.log(now.getDay());
    let start = new Date();
    for (let is = 0; is < 100000; is++) {
        let some = is ** 3 ;
    }
    let end = new Date();
    console.log(`Отработал за ${end - start} секунд`); */
     //40  Работа с датами



     /* Timer */
     const deadline = '2021-07-01';
     function getTimeRemaining(endtime) {
         const t = Date.parse(endtime) - Date.parse(new Date()),
               days = Math.floor(t / (1000 * 60 * 60 * 24)),
               hours = Math.floor((t / (1000 * 60 * 60) % 24)),
               minutes = Math.floor((t / 1000 / 60) % 60),
               seconds = Math.floor((t / 1000) % 60);

               return {
                 'total': t,
                 'days': days,
                 'hours': hours,
                 'minutes': minutes,
                 'seconds': seconds
               };
     }

     function setClock(selector, endtime) {
            const timer = document.querySelector(selector),
                  days = timer.querySelector('#days'),
                  hours = timer.querySelector('#hours'),  
                  minutes = timer.querySelector('#minutes'),
                  seconds = timer.querySelector('#seconds'),
                  timeInterval = setInterval(updateCLock, 1000);
                  updateCLock()//Запускаем апдейт чтобы не видеть изначальную дату , она появляется на секунду.
                  

                  function getZero(num) {
                    if( num >= 0 && num < 10) {
                        return `0${num}`;
                    } else {
                        return num;
                    }
                }           
       function updateCLock() {
           const t = getTimeRemaining(endtime);

           days.innerHTML = getZero(t.days);
           hours.innerHTML = getZero(t.hours);
           minutes.innerHTML = getZero(t.minutes);
           seconds.innerHTML = getZero(t.seconds);


           if (t.total <= 0 ) {
               clearInterval(timeInterval);
                }
            }
        }
     setClock('.timer', deadline);
     /* Timer */


     /*modal*/

     const modalTrigger = document.querySelectorAll('[data-modal]'),
           modal = document.querySelector('.modal'),
           modalCloseBtn = document.querySelector('[data-close]');

    function openModal() {
            modal.classList.add('show');
            modal.classList.remove('hide'); 
            document.body.style.overflow = 'hidden';//чтобы страниц не прокручивалась
            //Если вдруг пользователь сам открыл окно , то мы очищаем интервал set
            clearInterval(modalTimerId);
           }      

    modalTrigger.forEach(btn => {
                btn.addEventListener('click', () => {
                    openModal()
               });
           });
           

    function closeModal() {
            modal.classList.add('hide');
            modal.classList.remove('show'); 
            document.body.style.overflow = '';//чтобы страниц не прокручивалась
           }

           modalCloseBtn.addEventListener('click', () => {
            closeModal();
       })


       //Убираем модальное окно при клики на обложку
       modal.addEventListener('click', (e)=> {
          if (e.target === modal) {
            closeModal(); 
          }  
       });

       //Кнопка esc отключает модальное окно

       document.addEventListener('keydown', (e) => {
            if (e.code === "Escape" || e.code === "KeyA" && modal.classList.contains('show')) {
                closeModal();
            }
       });

     
       /* Модальное окно выскакивает через интервал settimr */
        //const modalTimerId = setTimeout(openModal, 5000);
       /* Модальное окно выскакивает через интервал settimr */

      
       /* Если промотал страничку до конца - выскакивает модальное окно */
    function showModalByScroll() {
           //pageYOffset - прокрученая часть
           if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll)
            }
       }
       window.addEventListener('scroll', showModalByScroll);

     /* Если промотал страничку до конца - выскакивает модальное окно */

 /*modal*/


       /* Используем классы для карточек */
    
    class MenuCard {
        constructor(src, alt, title, descr, price, parentSeletor, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSeletor);
            this.transfer = 75;
            
            this.changeToUAH();
        }

        changeToUAH() {
            this.price = this.price * this.transfer;
        }

        render() {
            const element = document.createElement('div');
            if (this.classes.length === 0) {
                this.element = 'menu__item';
                element.classList.add(this.element);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }


            element.innerHTML = `
            
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> руб.</div>
                </div>
            
            `;

            this.parent.append(element);
        }
    }

    new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        10,
        '.menu .container'
        

    ).render();

    new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        20,
        '.menu .container',
        'menu__item'

    ).render();

    new MenuCard(
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков. ',
        30,
        '.menu .container',
        'menu__item'

    ).render();

     /* Конец Используем классы для карточек */

});


