// Random usernames
const names = [
    'john',
    'jane',
    'cleffly',
    'stoudebaker',
    'annithan',
    'blargh',
    'xavier',
    'twyla',
    'morris',
    'nightphantom',
    'hubbard',
    'torrick',
    'lisa',
    'anermia',
    'biscuit',
    'toppy'
];

// Random thoughts
const thoughts = [
    'i like turtles',
    'What nice weather today!',
    'I need a hug',
    'Anyone want to see a movie?',
    'Just made this!',
    'If I pour milk on my cereal, is the milk a broth, a sauce, or a beverage???',
    'What a cute dog!',
    'Coding is so cool 8)'
];

// Getting a random username from names array by generating a random number
const getRandomName = () => names[Math.floor(Math.random() * names.length)];

// Getting a random thought from thoughts array by generating a random number
const getRandomThoughts = () => thoughts[Math.floor(Math.random() * thoughts.length)];

// exporting our random name-and-thought-generating functions
module.exports = { getRandomName, getRandomThoughts };