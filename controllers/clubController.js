const fs = require('fs');

const clubs = JSON.parse(
  fs.readFileSync(`${__dirname}/../data/clubs-test.json`)
);

exports.checkId = (req, res, next, val) => {
  if (+req.params.id > clubs.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid id',
    });
  }
  next();
};

exports.getAllClubs = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: clubs.length,
    data: {
      clubs,
    },
  });
};

exports.getClub = (req, res) => {
  const id = +req.params.id;

  const club = clubs.find((el) => el.id === id);

  res.status(200).json({
    status: 'success',
    data: {
      club,
    },
  });
};

exports.createClub = (req, res) => {
  const newId = clubs[clubs.length - 1].id + 1;
  const newClub = Object.assign({ id: newId }, req.body);
  clubs.push(newClub);

  fs.writeFile(
    `${__dirname}/data/clubs-test.json`,
    JSON.stringify(clubs),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          club: newClub,
        },
      });
    }
  );
};

exports.updateClub = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      club: 'Updated club here',
    },
  });
};

exports.deleteClub = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
