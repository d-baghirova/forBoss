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
const checkMillionDollarIdea = require('./checkMillionDollarIdea');

const ideasRouter = express.Router();

ideasRouter.param('ideaId', (req, res, next, id) => {
    const idea = getFromDatabaseById('ideas', id);

    if (idea){
        req.idea = idea;
        next();
    } else {
        req.status(404).send();
    }
})

ideasRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('ideas'));
});

ideasRouter.post('/', checkMillionDollarIdea, (req, res, next) => {
    const minion = addToDatabase('ideas', req.body);
    res.status(201).send(minion);
});

ideasRouter.get('/:ideaId', (req, res, next) => {
    res.send(req.idea);
});

ideasRouter.put('/:ideaId', checkMillionDollarIdea, (req, res, next) => {
    const idea = updateInstanceInDatabase('ideas', req.body);
    res.send(idea);
});

ideasRouter.delete('/:ideaId', (req, res, next) => {
    let deletedIdea = deleteFromDatabasebyId('ideas', req.params.ideaId);
    if (deletedIdea){
        res.status(204);
    } else {
        res.status(500);
    }
    res.send();
});

module.exports = ideasRouter;