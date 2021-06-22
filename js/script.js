'use strict';
window.addEventListener('DOMContentLoaded', ()=> {
    console.log('hello world');

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



});


