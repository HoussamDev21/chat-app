export default {
    events: [],
    listen(name, callback) {
        this.events.push({ name, callback })
    },
    remove(e) {
        let i = this.events.findIndex(e)
        if (i > -1) this.events.splice(i, 1)
    },
    emit(name, data) {
        this.events
        .filter(e => e.name === name)
        .forEach(e => { e.callback(data) })
    }
}