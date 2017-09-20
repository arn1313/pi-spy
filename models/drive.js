// 'use strict';
//
// const mongoose = require('mongoose');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');
// const crypto = require('crypto');
//
// const  = mongoose.Schema({
//   name: {type: String, required: true},
//   desc: {type: String, required: true},
//   child: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'child'},
// }, {timestamps: true});
//
// Toy.pre('save', function(next) {
//   debug('#pre-save Toy');
//
//   Child.findById(this.child)
//     .then(child => {
//       let toyIdSet = new Set(child.toys);
//       toyIdSet.add(this._id);
//       child.toys = Array.from(toyIdSet);
//       return child.save();
//
//     })
//     .then(next)
//     .catch(() => next(new Error('validation failed to create toy because child does not exist')));
// });
//
// Toy.post('remove', function(doc, next) {
//   debug('#post remove toy');
//   Child.findById(doc.child)
//     .then(child => {
//       child.toys = child.toys.filter(toy => toy._id === doc._id);
//       return child.save();
//     })
//     .then(next)
//     .catch(next);
// });
//
// module.exports = mongoose.model('toy', Toy);
//
// const User = mongoose.Schema({
//   username: { type: String, require: true, unique: true },
//   name: { type: String, require: true },
//   password: { type: String, required: true },
//   email: { type: String, required: true },
//   findHash: { type: String, unique: true },
// });
