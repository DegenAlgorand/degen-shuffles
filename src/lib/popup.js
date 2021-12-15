class Popup {
  constructor() {
    this.stack = [];
    this.subscribers = [];
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.dispatchUpdate = this.dispatchUpdate.bind(this);
  }

  /**
   * Check if the stack contains popups
   */
  get isActive() {
    return !!this.stack.length
  }

  /**
   * Open popup add it to the stack 
   */
  open(component, props = {}) {
    this.stack.push({ component, props });
    this.dispatchUpdate();
  };

  /**
   * Close popup on top of the stack
   */
  close() {
    this.stack.pop();
    this.dispatchUpdate();
  }

  /**
   * Store subscription
   * Enables this class to be used as a reactive store
   */
  subscribe(subscriber) {
    this.subscribers.push(subscriber);
    return () => {
      const index = this.subscribers.indexOf(subscriber);
      if (index !== -1) {
        this.subscribers.splice(index, 1);
      }
    };
  }
  dispatchUpdate() {
    if (this.subscribers.length) {
      this.subscribers.forEach( subscriber => subscriber(this.stack));
    }
  }
}

export default new Popup();