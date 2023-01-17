require('../models/db'); // connects to database

// dependencies
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Animal = require('../models/animal');
const Training = require('../models/training');

// GET /api/health
exports.health = (req, res) => {
  res.json({ healthy: true });
}

// POST /api/user
exports.addUser = async (req, res) => {
  try {
    const user = await User.find({ email: req.body.email });
    if (user.length >= 1) {
      throw new ValidationError(`User with email ${req.body.email} already exists`);
    }
    const password = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: password,
    });
    const response = await newUser.save();
    res.status(200).json({ message : `Successfull added User ${response._id}` });
  } catch (err) {
    if (err.name === 'ValidationError')
      res.status(400).json({ message: err.message });
    else
      res.status(500).json({ message: err.message });
  }
}

// POST /api/animal
exports.addAnimal = async (req, res) => {
  const newAnimal = new Animal({
    name: req.body.name,
    hoursTrained: req.body.hoursTrained,
    owner: req.id.user._id,
    dateOfBirth: req.body.dateOfBirth
  });
  try {
    const response = await newAnimal.save();
    res.status(200).json({ message : `Successfull added Animal ${response._id}` });
  } catch (err) {
    if (err.name === 'ValidationError')
      res.status(400).json({ message: err.message });
    else
      res.status(500).json({ message: err.message });
  }
}

// POST /api/training
exports.addTraining = async (req, res) => {
  const newTraining = new Training({
    date: req.body.date,
    description: req.body.description,
    hours: req.body.hours,
    animal: req.body.animal,
    user: req.id.user._id,
  });
  try {
    const animal = await Animal.findById(req.body.animal);
    if (animal.owner !== req.body.user) 
      throw new ValidationError(`Animal ${req.body.animal} is not owned by User ${req.body.user}`);
    const response = await newTraining.save();
    res.status(200).json({ message : `Successfull added Training Log ${response._id}` });
  } catch (err) {
    if (err.name === 'ValidationError')
      res.status(400).json({ message: err.message });
    else
      res.status(500).json({ message: err.message });
  }
}

// GET /api/admin/users
exports.getUsers = async (req, res) => {
  let { limit = 10, page = 1 } = req.query
  skip = (page - 1) * limit;
  try {
    const users = await User.find({}).limit(limit).skip(skip);
    const newUsers = users.map((user) => {
      user.password = undefined;
      return user;
    })
    res.status(200).json({ page, limit, users: newUsers });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// GET /api/admin/animals
exports.getAnimals = async (req, res) => {
  let { limit = 10, page = 1 } = req.query
  skip = (page - 1) * limit;
  try {
    const animals = await Animal.find({}).limit(limit).skip(skip);
    res.status(200).json({ page, limit, animals });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// GET /api/admin/training
exports.getTraining = async (req, res) => {
  let { limit = 10, page = 1 } = req.query
  skip = (page - 1) * limit;
  try {
    const training = await Training.find({}).limit(limit).skip(skip);
    res.status(200).json({ page, limit, training });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}


// POST /api/user/login
exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });;
    if (user && (await bcrypt.compare(req.body.password, user.password)))
      res.status(200).json({ message: `User ${user.firstName} ${user.lastName} successfully logged in` });
    else
      throw new ValidationError(`Email or password is invalid`)
  } catch (err) {
    res.status(403).json({ message: err.message })
  }
}

// POST /api/user/verify
exports.verify = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });;
    if (user && (await bcrypt.compare(req.body.password, user.password))) {
      const token = jwt.sign({ user }, process.env.JWT_STRING, { expiresIn: '2h' });
      res.status(200).json({ message: `User ${user.firstName} ${user.lastName} successfully verified`, token });
    } else {
      throw new ValidationError(`Email or password is invalid`);
    }
  } catch (err) {
    res.status(403).json({ message: err.message })
  }
}

// error thrown for invalid input
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
  }
}