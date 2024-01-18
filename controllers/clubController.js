const Club = require('./../models/clubModel');
const handler = require('./handlerController');

exports.getAllClubs = handler.getAll(Club);

exports.getClub = handler.getDoc(Club, 'club', { path: 'reviews' });

exports.createClub = handler.createDoc(Club);

exports.updateClub = handler.updateDoc(Club, 'club');

exports.deleteClub = handler.deleteDoc(Club, 'club');
