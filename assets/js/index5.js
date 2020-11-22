'use strict';



// function sum(a, b) {
// 	return a + b;
// }

//сложность O(n)

// function (arr) {
// 	return arr.reduce((a, b) => a + b);
// }

// сложность O(n)

// function (arr) {

// 	const sum = arr[0] + arr[1]; // сложность O(1)

// 	return arr.reduce((a, b) => a + b);
// }

// сложность O(n)

// function sum(arr) {
// 	for (let i = 0; i < arr.length; i++) {
// 		console.log(arr[i]);
// 	}
// }

// O(2n) -> O(n)

// function log(arr) {
// 	for (let i = 0; i < arr.length; i++) {
// 		console.log(arr[i]);
// 	}

// 	for (let i = arr.length; i > 0; i--) {
// 		console.log(arr[i]);
// 	}
// }

// //O(n*n) -> O(n*2)

// function test(arr) {
// 	for (let i = 0; i < arr.length; i++) {
// 		for (let j = 0; j < arr.length; j++) {
// 			console.log(arr[i] * j);
// 		}
// 	}
// }

class MyArray {
	constructor(...args) {
		this.length = 0;

		for (const item of args) {
			this[this.length++] = item;
		}
	}

	push(...args) {
		for (const item of args) {
			this[this.length++] = item;
		}
		return this.length;
	}

	pop() {
		const lastElement = this[this.length - 1];
		delete this[this.length - 1];
		--this.length;
		return lastElement;
	}

	concat(arr) {
		let result = new MyArray();
		for (let i = 0; i < this.length; i++) {
			result.push(this[i]);
		}
		for (let i = 0; i < arr.length; i++) {
			result.push(arr[i]);
		}
		return result;
	}

	flat(depth = 1) {
		if (depth < 0) {
			throw new RangeError("depth must be a positive value");
		}

		if (depth === 0) {
			return this;
		}

		let newArr = new MyArray();

		/* for (const item of this) {
			 if (Array.isArray(item)) {
				let buffer = new MyArray(...item);
 	
				newArr = newArr.concat(buffer.flat(depth - 1));
			 } else {
				newArr.push(item)
			 }
		  } */

		for (let i = 0; i < this.length; i++) {
			if (Array.isArray(this[i])) {
				let buffer = new MyArray(...this[i]);

				newArr = newArr.concat(buffer.flat(depth - 1));
			} else {
				newArr.push(this[i]);
			}
		}
		return newArr;
	}

	shift() {
		if (this.length === 0) {
			return;
		}
		const deletedElement = this[0];
		for (let i = 0; i < this.length; i++) {
			this[i] = this[i + 1];
		}
		delete this[this.length - 1];
		this.length--;
		return deletedElement;
	}

	unshift(...items) {
		const newLength = this.length + items.length;

		for (let i = newLength; i > items.length; i--) {
			this[i - 1] = this[i - items.length - 1];
		}

		for (let i = 0; i < items.length; i++) {
			this[i] = items[i];
			this.length++;
		}
		return this.length;
	}

	[Symbol.iterator]() {
		new MyArrayIterator(this);
		// 	return {
		// 		iterable: this,
		// 		iteration: 0,
		// 		next() {

		// 			const currentIndex = this.iteration;
		// 			this.iteration = this.iteration + 1;

		// 			if (this.iteration > this.iterable.length) {
		// 				return { done: true };
		// 			}

		// 			return {
		// 				value: this.iterable[currentIndex],
		// 				done: false
		// 			}
		// 		}
		// 	}
	}
}

class MyArrayIterator {
	/**
	 * 
	 * @param {MyArray} myArray 
	 */
	constructor(myArray) {
		this.iterable = myArray;
		this.iteration = 0;
	}

	next() {
		return {
			value: this.iterable[this.iteration++],
			done: this.iteration > this.iterable.lengt
		};
	}
}

const myArr = new MyArray(1, 2, 3, 4, 5);

class ListNode {
	constructor(value) {
		this.value = value;
		this.next = null;
	}
}

class LinkedList {
	constructor() {
		this.head = null;
		this.length = 0;
	}
	addNode(value) {
		const node = new ListNode(value);

		if (this.length === 0) {
			this.head = node;
		} else {
			let current = this.head;
			while (current.next) {
				current = current.next;
			}
			current.next = node;
		}
		this.length++;
	}

	getNodeByIndex(index) {
		if (this.length === 0 || index < 0 || index > this.length) {
			throw new RangeError("Not in list");
		}

		let current = this.head;
		let count = 0;

		while (count < index) {
			current = current.next;
			count++;
		}
		return current;
	}
	[Symbol.iterator]() {
		return new LinkedListIterator(this);
	}
}

class LinkedListIterator {
	/**
	 *
	 * @param {LinkedList} list
	 */
	constructor(list) {
		this.iterable = list.head;
	}

	next() {
		if (this.iterable) {
			const value = this.iterable.value;
			this.iterable = this.iterable.next; // i++

			return {
				value,
				done: false,
			};
		}
		return { done: true };
	}
}

const list = new LinkedList();

list.addNode("test1");
list.addNode("tes2");
list.addNode("test3");

class Stack {
	constructor(maxSize = 1000) {
		if (typeof maxSize !== 'number') {
			throw new TypeError('size must a number')
		}
		if (maxSize < 1) {
			throw new RangeError('must be a positive number')
		}
		this._maxSize = maxSize;
		this._size = 0;
	}
	get maxSize() {
		return this._maxSize;
	}
	get isEmpty() {
		return this.size === 0;
	}
	get size() {
		return this._size;
	}

	push(value) {
		if (this._size >= this.maxSize) {
			throw new RangeError("Stack overflow");
		}
		this[this._size++] = value;
		return this._size;
	}
	pop() {
		if (this.isEmpty) {
			return;
		}
		const deletedElement = this[--this._size];
		delete this[this._size];
		return deletedElement;
	}

	peek() {
		if (this.isEmpty) {
			return;
		}
		return this[this.size - 1];
	}
}

const stack = new Stack();

stack.push('test1');
stack.push('test2');
stack.push('test3');
stack.push('test4');

//console.log(reverse("example"));
function reverse(string) {
	const stack = new Stack(string.length);

	for (const letter of string) {
		stack.push(letter);
	}

	const result = [];

	while (!stack.isEmpty) {
		result.push(stack.pop());
	}

	return result.join("");
}
// 'test' -> 'tset'
// 'example' -> 'elpmaxe'
//console.log(checkBraces('()()()(())'))

function checkBraces(string) {
	const stack = new Stack();

	/*  if (string.length % 2 !== 0) {
	  return false;
	} */
	for (const brace of string) {
		if (brace === "(") {
			stack.push(brace);
			continue;
		}

		if (brace === ")") {
			if (stack.isEmpty) {
				return false;
			}
			stack.pop();
		}
	}
	return stack.isEmpty;
}
