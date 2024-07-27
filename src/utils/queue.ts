type QueueNode<T> = {
	value?: T;
	next: QueueNode<T> | null;
};
export class Queue<T> {
	private head: QueueNode<T> | null;
	private tail: QueueNode<T> | null;
	private length: number;
	constructor() {
		this.head = null;
		this.tail = null;
		this.length = 0;
	}
	dequeue(): QueueNode<T> | undefined {
		if (!this.head) {
			return;
		}
		this.length -= 1;

		if (this.length === 0) {
			this.head = null;
			this.tail = null;
			return;
		}
		const node = this.head;
		this.head = node.next;
		node.next = null;
		return node;
	}
	enqueue(value: T) {
		this.length += 1;
		const node: QueueNode<T> = {
			value,
			next: null,
		};
		if (!this.tail) {
			this.head = node;
			this.tail = node;
			return;
		}
		node.next = this.tail;
		this.tail = node;
	}
	peek() {
		return this.head?.value;
	}
}
