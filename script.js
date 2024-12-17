class LinkedList {
  // It is important to know the head and tail node of the linked list so
  // it cannot have problems when traversed or created.
  constructor() {
    this.head = null;
    this.tail = null;
    // size property of the linked list to know how big it is
    this.size = 0;
  }

  // Adding a new node at the end of the linked list.
  append(input) {
    // Creates a new node with its corresponding value inputs.
    const newNode = new Node(input);
    // If there is no head that means the linked list is empty.
    // So when adding a new node in an empty linked list it is
    // both the head and tail node at the same time.
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      // When adding a node at the end of the linked list we do
      // not touch the head node because were focusing in the tail
      // part of the linked list. Update the current tail node nextNode
      // address to the newNode and the newNode is now currently labeled
      // as the tail node.
      this.tail.nextNode = newNode;
      this.tail = newNode;
    }
    // Increase the linked list size because we add 1 more node to it
    this.size++;
  }

  // Adding a new node at the start of the linked list
  prepend(input) {
    const newNode = new Node(input);
    // If linked list is empty the head and the tail is the newNode
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      // When adding the new node at start of the linked list we do not
      // touch the tail node. The current head node now will be replaced by
      // the new node and its next node address will be the past head node
      newNode.nextNode = this.head;
      this.head = newNode;
    }
    this.size++;
  }

  // Insert a new node anywhere(fist, middle, last) in linked list
  insertAt(value, index) {
    // Check if index is a valid index number
    // Index must not negative and not similar to the length of
    // linked list
    if (index < 0 ?? index > this.size) {
      console.log("Invalid Index");
      return;
    }

    // Creates the new node
    const newNode = new Node(value);

    // If index is 0, node will be inserted by the head
    // Similar to prepend method
    if (index === 0) {
      newNode.nextNode = this.head;
      this.head = newNode;
    } else {
      // To add new node in between two nodes, it needs to update the
      // previous node on the place where it will be added based on the
      // index. We traverse through the linked list to get the node information
      // and find the previous and current node where the new node will be placed
      let current = this.head;
      let previous = null;
      // Count tells when its time to stop traversing through the linked list
      let count = 0;

      // When count is still less than index it continues traversing to search for
      // the final previous and current node
      while (count < index) {
        // The current node will now be stored as the previous node
        previous = current;
        // The current node will now move on the nextNode address of the previous node
        current = current.nextNode;
        // Increase count to stop traversing when conditions are met
        count++;
      }

      // When previous node and current node are found it is ready to insert new node in
      // between two nodes. The newNode nextNode address will be the current node because the
      // newNode will take the current nodes place and the previous Node nextNode address will
      // be changed to the new node added
      newNode.nextNode = current;
      previous.nextNode = newNode;
    }

    // Increase size as new node to be added
    this.size++;
  }

  // Remove a node from anywhere in the linked list
  removeAt(index) {
    // Check if index is valid
    if (index < 0 && index > this.size) {
      console.log("Index not valid");
      return;
    }

    // Traverse through the linked list and
    // get the current and previous node
    let current = this.head;
    let previous = null;
    let count = 0;

    // While the count is less than the index it continues traversing
    // If the count is the same as the index it stops because it pertains
    // that you are already in the index you want to make change with
    while (count < index) {
      previous = current;
      current = current.nextNode;
      count++;
    }

    // The previous nextNode address is the current nextNode address
    // It is like skipping a node if you delete a node from
    // anywhere in the linked list
    previous.nextNode = current.nextNode;
    this.size--;
  }

  // When returning a node in a linked list we must traverse to it starting
  // from the head node because returning a node from a linked list cannot
  // be accessed directly. To return a node from a linked list with an index
  // as a parameter/argument we make the linked list first into an array because
  // each node doesn't have a label where it is.
  at(index) {
    // Start traversing from the first node or head node in the linked list
    let current = this.head;
    // Make an array to store node so it can be accessible using an index number
    const values = [];

    // While the current node is not null it pushes the current node to the
    // array for it to be accessed by index.
    while (current) {
      values.push(current);
      current = current.nextNode;
    }

    // return the node that it is looking for
    return values[index];
  }

  // Removing the last node or tail node in the linked list
  pop() {
    // If there is no head node the linked list is empty and
    // there is nothing to pop
    if (!this.head) return null;

    // If there is a single node in the linked list, we reset
    // the linked list
    if (this.size === 1) {
      const poppedValue = this.head.value;
      this.head = null;
      this.tail = null;
      this.size--;
      return null;
    }

    // We must get the second to the last node to update it when
    // the tail node is popped. The new tail node will be the past second
    // to the last node in the linked List. Therefore, we traverse up to
    // the second to the last node
    let current = this.head;
    let previous = null;
    // To traverse to the second to the last node we must check if our
    // current node has a nextNode address and must not be null or else
    // it is a sign we are at the tail node not at the second to the last
    // node. So it must have a nextNode address and is not also equal to
    // the tail node.
    // NOTE: Every tail node must have its label(tail) in a linked list so
    // it can not have problems when traversed.
    while (current.nextNode) {
      previous = current;
      current = current.nextNode;
    }
    previous.nextNode = null;
    this.size--;
  }

  // Checks if the linked list contains that node
  contains(value) {
    // We traverse on each node from the linked list starting from
    // the head node
    let current = this.head;

    // While the node is not null continue traversing until the end
    // of the linked list or until it receives a null value
    while (current) {
      // If the node's value is similar to the parameter value it
      // returns true
      if (current.value === value) return true;
      // If no match proceed to the current node
      current = current.nextNode;
    }

    // If no match found it returns false
    return false;
  }

  // Finds the node in the linked list and returns it
  find(value) {
    // Start traversing from the head node
    let current = this.head;

    // While current node is not null traverse until found or
    // end of linked list
    while (current) {
      // If current node value matches value return current node
      if (current.value === value) return current;
      // If it does not match proceed to next node
      current = current.nextNode;
    }

    // Node cannot be found in linked list
    return "Node not found";
  }

  // Print the nodes
  // Printing the object key/properties which represent a node
  // in a linked list format for visualization
  toString() {
    // Current value will be the first node or head node
    let current = this.head;
    // Store the nodes in an array
    const values = [];

    // While the current node is not null it pushes the node to
    // the array for storage.
    while (current) {
      // Pushes node into the array
      values.push(`(${current.value})`);
      // Change the current node based on the current node's
      // next node address
      current = current.nextNode;
      // Additional: Added a null at the end of the printed linked
      // list to say that it has reached is end and the tail node is
      // known
      if (current === null) {
        values.push("null");
      }
    }

    // Join all pushed nodes in the array and print it into a
    // string
    return values.join(" -> ");
  }
}

// Node class:
// It has 2 properties which is the value and the nextNode address
class Node {
  constructor(val) {
    this.value = val;
    this.nextNode = null;
  }
}

// TEST
const a = new LinkedList();
a.prepend("Monkey");
a.prepend("Dog");
a.prepend("Cat");
a.prepend("Bird");
a.append("Penguin");
console.log(a.toString());
a.pop();
console.log(a.toString());
