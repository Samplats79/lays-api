const bcrypt = require("bcrypt");
const User = require("./models/user");

async function createAdmin() {
  const email = "admin@admin.com";
  const password = "Admin";

  const existing = await User.findOne({ email: email.toLowerCase() });

  if (existing) {
    return;
  }

  const hashed = await bcrypt.hash(password, 10);

  await User.create({
    firstName: "Admin",
    lastName: "Account",
    email: email.toLowerCase(),
    password: hashed,
  });
}

module.exports = createAdmin;
