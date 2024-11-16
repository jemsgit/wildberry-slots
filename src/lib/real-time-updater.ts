import { SlotUpdates } from "../models/slot";

class RealTimeUpdater {
  socket: WebSocket | null;
  url: string;
  subscribers: any[];
  reconnectInterval = 5000; // Reconnect every 5 seconds
  maxRetries = Infinity; // Max retries
  retryCount: number = 0;
  isManuallyClosed = false;
  constructor(url: string) {
    this.url = url;
    this.subscribers = [];
    this.retryCount = 0;
    this.socket = null;
    this.connect();
  }

  connect() {
    this.socket = new WebSocket(this.url);

    this.socket.onopen = () => {
      console.log("Connected to server");
    };

    this.socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      this.notifySubscribers(message);
    };

    this.socket.onclose = () => {
      console.log("Connection closed");
      this.retryConnection();
    };
  }

  retryConnection() {
    if (this.retryCount < this.maxRetries) {
      console.log(`Attempting to reconnect... (${this.retryCount + 1})`);
      this.retryCount++;
      setTimeout(() => this.connect(), this.reconnectInterval);
    } else {
      console.error("Max retries reached. Could not reconnect.");
    }
  }

  // Метод подписки на изменения
  subscribe(callback: (update: SlotUpdates) => void) {
    if (typeof callback === "function") {
      this.subscribers.push(callback);
      return () => this.unsubscribe(callback);
    } else {
      console.error("Callback must be a function");
    }
  }

  unsubscribe(callback: (update: SlotUpdates) => void) {
    this.subscribers = this.subscribers.filter(
      (subscriber) => subscriber !== callback
    );
  }

  // Уведомить всех подписчиков
  notifySubscribers(message: SlotUpdates) {
    this.subscribers.forEach((callback) => {
      callback(message);
    });
  }

  // Закрытие соединения
  close() {
    this.socket?.close();
  }
}

const updater = new RealTimeUpdater("ws://localhost:8080");

export default updater;
