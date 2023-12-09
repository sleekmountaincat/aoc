export class PriorityQueue {
    private queue: any[];
    constructor() {
        this.queue = [];
    }

    enqueue(element: any, priority: number) {
        this.queue.push({ element, priority });
        this.queue.sort((a, b) => a.priority - b.priority);
    }

    dequeue() {
        if (this.isEmpty()) {
            return null;
        }
        return this.queue.shift().element;
    }

    isEmpty() {
        return this.queue.length === 0;
    }
}