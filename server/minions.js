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

const minionsRouter = express.Router();

minionsRouter.param('minionId', (req, res, next, id) => {
    const minion = getFromDatabaseById('minions', id);
    if (minion){
        req.minion = minion;
        next();
    } else {
        res.status(404).send();
    }
})


minionsRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('minions'));
});

minionsRouter.post('/', (req, res, next) => {
    const minion = addToDatabase('minions', req.body);
    res.status(201).send(minion);
});

minionsRouter.get('/:minionId', (req, res, next) => {
    res.send(req.minion);
});

minionsRouter.put('/:minionId', (req, res, next) => {
    const minion = updateInstanceInDatabase('minions', req.body)
    res.send(minion);
});

minionsRouter.delete('/:minionId', (req, res, next) => {
    let deleted = deleteFromDatabasebyId('minions', req.params.minionId);
    if (deleted){
        res.status(204);
    } else {
        res.status(500);
    }
    res.send();
});





minionsRouter.param('workId', (req, res, next, id) => {
    let work = getFromDatabaseById('work', id);

    if (work){
        req.work = work;
        next();
    } else {
        res.status(404).send();
    }
});

minionsRouter.get('/:minionId/work', (req, res, next) => {
    const work = res.send(getAllFromDatabase('work').filter(m => {
        return m.minionId === req.params.minionId;
    }));

    res.send(work);
});

minionsRouter.post('/:minionId/work', (req, res, next) => {
    let ins = req.body;
    ins.minionId = req.params.minionId;
    const work = addToDatabase('work', ins);
    res.status(201).send(work);
});

 minionsRouter.get('/:minionId/work/:workId', (req, res, next) => {
     res.send(req.work);
 });

minionsRouter.put('/:minionId/work/:workId', (req, res, next) => {
    if (req.params.minionId !== req.body.minionId){
        res.status(400).send();
    } else {
        const work = updateInstanceInDatabase('work', req.body);
        res.status(200).send(work);
    }
});

minionsRouter.delete('/:minionId/work/:workId', (req, res, next) => {
    let deleted = deleteFromDatabasebyId('work', req.params.workId);
    if (deleted){
        res.status(204);
    } else {
        res.status(500);
    }
    res.send();
});

module.exports = minionsRouter;