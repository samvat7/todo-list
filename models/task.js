const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    type: {
        type: String,
        required: true
    },

    date: {
        type: String,
        required: true
    },
    checked: {

        type: Boolean,
        required: true
    }
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;