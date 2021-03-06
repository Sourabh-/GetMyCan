const express = require('express');
const fs = require('fs');
const router = new express.Router();
const bcrypt = require('bcrypt');
const uuidv1 = require('uuid/v1');
const saltRounds = 10;
const authMiddleware = require('../utility/auth');
const config = JSON.parse(fs.readFileSync('./config.json'));
const messages = JSON.parse(fs.readFileSync('./utility/messages.json'));
const statuses = JSON.parse(fs.readFileSync('./utility/status.json'));

router.post('/shop/signup', (req, res) => {
  if (!req.headers.signuptoken ||
      !req.body.userName ||
      !req.body.password ||
      !req.body.accountId ||
      !req.body.shopName ||
      !req.body.shopDesc ||
      !req.body.area ||
      !req.body.location ||
      (req.body.location &&
        (!req.body.location.lat || !req.body.location.lng))) {
    res.status(400).json({
      message: messages.missingParameters,
    });
  } else if (req.body.keywords && !Array.isArray(req.body.keywords)) {
    res.status(400).json({
      message: messages.keywordsShouldBeArray,
    });
  } else if (req.headers.signuptoken != config.partner.signupToken) {
    res.status(401).json({
      message: messages.notAuthorized,
    });
  } else if (req.body.userName.length > 20 || req.body.password.length > 20) {
    res.status(400).json({
      message: req.body.userName.length > 20 ?
        messages.userNameLength :
        messages.passwordLength,
    });
  } else {
    const salt = bcrypt.genSaltSync(saltRounds);
    const shop = {
      shopName: req.body.shopName,
      shopDesc: req.body.shopDesc,
      accountId: req.body.accountId,
      area: req.body.area,
      keywords: req.body.keywords || [area],
      rating: 5,
      location: req.body.location,
      disabled: false,
      workingHours: req.body.workingHours ? {
        from: req.body.workingHours.from ? Number(req.body.workingHours.from) :
              Number(config.partner.workingHours.from),
        to: req.body.workingHours.to ? Number(req.body.workingHours.to) :
            Number(config.partner.workingHours.from),
        closedOn: Array.isArray(req.body.workingHours.closedOn) ?
                  req.body.workingHours.closedOn : [],
      } : {
        from: 0500,
        to: 2300,
        closedOn: [],
      },
    };

    req.app.db.collection('shops').insertOne(shop).then((rslt) => {
      const partner = {
        userName: req.body.userName,
        password: bcrypt.hashSync(req.body.password, salt),
        accountId: req.body.accountId,
      };

      return req.app.db.collection('partners').insertOne(partner);
    }).then((rslt) => {
      if (req.body.cans && Object.keys(req.body.cans).length > 1) {
        const cans = {
          accountId: req.body.accountId,
          cans: {
            newConnection: {
              'depositAmount': req.body.cans.newConnection.depositAmount &&
                  Number.isInteger(
                      req.body.cans.newConnection.depositAmount
                  ) &&
                  req.body.cans.newConnection.depositAmount > 0 ?
                  req.body.cans.newConnection.depositAmount :
                  config.partner.cans.newConnection.depositAmount,
              'refundableAmount': req.body.cans.newConnection.refundableAmount
                  &&
                  Number.isInteger(
                      req.body.cans.newConnection.refundableAmount
                  ) &&
                  req.body.cans.newConnection.refundableAmount > 0
                  ?
                  req.body.cans.newConnection.refundableAmount :
                  config.partner.cans.newConnection.refundableAmount,
            },
          },
        };

        for (const key in req.body.cans) {
          if (key != 'newConnection') {
            cans.cans[key] = {
              price: req.body.cans[key].price &&
                  Number.isInteger(req.body.cans[key].price) &&
                  req.body.cans[key].price > 0 ? req.body.cans[key].price :
                  config.partner.cans.defaultCanPrice,
            };
          }
        }
        req.app.db.collection('cans').insertOne(cans);
      } else {
        res.status(201).json({
          message: messages.partnerCreated,
        });
      }
    }).then((rslt) => {
      res.status(201).json({
        message: messages.partnerCreated,
      });
    }).catch((err) => {
      console.log(err);
      // Need to check for both errors here! : TO DO
      (err.code == 11000) ? res.status(400).json({
        message: messages.accountIdExists,
      }): res.status(500).json({
        message: messages.ise,
      });
    });
  }
});

router.post('/login', (req, res) => {
  if (!req.body.userName ||
        !req.body.password ||
        !req.body.accountId) {
    res.status(400).json({
      message: messages.missingParameters,
    });
  } else {
    req.app.db.collection('partners').findOne({
      userName: req.body.userName,
      accountId: req.body.accountId,
    }, {
      projection: {
        password: 1,
      },
    }).then((partner) => {
      if (partner) {
        bcrypt.compare(req.body.password, partner.password);
      } else {
        res.status(400).json({
          message: messages.noPartnerMatch,
        });
      }
    }).then((bool) => {
      if (!bool) {
        res.status(401).json({
          message: messages.incorrectPassword,
        });
      } else {
        req.session.sessionId = uuidv1();
        req.session.userName = req.body.userName;
        req.session.accountId = req.body.accountId;
        res.status(201).json({
          sessionId: req.session.sessionId,
        });
      }
    }).catch((err) => {
      res.status(500).json({
        message: messages.ise,
      });
    });
  }
});

router.patch('/order/:id/:status', authMiddleware.auth, (req, res) => {
  if (statuses.statusesAllowedToPartner.indexOf(req.params.status) === -1) {
    res.status(401).json({
      message: messages.notAuthorized,
    });
  } else if (req.params.status === statuses.CANCELLEDBYPARTNER &&
             !req.body.reason) {
    res.status(400).json({
      message: messages.reasonRequired,
    });
  } else {
    const update = {
      status: req.params.status,
      reason: req.params.reason || '',
    };

    if (req.params.status == statuses.DELIVERED) {
      update.deliveredTime = new Date().getTime();
    } else if (req.params.status == statuses.CANCELLEDBYPARTNER) {
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

router.get('/orders/search', authMiddleware.auth, (req, res) => {
  const searchQuery = {
    accountId: req.session.accountId,
  };
  if (req.query.orderId) {
    searchQuery.orderId = req.query.orderId;
  }

  if (req.query.startTime || req.query.endTime) {
    searchQuery.createdTime = {};
    if (req.query.startTime) {
      searchQuery.createdTime.$gt = req.query.startTime;
    }

    if (req.query.endTime) {
      searchQuery.createdTime.$lt = req.query.endTime;
    }
  }

  if (req.query.status && statuses.statuses.indexOf(req.query.status) > -1) {
    searchQuery.status = req.query.status;
  }

  req.app.db.find(
      searchQuery,
      {projection: {_id: 0}}).toArray().then((docs) => {
    return (docs.length) ? res.status(200).json(docs) : res.status(204).json();
  }).catch((err) => {
    res.status(500).json({
      message: messages.ise,
    });
  });
});

router.put('/cans/update', authMiddleware.auth, (req, res) => {
  if (req.body.cans && Object.keys(req.body.cans).length >= 1) {
    const cans = {
      accountId: req.session.accountId,
      cans: {
        newConnection: {
          'depositAmount': req.body.cans.newConnection.depositAmount &&
              Number.isInteger(
                  req.body.cans.newConnection.depositAmount
              ) &&
              req.body.cans.newConnection.depositAmount > 0 ?
              req.body.cans.newConnection.depositAmount :
              config.partner.cans.newConnection.depositAmount,
          'refundableAmount': req.body.cans.newConnection.refundableAmount &&
              Number.isInteger(
                  req.body.cans.newConnection.refundableAmount
              ) &&
              req.body.cans.newConnection.refundableAmount > 0
              ?
              req.body.cans.newConnection.refundableAmount :
              config.partner.cans.newConnection.refundableAmount,
        },
      },
    };

    for (const key in req.body.cans) {
      if (key != 'newConnection') {
        cans.cans[key] = {
          price: req.body.cans[key].price &&
              Number.isInteger(req.body.cans[key].price) &&
              req.body.cans[key].price > 0 ? req.body.cans[key].price :
              config.partner.cans.defaultCanPrice,
        };
      }
    }

    req.app.db.collection('cans').updateOne({
      accountId: req.session.accountId,
    }, {
      $set: cans,
    }, {
      upsert: true,
    }).then((rslt) => {

    }).catch((err) => {
      res.status(500).json({
        message: messages.ise,
      });
    });
  } else {
    res.status(400).json({
      message: messages.missingParameters,
    });
  }
});

module.exports = router;
