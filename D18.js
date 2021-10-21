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
        if (this.isEmpty()) {
            this.head = newNode;
            return this;
        }
        let runner = this.head;
        while (runner.next) {
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
        if (this.isEmpty()) {
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

        while (runner) {
            sum += runner.data;
            count++;
            runner = runner.next;
        }
        return sum / count;
    }

    removeBack() {
        if (this.isEmpty()) {
            return null;
        } else if (this.head.next == null) {
            const removed = this.head;
            this.head = null;
            return removed.data;
        } else {
            let runner = this.head;
            let walker = null;
            while (runner.next) {
                walker = runner;
                runner = runner.next;
            }
            walker.next = null;
            return runner.data;
        }

    }

    contains(val) {
        let runner = this.head;

        while (runner) {
            if (runner.data == val) return true;
            runner = runner.next;
        }
        return false;
    }

    containsRecursive(val, current = this.head) {
        if (current == null) {
            return false;
        } else if (current.data == val) {
            return true;
        } else {
            return this.containsRecursive(val, current.next);
        }
    }

    recursiveMax(runner = this.head, maxNode = this.head) {
        if (runner == null) {
            if (maxNode == null) {
                return null;
            } else {
                return maxNode.data
            }
        }
        if (runner.data > maxNode.data) {
            maxNode = runner;
        }
        return this.recursiveMax(runner.next, maxNode);
    }

    secondToLast() {
        if (this.isEmpty() || this.head.next == null) {
            return null;
        }
        let runner = this.head;

        while (runner.next.next) {
            runner = runner.next;
        }
        return runner.data;
    }
    removeVal(val) {
        if (this.isEmpty()) {
            return false;
        }
        else if (this.head.data === val) {
            this.removeHead();
            return true;
        }

        let walker = this.head;
        let runner = walker.next;

        while (runner) {
            if (runner.data === val) {
                walker.next = runner.next;
                runner.next = null;
                return true;
            }
            walker = runner;
            runner = runner.next;
        }

        return false;
    }

    prepend(newVal, targetVal) {
        if (this.isEmpty()) {
            return false;
        } else if (this.head.data === targetVal) {
            this.insertAtFront(newVal);
            return true;
        }

        let walker = null;
        let runner = this.head;

        while (runner) {
            if (runner.data === targetVal) {
                const newNode = new Node(newVal);
                newNode.next = runner;
                walker.next = newNode;
                return true;
            }
            walker = runner;
            runner = runner.next;
        }

        return false;
    }

    concat(addList) {
        let runner = this.head;

        if (runner === null) {
            this.head = addList.head;
        } else {
            while (runner.next) {
                runner = runner.next;
            }
            runner.next = addList.head;
        }
        return this;
    }

    moveMinFront() {
        /* 
            Alternatively, we could swap the data only in min node and head,
            but it's better to swap the nodes themselves in case anyone has variables
            pointing to these nodes already so that we don't unexpectedly change the
            the data in those nodes potentially causing unwanted side-effects.
        */
        if (this.isEmpty()) {
            return this;
        }

        let minNode = this.head;
        let runner = this.head;
        let prev = this.head;

        while (runner) {
            if (runner.data < minNode.data) {
                minNode = runner;
            }

            runner = runner.next;
        }
        // now that we know the min, if it is already the head, nothing needs to be done
        if (minNode === this.head) {
            return this;
        }

        runner = this.head;

        while (runner !== minNode) {
            prev = runner;
            runner = runner.next;
        }

        prev.next = minNode.next; // remove the minNode
        minNode.next = this.head;
        this.head = minNode;
        return this;
    }

    moveMinToFront() {
        if (this.isEmpty()) {
            return this;
        }

        let minNode = this.head;
        let runner = this.head;
        let prev = this.head;


        while (runner.next) {
            if (runner.next.data < minNode.data) {
                prev = runner;
                minNode = runner.next;
            }

            runner = runner.next;
        }

        if (minNode === this.head) {
            return this;
        }

        prev.next = minNode.next;
        minNode.next = this.head;
        this.head = minNode;
        return this;
    }

    splitOnVal(val) {
        const newList = new SinglyLinkedList();

        if (!this.head) {
            return newList;
        }

        if (this.head.data === val) {
            newList.head = this.head;
            this.head = null;
            return newList;
        }

        let runner = this.head;

        while (runner.next) {
            if (runner.next.data === val) {
                newList.head = runner.next;
                runner.next = null;
                return newList;
            }
            runner = runner.next;
        }
        return newList;
    }

    /**
     * Reverses this list in-place without using any extra lists.
     * - Time: (?).
     * - Space: (?).
     * @returns {SinglyLinkedList} This list.
     */
    reverse() { 
        let runner = this.head;
        let walker = null;
        
        while (runner.next) {
            let temp = runner.next; // Gets next Node
            runner.next = walker; // Reverse Line
            walker = runner; // Exchange of values to keep while loop going
            runner = temp;
        }
        runner.next = walker;
        this.head = runner;
        return this;
    }

    /**
     * Determines whether the list has a loop in it which would result in
     * infinitely traversing unless otherwise avoided. A loop is when a node's
     * next points to a node that is behind it.
     * - Time: (?).
     * - Space: (?).
     * @returns {boolean} Whether the list has a loop or not.
     */
    hasLoop() { }

    /**
     * Removes all the nodes that have a negative integer as their data.
     * - Time: (?).
     * - Space: (?).
     * @returns {SinglyLinkedList} This list after the negatives are removed.
     */
    removeNegatives() { }
}

sll = new SinglyLinkedList().seedFromArr([1, 2, 3, 4, 5, 6]);
console.log(sll.reverse().toArr());
