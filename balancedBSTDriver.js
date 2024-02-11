import Tree from "./balancedBST.js";

/* This is a script to test the implementation of "Tree" a balanced BST class
 *   The script does the following:
 *   1) Creates a tree from an array of random numbers < 100
 *   2) Prints a pretty structure of the tree
 *   3) Confirms the tree is balanced using a function in the Tree class
 *   4) Prints the elements in level, pre, post, and in order
 *   5) Unbalances the tree by adding several elements > 100
 *   6) Confirms the tree is now unbalanced
 *   7) Rebalances the tree Note: rebalancing the tree will remove any duplicate entries
 *   8) Confirms the tree is now balanced again
 *   9) Prints the elements in level, pre, post, and in order again
 *   10) Prints a pretty picture of the tree again
 */

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

// Helper function that generates an array of random numbers < 100
function generateSmallArray() {
  let returnArray = [];
  while (returnArray.length < 50) {
    returnArray.push(Math.floor(100 * Math.random()));
  }

  return returnArray;
}

// Helper function that generates an array of random numbers [100, 200)
function generateBigArray() {
  let returnArray = [];
  while (returnArray.length < 25) {
    returnArray.push(Math.floor(100 * Math.random()) + 100);
  }

  return returnArray;
}

// Helper function that makes the function calls to print tree in level, pre, post, and in order
function printOrders(tree) {
  console.log(
    "Printing the tree in a bunch of orders, here is a prettyPrint to verify:"
  );
  prettyPrint(tree.rootNode);

  console.log("Printing in level, pre, post, and in order...");
  console.log("Level Order: ");
  tree.levelOrder((node) => {
    console.log(`Node value: ${node.data}`);
  });

  console.log("Pre Order: ");
  tree.preOrder();

  console.log("Post Order: ");
  tree.postOrder();

  console.log("In Order");
  tree.inOrder();
}
console.log("Building new balanced tree...");
const bst = new Tree(generateSmallArray());
console.log(`Balanced? ${bst.isBalanced()}`);
printOrders(bst);
console.log("Unbalancing the tree...");
const newValues = generateBigArray();
newValues.forEach((value) => bst.insert(value));
console.log("Your tree is now unbalanced. Suck it!");
console.log(`Balanced? ${bst.isBalanced()}`);
console.log("Rebalancing the tree...");
bst.rebalance();
console.log(`Balanced? ${bst.isBalanced()}`);
console.log("Now I'm going to print everything again to prove it...");
printOrders(bst);
