const testAPI = (req, res) => {
  res.json({
    success: true,
    message: "Controller working successfully",
  });
};

module.exports = { testAPI };