'use strict';

const inputRub = document.querySelector('#rub'),
      inputUsd = document.querySelector('#usd');

inputRub.addEventListener('input' ,() => {
    //Создаем запрос на сервер
    //xmlhtt - конструктор который создает новый объект
    const request = new XMLHttpRequest();

    //метод open() - собирает настройки которые в будущем помогут сделать запрос
    //request.open(method, url, async, login, pass); //включает в себя 5 аргумента. Метод , путь(куда посылаем запросы) и ассинхроный или синхроный
    request.open('GET', 'js/current.json');

    //Что мы передаем , в какой кодировке, чтобы сервер понимал
    request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    //Отправляем запрос
    request.send();



    //Статусы ответы 500 - ошибка сервера 200-норм.
    //status - 
    //statusText - текстовое описание ответа от сервера
    //respinse - ответ от сервера
    //readyState - текущее состояние сервера

    
    //событие которое отслеживает статус нашего обработчика в данный момент

    request.addEventListener('load', () => {
            if (request.status === 200){
                //console.log(request.response);
                const data = JSON.parse(request.response);
                inputUsd.value = (+inputRub.value / data.current.usd).toFixed(2);

            } else {
                inputUsd.value = "Что-то пошло не так";
            }
    });

});