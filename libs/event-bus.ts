/*
  event-bus.ts — Tiny offline-friendly event bridge.
  The connector only reaches for Cathedral Core when explicitly requested.
*/

export type EventHandler<T = unknown> = (payload: T) => void;

interface Envelope<T = unknown> {
  topic: string;
  payload: T;
}

const CORE_WS_URL = "wss://cathedral-core.fly.dev/ws";

export class EventBus {
  private readonly url: string;
  private readonly listeners: Map<string, Set<EventHandler>> = new Map();
  private socket: WebSocket | null = null;
  private socketReady = false;
  private readonly outboundQueue: Envelope[] = [];

  constructor(url: string = CORE_WS_URL) {
    this.url = url;
  }

  subscribe<T>(topic: string, handler: EventHandler<T>): () => void {
    if (!this.listeners.has(topic)) {
      this.listeners.set(topic, new Set());
    }
    const pool = this.listeners.get(topic)!;
    pool.add(handler as EventHandler);
    return () => {
      pool.delete(handler as EventHandler);
      if (pool.size === 0) {
        this.listeners.delete(topic);
      }
    };
  }

  publish<T>(topic: string, payload: T): void {
    const envelope: Envelope<T> = { topic, payload };
    this.dispatchLocal(envelope);
    this.dispatchRemote(envelope);
  }

  connect(): void {
    if (this.socket || typeof WebSocket === "undefined") {
      return;
    }
    const ws = new WebSocket(this.url);
    this.socket = ws;

    ws.addEventListener("open", () => {
      this.socketReady = true;
      while (this.outboundQueue.length > 0 && this.socketReady) {
        const queued = this.outboundQueue.shift();
        if (queued) {
          this.safeSend(queued);
        }
      }
    });

    ws.addEventListener("close", () => {
      this.socketReady = false;
      this.socket = null;
    });

    ws.addEventListener("message", (event) => {
      try {
        const parsed = JSON.parse(String(event.data)) as Envelope;
        if (parsed && typeof parsed.topic === "string") {
          this.dispatchLocal(parsed);
        }
      } catch (error) {
        console.warn("EventBus message parse failed", error);
      }
    });
  }

  close(): void {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
      this.socketReady = false;
    }
  }

  private dispatchLocal(envelope: Envelope): void {
    const pool = this.listeners.get(envelope.topic);
    if (!pool) {
      return;
    }
    pool.forEach((handler) => {
      try {
        handler(envelope.payload);
      } catch (error) {
        console.warn("EventBus handler error", error);
      }
    });
  }

  private dispatchRemote(envelope: Envelope): void {
    if (!this.socket) {
      this.outboundQueue.push(envelope);
      return;
    }
    if (!this.socketReady) {
      this.outboundQueue.push(envelope);
      return;
    }
    this.safeSend(envelope);
  }

  private safeSend(envelope: Envelope): void {
    try {
      this.socket?.send(JSON.stringify(envelope));
    } catch (error) {
      console.warn("EventBus send failed", error);
      this.socketReady = false;
      this.outboundQueue.push(envelope);
    }
  }
}
