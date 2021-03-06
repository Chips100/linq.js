/**
 * @file Adds the groupJoin method to the Enumerable prototype.
 * @author Chips100
 */

/** Correlates the elements of two sequences based on matching keys and groups the elemenets from the inner sequence. An EqualityComparer can be specified to be used to compare keys.
 * @this Enumerable
 * @param {Enumerable} inner - The sequence to join to the first sequence.
 * @param {Function} outerKeySelector - A function to extract the join key from each element of the first sequence.
 * @param {Function} innerKeySelector - A function to extract the join key from each element of the second sequence.
 * @param {Function} resultSelector - A function to create a result element from the outer element and its matching inner elements.
 * @param {Function|EqualityComparer} keyEqualityComparer - A function or an EqualityComparer to compare keys for equality.
 * @returns {Enumerable} A sequence that has elements that are obtained by performing an inner join on two sequences.
 */
Enumerable.prototype.groupJoin = function (inner, outerKeySelector, innerKeySelector, resultSelector, keyEqualityComparer) {
	return new GroupJoinEnumerable(this, inner, outerKeySelector, innerKeySelector, resultSelector, keyEqualityComparer);
};

/**
 * Represents an Enumerable created by a groupJoin operation.
 * @class
 * @augments Enumerable
 * @param {Enumerable} outer - The first sequence to join.
 * @param {Enumerable} inner - The sequence to join to the first sequence.
 * @param {Function} outerKeySelector - A function to extract the join key from each element of the first sequence.
 * @param {Function} innerKeySelector - A function to extract the join key from each element of the second sequence.
 * @param {Function} resultSelector - A function to create a result element from the outer element and its matching inner elements.
 * @param {Function|EqualityComparer} keyEqualityComparer - A function or an EqualityComparer to compare keys for equality.
 */
function GroupJoinEnumerable(outer, inner, outerKeySelector, innerKeySelector, resultSelector, keyEqualityComparer) {
	LinqAssert.requiredEnumerable(outer, 'outer');
	LinqAssert.requiredEnumerable(inner, 'inner');
	LinqAssert.requiredFunction(outerKeySelector, 'outerKeySelector');
	LinqAssert.requiredFunction(innerKeySelector, 'innerKeySelector');
	LinqAssert.requiredFunction(resultSelector, 'resultSelector');

    this._outer = outer;
    this._inner = inner;
    this._outerKeySelector = outerKeySelector;
    this._innerKeySelector = innerKeySelector;
    this._resultSelector = resultSelector;
    this._keyEqualityComparer = LinqUtils.createEqualityComparer(keyEqualityComparer);
}

// Put the Enumerable prototype into the prototype chain.
GroupJoinEnumerable.prototype = Object.create(Enumerable.prototype);

/** Returns an Enumerator that iterates through the current collection.
 * @this GroupJoinEnumerable
 * @override
 * @returns {Enumerator} An Enumerator that can be used to iterate through the current collection.
 */
GroupJoinEnumerable.prototype.getEnumerator = function () {
	return new GroupJoinEnumerator(this._outer, this._inner, this._outerKeySelector, this._innerKeySelector, this._resultSelector, this._keyEqualityComparer);
};