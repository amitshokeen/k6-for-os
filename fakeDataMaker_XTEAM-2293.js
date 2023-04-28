//import faker from 'https://cdnjs.cloudflare.com/ajax/libs/Faker/3.1.0/faker.min.js';
import faker from 'https://cdnjs.cloudflare.com/ajax/libs/Faker/3.1.0/locales/en/faker.en.min.js';

export function fakeQueryString() {
    // Init
    let random_word = "";
    let operators = Array('AND', 'OR', 'NOT');
    let operator;
    let letter_replace = 0;
    let wildcard = "";
    let wildword = "";
    let query_length = __ENV.QUERY_LENGTH;
    let query_type = __ENV.QUERY_TYPE;
    let final_query_string = "";

    // Generate query string
    if (query_length > 1) {
        if (query_type == "Simple") {
            for (let i = 0; i < query_length; i++) {
                random_word = faker.random.word({ length: { min: 3 } })
                while (random_word.indexOf(' ') >= 0) {
                    random_word = faker.random.word({ length: { min: 3 } })
                }
                final_query_string += (" " + random_word);
            }
        }
        else if (query_type == "Broad") {
            for (let i = 0; i < query_length; i++) {
                random_word = faker.random.word({ length: { min: 1, max: 3 } })
                while (random_word.indexOf(' ') >= 0) {
                    random_word = faker.random.word({ length: { min: 1, max: 3 } })
                }
                final_query_string += (" " + random_word);
            }
        }
        else {
            random_word = faker.random.word({ length: { min: 3 } })
            while (random_word.indexOf(' ') >= 0) {
                random_word = faker.random.word({ length: { min: 3 } })
            }
            final_query_string += random_word
            for (let i = 1; i < query_length; i++) {
                random_word = faker.random.word({ length: { min: 3 } })
                while (random_word.indexOf(' ') >= 0) {
                    random_word = faker.random.word({ length: { min: 3 } })
                }
                operator = operators[Math.floor(Math.random() * operators.length)];
                final_query_string += (" " + operator + " " + random_word);
            }
        }
    }
    else {
        // if (query_type == "Wildcard") {
        //     wildcard = Array(faker.lorem.word({ length: { min: 1, max: 3 } }), faker.random.word({ length: { min: 3 } }));
        //     random_word = wildcard[Math.floor(Math.random() * wildcard.length)];
        //     while (random_word.indexOf(' ') >= 0) {
        //         wildcard = Array(faker.lorem.word({ length: { min: 1, max: 3 } }), faker.random.word({ length: { min: 3 } }));
        //         random_word = wildcard[Math.floor(Math.random() * wildcard.length)];
        //     }
        //     final_query_string = random_word + "*"; // * in the middle of the word, * after a word, * after a two letter word
        // }
        if (query_type = "Wildcard") {
            wildcard = faker.lorem.word({ length: { min: 1, max: 3 } });
            while (wildcard.length > 3) {
                wildcard = faker.lorem.word({ length: { min: 1, max: 3 } });
            }
            wildword = faker.random.word({ length: { min: 3 } });
            while (wildword.indexOf(' ') >= 0) {
                wildword = faker.random.word({ length: { min: 3 } });
            }
            random_word = Array(wildcard, wildword);
            random_word = random_word[Math.floor(Math.random() * random_word.length)];
            letter_replace = Math.floor((Math.random() * random_word.length));
            random_word = random_word.split("");
            console.log(letter_replace)
            if (random_word.length > 1) {
                for (var i = 0; i < random_word.length; i++) {
                    if (i == letter_replace) {
                        random_word[i] = "*";
                    }
                    final_query_string += random_word[i];
                }
            }
        }
        else {
            random_word = faker.random.word({ length: { min: 3 } })
            while (random_word.indexOf(' ') >= 0) {
                random_word = faker.random.word({ length: { min: 3 } })
            }
            final_query_string = random_word;
        }
    }
    console.log("Generated query: " + final_query_string)
    return final_query_string;
}

export function fakeFromDate() {
    return "2022-11-10";
}

export function fakeToDate() {
    return "2022-11-30";
}

