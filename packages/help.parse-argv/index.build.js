'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseArgv = exports.defaultModifiers = exports.mergeProperties = exports.untouched = exports.applyGeneral = exports.applySpecifier = exports.coerceToString = exports.Undefined = exports.touchObj = exports.modifiers = exports._modifiers = exports.assignRest = exports.assignNo = exports.assignSpread = exports.assignUntil = exports.assignNext = exports.assignEqual = exports.assignBoolean = exports.isChild = exports.isDoubleDashNoFlag = exports.isDoubleDashFlag = exports.isMultiDashFlag = exports.isOnlyDashFlag = exports.isDashFlag = exports.isAnyDash = exports.matchCheck = exports.doubleDashNoKeyPrefix = exports.childKey = exports.child = exports.anyDash = exports.onlyDash = exports.doubleDashNo = exports.doubleDash = exports.multiDash = exports.dash = undefined;
exports.groupByIncProp = groupByIncProp;

var _lodash = require('lodash');

var _help = require('@reggi/help.filter-until');

var _help2 = _interopRequireDefault(_help);

var _help3 = require('@reggi/help.set-entire');

var _help4 = _interopRequireDefault(_help3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var dash = exports.dash = /^-(\w+)/;
var multiDash = exports.multiDash = /^-(\w\w+)/;
var doubleDash = exports.doubleDash = /^--([\w|-]+)/;
var doubleDashNo = exports.doubleDashNo = /^--no-(\w+)/;
var onlyDash = exports.onlyDash = /^-(\w)$|^-(\w)(?==)/;
var anyDash = exports.anyDash = /^-+([\w|-]+)$|^-+([\w|-]+)=.+$/;
var child = exports.child = /^(--)$/;
var childKey = exports.childKey = '--';
var doubleDashNoKeyPrefix = exports.doubleDashNoKeyPrefix = '--';

var matchCheck = exports.matchCheck = function matchCheck(patternString, statement) {
  var match = statement.match(patternString);
  var hasGroupOne = match && match[1] && match[1] !== '' ? match[1] : false;
  var hasGroupTwo = match && match[2] && match[2] !== '' ? match[2] : false;
  var group = hasGroupOne || hasGroupTwo;
  if (!group) return false;
  match.group = group;
  return match;
};

var isAnyDash = exports.isAnyDash = function isAnyDash(statement) {
  return matchCheck(anyDash, statement);
};
var isDashFlag = exports.isDashFlag = function isDashFlag(statement) {
  return matchCheck(dash, statement);
};
var isOnlyDashFlag = exports.isOnlyDashFlag = function isOnlyDashFlag(statement) {
  return matchCheck(onlyDash, statement);
};
var isMultiDashFlag = exports.isMultiDashFlag = function isMultiDashFlag(statement) {
  return matchCheck(multiDash, statement);
};
var isDoubleDashFlag = exports.isDoubleDashFlag = function isDoubleDashFlag(statement) {
  return matchCheck(doubleDash, statement);
};
var isDoubleDashNoFlag = exports.isDoubleDashNoFlag = function isDoubleDashNoFlag(statement) {
  return matchCheck(doubleDashNo, statement);
};
var isChild = exports.isChild = function isChild(statement) {
  return matchCheck(child, statement);
};

var assignBoolean = exports.assignBoolean = function assignBoolean(criteria) {
  return function (argvTouch) {
    return function (item, key) {
      if (argvTouch[key].touched) return false;
      var validCase = criteria(item);
      if (!validCase) return false;
      argvTouch[key].touched = true;
      return { [validCase[0]]: true };
    };
  };
};

var assignEqual = exports.assignEqual = function assignEqual(criteria) {
  return function (argvTouch) {
    return function (item, key) {
      if (argvTouch[key].touched) return false;
      var validCase = criteria(item);
      if (!validCase) return false;
      var split = item.split('=');
      if (split.length === 1) return false;
      argvTouch[key].touched = true;
      return { [split[0]]: split[1] };
    };
  };
};

var assignNext = exports.assignNext = function assignNext(criteria) {
  return function (argvTouch) {
    return function (item, key) {
      if (argvTouch[key].touched) return false;
      var validCase = criteria(item);
      if (!validCase) return false;
      if (!argvTouch[key + 1]) return false;
      var next = argvTouch[key + 1];
      if (isAnyDash(next.value)) return false;
      argvTouch[key].touched = true;
      argvTouch[key + 1].touched = true;
      return { [validCase[0]]: next.value };
    };
  };
};

var assignUntil = exports.assignUntil = function assignUntil(criteria) {
  return function (argvTouch) {
    return function (item, key) {
      if (argvTouch[key].touched) return false;
      var validCase = criteria(item);
      if (!validCase) return false;
      if (argvTouch.length === key + 1) return false;
      var values = (0, _lodash.slice)(argvTouch, key + 1);
      var validValues = (0, _help2.default)(values, function (item) {
        return isAnyDash(item.value);
      });
      if (!validValues.length) return false;
      var value = validValues.map(function (i) {
        return i.value;
      }).join(' ');
      argvTouch[key].touched = true;
      (0, _lodash.each)(validValues, function (i) {
        argvTouch[i.key].touched = true;
      });
      return { [validCase[0]]: value };
    };
  };
};

var assignSpread = exports.assignSpread = function assignSpread(criteria) {
  return function (argvTouch) {
    return function (item, key) {
      if (argvTouch[key].touched) return false;
      var validCase = criteria(item);
      if (!validCase) return false;
      argvTouch[key].touched = true;
      return validCase[1].split('').map(function (flag) {
        return { [`-${flag}`]: true };
      });
    };
  };
};

var assignNo = exports.assignNo = function assignNo(criteria, criteriaKeyPrefix) {
  return function (argvTouch) {
    return function (item, key) {
      if (argvTouch[key].touched) return false;
      var validCase = criteria(item);
      if (!validCase) return false;
      argvTouch[key].touched = true;
      return { [`${criteriaKeyPrefix}${validCase[1]}`]: false };
    };
  };
};

var assignRest = exports.assignRest = function assignRest(criteria, criteriaKey) {
  return function (argvTouch) {
    return function (item, key) {
      if (argvTouch[key].touched) return false;
      var validCase = criteria(item);
      if (!validCase) return false;
      var validValues = (0, _lodash.slice)(argvTouch, key + 1);
      if (!validValues.length) return false;
      var value = validValues.map(function (i) {
        return i.value;
      }).join(' ');
      argvTouch[key].touched = true;
      (0, _lodash.each)(validValues, function (i) {
        argvTouch[i.key].touched = true;
      });
      return { [criteriaKey]: value };
    };
  };
};

var _modifiers = exports._modifiers = {
  'anyDash.bool': assignBoolean(isAnyDash),
  'anyDash.equal': assignEqual(isAnyDash),
  'anyDash.next': assignNext(isAnyDash),
  'anyDash.until': assignUntil(isAnyDash),
  'onlyDash.bool': assignBoolean(isOnlyDashFlag),
  'onlyDash.equal': assignEqual(isOnlyDashFlag),
  'onlyDash.next': assignNext(isOnlyDashFlag),
  'onlyDash.until': assignUntil(isOnlyDashFlag),
  'multiDash.bool': assignBoolean(isMultiDashFlag),
  'multiDash.equal': assignEqual(isMultiDashFlag),
  'multiDash.next': assignNext(isMultiDashFlag),
  'multiDash.until': assignUntil(isMultiDashFlag),
  'multiDash.spread': assignSpread(isMultiDashFlag),
  'dash.bool': assignBoolean(isDashFlag),
  'dash.equal': assignEqual(isDashFlag),
  'dash.next': assignNext(isDashFlag),
  'dash.until': assignUntil(isDashFlag),
  'doubleDash.bool': assignBoolean(isDoubleDashFlag),
  'doubleDash.equal': assignEqual(isDoubleDashFlag),
  'doubleDash.next': assignNext(isDoubleDashFlag),
  'doubleDash.until': assignUntil(isDoubleDashFlag),
  'doubleDash.no': assignNo(isDoubleDashNoFlag, doubleDashNoKeyPrefix),
  'child.rest': assignRest(isChild, childKey)
};

var modifiers = exports.modifiers = (0, _help4.default)(_modifiers);
var touchObj = exports.touchObj = function touchObj(arr) {
  return (0, _lodash.merge)(arr.map(function (value, key) {
    return { value, key };
  }), (0, _lodash.range)(arr.length).map(function () {
    return { touched: false };
  }));
};

var Undefined = exports.Undefined = function Undefined() {
  _classCallCheck(this, Undefined);
};

var coerceToString = exports.coerceToString = function coerceToString(val) {
  return (0, _lodash.isArray)(val) && val.length === 1 ? val[0] : val;
};

var applySpecifier = exports.applySpecifier = function applySpecifier(specifiers, argv, argvTouch) {
  return (0, _lodash.chain)(specifiers).map(function (fn, pattern) {
    return (0, _lodash.chain)(argv).map(function (item, key) {
      if (item.match(new RegExp(pattern))) {
        return fn(argvTouch)(item, key);
      }
      return false;
    }).without(false).value();
  }).value();
};

var applyGeneral = exports.applyGeneral = function applyGeneral(fns, argv, argvTouch) {
  return (0, _lodash.chain)(fns).flattenDeep().reduce(function (acq, fn) {
    var result = (0, _lodash.chain)(argvTouch).mapValues(function (obj, key) {
      var _obj = (0, _lodash.cloneDeep)(obj);
      _obj.result = fn(argvTouch)(_obj.value, key);
      return _obj;
    }).filter(function (obj) {
      return obj.result !== false;
    }).value();
    return [acq, result];
  }, []).flattenDeep().sortBy('key').map(function (obj) {
    return obj.result;
  }).value();
};

function groupByIncProp(collection) {
  var prop = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'key';

  var results = [];
  var bundle = [];
  (0, _lodash.each)(collection, function (obj, key) {
    if (!bundle.length || obj[prop] - 1 !== (0, _lodash.last)(bundle)[prop]) {
      bundle = [];
      bundle.push(obj);
    }
    if (obj[prop] - 1 === (0, _lodash.last)(bundle)[prop]) {
      bundle.push(obj);
    }
    if (!collection[key + 1] || obj[prop] + 1 !== collection[key + 1][prop]) {
      results.push(bundle);
    }
  });
  return results;
}

var untouched = exports.untouched = function untouched(argvTouch) {
  return (0, _lodash.chain)(argvTouch).filter(function (obj) {
    return !obj.touched;
  }).thru(groupByIncProp).map(function (group) {
    return (0, _lodash.map)(group, function (i) {
      return i.value;
    });
  }).value();
};

var mergeProperties = exports.mergeProperties = function mergeProperties(arrOfObjects) {
  var allKeys = (0, _lodash.uniq)((0, _lodash.flatten)((0, _lodash.map)(arrOfObjects, _lodash.keys)));
  var mergedObj = (0, _lodash.zipObject)(allKeys);
  return (0, _lodash.mapValues)(mergedObj, function (value, key) {
    var values = (0, _lodash.map)(arrOfObjects, function (obj) {
      return (0, _lodash.get)(obj, key, new Undefined());
    });
    var valuesWithoutUndefined = (0, _lodash.filter)(values, function (value) {
      return !(value instanceof Undefined);
    });
    return coerceToString((0, _lodash.uniq)((0, _lodash.flatten)(valuesWithoutUndefined)));
  });
};

var defaultModifiers = exports.defaultModifiers = [modifiers.child.rest, modifiers.doubleDash.no, modifiers.doubleDash.equal, modifiers.doubleDash.next, modifiers.doubleDash.bool, modifiers.onlyDash.bool, modifiers.multiDash.spread];

var parseArgv = exports.parseArgv = function parseArgv(argv) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$modifiers = _ref.modifiers,
      modifiers = _ref$modifiers === undefined ? defaultModifiers : _ref$modifiers,
      _ref$specifiers = _ref.specifiers,
      specifiers = _ref$specifiers === undefined ? false : _ref$specifiers;

  var argvTouch = touchObj(argv);
  var specifiersRes = specifiers ? applySpecifier(specifiers, argv, argvTouch) : [];
  var generalRes = modifiers ? applyGeneral(modifiers, argv, argvTouch) : [];
  return (0, _lodash.chain)([specifiersRes, generalRes, { _: untouched(argvTouch) }]).flattenDeep().thru(mergeProperties).value();
};

exports.default = parseArgv;
