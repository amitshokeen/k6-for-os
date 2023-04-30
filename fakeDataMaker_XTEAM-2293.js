import faker from 'https://cdnjs.cloudflare.com/ajax/libs/Faker/3.1.0/faker.min.js';
//import faker from 'https://cdnjs.cloudflare.com/ajax/libs/Faker/3.1.0/locales/en/faker.en.min.js';

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
                while (random_word.indexOf(' ') >= 0 || random_word.length > 3) {
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

            if (random.word.length > 1) {
                final_query_string = random_word.replace([...random_word][Math.floor(Math.random() * [...random_word].length)], "*");
            }
            else {
                final_query_string = random_word + "*";
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

