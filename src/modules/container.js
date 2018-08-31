var express = require('express');
var router = express.Router(); 
 
// Listen for events
router.post('/', (req, res) => {   

});

router.get('/:containerID', (req, res) => {  
    // ================
    // Request Check
    // ============= 
 
    // ================
    // Business logic check
    // ============= 

    // ================
    // Action
    // =============
    res.send("Getting the status from the agent");
    return;
});

router.patch('/:containerID', (req, res) => {  
    // ================
    // Request Check
    // ============= 
 
    // ================
    // Business logic check
    // ============= 

    // ================
    // Action
    // =============
    return;
});

router.delete('/:containerID', (req, res) => { 
    // ================
    // Request Check
    // ============= 
 
    // ================
    // Business logic check
    // =============
    console.log(req.params.containerID);
    let requests = [];
 
    // ================
    // Action
    // =============  
});
 

module.exports = router;