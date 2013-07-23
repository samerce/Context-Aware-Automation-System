 /*
    actionRunner
*/

var util = require('util'),
    logger = require('./logger'),
    lights = require('./hueWrapper');

(function(context) {

    function Action(actionId) {
        logger.i('Action constructor: ' + actionId);
        this.actionId = actionId;
    }
    Action.prototype.run = function() {
         logger.i(util.format("Running action %s!", this.actionId));
    };


    function LightAction(actionId, lightName) {
        Action.call(this, actionId);
        this.lightName = lightName;
        logger.i('LightAction constructor: ' + actionId);
    }
    LightAction.prototype = new Action();
    LightAction.prototype.run = function() {
        logger.i(util.format("Running LightAction %s!", this.actionId));

        lights.getLightByName(this.lightName).on();
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
        AddLightAction("turnOnBottomStairLight");
        this.ACTIONS = ACTIONS;

        function AddLightAction(actionId) {
            ACTIONS[actionId] = new LightAction(actionId, "Stairs Bottom")
        }
    }

    exports.init = init;
    exports.runAction = runAction;
})(exports);