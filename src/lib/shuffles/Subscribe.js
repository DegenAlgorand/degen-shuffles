
export default class Subscribe {
  /**
   * Store subscription
   * Enables this class to be used as a reactive store
   */
   subscribe(subscriber) {
    if (!this.subscribers) this.subscribers = [];
    this.subscribers.push(subscriber);
    return () => {
      const index = this.subscribers.indexOf(subscriber);
      if (index !== -1) {
        this.subscribers.splice(index, 1);
      }
    };
  }
  dispatchUpdate() {
    if (this.subscribers && this.subscribers.length) {
      this.subscribers.forEach(subscriber => subscriber(this));
    }
  }
}