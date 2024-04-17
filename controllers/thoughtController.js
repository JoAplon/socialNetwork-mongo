const Thoughts = require('../models/thoughts');
const User = require('../models/user');

module.exports = {
async getAllThoughts(req, res) {
    try {
      const thoughts = await Thoughts.find();
      res.json(thoughts);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  },
  
  async getThoughtById(req, res) {
    const { thoughtId } = req.params;
    try {
      const thought = await Thoughts.findById(thoughtId);
      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }
      res.json(thought);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  },

  async createThought(req, res) {
    try {
        const thought = Thoughts.create(req.body);

        const user = User.findOneAndUpdate(

            { _id: req.body.userId },
            { $addToSet: { thoughts: thought._id} },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: 'Thought created, but found no user with that ID.'})
        }
            res.json({ message: 'Created the thought successfully!' });

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
  },

  async updateThought(req, res) {
    try {
        const thought = await Thoughts.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        );

        if (!thought) {
            return res.status(404).json({ message: 'No thought with this ID!'});
        }

        res.json(thought);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
  },

    async deleteThought(req, res) {
    try {
        const thought = await Thoughts.findOneAndRemove({ _id: req.params.thoughtId });

        if (!thought) {
            return res.status(404).json({ message: 'No thought with this ID!'});
        }

        const user = await User.findOneAndUpdate(
            { thoughts: req.params.thoughtId },
            { $pull: { thoughts: req.params.thoughtId} },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: 'Thought removed, but no user with this ID!'});
        }

        res.json({ message: 'Thought succcessfully removed!'});
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
  },
};