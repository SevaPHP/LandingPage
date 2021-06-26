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
        const modalTimerId = setTimeout(openModal, 5000);
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

     /*Отправка данных на сервер*/
     // forms
     const forms = document.querySelectorAll('form');

     const message = {
         loading: 'Загрузка',
         success: 'Спасибо! Скоро мы с Вами свяжемся',
         failure: 'Что-то пошло не так...'
     };
     //Берем формы и под них подвязываем функцию postDate()

     forms.forEach(item => {
        postData(item);
     });
     function  postData(form) {
         form.addEventListener('submit', (e) => {
            //Отменить стандартное поведение браузера
            e.preventDefault();

            const statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            statusMessage.textContent = message.loading;
            form.append(statusMessage);

            const request = new XMLHttpRequest();

            request.open('POST', 'server.php');
            
            //Когда используем связку xmlhttrequst + form-data - нам заголовок устанавливать не нужно - он автоматом ставится
            //request.setRequestHeader('Content-type', 'multipart/form-data'); //Именно из-за этой строчки мы не получаем данные на сервере
            //Отправка для json
            /*Создание объекта hhtprequest
            request.setRequestHeader('Content-type', 'application/json');
            const formData = new FormData(form);*/

          
            
            const formData = new FormData(form);
            const object = {};

            formData.forEach(function(value, key) {
                object[key] = value;
            });

            const json = JSON.stringify(object);

            /* request.send(json);*/

            fetch('server.php', {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: json
            }).then (data => data.text())//Чтобы четко понимать какие данные приходят с сервера, нам нужно этот ответ модифицировать, превращаем наш ответ в обычный текст
            .then(data => {
                console.log(data); //data - те даные которые возвращаются из промиса , которые вернул сервер
                //успешная отправка
                statusMessage.textContent = message.success;
                
                //Удаляем наш блок cообщением.
                setTimeout(() => {
                    statusMessage.remove();
                }, 2000);
            }).catch( () => {
                statusMessage.textContent = message.failure;
            }).finally(() => {
                //После успешной отправвки очищаем форму
                form.reset();
            })

            //Обработка результата нашего запроса
            /*request.addEventListener('load', () => { //смотрели load - когда запрос полностью завершится
                if (request.status === 200) { //отслеживаем статус
                    console.log(request.response); //выполяем определенные действия
                    //успешная отправка
                    statusMessage.textContent = message.success;
                    //После успешной отправвки очищаем форму
                    form.reset();
                    //Удаляем наш блок cообщением.
                    setTimeout(() => {
                        statusMessage.remove();
                    }, 2000);
                } else {
                    statusMessage.textContent = message.failure;

                }
            }); 
            //Обработка результата нашего запроса
            */

         });
     }




     /*Конец Отправка данных на сервер*/


     /* fetch api */
     //fetch использует промисы пример тест
    /* fetch('https://jsonplaceholder.typicode.com/posts', {
         method: "POST",
         body: JSON.stringify({name: 'Alex'}),
         headers: {
             'Content-type': 'application/json'
         }
     })
     .then(response => response.json())
     .then(json => console.log(json));
     */
     // конец  fetch использует промисы пример тест



     //npm пакеты - кусочки отдельного кода которые лежат на серверах и которые мы можем устанавливать в свой проект чтобы их использовать

     //Получаем доступ к базе данных db.json

     fetch('db.json')
     .then(data => data.json())
     .then(res => console.log(res));


     /*Слайдер*/
        /* Индикаторы */
    const slider = document.querySelector('.offer__slider');
    /* Индикаторы */
     //Сам слайдер
    const slides = document.querySelectorAll('.offer__slide'),
     //Стрелка назад
           prev = document.querySelector('.offer__slider-prev'),
     //Стрелка вперед
           next = document.querySelector('.offer__slider-next'),
           //цифры над слайдером
           total = document.querySelector('#total'),
           current = document.querySelector('#current');
    //Текущее положение слайдера
            let slideIndex = 1;
            showSlides(slideIndex);
     //изменяем количество слайдов
        if(slides.length < 10){
                total.textContent = `0${slides.length}`;
            }  else {
                total.textContent = slides.length;
            }
    //Показываем слайды 
     function showSlides(n) {
         //Если больше чем общее кол-во слайдов 
          if (n > slides.length) {
            slideIndex = 1;
          }

          if (n < 1) {
            slideIndex = slides.length;
          }
          //Скрываем все слайды которые есть
          slides.forEach(item => item.style.display = 'none');
          //берем нужный слайд и показываем его
          slides[slideIndex - 1].style.display = 'block';
          //Слайдер в цифрах меняется
          if(slides.length < 10){
            current.textContent = `0${slideIndex}`;
        }  else {
            current.textContent = slideIndex;
        }

       
     }
          //Функция которая изменяет

        function plusSlides(n) {
            showSlides(slideIndex += n);
        }

        prev.addEventListener('click', () => {
            plusSlides(-1);
            /*Индикаторы */
            dots.forEach(dot => dot.style.opacity = '.5');
            dots[slideIndex - 1].style.opacity = 1;
            /*Индикаторы */
        });

        /* Индикаторы */
        slider.style.position = 'relative';

        const indicators = document.createElement('ol'),
              dots = [];



        indicators.classList.add('carousel-indicators');
        indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
        `;

        slider.append(indicators);

        for (let i = 0; i < slides.length; i++) {
            const dot = document.createElement('li');
            dot.setAttribute('data-slide-to', i + 1);
            dot.style.cssText = `box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;`;

            if (i == 0) {
                dot.style.opacity = 1;
            }
            indicators.append(dot);
            dots.push(dot);
            
        }
        /* конец Индикаторов */


       next.addEventListener('click', () => {
            plusSlides(1);
            /*Индикаторы */
            dots.forEach(dot => dot.style.opacity = '.5');
            dots[slideIndex - 1].style.opacity = 1;
            /*Индикаторы */
        });
      /*Конец Слайдер*/
      

      /*Калькулятор*/
        //Берем итоговую цифру class + span ( который внутри него) для вывода результата
      const result = document.querySelector('.calculating__result span');
        //Создадим 5 различных переменных которые учавствуют в калькуляторе. создаем их через let т.к они будут меняться 
        let sex = 'female', height, weight, age, ratio = '1.375 ';
        //Функция для расчета по формуле дабы подсчитать конечный результат
        function calcTotal() {
            //советую начать функцию с проверки
            if (!sex || !height || !weight || !age || !ratio){
                result.textContent = '--------'
                return;
            } 

            if (sex === 'female') {
                result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
            } else {
                result.textContent = Math.round((88.36 + (13.4 * weight)+ (4.8 * height) - (5.7 * age)) * ratio);
            }
        }

        calcTotal();

        //Получаем статическую информацию со статических блоков
        
        function getStaticInformation(parentSeletor, activeClass) {
            //Внутри родителя получаем все дивы
            const elements = document.querySelectorAll(`${parentSeletor} div`);
           //Отслеживаем клики по родительскому элементу
            elements.forEach(elem => {
                elem.addEventListener('click', (e) => {
                    if( e.target.getAttribute('data-ratio')) {
                        ratio = +e.target.getAttribute('data-ratio')
                    } else {
                        //Когда условия не сработае. 
                        sex = e.target.getAttribute('id');
                    }
   
                    console.log(ratio, sex);
                    //Работаем с класом активности, убираем у всех и назначаем тем кому нужно
                    elements.forEach(elem => {
                        elem.classList.remove(activeClass);
                    });
                    //Назначаем класс активности тому объекту в который кликнули
                    e.target.classList.add(activeClass);
                    calcTotal();
               });
            });
        }



getStaticInformation('#gender', 'calculating__choose-item_active');
getStaticInformation('.calculating__choose_big', 'calculating__choose-item_active');

 //Функция которя обрабатывает инпут

    function getDymanicInformation(selector) {
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {
            //Если пользователь ввел не число
            if(input.value.match(/\D/g)) {
                input.style.border = '1px solid red';
                alert('Введите только цифры');
            } else {
                input.style.border = 'none';
            }
             switch(input.getAttribute('id')) {
                 case 'height':
                     height = +input.value;
                     break;
                 case 'weight':
                     weight = +input.value;
                     break;  
                 case 'age':
                     age = +input.value;
                     break;    
             }
             calcTotal();
        });
      
    }

    getDymanicInformation('#height');
    getDymanicInformation('#weight');
    getDymanicInformation('#age');













      /*Конец Калькулятор*/

});


 