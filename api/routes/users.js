const bcrypt = require("bcrypt");
const router = require('express').Router();
const Users = require('../models/Users.model')
const bcryptSalt = 10;

//POST new user route (optional, everyone has access)
router.post('/', (req, res, next) => {
  const { body: { user } } = req;

  if(!user.email) {
    return res.status(422).json({
      errors: {
        email: 'is required',
      },
    });
  }

  if(!user.password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }

  const finalUser = new Users(user);

  finalUser.salt = bcrypt.genSaltSync(bcryptSalt); // generating the salt
  finalUser.hash = bcrypt.hashSync(user.password, finalUser.salt); 


  return finalUser.save()
    .then(() => res.json({ user: finalUser }));
});

//POST login route (optional, everyone has access)
router.post('/login', (req, res, next) => {
  const { body: { user } } = req;

  if(!user.email) {
    return res.status(422).json({
      errors: {
        email: 'is required',
      },
    });
  }

  if(!user.password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }
  Users.findOne({
    "email": user.email
  }) // checking if usename is in the DB
  .then(user => {
    if (user === null) { //if not in DB send user back to login and throw error
      res.status(422).json({
        errors: {
         'invalid':'User Not found'
        }
      });
      return;
    }
    // res.json({hash:bcrypt.hashSync(user.password, user.hash), user})
    bcrypt.compare(req.body.user.password, user.hash, (err, result) => { //bcrypt password check between user entered password and the password in the DB
      if (result == true) {
       res.json({user:user})

      } else {
        res.status(422).json({
          errors: {
            'invalid':'Invalid Username or password'
          },
        });
        return;
      }
    })

  })
  .catch(error => {
    next(error);
  })
  
});

//GET current route (required, only authenticated users have access)
router.get('/current', (req, res, next) => {
  const { payload: { id } } = req;

  return Users.findById(id)
    .then((user) => {
      if(!user) {
        return res.sendStatus(400);
      }

      return res.json({ user: user.toAuthJSON() });
    });
});

module.exports = router;