class Node {
  constructor(data = null) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(data) {
    // Ensure data is unique
    this.data = [...new Set(data)];

    // Ensure data is sorted
    this.data = Tree.mergeSort(this.data);

    this.rootNode = this.buildTree(this.data);
  }

  buildTree(data) {
    // Base case
    if (data.length == 1) return new Node(data[0]);
    // Root
    const mid = Math.floor(data.length / 2);
    let rootNode = new Node(data[mid]);

    // Left subtree
    rootNode.left = this.buildTree(data.slice(0, mid));

    // Right subtree
    // Only create the right subtree if mid+1 is "in bounds"
    if (mid + 1 < data.length)
      rootNode.right = this.buildTree(data.slice(mid + 1));

    return rootNode;
  }

  // Inserts a value into the tree
  insert(value, node = this.rootNode) {
    // Which side of node to place value on
    // Same values are placed to right
    if (value < node.data) {
      // No child insert right away
      if (!node.left) {
        const newNode = new Node(value);
        node.left = newNode;
        return;
      }

      // Node has child, keep looking for home
      this.insert(value, node.left);
    } else {
      // No child insert right away
      if (!node.right) {
        const newNode = new Node(value);
        node.right = newNode;
        return;
      }

      // Node has child, keep looking for home
      this.insert(value, node.right);
    }
  }

  // Used for deletion, finds the smallest node in given subtree
  findMinNode(node) {
    while (node.left) {
      node = node.left;
    }

    return node;
  }

  // Removes a node from the BST
  delete(value, node = this.rootNode) {
    // Base case
    if (!node) {
      return null;
    }

    // Find the node
    if (value < node.data) {
      node.left = this.delete(value, node.left);
      return node;
    } else if (value > node.data) {
      node.right = this.delete(value, node.right);
      return node;
    } else {
      /* Value found */
      // No Children
      if (!node.left && !node.right) {
        node = null;
        return node;
      }

      // One child
      if (!node.right) {
        node = node.left;
        return node;
      }
      if (!node.left) {
        node = node.right;
        return node;
      }

      // Two Children
      const minNode = this.findMinNode(node.right);
      node.data = minNode.data;
      node.right = this.delete(minNode.data, node.right);
      return node;
    }
  }

  // Returns the node containing the given value or null
  // <root><left><right>
  find(value, root = this.rootNode) {
    // Base case
    if (!root) return;

    // Check for match
    if (root.data === value) return root;

    // Check left
    const leftFind = this.find(value, root.left);
    if (leftFind) return leftFind;

    // Check right
    const rightFind = this.find(value, root.right);
    if (rightFind) return rightFind;

    return null;
  }

  // Merge sort function taken from another project
  static mergeSort(i) {
    // Array of length one is sorted
    if (i.length === 1) {
      return i;
    }

    // Split sort the left and right halves
    let leftHalf = Tree.mergeSort(i.slice(0, Math.floor(i.length / 2)));
    let rightHalf = Tree.mergeSort(i.slice(Math.floor(i.length / 2)));

    // Merge time baby!!!
    let done = false;
    let sortedArray = [];
    while (!done) {
      // Both halves empty, were done
      if (leftHalf.length === 0 && rightHalf.length === 0) done = true;
      // Right not empty
      else if (leftHalf.length === 0) sortedArray.push(rightHalf.shift());
      // Left not empty
      else if (rightHalf.length === 0) sortedArray.push(leftHalf.shift());
      // Left smaller than right
      else if (leftHalf[0] < rightHalf[0]) sortedArray.push(leftHalf.shift());
      // Right >= left
      else if (leftHalf[0] >= rightHalf[0]) sortedArray.push(rightHalf.shift());
    }

    return sortedArray;
  }

  // Takes a callback and does a level order traversal using the supplied function as a callback
  levelOrder(callback) {
    let queue = [this.rootNode];
    while (queue.length) {
      // Add the left and right children to the queue
      const curNode = queue.shift();
      if (curNode.left) queue.push(curNode.left);
      if (curNode.right) queue.push(curNode.right);

      // call the callback
      callback(curNode);
    }
  }

  // Prints the tree using preOrder traversal
  // <root><left><right>
  preOrder(node = this.rootNode) {
    // Base case
    if (!node) return;

    // Print the data
    console.log(`Node Value: ${node.data}`);

    // Go left
    this.preOrder(node.left);

    // Go right
    this.preOrder(node.right);
  }

  // Prints the tree using postOrder traversal
  // <left><right><root>
  postOrder(node = this.rootNode) {
    // Base case
    if (!node) return;

    // Left
    this.postOrder(node.left);

    // Right
    this.postOrder(node.right);

    // Root
    console.log(`Node value: ${node.data}`);
  }

  // Prints the tree using inOrder traversal
  // <left><root><right>
  inOrder(node = this.rootNode) {
    // Base case
    if (!node) return;

    // Left
    this.inOrder(node.left);

    // Root
    console.log(`Node value: ${node.data}`);

    // Right
    this.inOrder(node.right);
  }

  // Finds the height of the given node
  height(node = this.rootNode) {
    // Base case
    if (!node) return -1;

    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);

    return Math.max(leftHeight, rightHeight) + 1;
  }

  // Finds the depth of the given node
  depth(node) {
    // Base case
    if (node == this.rootNode) return 0;

    let counter = 0;
    let curNode = this.rootNode;
    let found = false;
    while (!found) {
      while (node.data < curNode.data) {
        if (curNode.left) curNode = curNode.left;
        else found = true;
        counter++;
      }
      while (node.data > curNode.data) {
        if (curNode.right) curNode = curNode.right;
        else found = true;
        counter++;
      }

      if (curNode.data === node.data) {
        return counter;
      }
    }

    return -1;
  }

  // checks if the tree is balanced
  isBalanced() {
    let balanced = true;
    this.levelOrder((node) => {
      if (Math.abs(this.height(node.right) - this.height(node.left)) > 1)
        balanced = false;
    });

    return balanced;
  }

  // rebalances the tree
  rebalance() {
    let treeValues = [];
    this.levelOrder((node) => {
      treeValues.push(node.data);
    });

    // Ensure data is unique
    treeValues = [...new Set(treeValues)];

    // Ensure data is sorted
    treeValues = Tree.mergeSort(treeValues);

    this.rootNode = this.buildTree(treeValues);
  }
}

// Funtion that prints the tree real nice (not mine)
const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

export default Tree;
