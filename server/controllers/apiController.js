require('../models/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Animal = require('../models/animal');
const Training = require('../models/training');

exports.health = (req, res) => {
  res.json({ healthy: true });
}

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

exports.addAnimal = async (req, res) => {
  const newAnimal = new Animal({
    name: req.body.name,
    hoursTrained: req.body.hoursTrained,
    owner: req.body.owner,
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

exports.addTraining = async (req, res) => {
  const newTraining = new Training({
    date: req.body.date,
    description: req.body.description,
    hours: req.body.hours,
    animal: req.body.animal,
    user: req.body.user,
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

exports.login = async (req, res) => {
  try {
    if (user && (await bcrypt.compare(req.body.password, user.password)))
      res.status(200).json({ message: `User ${user.firstName} ${user.lastName} successfully logged in` });
    else
      throw new ValidationError(`Email or password is invalid`)
  } catch (err) {
    res.status(403).json({ message: err.message })
  }
}

exports.verify = async (req, res) => {
  try {
    if (user && (await bcrypt.compare(req.body.password, user.password)))
      res.status(200).json({ message: `User ${user.firstName} ${user.lastName} successfully logged in` });
    else
      throw new ValidationError(`Email or password is invalid`)
  } catch (err) {
    res.status(403).json({ message: err.message })
  }
}

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
  }
}