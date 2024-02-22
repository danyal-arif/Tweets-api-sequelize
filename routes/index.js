import express from 'express'
import User from '../models/User.js'
import Tweet from '../models/Tweet.js'
import sequelize from '../sequelize.js'

const router = express.Router()

//USER ROUTES
router.post('/user', async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    res.json({data: user})
  } catch(e) {
    next(e)
  }
})

router.get('/user', async (req, res, next) => {
  try {
    const users = await User.findAll({ include: [ {model: Tweet, as: 'tweets'} ] })
    res.json({data: users})
  } catch(e) {
    next(e)
  }
})

router.put('/user/:id', async (req, res, next) => {
  try {
    await User.update(req.body, {where: {
      id: req.params.id
    }})
    res.json({message: 'User updated!'})
  } catch(e) {
    next(e)
  }
})

router.delete('/user/:id', async (req, res, next) => {
  try {
    const count = await User.destroy({
      where: {
        id: req.params.id
      }
    })
    res.json({message: 'User deleted!'})
  } catch(e) {
    next(e)
  }
})

router.get('/user/:id/tweetCount', async (req, res, next) => {
  try {
    const users = await Tweet.findAll({ 
      attributes: [
        'userid',
        [sequelize.fn('count', sequelize.col('userid')), 'totalTweets']
      ],
      group: ['userid', 'user.id'],
      include: [{
        model: User,
        as: 'user',
      }],
      
     })
    res.json({data: users})
  } catch(e) {
    next(e)
  }
})


//TWEET ROUTES
router.post('/tweet', async (req, res, next) => {
  try {
    const tweet = await Tweet.create(req.body)
    res.json({data: tweet})
  } catch(e) {
    next(e)
  }
})

router.get('/tweet', async (req, res, next) => {
  try {
    const tweets = await Tweet.findAll({ include: [ {model: User, as: 'user'} ] })
    res.json({data: tweets})
  } catch(e) {
    next(e)
  }
})

router.put('/tweet/:id', async (req, res, next) => {
  try {
    await Tweet.update(req.body, {where: {
      id: req.params.id
    }})
    res.json({message: 'Tweet updated!'})
  } catch(e) {
    next(e)
  }
})

router.delete('/tweet/:id', async (req, res, next) => {
  try {
    const count = await Tweet.destroy({
      where: {
        id: req.params.id
      }
    })
    res.json({message: 'Tweet deleted!'})
  } catch(e) {
    next(e)
  }
})
export default router