const Club = require('./../models/clubModel');
const handler = require('./handlerController');

exports.getAllClubs = handler.getAll(Club);

exports.getClub = handler.getDoc(Club, 'club', {
  path: 'manager reviews books',
  select: 'name photo title review rating',
});

exports.createClub = handler.createDoc(Club);

exports.updateClub = handler.updateDoc(Club, 'club');

exports.deleteClub = handler.deleteDoc(Club, 'club');
