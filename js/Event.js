export class Event {
  static listen (eventName, handler) {
    window.addEventListener(eventName, (event) => {
      handler(event.detail)
    })
  }

  static emit (eventName, data) {
    let log = `${eventName}`
    if (data.id !== undefined) {
      log += ` id: ${data.id}`
    }
    console.log(log)
    const event = new CustomEvent(eventName, {
      detail: data,
      bubbles: true // This makes the event bubble up through the DOM
    })
    window.dispatchEvent(event)
  }
}
