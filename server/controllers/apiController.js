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
    // checks if user with email already exists in database
    // if it does throws ValidationError
    const user = await User.find({ email: req.body.email });
    if (user.length >= 1) {
      throw new ValidationError(`User with email ${req.body.email} already exists`);
    }

    // saves new user to database
    const password = await bcrypt.hash(req.body.password, 10); // encrypts password
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
  try {
    //saves new animal to database
    const newAnimal = new Animal({
      name: req.body.name,
      hoursTrained: req.body.hoursTrained,
      owner: req.id.user._id,
      dateOfBirth: req.body.dateOfBirth
    });
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
  try {
    // creates new training log
    const newTraining = new Training({
      date: req.body.date,
      description: req.body.description,
      hours: req.body.hours,
      animal: req.body.animal,
      user: req.id.user._id,
    });

    // checks if inputted user owns the inputted animal
    const animal = await Animal.findById(req.body.animal);
    if (animal.owner !== req.id.user._id) 
      throw new ValidationError(`Animal ${req.body.animal} is not owned by User ${req.body.user}`);

    // saves new training log to database
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
  // retrieves limit and page params or sets default values
  let { limit = 10, page = 1 } = req.query
  skip = (page - 1) * limit; // sets skip amt

  try {
    // retrieves array of all users and removes password property
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
  // retrieves limit and page params or sets default values
  let { limit = 10, page = 1 } = req.query
  skip = (page - 1) * limit; // sets skip amt

  try {
    // retrieves array of all animals
    const animals = await Animal.find({}).limit(limit).skip(skip);

    res.status(200).json({ page, limit, animals });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// GET /api/admin/training
exports.getTraining = async (req, res) => {
  // retrieves limit and page params or sets default values
  let { limit = 10, page = 1 } = req.query
  skip = (page - 1) * limit; // sets skip amt

  try {
    // retrieves array of all training logs
    const training = await Training.find({}).limit(limit).skip(skip);

    res.status(200).json({ page, limit, training });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}


// POST /api/user/login
exports.login = async (req, res) => {
  try {
    // checks if user with email exists and if password matches
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
    // checks if user with email exists and if password matches
    const user = await User.findOne({ email: req.body.email });;
    if (user && (await bcrypt.compare(req.body.password, user.password))) {
      // returns json web token with user information if user email and password are correct
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