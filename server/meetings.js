const express = require('express');
const {
    createMeeting,
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
    deleteAllFromDatabase,
} = require('./db');

const meetingsRouter = express.Router();

meetingsRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('meetings'));
});

meetingsRouter.post('/', (req, res, next) => {
    const meeting = addToDatabase('meetings', createMeeting());
    res.status(201).send(meeting);
});

meetingsRouter.delete('/', (req, res, next) => {
    deleteAllFromDatabase('meetings');
    res.sendStatus(202);
});

module.exports = meetingsRouter;