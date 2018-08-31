var express = require('express');
var router = express.Router();
 

router.get('/:runnerID', (req, res) => {
    // ================
    // Request Check
    // ============= 
    // ================
    // Business logic check
    // ============= 
    
    // ================
    // Action
    // ============= 
    res.send("Getting test runner status");
    return;
});

router.post('/:runnerID', (req, res) => {
    // ================
    // Request Check
    // ============= 
    // ================
    // Business logic check
    // ============= 
    
    // ================
    // Action
    // ============= 
    res.send("Queueing test runner");
    return;
});

router.patch('/:runnerID', (req, res) => {
    // ================
    // Request Check
    // ============= 
    // ================
    // Business logic check
    // ============= 
    
    // ================
    // Action
    // ============= 
    res.send("Adjusting test runner");
    return;
});

router.delete('/:runnerID', (req, res) => {
    // ================
    // Request Check
    // ============= 
    // ================
    // Business logic check
    // ============= 
    
    // ================
    // Action
    // ============= 
    res.send("Removing test runner");
    return;
});

module.exports = router;