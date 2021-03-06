/**
 * Class to represent a Node in a Binary Search Tree (BST).
 */
class Node {
    /**
     * Constructs a new instance of a BST node.
     * @param {number} data The integer to store in the node.
     */
    constructor(data) {
        this.data = data;
        /**
         * These properties are how this node is connected to other nodes to form
         * the tree. Similar to .next in a SinglyLinkedList except a BST node can
         * be connected to two other nodes. To start, new nodes will not be
         * connected to any other nodes, these properties will be set after
         * the new node is instantiated.
         */
        this.left = null;
        this.right = null;
    }
}

/**
 * Represents an ordered tree of nodes where the data of left nodes are <= to
 * their parent and the data of nodes to the right are > their parent's data.
 */
class BinarySearchTree {
    constructor() {
        /**
         * Just like the head of a linked list, this is the start of our tree which
         * branches downward from here.
         */
        this.root = null;
    }

    print(toPrint = "", runner = this.root) {
        if (runner == null) {
            return this;
        }

        toPrint += "\t";
        this.print(toPrint, runner.right);
        console.log(`${toPrint}${runner.data}`);
        this.print(toPrint, runner.left);
    }


    /**
     * Determines if this tree is empty.
     * - Time: O(1) - Constant.
     * - Space: O(1) - Constant.
     * @returns {boolean} Indicates if this tree is empty.
     */
    isEmpty() {
        return this.root === null;
    }

    /**
     * Retrieves the smallest integer data from this tree.
     * - Time: O(n) - Linear, where n = the height of the left sub-tree starting from the current node.
     * - Space: O(1) - Constant.
     * @param {Node} current The node that is currently accessed from the tree as
     *    the tree is being traversed.
     * @returns {number|null} The smallest integer from this tree, or null if empty.
     */
    min(current = this.root) {
        // EDGE CASE! What if the tree is empty?
        if (this.isEmpty()) {
            return null;
        }

        /*
            To find the smallest data, we just need to keep going 
            to the left. Just like with SLL's, if the next thing is
            null, we've reached the end. Only instead of next, we'll
            use left!
        */
        while (current.left) {
            current = current.left;
        }

        // Return the current node's data!
        return current.data;
    }

    /**
     * Retrieves the largest integer data from this tree.
     * - Time: O(n) - Linear, where n = the height of the right subtree, starting from the current node.
     * - Space: O(1) - Constant.
     * @param {Node} current The node that is currently accessed from the tree as
     *    the tree is being traversed.
     * @returns {number|null} The largest integer from this tree, or null if empty
     */
    max(current = this.root) {
        // Let's do all the same things as min, but replace left with right!
        if (this.isEmpty()) {
            return null;
        }

        while (current.right) {
            current = current.right;
        }

        return current.data;
    }

    // BONUS
    /**
     * Retrieves the smallest integer data from this tree.
     * - Time: O(n) - Linear, where n is the height of the left subtree.
     * - Space: O(n) - Linear, where n is the height of the left subtree. 
     *                 Remember, just because we're not explicitly declaring
     *                 new variables doesn't mean that each recursive call is not adding
     *                 a new layer to the call stack, each with its own new current.
     * @param {Node} current The node that is currently accessed from the tree as
     *    the tree is being traversed.
     * @returns {number|null} The smallest integer from this tree, or null if empty.
     */
    minRecursive(current = this.root) {
        if (current == null) {
            return;
        } else if (current.left == null) {
            return current.data;
        }

        return this.minRecursive(current.left);
    }

    /**
     * Retrieves the largest integer data from this tree.
     * - Time: O(n) - Linear, where n is the height of the left subtree.
     * - Space: O(n) - Linear, where n is the height of the left subtree. 
     *                 Remember, just because we're not explicitly declaring
     *                 new variables doesn't mean that each recursive call is not adding
     *                 a new layer to the call stack, each with its own new current.
     * @param {Node} current The node that is currently accessed from the tree as
     *    the tree is being traversed.
     * @returns {number} The largest integer from this tree.
     */
    maxRecursive(current = this.root) {
        // Same thing but right!
        if (current == null) {
            return;
        } else if (current.right == null) {
            return current.data;
        }

        return this.maxRecursive(current.right);

    }
    
    /**
     * Determines if this tree contains the given searchVal.
     * - Time: O(?).
     * - Space: O(?).
     * @param {number} searchVal The number to search for in the node's data.
     * @returns {boolean} Indicates if the searchVal was found.
     */
    contains(searchVal) { 
        let current = this.root;
        while (current) {
            if (searchVal === current.data) {
                return true;
            }
            else if (searchVal < current.data) {
                current = current.left;
            }
            else if (searchVal > current.data) {
                current = current.right;
            }
        }
        return false;
    }

    
    /**
     * Calculates the range (max - min) from the given startNode.
     * - Time: O(?).
     * - Space: O(?).
     * @param {Node} startNode The node to start from to calculate the range.
     * @returns {number|null} The range of this tree or a sub tree depending on if the
     *    startNode is the root or not.
     */
    range(startNode = this.root) { 
        let max = this.maxRecursive(startNode);
        let min = this.minRecursive(startNode);
        if (!isNaN(max) && !isNaN(min)) {
            let difference = max - min;
            return difference;
        }
        return null;
    }


    /** BONUS
     * Determines if this tree contains the given searchVal.
     * - Time: O(?).
     * - Space: O(?).
     * @param {number} searchVal The number to search for in the node's data.
     * @returns {boolean} Indicates if the searchVal was found.
     */
    containsRecursive(searchVal, current = this.root) { }

}

const emptyTree = new BinarySearchTree();
const oneNodeTree = new BinarySearchTree();
oneNodeTree.root = new Node(10);

/**  twoLevelTree
 *      root
 *       10
 *      /  \
 *     5    15
 */
const twoLevelTree = new BinarySearchTree();
twoLevelTree.root = new Node(10);
twoLevelTree.root.left = new Node(5);
twoLevelTree.root.right = new Node(15);

/**  fullTree
 *                 root
 *              <-- 25 -->
 *            /            \
 *           15             50
 *         /    \         /    \
 *       10      22      35     70
 *      /  \    /  \    /  \   /  \
 *     4   12  18  24  31  44 66  90
 */
const fullTree = new BinarySearchTree();
fullTree.root = new Node(25);

// left sub-tree
fullTree.root.left = new Node(15);
fullTree.root.left.left = new Node(10);
fullTree.root.left.right = new Node(22);
fullTree.root.left.left.left = new Node(4);
fullTree.root.left.left.right = new Node(12);
fullTree.root.left.right.left = new Node(18);
fullTree.root.left.right.right = new Node(24);

// right sub-tree
fullTree.root.right = new Node(50);
fullTree.root.right.left = new Node(35);
fullTree.root.right.right = new Node(70);
fullTree.root.right.left.left = new Node(31);
fullTree.root.right.left.right = new Node(44);
fullTree.root.right.right.left = new Node(66);
fullTree.root.right.right.right = new Node(90);

/* ****Test Cases**** */

/* **** contains **** */
const containsOutput1 = emptyTree.contains(5);
const containsExpected1 = false;
console.log(containsOutput1 === containsExpected1);

const containsOutput2 = twoLevelTree.contains(15);
const containsExpected2 = true;
console.log(containsOutput2 === containsExpected2);

const containsOutput3 = fullTree.contains(22);
const containsExpected3 = true;
console.log(containsOutput3 === containsExpected3)

// the same test cases should work for containsRecursive as well

/* **** range **** */
const rangeOutput1 = twoLevelTree.range();
const rangeExpected1 = 10;
console.log(rangeOutput1 === rangeExpected1);

const rightLeaf = twoLevelTree.root.right;
const rangeOutput2 = twoLevelTree.range(rightLeaf);
const rangeExpected2 = 0;
console.log(rangeOutput2 === rangeExpected2);

const rangeOutput3 = twoLevelTree.range(rightLeaf.left);
const rangeExpected3 = null;
console.log(rangeOutput3 === rangeExpected3);

const rangeOutput4 = fullTree.range();
const rangeExpected4 = 86;
console.log(rangeOutput4 === rangeExpected4);

const rangeOutput5 = fullTree.range(fullTree.root.left);
const rangeExpected5 = 20;
console.log(rangeOutput5 === rangeExpected5);


