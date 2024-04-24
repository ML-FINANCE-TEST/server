
const jwtSecretKey = 'machineLearning';

const jwt = require("jsonwebtoken");
const genAuthToken = (user) => {
  const secretKey = jwtSecretKey;

  const token = jwt.sign(
    {
      _id: user._id,
      email: user.email,
   
    },
    secretKey
  );
  console.log(token, "token");
  return token;
};

module.exports = genAuthToken;
