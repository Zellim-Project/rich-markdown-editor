export default class EventEmitter {
    constructor() {
        this.listeners = {};
        this.on = this.addListener;
        this.off = this.removeListener;
    }
    addListener(name, callback) {
        if (!this.listeners[name]) {
            this.listeners[name] = [];
        }
        this.listeners[name].push(callback);
    }
    removeListener(name, callback) {
        this.listeners[name] = this.listeners[name]?.filter(cb => cb !== callback);
    }
    emit(name, data) {
        this.listeners[name]?.forEach(callback => {
            callback(data);
        });
    }
}
//# sourceMappingURL=events.js.map