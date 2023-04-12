import faker from 'https://cdnjs.cloudflare.com/ajax/libs/Faker/3.1.0/faker.min.js';

export function fakeQueryString() {
    // Init
    let random_word = "";
    let operators = Array('AND', 'OR', 'NOT');
    let operator;
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
                if (random_word.includes("/")) {
                    random_word = random_word.replace(/\//g, "");
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
                if (random_word.includes("/")) {
                    random_word = random_word.replace(/\//g, "");
                }
                operator = operators[Math.floor(Math.random() * operators.length)];
                final_query_string += (" " + operator + " " + random_word);
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

    console.log("Generated query: " + final_query_string)
    return final_query_string;
}

export function fakeFromDate() {
    return "2022-11-10";
}

export function fakeToDate() {
    return "2022-11-30";
}

