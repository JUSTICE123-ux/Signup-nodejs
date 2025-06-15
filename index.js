const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const PORT = 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/register", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  //check fields
  if (!firstName || !lastName || !email || !password) {
    console.log("Field required");
    res.status(400).json({ message: "Field required" });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    console.log("User registered successfully", {
        firstName,
        lastName,
        email,
        hashPassword
    });
    
    res.send(`user ${firstName} registered successfully`);

  } catch (error) {
    console.log("user failed to signup");
  }
});

app.listen(PORT, () => {
  console.log(`server is running on localhost: ${PORT}`);
});
