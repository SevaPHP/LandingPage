'use strict';

//Методы перебора массива

//filter

const names = ['Ivan', 'Ann', 'Ksenia', 'Voldemort'];

//Условия меньше чем 5 символов
const shortNames = names.filter(function (name) {
    return name.length < 5;
});

// method map - позваляет взять исходный и изменить каждый элемент массива внутри него

const answers = ['IvaN', 'AnAn', 'HellO'];

const result = answers.map(item => {
    return item.toLowerCase();
});


//some -Если хоть один элемент массива подходит - true
const some = [4, 'qwe', 'asdasda'];
console.log(some.some(item => typeof(item) === 'number'));

//evety - если все элементы - true

const some = [4, 'qwe', 'asdasda'];
console.log(some.every(item => typeof(item) === 'number'));

//reduce - собираем массив в одно единное целое
//Сумма всех чисел массива! Сложить все данные в моссиве
const arr = [4, 5, 1, 3, 2, 6, 100];
const res = arr. reduce((sum, current) => sum + current);
const asd = arr. reduce((sum, current) => `${sum}, ${current}`);
console.log(res, asd);
 
//Получить именна только тех моссивов у которых значение 'person'

const obj = {
    ivan: 'persone',
    ann: 'persone',
    dog: 'animal',
    cat: 'animal'
};

const newArr = Object.entries(obj)//переводим обЪект в массив
.filter(item => item[1] === 'persone') //выбрать только те элементы у которых знач 'persone'
.map(item => item[0]); //Трансфармируем метод , чтобы получить новый массив только с именами

console.log(newArr);

