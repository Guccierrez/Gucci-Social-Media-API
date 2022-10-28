const connection = require('../config/connection');
const { Thought, User } = require('../models');
const { getRandomName, getRandomReactions } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  // Drop existing Thoughts
  await Thought.deleteMany({});

  // Drop existing Users
  await User.deleteMany({});

  // Create empty array to hold the students
  const users = [];

  // Loop 20 times -- add students to the students array
  for (let i = 0; i < 20; i++) {
    // Get some random assignment objects using a helper function that we imported from ./data
    const thoughts = getRandomReactions(20);

    const username = getRandomName();
    const first = username.split(' ')[0];
    const last = username.split(' ')[1];
    const email = `${first}${Math.floor(Math.random() * (99 - 18 + 1) + 18)}gmail.com`;

    users.push({
      username,
      first,
      last,
      email,
      thoughts,
    });
  }

  // Add students to the collection and await the results
  await User.collection.insertMany(users);

  // Add Thoughts to the collection and await the results
  await Thought.collection.insertOne({
    thoughtName: 'UCLA',
    inPerson: false,
    reactions:getRandomReactions(4),
  });

  // Log out the seed data to indicate what should appear in the database
  console.table(users);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
