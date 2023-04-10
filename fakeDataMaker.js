//import { faker } from 'https://cdn.skypack.dev/pin/@faker-js/faker@v7.6.0-gos0hwPsBen4rbtoIqy3/mode=imports,min/optimized/@faker-js/faker.js';
//import { faker } from 'https://cdn.skypack.dev/@faker-js/faker';
//import faker from 'https://cdnjs.cloudflare.com/ajax/libs/Faker/7.6.0/faker.min.js';
import faker from 'https://cdnjs.cloudflare.com/ajax/libs/Faker/3.1.0/faker.min.js';

// export let myFunction = function() {
//     //return Math.floor(Math.random() * 1000); 
//     return faker.name.firstName();
// to generate random numbers between 1 and 3 - do this->  Math.floor(Math.random() * 3) + 1
// }

//myFunction();

export function fakeQueryString() {
    //const operator = faker.helpers.arrayElement(['AND', 'OR', 'NOT']);
    //let x = faker.word.verb({ length: { min: 3 } });
    //return faker.name.firstName();
    //return faker.name.title();
    //return faker.commerce.productName();
    //return faker.company.catchPhrase();
    //return faker.company.bs();
    //return faker.company.bsBuzz() + " " + faker.company.bsAdjective() + " " + faker.company.bsNoun();
    switch(Math.floor(Math.random() * 3) + 1) {
        case 1:
            return faker.name.firstName(); 
        case 2:
            return faker.company.bs(); //random phrase
        case 3:
            return faker.company.catchPhrase(); // to be replaced by random boolean query once I have clarity
    }   
}

export function fakeFromDate() {
    return "2022-11-10";
}

export function fakeToDate() {
    return "2022-11-30";
}

export function fakeAgg_size() {
    const arr1= [10, 20, 50, 100];
    return arr1[Math.floor(Math.random() * arr1.length)];
}



