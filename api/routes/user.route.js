import express from 'express'

const router = express.Router()

router.get('/test', (req, res, next) => {
    res.json({
        message: 'Hello my fr'
    })
})

export default router