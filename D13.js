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
     * - Time: O(n) - Linear, where n = the height of our BSTree.
     * - Space: O(1) - Constant.
     * @param {number} searchVal The number to search for in the node's data.
     * @returns {boolean} Indicates if the searchVal was found.
     */
    contains(searchVal) { 
        /*
            Here's a basic breakdown of steps:
                1. Initialize our traversing variable at the root
                2. While that traversing variable is not null
                    2a. Does the searchVal match our traversing variable's data?
                        2aa. If so, return true!
                    2b. Is the searchVal less than the traversing variable's data?
                        2ba. If so, set the traversing variable to be its .left 
                    2c. If it's not equal to or less than, it must be greater than, so:
                        2ca. Set the traversing variable to be its .right 
                
                3. Exiting the while loop means eventually the traversing variable reached null,
                    and thus did not find our searchValue, so return false
        */
        let current = this.root;

        while(current) {
            if(current.data === searchVal) {
                return true;
            } else if (searchVal < current.data) {
                current = current.left;
            } else {
                current = current.right;
            }
        }

        return false;
    }

    
    /**
     * Calculates the range (max - min) from the given startNode.
     * - Time: O(n) - Linear, where n = the height of the BSTree (technically O(2n)).
     * - Space: O(1) - Constant.
     * @param {Node} startNode The node to start from to calculate the range.
     * @returns {number|null} The range of this tree or a sub tree depending on if the
     *    startNode is the root or not.
     */
    range(startNode = this.root) { 
        /*
            Assuming you built your .max and .min correctly, this one's a cakewalk!
            The range is the largest value in a (sub)tree minus the smallest value in a 
            (sub)tree. Our .max() and .min() methods accept a node as an optional parameter 
            (defaults to the root if not passed in), and finds the largest and smallest values
            in that subtree, respectively (i.e. from the node given, find the smallest/largest 
            values under that node)

            So!

            First, edge case, check to see if the startNode given isn't null
        */
        if(!startNode) {
            return null;
        }

        // Otherwise, this is the perfect time to whip out methods we've already written!
        return this.max(startNode) - this.min(startNode);
    }


    /** BONUS
     * Determines if this tree contains the given searchVal.
     * - Time: O(n) - Linear, where n = the height of the BSTree.
     * - Space: O(n) - Linear, where n = the height of the BStree.
     * @param {number} searchVal The number to search for in the node's data.
     * @returns {boolean} Indicates if the searchVal was found.
     */
    containsRecursive(searchVal, current = this.root) { 
        /*
            The best way to think of this recursively, is to think of a delegating
            manager:
                The manager does not necessarily know EVERY step, but it knows who to
                delegate to.
            
            So the code itself will be treated as "how would you give instructions if
            asked 'Does this node contain this value, and if not, which way should I go?'"
        */

        // If the current node is null, there is no node, so, no, it can't possibly contain the value
        if(!current){
            return false;
        // But, if the current node's data matches our searchVal, then yes, it does contain it!
        } else if (current.data === searchVal) {
            return true;
        // But, if the searchVal is less than the current node's data, all hope is not lost, so go left
        } else if(searchVal < current.data) {
            return this.containsRecursive(searchVal, current.left);
        // Well, if it's not here, and it's not to the left, go right instead
        } else {
            return this.containsRecursive(searchVal, current.right);
        }
    }

    /**
     * Inserts a new node with the given newVal in the right place to preserve
     * the order of this tree.
     * - Time: O(?).
     * - Space: O(?).
     * @param {number} newVal The data to be added to a new node.
     * @returns {BinarySearchTree} This tree.
     */
    insert(newVal) {
        var current = this.root;
        var attachNew = new Node(newVal);
        if(this.isEmpty()) {
            this.root = attachNew;
            return this;
        }
        while (current) {
            if (newVal < current.data) {
                if (!current.left) {
                    current.left= attachNew;
                    return this;
                }
                current = current.left;
            }
            else {
                if (!current.right) {
                    current.right= attachNew;
                    return this;
                }
                current = current.right;
            }
        }
    }

    /**
     * Inserts a new node with the given newVal in the right place to preserver
     * the order of this tree.
     * - Time: O(?).
     * - Space: O(?).
     * @param {number} newVal The data to be added to a new node.
     * @param {Node} curr The node that is currently accessed from the tree as
     *    the tree is being traversed.
     * @returns {BinarySearchTree} This tree.
     */
    insertRecursive(newVal, curr = this.root) {
        
    }

}

const emptyTree = new BinarySearchTree();

// const oneNodeTree = new BinarySearchTree();
// console.log(oneNodeTree.insert(10));

/**  twoLevelTree
 *      root
 *       10
 *      /  \
 *     5    15
 */
// const twoLevelTree = new BinarySearchTree();
// twoLevelTree
//     .insert(10)
//     .insert(5)
//     // .insert(15);
// console.log(twoLevelTree);

/**  fullTree
 *                 root
 *              <-- 25 -->
 *            /            \
 *           15             50
 *         /    \         /    \
 *       10      22      35     70
 *      /  \    /  \    /  \   /  \
 *     4   12  18  24  31  44 66  90
 *                        /
 *                       35
 */
/***************** Uncomment after insert method is created. ****************/
const fullTree = new BinarySearchTree();
fullTree
    .insert(25)
    .insert(15)
    .insert(10)
    .insert(22)
    .insert(4)
    .insert(12)
    .insert(18)
    .insert(24)
    .insert(50)
    .insert(35)
    .insert(70)
    .insert(31)
    .insert(44)
    .insert(66)
    .insert(90)
    .insert(35);
console.log(fullTree.print());

