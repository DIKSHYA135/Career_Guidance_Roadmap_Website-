const registerUser = (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  res.json({
    success: true,
    message: "User registered successfully",
    user: {
      name,
      email,
    },
  });
};

const loginUser = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required",
    });
  }

  res.json({
    success: true,
    message: "Login successful",
    email,
  });
};

module.exports = {
  registerUser,
  loginUser,
};