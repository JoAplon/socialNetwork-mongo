const { Schema, Types } = require('mongoose');

const thoughtSchema = new Schema({

    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    username: {
        type: String,
        required: true
    },
    reactions: [
        reactionSchema
    ]
});

// virtual for reactionCount
thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

// getter method to format createdAt timestamp
thoughtSchema.path('createdAt').get(function() {
    return new Date(value).toISOString();
});

const Thought = mongoose.model('Thoughts', thoughtSchema);

module.exports = thoughtSchema;
