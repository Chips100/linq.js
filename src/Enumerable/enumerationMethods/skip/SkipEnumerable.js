/**
 * @file Adds the skip method to the Enumerable prototype.
 * @author Chips100
 */

/** Bypasses a specified number of elements in a sequence and then returns the remaining elements.
 * @this Enumerable
 * @param {Number} count - The number of elements to skip before returning the remaining elements.
 * @returns {Enumerable} An Enumerable that contains the elements that occur after the specified index in the input sequence.
 */
Enumerable.prototype.skip = function(count) {
	return new SkipEnumerable(this, count);
};

/**
 * Represents an Enumerable created by a skip operation.
 * @class
 * @augments Enumerable
 * @param {Enumerable} source - An Enumerable to return elements from.
 * @param {Number} count - The number of elements to skip before returning the remaining elements.
 */
function SkipEnumerable(source, count) {
	LinqAssert.requiredEnumerable(source, 'source');
	LinqAssert.requiredNumber(count, 'count');
	
	this._source = source;
	this._count = count;
}

// Put the Enumerable prototype into the prototype chain.
SkipEnumerable.prototype = Object.create(Enumerable.prototype);

/** Returns an Enumerator that iterates through the current collection.
 * @this SkipEnumerable
 * @override
 * @returns {Enumerator} An Enumerator that can be used to iterate through the current collection.
 */
SkipEnumerable.prototype.getEnumerator = function() {
	return new SkipEnumerator(this._source, this._count);
};