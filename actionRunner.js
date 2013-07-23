 /*
    actionRunner
*/

 var util = require('util'),
     logger = require('./logger');

(function(context) {

    function Action(actionId) {
        this.actionId = actionId;
    }
    Action.prototype.run = function() {
         logger.i(util.format("Running action %s!", this.actionId));
    };


    function runAction(actionId) {
        var action = this.ACTIONS[actionId];
        if (!action) {
            return;
        }
        action.run();
    }

    function init() {
        var ACTIONS = {};
        AddAction("turnOnBottomStairLight");
        this.ACTIONS = ACTIONS;

        function AddAction(actionId) {
            ACTIONS[actionId] = new Action(actionId)
        }
    }

    exports.init = init;
    exports.runAction = runAction;
})(exports);