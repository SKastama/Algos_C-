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

    secondToLast() {
        if(this.isEmpty() || this.head.next == null) {
            return null;
        }
        let runner = this.head;

        while(runner.next.next) {
            runner = runner.next;
        }
        return runner.data;
    }
    removeVal(val) {
        if(this.isEmpty()) {
            return false;
        }
        else if(this.head.data === val) {
            this.removeHead();
            return true;
        }

        let walker = this.head;
        let runner = walker.next;

        while(runner) {
            if(runner.data === val) {
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
        if(this.isEmpty()) {
            return false;
        } else if(this.head.data === targetVal) {
            this.insertAtFront(newVal);
            return true;
        }

        let walker = null;
        let runner = this.head;

        while(runner) {
            if(runner.data === targetVal){
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
    
    /**
     * Concatenates the nodes of a given list onto the back of this list.
     * - Time: O(?).
     * - Space: O(?).
     * @param {SinglyLinkedList} addList An instance of a different list whose
     *    whose nodes will be added to the back of this list.
     * @returns {SinglyLinkedList} This list with the added nodes.
     */
    concat(addList) {
        if(this.isEmpty()) {
            this.head = addList.head;
        }
        let runner = this.head;
        while(runner.next) {
            runner = runner.next;
        }
        runner.next = addList.head;
    }

    /**
     * Finds the node with the smallest number as data and moves it to the front
     * of this list.
     * - Time: O(?).
     * - Space: O(?).
     * @returns {SinglyLinkedList} This list.
     */
    moveMinToFront() {}

    // EXTRA
    /**
     * Splits this list into two lists where the 2nd list starts with the node
     * that has the given value.
     * splitOnVal(5) for the list (1=>3=>5=>2=>4) will change list to (1=>3)
     * and the return value will be a new list containing (5=>2=>4)
     * - Time: O(?).
     * - Space: O(?).
     * @param {any} val The value in the node that the list should be split on.
     * @returns {SinglyLinkedList} The split list containing the nodes that are
     *    no longer in this list.
     */
    splitOnVal(val) {}
}
sll = new SinglyLinkedList().seedFromArr([1, 2, 3, 4, 5]);
sll2 = new SinglyLinkedList().seedFromArr([6, 7, 8, 9, 10]);
console.log(sll.toArr());
sll.concat(sll2);
console.log(sll.toArr());