const { model } = require("mongoose");
const fetch = require("node-fetch");
const pokemon = require('../models/pokemon')

const ITEMS_PER_PAGE = 12;

exports.getWeek8 = (req, res, next) => {
    let requestURL = 'https://byui-cse.github.io/cse341-course/lesson03/items.json';
    const page = +req.query.page || 1;
    const indexStart = (page - 1) * ITEMS_PER_PAGE;
    const indexEnd = page * ITEMS_PER_PAGE;
    let totalItems;

    fetch(requestURL)
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonObject) {
            //console.log(jsonObject);
            totalItems = jsonObject.length;
            res.render('week8prove', {
                pageTitle: 'Week 8 Prove',
                path: '/prove',
                isAuthenticated: req.session.isLoggedIn,
                user: req.user,
                jsonObject: jsonObject.slice(indexStart, indexEnd),
                currentPage: page,
                hasNextPage: ITEMS_PER_PAGE * page < totalItems,
                hasPreviousPage: page > 1,
                nextPage: page + 1,
                previousPage: page - 1,
                lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE)
            });
        });
};

exports.getWeek9 = (pageNum, callback) => {
    const offset = 10 * (pageNum - 1);
    pokemon.getPokemon(offset, (data) => {
        callback(data);
    })
};