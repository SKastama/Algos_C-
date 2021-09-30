class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

class SinglyLinkedList {
    constructor() {
        this.head = null;
    }

    seedFromArr(vals) {
        for (const item of vals) {
            this.insertAtBack(item);
        }
        return this;
    }

    toArr() {
        const arr = [];
        let runner = this.head;

        while (runner) {
            arr.push(runner.data);
            runner = runner.next;
        }
        return arr;
    }

    isEmpty() {
        return this.head == null;
    }

    insertAtBack(data) {
        const newNode = new Node(data);
        if(this.isEmpty()) {
            this.head = newNode;
            return this;
        }
        let runner = this.head;
        while(runner.next) {
            runner = runner.next;
        }
        runner.next = newNode;
        return this;
    }

    insertAtFront(data) {
        const newHead = new Node(data);
        newHead.next = this.head;
        this.head = newHead;
        return this;
    }

    removeHead() {
        if(this.isEmpty()) {
            return null;
        }

        const removedHead = this.head;
        
        this.head = removedHead.next;
        removedHead.next = null;
        return removedHead.data;

    }

    average() {
        let sum = 0;
        let count = 0;

        let runner = this.head;

        while(runner) {
            sum += runner.data;
            count++;
            runner = runner.next;
        }
        return sum / count;
    }

    removeBack() {
        if(this.isEmpty()) {
            return null;
        } else if(this.head.next == null) {
            const removed = this.head;
            this.head = null;
            return removed.data;
        } else {
            let runner = this.head;
            let walker = null;
            while(runner.next) {
                walker = runner;
                runner = runner.next;
            }
            walker.next = null;
            return runner.data;
        }
        
    }

    contains(val) {
        let runner = this.head;

        while(runner) {
            if(runner.data == val) return true;
            runner = runner.next;
        }
        return false;
    }

    containsRecursive(val, current = this.head) {
        if(current == null) {
            return false;
        } else if(current.data == val) {
            return true;
        } else {
            return this.containsRecursive(val, current.next);
        }
    }

    recursiveMax(runner = this.head, maxNode = this.head) {
        if(runner == null) {
            if(maxNode == null) {
                return null;
            } else {
                return maxNode.data
            }
        }
        if(runner.data > maxNode.data) {
            maxNode = runner;
        }
        return this.recursiveMax(runner.next, maxNode);
    }
    
    /**
     * Retrieves the data of the second to last node in this list.
     * - Time: O(?).
     * - Space: O(?).
     * @returns {any} The data of the second to last node or null if there is no
     *    second to last node.
     */
    secondToLast() {
        if(this.isEmpty()) {
            return null;
        }
        let runner = this.head;
        if (runner.next == null) {
            return null;
        }
        while (runner.next.next) {
            runner = runner.next;
        }
        return runner.data;
    }

    /**
     * Removes the node that has the matching given val as it's data.
     * - Time: O(?).
     * - Space: O(?).
     * @param {any} val The value to compare to the node's data to find the
     *    node to be removed.
     * @returns {boolean} Indicates if a node was removed or not.
     */
    removeVal(val) {
        let runner = this.head;
        let lagged = null;
        while (runner) {
            if (runner.data == val) {
                if (lagged == null) {
                    let head = this.head;
                    this.head = this.head.next;
                    head.next = null;
                    return true;
                }
                lagged.next = runner.next;
                runner.next = null;
                return true;
            }
            lagged = runner;
            runner= runner.next;
        }
        return false;
        // while (runner.next) {
        //     if (runner.data == val) {
        //         runner == runner.next;
        //         runner.next = null;
        //         return true;
        //     }
        //     runner = runner.next;
        // }
        return false;
    }

    // EXTRA
    /**
     * Inserts a new node before a node that has the given value as its data.
     * - Time: O(?).
     * - Space: O(?).
     * @param {any} newVal The value to use for the new node that is being added.
     * @param {any} targetVal The value to use to find the node that the newVal
     *    should be inserted in front of.
     * @returns {boolean} To indicate whether the node was pre-pended or not.
     */
    prepend(newVal, targetVal) {}

}
sll = new SinglyLinkedList();
sll.seedFromArr([1, 2, 3, 4, 7]);
console.log(sll.secondToLast());
console.log(sll.removeVal(4));
console.log(sll.secondToLast());
