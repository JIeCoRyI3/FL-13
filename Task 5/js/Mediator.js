export default class Mediator {
    events = {};

    addEvent(eventName, target) {
        if(!this.events[eventName]) {
            this.events[eventName] = [];
        }
        this.events[eventName].push(target);
    }

    triggerEvent(eventName, callback) {
        this.events[eventName].forEach((element) => {
            callback(element);
        });
    }
}
