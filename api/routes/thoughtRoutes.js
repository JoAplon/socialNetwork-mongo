const router = require('express').Router();

const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    addReactionToThought,
    removeReaction,
} = require('../../controllers/thoughtController');

router.route('/').get(getAllThoughts).post(createThought);

router.route('/:thoughtId').get(getThoughtById).put(updateThought).delete(deleteThought);

router.route('/:thoughtId/reactions').post(addReactionToThought);
// This is what the links should look like to add a reaction
// http://localhost:3001/api/thoughts/6621b700e6bf0e0128678f2e/reactions

router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);
// This is what the links should look like to remove a reaction
// http://localhost:3001/api/thoughts/6621b700e6bf0e0128678f2e/reactions/6621b7a3442ff39c3e4a26e7

module.exports = router;