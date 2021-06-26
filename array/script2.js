'use strict';

class Seva {
    constructor(name,age) {
        this.name = name;
        this.age = age;
    }

    say() {
        console.log(`Hello${this.name} , you are ${this.age}`);
    }

    getAge() {
        return this.age;
    }

    setAge(age) {
        this.age = age;
    }

}

const one = new Seva('Seva', 132);
console.log(one.name);
console.log(one.getAge());
one.setAge(27);
console.log(one.getAge());