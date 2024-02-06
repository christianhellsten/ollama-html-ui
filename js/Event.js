export class Event {
  static listen(eventName, handler, target) {
    if (target === null || target === undefined) {
      target = window;
    }
    target.addEventListener(eventName, (event) => {
      handler(event.detail);
    });
  }

  static emit(eventName, data, target) {
    if (target === null || target === undefined) {
      target = window;
    }
    let log = `${eventName}`;
    if (data?.id) {
      log += ` id: ${data.id}`;
    }
    console.log(log);
    const event = new CustomEvent(eventName, {
      detail: data || {},
      bubbles: true, // This makes the event bubble up through the DOM
    });
    target.dispatchEvent(event);
  }
}
