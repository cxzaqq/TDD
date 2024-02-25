const output = {
  hello(req, res) {
    return res.status(200).json({ msg: "hello" }).end();
  },
};

const process = {};

module.exports = {
  output,
  process,
};
