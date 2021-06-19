const fetch = require('node-fetch');

exports.getPokemon = (offset, callback) => {
    fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=10`)
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonObject) {
            callback(jsonObject.results);
        })
}