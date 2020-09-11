const { Router } = require('express');
const router = Router();


router.get('/', (req, res) => {
    return res.json('all users sent');
});

router.get('/:id', (req, res) => {
    if (req.params.id === "U0001") {
        return res.json("user U00001 Found");
    }
    return res.status(404).json("user not found");
});

router.post('/', (req, res) => {
    const { username, password } = req.body;
    if (username && password) {
        return res.status(201).json('user created');
    }
    res.status(400).json('user nor created');
});

module.exports = router;