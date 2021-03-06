/**
 * @file Adds the elementAt method to the Enumerable prototype.
 * @author Chips100
 */

/** Returns the element at a specified index in a sequence.
 * @this Enumerable 
 * @param {Number} index - The zero-based index of the element to retrieve.
 * @returns {*} The element at the specified position in the source sequence.
 */
Enumerable.prototype.elementAt = function (index) {
  LinqAssert.requiredPositiveNumber(index, 'index');

  var enumerator = this.getEnumerator(),
    iterator = 0;

  while (iterator <= index) {
    if (!enumerator.moveNext()) {
      LinqAssert.throwArgumentOutOfRangeError('index');
    }

    iterator++;
  }

  return enumerator.getCurrent();
};