/**
 * Class to represent a queue using an array to store the queued items.
 * Follows a FIFO (First In First Out) order where new items are added to the
 * back and items are removed from the front.
 */
class Queue {
    /**
     * The constructor is executed when instantiating a new Queue() to construct
     * a new instance.
     * @returns {Queue} This new Queue instance is returned without having to
     *    explicitly write 'return' (implicit return).
     */
    constructor() {
        this.items = [];
    }

    /**
     * Adds a new given item to the back of this queue.
     * - Time: O(?)
     * - Space: O(?)
     * @param {any} item The new item to be added to the back.
     * @returns {number} The new length of this queue.
     */
    push(item) { 
        this.items.push(item);
        return this.items.length;
    }

    /**
     * Removes the front item from this queue.
     * - Time: O(?)
     * - Space: O(?)
     * @returns {any} The removed item or undefined if this queue was empty.
     */
    pop() { 
        if (this.isEmpty()) {
            return null;
        }
        let arr = [];
        let removed = 0;
        for (let i=0; i<this.items.length; i++) {
            if (!i == 0) {
                arr.push(this.items[i]);
            }
            else {
                removed = this.items[i]
            }
        }
        this.items= arr;
        return removed;
    }

    /**
     * Retrieves the front item from this queue without removing it.
     * - Time: O(?)
     * - Space: O(?)
     * @returns {any} The front item of this queue.
     */
    peek() { 
        if (this.isEmpty()) {
            return null;
        }
        return this.items[0];
    }

    /**
     * Returns whether or not this queue is empty.
     * - Time: O(?)
     * - Space: O(?)
     * @returns {boolean}

     */
    isEmpty() { 
        return this.items == null;
    }

    /**
     * Returns the size of this queue.
     * - Time: O(?)
     * - Space: O(?)
     * @returns {number} The length.
     */
    size() { 
        let size = this.items.length;
        return size;
    }
}

let test = new Queue();
test.push(1);
test.push(2);
test.push(3);
test.push(4);
console.log(test);
console.log(test.pop());
console.log(test);
console.log(test.peek());
console.log(test.isEmpty());
console.log(test.size());