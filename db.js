const mongoose = require('mongoose');
const { db } = require('./models/Lists');

try {
    mongoose.connect('mongodb://localhost:27017/Register');
  } catch (error) {
    handleError(error);
  }
  module.exports=db;


