const express = require('express');
const router = new express.Router();
const fs = require('fs');
const messages = JSON.parse(fs.readFileSync('./utility/messages.json'));
const config = JSON.parse(fs.readFileSync('./config.json'));
const statuses = JSON.parse(fs.readFileSync('./utility/status.json'));

const gMapsClient = require('@google/maps').createClient({
  key: config.maps.apiKey,
});

router.get('/shops/search', (req, res) => {
  if (req.query.location ||
        (req.query.location &&
            (!req.query.location.lat || !req.query.location.lng))) {
    res.status(400).json({
      message: messages.missingParameters,
    });
  } else {
    const query = {};
    if (req.query.searchText) {
      query.keywords = {$regex: `^${req.query.searchText}`};
    }
    req.app.db.collection('shops').find(query, {projection: {_id: 0}}).toArray()
        .then((docs) => {
          if (docs.length) {
            const result = [];
            for (let i=0; i<docs.length; i++) {
              gMapsClient.distanceMatrix({
                origins: req.query.location,
                destinations: docs[i].location,
              }, (err, response) => {
                if (!err) {
                  console.log(response.json.results);
                }
              });
            }

            if (result.length) return res.status(200).json(result);
          }
          res.status(204).json();
        }).catch((err) => {
          res.status(500).json({
            message: messages.ise,
          });
        });
  }
});

router.post('/order', (req, res) => {
  if (!req.body.guestAddress ||
     !req.body.guestLocation ||
     !req.body.accountId ||
     (req.body.guestLocation &&
        (!req.body.guestLocation.lat || !req.body.guestLocation.lng)) ||
     !req.body.itemDetails ||
     (req.body.itemDetails && !Object.keys(req.body.itemDetails).length)) {
    res.status(400).json({
      message: messages.missingParameters,
    });
  } else {
    req.app.db.findOne({
      accountId: req.body.accountId,
    }, {
      projection: {
        _id: 1,
      },
    }).then((shop) => {
      if (shop) {
        const order = {
          orderId: '',
          guestId: '',
          guestAddress: req.body.guestAddress,
          accountId: req.body.accountId,
          itemDetails: req.body.itemDetails,
          status: statuses.ACTIVE,
          guestLocation: req.body.guestLocation,
          createdTime: new Date().getTime(),
        };

        req.app.db.collection('order').insertOne(order).then((rslt) => {
          res.status(201).json(order);
        }).catch((err) => {
          res.status(500).json({
            message: messages.ise,
          });
        });
      } else {
        res.status(400).json({
          message: messages.accountIdDoesNotExists,
        });
      }
    }).catch((err) => {
      res.status(500).json({
        message: messages.ise,
      });
    });
  }
});

router.patch('/order/:id/:status', (req, res) => {
  if (statuses.statusesAllowedToCustomer.indexOf(req.params.status) === -1) {
    res.status(401).json({
      message: messages.notAuthorized,
    });
  } else if (req.params.status == statuses.CANCELLED && !req.body.reason) {
    res.status(400).json({
      message: messages.reasonRequired,
    });
  } else {
    const update = {
      status: req.params.status,
      reason: req.params.reason || '',
    };

    if (req.params.status == statuses.CANCELLED) {
      update.cancelledTime = new Date().getTime();
    }

    req.app.db.collection('orders').findOneAndUpdate({
      orderId: req.params.id,
    }, {
      $set: update,
    }, {
      projection: {_id: 1},
    }).then((doc) => {
      if (doc) {
        res.status(204).json();
      } else {
        res.status(400).json({
          message: messages.invalidOrderId,
        });
      }
    }).catch((err) => {
      res.status(500).json({
        message: messages.ise,
      });
    });
  }
});

module.exports = router;
