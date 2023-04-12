import faker from 'https://cdnjs.cloudflare.com/ajax/libs/Faker/3.1.0/faker.min.js';

export function fakeQueryString() {
    switch(Math.floor(Math.random() * 3) + 1) {
        case 1:
            return faker.name.firstName(); 
        case 2:
            return '\"' + faker.company.bs() + '\"';
        case 3:
            return '\"' + faker.company.catchPhrase() + '\"';
        case 4: 
            return ""// random boolean - work in progress
    }   
}

export function fakeFromDate() {
    return "2022-11-10";
}

export function fakeToDate() {
    return "2022-11-30";
}

export function fakeAgg_size() { //*** customize for benchmarking */
    const arr1= [10, 20, 50, 100];
    return arr1[Math.floor(Math.random() * arr1.length)];
}



