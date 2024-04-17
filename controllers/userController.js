const Thoughts = require('../models/thoughts');
const User = require('../models/user');

module.exports = {
async getAllUsers(req, res) {
    try {
      const users = await Users.find();
      res.json(users);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  },
  
  async getUserById(req, res) {
    const { userId } = req.params;
    try {
      const user = await Users.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  },

  async createUser(req, res) {
    try {
        const user = await User.create(req.body);

        if (!user) {
            return res.status(404).json({ message: 'User created, but found no user with that ID.'})
        }
            res.json({ message: 'Created the user successfully!' });

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
  },

  async updateUser(req, res) {
    try {
        const user = await Users.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        );

        if (!user) {
            return res.status(404).json({ message: 'No user with this ID!'});
        }

        res.json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
  },

    async deleteUser(req, res) {
    try {
        const user = await Users.findOneAndRemove({ _id: req.params.userId });

        if (!user) {
            return res.status(404).json({ message: 'No user with this ID!'});
        }

        res.json({ message: 'User succcessfully removed!'});
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
  },
};