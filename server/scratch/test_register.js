const { connectDB, sequelize } = require('../config/db');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

async function testRegister() {
  try {
    await connectDB();
    console.log('DB connected.');

    const email = 'aryansaini132005@gmail.com';
    const name = 'as';
    const password = 'password123';
    const phone = '1234567898';

    const userExists = await User.findOne({ where: { email: email.toLowerCase() } });
    console.log('User exists check:', userExists);

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      phone: phone || '',
      role: 'customer'
    });

    console.log('Successfully created user:', newUser.toJSON());
  } catch (err) {
    console.error('Registration Error Caught:', err);
  } finally {
    process.exit(0);
  }
}

testRegister();
