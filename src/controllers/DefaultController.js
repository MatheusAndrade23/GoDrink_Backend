module.exports = class ApiController {
  static ShowHome = async (req, res) => {
    res.render('pages/defaultpage', { number: 10 });
  };
};
