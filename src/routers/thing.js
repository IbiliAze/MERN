///////////////////////////////////////////////////////////////////////////////////MODULES
const express = require('express');
const cors = require('cors');
////////////////////////////////////////////////////////////////////////////////////MODELS
const Thing = require('../models/thing');
//////////////////////////////////////////////////////////////////////////////////////CORS
const corsOptions = require('../utils/corsOptions');
////////////////////////////////////////////////////////////////////////////////////ROUTER
const router = new express.Router();
//////////////////////////////////////////////////////////////////////////////////////////

// Routes
// OPTIONS /api/thing
router.options('/thing', cors(corsOptions), async (request, response) => {
  return response.end();
});
// OPTIONS /api/thing/:id
router.options('/thing/:id', cors(corsOptions), async (request, response) => {
  return response.end();
});

// POST /api/thing
router.post('/thing', cors(corsOptions), async (request, response) => {
  const thing = new Thing({ ...request.body });
  try {
    await thing.save();
    return response.status(201).send({ thing, message: 'Thing saved successfully' });
  } catch (error) {
    return response.status(500).send({ message: 'Thing creation failed', error: String(error) });
  }
});

// GET /api/thing
router.get('/thing', cors(corsOptions), async (request, response) => {
  try {
    const things = await Thing.find();
    return response.status(200).send(things);
  } catch (error) {
    console.log(error);
    return response.status(500).send({ message: 'Things fetch failed', error: String(error) });
  }
});

// PUT /api/thing by ID
router.put('/thing/:id', cors(corsOptions), async (request, response) => {
  try {
    const thingId = request.params.id;
    const thing = await Thing.findOne({ _id: thingId });
    if (!thing) {
      return response.status(404).send({ message: 'Thing not found', id: thingId });
    }

    for (const key in request.body) {
      thing[key] = request.body[key];
    }
    await thing.save();
    return response.status(200).send({ thing, message: 'Thing updated successfully' });
  } catch (error) {
    return response.status(500).send({ message: 'Thing update failed', error: String(error) });
  }
});

// DELETE /api/thing by ID
router.delete('/thing/:id', cors(corsOptions), async (request, response) => {
  try {
    const thingId = request.params.id;
    const thing = await Thing.findOne({ _id: thingId });
    if (!thing) {
      return response.status(404).send({ message: 'Thing not found', id: thingId });
    }

    await thing.remove();
    return response.status(200).send({ thing, message: 'Thing deleted successfully' });
  } catch (error) {
    return response.status(500).send({ message: 'Thing delete failed', error: String(error) });
  }
});

module.exports = router;
