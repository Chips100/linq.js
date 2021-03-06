/**
 * @file Adds the concat method to the Enumerable prototype.
 * @author Chips100
 */

/** Concatenates the specified sequence to this sequence.
 * @this Enumerable
 * @param {Enumerable} second - The sequence to concatenate to this sequence.
 * @returns {Enumerable} An Enumerable that contains the concatenated elements of the two input sequences.
 */
Enumerable.prototype.concat = function (second) {
	return new ConcatEnumerable(this, second);
};

/** Represents an Enumerable created by a concat operation.
 * @class
 * @augments Enumerable
 * @param {Enumerable} first - The first sequence to concatenate.
 * @param {Enumerable} second - The sequence to concatenate to the first sequence.
 */
function ConcatEnumerable(first, second) {
	LinqAssert.requiredEnumerable(first, 'first');
	LinqAssert.requiredEnumerable(second, 'second');

	this._first = first;
	this._second = second;
}

// Put the Enumerable prototype into the prototype chain.
ConcatEnumerable.prototype = Object.create(Enumerable.prototype);

/** Returns an Enumerator that iterates through the current collection.
 * @this ConcatEnumerable
 * @override
 * @returns {Enumerator} An Enumerator that can be used to iterate through the current collection.
 */
ConcatEnumerable.prototype.getEnumerator = function () {
	return new ConcatEnumerator(this._first, this._second);
};