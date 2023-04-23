/* ************************************************************************************************
 *                                                                                                *
 * Please read the following tutorial before implementing tasks:                                   *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object        *
 *                                                                                                *
 ************************************************************************************************ */


/**
 * Returns the rectangle object with width and height parameters and getArea() method
 *
 * @param {number} width
 * @param {number} height
 * @return {Object}
 *
 * @example
 *    const r = new Rectangle(10,20);
 *    console.log(r.width);       // => 10
 *    console.log(r.height);      // => 20
 *    console.log(r.getArea());   // => 200
 */
function Rectangle(width, height) {
  return {
    width,
    height,
    getArea: () => width * height,
  };
}


/**
 * Returns the JSON representation of specified object
 *
 * @param {object} obj
 * @return {string}
 *
 * @example
 *    [1,2,3]   =>  '[1,2,3]'
 *    { width: 10, height : 20 } => '{"height":10,"width":20}'
 */
function getJSON(obj) {
  return JSON.stringify(obj);
}


/**
 * Returns the object of specified type from JSON representation
 *
 * @param {Object} proto
 * @param {string} json
 * @return {object}
 *
 * @example
 *    const r = fromJSON(Circle.prototype, '{"radius":10}');
 *
 */
function fromJSON(proto, json) {
  const obj = JSON.parse(json);
  const instance = Object.create(proto);
  Object.assign(instance, obj);
  return instance;
}


/**
 * Css selectors builder
 *
 * Each complex selector can consists of type, id, class, attribute, pseudo-class
 * and pseudo-element selectors:
 *
 *    element#id.class[attr]:pseudoClass::pseudoElement
 *              \----/\----/\----------/
 *              Can be several occurrences
 *
 * All types of selectors can be combined using the combination ' ','+','~','>' .
 *
 * The task is to design a single class, independent classes or classes hierarchy
 * and implement the functionality to build the css selectors using the provided cssSelectorBuilder.
 * Each selector should have the stringify() method to output the string representation
 * according to css specification.
 *
 * Provided cssSelectorBuilder should be used as facade only to create your own classes,
 * for example the first method of cssSelectorBuilder can be like this:
 *   element: function(value) {
 *       return new MySuperBaseElementSelector(...)...
 *   },
 *
 * The design of class(es) is totally up to you, but try to make it as simple,
 * clear and readable as possible.
 *
 * @example
 *
 *  const builder = cssSelectorBuilder;
 *
 *  builder.id('main').class('container').class('editable').stringify()
 *    => '#main.container.editable'
 *
 *  builder.element('a').attr('href$=".png"').pseudoClass('focus').stringify()
 *    => 'a[href$=".png"]:focus'
 *
 *  builder.combine(
 *      builder.element('div').id('main').class('container').class('draggable'),
 *      '+',
 *      builder.combine(
 *          builder.element('table').id('data'),
 *          '~',
 *           builder.combine(
 *               builder.element('tr').pseudoClass('nth-of-type(even)'),
 *               ' ',
 *               builder.element('td').pseudoClass('nth-of-type(even)')
 *           )
 *      )
 *  ).stringify()
 *    => 'div#main.container.draggable + table#data ~ tr:nth-of-type(even)   td:nth-of-type(even)'
 *
 *  For more examples see unit tests.
 */

class CSSSelectorBuilder {
  constructor() {
    this.elements = [];
    this.ids = [];
    this.classes = [];
    this.attrs = [];
    this.pseudoClasses = [];
    this.pseudoElements = [];
  }

  element(value) {
    const cssSelectorBuilder = new CSSSelectorBuilder();
    cssSelectorBuilder.elements = [...this.elements, value];
    return cssSelectorBuilder;
  }

  id(value) {
    const cssSelectorBuilder = new CSSSelectorBuilder();
    cssSelectorBuilder.ids = [...this.ids, value];
    return cssSelectorBuilder;
  }

  class(value) {
    const cssSelectorBuilder = new CSSSelectorBuilder();
    cssSelectorBuilder.classes = [...this.classes, value];
    return cssSelectorBuilder;
  }

  attr(value) {
    const cssSelectorBuilder = new CSSSelectorBuilder();
    cssSelectorBuilder.attrs = [...this.attrs, value];
    return cssSelectorBuilder;
  }

  pseudoClass(value) {
    const cssSelectorBuilder = new CSSSelectorBuilder();
    cssSelectorBuilder.pseudoClasses = [...this.pseudoClasses, value];
    return cssSelectorBuilder;
  }

  pseudoElement(value) {
    const cssSelectorBuilder = new CSSSelectorBuilder();
    cssSelectorBuilder.pseudoElements = [...this.pseudoElements, value];
    return cssSelectorBuilder;
  }

  // eslint-disable-next-line class-methods-use-this
  combine(selector1, combinator, selector2) {
    const cssSelectorBuilder = new CSSSelectorBuilder();
    cssSelectorBuilder.selectors = [...selector1.selectors, combinator, ...selector2.selectors];
    return cssSelectorBuilder;
  }

  stringify() {
    // eslint-disable-next-line object-curly-newline
    const { elements, ids, classes, attrs, pseudoClasses, pseudoElements } = this;

    let selector = '';

    if (elements.length > 0) {
      selector += elements.join('');
    }

    if (ids.length > 0) {
      selector += `#${ids.join('#')}`;
    }

    if (classes.length > 0) {
      selector += `.${classes.join('.')}`;
    }

    if (attrs.length > 0) {
      selector += attrs.join('');
    }

    if (pseudoClasses.length > 0) {
      selector += `:${pseudoClasses.join(':')}`;
    }

    if (pseudoElements.length > 0) {
      selector += `::${pseudoElements.join('::')}`;
    }

    return selector;
  }
}

const cssSelectorBuilder = {
  element(value) {
    return new CSSSelectorBuilder().element(value);
  },

  id(value) {
    return new CSSSelectorBuilder().id(value);
  },

  class(value) {
    return new CSSSelectorBuilder().class(value);
  },

  attr(value) {
    return new CSSSelectorBuilder().attr(value);
  },

  pseudoClass(value) {
    return new CSSSelectorBuilder().pseudoClass(value);
  },

  pseudoElement(value) {
    return new CSSSelectorBuilder().pseudoElement(value);
  },

  combine(selector1, combinator, selector2) {
    return new CSSSelectorBuilder().combine(selector1, combinator, selector2);
  },
};


module.exports = {
  Rectangle,
  getJSON,
  fromJSON,
  cssSelectorBuilder,
};
