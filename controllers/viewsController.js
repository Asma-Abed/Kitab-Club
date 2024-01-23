exports.getHome = (req, res) => {
  res.status(200).render('home');
};

exports.getClubs = (req, res) => {
  res.status(200).render('clubs', {
    title: 'Our Clubs',
  });
};

exports.getClub = (req, res) => {
  res.status(200).render('club', {
    title: 'Club Page',
  });
};
