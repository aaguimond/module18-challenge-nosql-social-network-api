// importing thought and user models
const { Thought, User } = require('../models');

// defining and exporting thought route logic
module.exports = {
    // Get ALL thoughts
    getThoughts(req, res) {
        // finding all thoughts in database
        Thought.find()
            // taking found thought data and returning it
            .then((thoughts) => res.json(thoughts))
            // catching errors
            .catch((err) => res.status(500).json(err));
    },

    // Get a single thought from its ID
    getSingleThought(req, res) {
        // finding ID from request parameters
        Thought.findOne({ _id: req.params.thoughtId })
            // taking thought data
            .then((thought) =>
                // if no thought found
                !thought
                    // return error
                    ? res.status(404).json({ message: 'No thought found with that ID' })
                    // otherwise, display thought data
                    : res.json(thought)
            )
            // error catching
            .catch((err) => res.status(500).json(err));
    },

    // Create a thought
    createThought(req, res) {
        // creating thought from request data
        Thought.create(req.body)
            // taking thought
            .then((thought) => {
                // thought data is nested in user data
                return User.findOneAndUpdate(
                    // finding user via ID from request
                    { _id: req.body.userId },
                    // adding thought to user's thought data
                    { $addToSet: { thoughts: thought._id } },
                    // returning updated user thought data
                    { new: true }
                );
            })
            // Taking user data
            .then((user) =>
                // if no user found,
                !user
                    // returning error message
                    ? res.status(404).json({ message: 'Thought created, but no user found to attribute it to' })
                    // otherwise, return user's new thought
                    : res.json('Created thought')
            )
            // error catching
            .catch((err) => res.status(500).json(err));
    },

    // Update thought by its ID
    updateThought(req, res) {
        // finding thought and updating
        Thought.findOneAndUpdate(
            // getting thought ID from request
            { _id: req.params.thoughtId },
            // setting thought content from request body
            { $set: req.body },
            // validating data and returning updated thought
            { runValidators: true, new: true }
        )
            // taking thought data
            .then((thought) =>
                // if no thought found
                !thought
                    // return error
                    ? res.status(404).json({ message: 'No thought with this ID' })
                    // otherwise, return updated thought data
                    : res.json(thought)
            )
            // catching errors and displaying
            .catch((err) => res.status(500).json(err));
    },

    // Delete a thought by its ID
    deleteThought(req, res) {
        // finding and deleting thought from request parameter
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
            // taking the thought data
            .then((thought) =>
                // if no thought found
                !thought
                    // return error
                    ? res.status(404).json({ message: 'No thought with this ID' })
                    // otherwise, update user's nested thought data
                    : User.findOneAndUpdate(
                        // getting thought ID from request
                        { thoughts: req.params.thoughtId },
                        // pulling thought from user data
                        { $pull: { thoughts: req.params.thoughtId } },
                        // return updated user data
                        { new: true }
                    )
            )
            // taking user data
            .then((user) =>
                // if no user found
                !user
                    // return error
                    ? res.status(404).json({ message: 'Thought deleted, but no user found with this ID' })
                    // otherwise return updated data
                    : res.json({ message: 'Thought deleted and user updated' })
            )
            // catching errors and displaying
            .catch((err) => res.status(500).json(err));
    },

    // Add a reaction to a thought
    addReaction(req, res) {
        // updating thought and its nested reaction data
        Thought.findOneAndUpdate(
            // getting thought ID from request parameter
            { _id: req.params.thoughtId },
            // adding reaction from request
            { $addToSet: { reactions: req.body } },
            // validating data and returning new data
            { runValidators: true, new: true }
        )
            // Taking thought data
            .then((thought) =>
                // if no thought data,
                !thought
                    // return error
                    ? res.status(404).json({ message: 'No thought found with this ID' })
                    // otherwise return thought data
                    : res.json(thought)
            )
            // error catching and displaying error
            .catch((err) => res.status(500).json(err));
    },

    // Remove a reaction from a thought
    removeReaction(req, res) {
        // updating the thought and its nested reaction data
        Thought.findOneAndUpdate(
            // getting thought ID from parameter
            { _id: req.params.thoughtId },
            // removing reaction from thought using its ID
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            // validating data and returning new data
            { runValidators: true, new: true }
        )
            // Taking thought data
            .then((thought) =>
                // if no thought found,
                !thought
                    // return 404 and display message
                    ? res.status(404).json({ message: 'No thought found with this ID' })
                    // otherwise return thought data
                    : res.json(thought)
            )
            // catching errors and displaying
            .catch((err) => res.status(500).json(err));
    },
};