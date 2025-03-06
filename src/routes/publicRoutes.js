import express from "express"

let router = express.Router();

router.get('/', (req, res) => {
    return res.send('Chao mưng đến tiki_backend')
});

module.exports = router;