/**
 * Class to represent a priority queue element. This is so that the priority
 * property does not need to be stored on the given item itself.
 */
class QElement {
    constructor(element, priority) {
        // element is the given item to be added to the queue.
        this.element = element;
        this.priority = priority;
    }
}

/**
 * Class to represent a PriorityQueue with methods that enforce the correct
 * order of queue items.
 */
class PriorityQueue {
    // An array is used to implement priority
    constructor() {
        this.items = [];
    }

    /**
     * Adds the new item in the correct location in the queue based on priority.
     * - Time: O(?)
     * - Space: O(?)
     * @param {any} element The item to add.
     * @param {number} priority The importance, low is more important.
     * @returns {number} The new length.
     */
    enqueue(element, priority) { 
        let value = new QElement(element, priority);
        if (this.items.length === 0) {
            this.items.splice(0, 0, value);
            return this.items.length;
        }
        for (let i= 0; i < this.items.length; i++) {
            if (this.items[i].priority <= priority) {
                this.items.splice(i, 0, value);
                break;
            }
        }
        return this.items.length;
    }


    /**
     * Removes and returns the most prioritized item.
     * - Time: O(?)
     * - Space: O(?)
     * @returns {QElement|undefined}.
     */
    dequeue() { 
        return this.items.pop();
    }
}

let test1 = new PriorityQueue();
console.log(test1.enqueue("Walk dog", 1));
console.log(test1.enqueue("Homework", 2));
console.log(test1.enqueue("Food", 2));
console.log(test1.enqueue("Dishes", 3));
console.log(test1.dequeue());
console.log(test1);