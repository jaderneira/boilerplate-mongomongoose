'use strict'
const { Schema, model } = require('mongoose');

const personSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    age: Number,
    favoriteFoods: [String]
},{
    timestamps: true
  }
);

module.exports = model('Person', personSchema);


