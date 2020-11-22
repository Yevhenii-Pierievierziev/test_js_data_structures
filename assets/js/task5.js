
// Написать функцию, которая проверяет строку на правильность скобочной последовательности. Скобки могут быть любые.
// В реализации использовать структуру данных Stack.

function checkBraces(str) {
	const stack = [];
	for (let s of str) {
		if (s == '(' || s == '[' || s == '{') {
			stack.push(s);
			continue;
		}
		if (stack.length === 0) {
			return false
		}
		switch (s) {
			case ')':
				stack.pop();
				if (s == '{' || s == '[') {
					return false
				}
				break;
			case '}':
				stack.pop();
				if (s == '(' || s == '[') {
					return false
				}
				break;
			case ']':
				stack.pop();
				if (s == '{' || s == '(') {
					return false
				}
				break;
		}
	}
	return stack.length ? false : true
}
console.log('Braces check:')
console.log('{((([{[()]}])))}' + ' ' + checkBraces('{((([{[()]}])))}'));
console.log('{}' + ' ' + checkBraces('{}'));
console.log('{(([)}' + ' ' + checkBraces('{(([)}'));
console.log('(()))}' + ' ' + checkBraces('(()))}'));
console.log('{([[]])}' + ' ' + checkBraces('{([[]])}'));

// 2)Сформировать список(структура данных LinkedList) целых чисел, вводимых пользователем,
// в том порядке, в котором вводятся эти числа, но без повторений элементов подряд(!).
// Допустим, пользователь ввёл строку "5455". Тогда:
// 5 4 5 - правильный список
// 5 4 5 5 - не правильный

class Node {
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

	addToTheEnd(value) {
		let node = new Node(value);

		if (this.length === 0) {
			this.head = node;
		} else {
			let current = this.head;
			while (current.next) {
				current = current.next;
			}
			current.next = new Node(value);
		}
		this.length++;
	}

	addValuesWithoutRepeat(arr) {
		for (let index = 0; index < arr.length; index++) {
			if (index > 0) {
				if (arr[index - 1] === arr[index]) {
					continue;
				}
				this.addToTheEnd(arr[index]);
				continue;
			}
			this.addToTheEnd(arr[index]);
		}
		this.print();
	}
	print() {
		let current = this.head;
		while (current) {
			console.log(current.value);
			current = current.next;
		}
	}
}

var list = new LinkedList();

list.addValuesWithoutRepeat([1, 2, 3, 3, 4, 5, 5, 6, 7, 8, 8, 8, 9, 10, 10, 10, 10]);
