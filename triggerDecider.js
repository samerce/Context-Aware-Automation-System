 /*
    triggerDecider
*/

 var _ = require('underscore'),
     util = require('util'),
     sensorWrapper = require('./sensorWrapper'),
     logger = require('./logger'),
     hueWrapper = require('./hueWrapper'),
     actionRunner = require('./actionRunner');

(function(context) {

    function Trigger(sensor, actionId) {
        this.sensor = sensor;
        this.actionId = actionId;
        this.shouldFire = function(sensor) {
            logger.i("Trigger.prototype.shouldFire: " + this.sensor);
            return (this.sensor == sensor);
        };
        this.fire = function() {
            logger.i("Firing Trigger!");
            actionRunner.runAction(this.actionId);
        };
    }

    var TRIGGERS = [
        new Trigger("C2", "turnOnBottomStairLight")
    ];

    function handleRawInput(query) {
        var sensor = query.sensor;
        logger.i("handleRawInput sensor: " + sensor);
        sensorMatches(sensor);
    }

    function sensorMatches(sensor) {
        var triggersToFire = _.filter(TRIGGERS, function(trigger) {
            return trigger.shouldFire(sensor);
        });

        logger.i("sensorMatches: " + util.inspect(triggersToFire));
        _.each(triggersToFire, function(trigger) {
            trigger.fire();
        });
    }

    function triggerAction(actionId) {
        hueWrapper.turnOnAllLights();
    }

    function init() {
        logger.i("Initializing the triggers!");
    }

    context.init = init;
    context.handleRawInput = handleRawInput;
})(exports);