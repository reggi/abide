'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.program = exports.Program = exports.template = exports.pad = exports.rename = exports.choices = exports.parseFlagOption = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _help = require('@reggi/help.parse-argv');

var _journey = require('@reggi/journey');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var parseFlagOption = exports.parseFlagOption = (0, _journey.journey)(function (flagsOption) {
  return [function () {
    return { flagsOption };
  }, function (_ref) {
    var flagsOption = _ref.flagsOption;
    return { flagsString: flagsOption.replace(/<.+>|\[.+\]/g, '') };
  }, function (_ref2) {
    var flagsString = _ref2.flagsString;
    return { flagsString: flagsString.replace(/,|=/g, ' ') };
  }, function (_ref3) {
    var flagsString = _ref3.flagsString;
    return { flagsString: flagsString.replace(/\s+/g, ' ') };
  }, function (_ref4) {
    var flagsString = _ref4.flagsString;
    return { flagsString: flagsString.trim() };
  }, function (_ref5) {
    var flagsOption = _ref5.flagsOption;
    return { required: (0, _lodash.get)(flagsOption.match(/<.+>/g), 0, false) };
  }, function (_ref6) {
    var flagsOption = _ref6.flagsOption;
    return { optional: (0, _lodash.get)(flagsOption.match(/\[.+\]/g), 0, false) };
  }, function (_ref7) {
    var flagsString = _ref7.flagsString;
    return { flags: flagsString.split(' ') };
  }, function (_ref8) {
    var flags = _ref8.flags,
        required = _ref8.required,
        optional = _ref8.optional;
    return { return: { flags, required, optional } };
  }];
}, { return: true });

var choices = exports.choices = function choices() {
  for (var _len = arguments.length, _choices = Array(_len), _key = 0; _key < _len; _key++) {
    _choices[_key] = arguments[_key];
  }

  return function (_ref9) {
    var value = _ref9.value,
        flag = _ref9.flag,
        required = _ref9.required;

    if (!required || !value) return false;
    var valid = (0, _lodash.includes)(_choices, value);
    if (!valid) throw new Error(`${flag}: invalid choice "${value}" please pick [${_choices.join(', ')}]`);
    return false;
  };
};

var rename = exports.rename = function rename(name) {
  var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  return function (_ref10) {
    var value = _ref10.value,
        flag = _ref10.flag;

    var _value = value === false ? defaultValue : value;
    return { [name]: _value };
  };
};

var pad = exports.pad = function pad(str, width) {
  var len = Math.max(0, width - str.length);
  return str + Array(len + 1).join(' ');
};

var template = exports.template = function template(_ref11) {
  var program = _ref11.program,
      description = _ref11.description,
      options = _ref11.options,
      padLength = _ref11.padLength;
  return `
Usage: ${program} [options]

  ${description}

  Options:

${options.map(function (_ref12) {
    var flagString = _ref12.flagString,
        desc = _ref12.desc;
    return `    ${pad(flagString, padLength)}${desc}`;
  }).join('\n')}
`;
};

var Program = function () {
  function Program() {
    _classCallCheck(this, Program);

    this.options = [];
    return this;
  }

  _createClass(Program, [{
    key: 'help',
    value: function help() {
      var program = this.program,
          description = this.description,
          options = this.options;

      var padLength = (0, _lodash.max)(options.map(function (_ref13) {
        var flagString = _ref13.flagString;
        return flagString;
      })).length + 10;
      return template({ program, description, options, padLength });
    }
  }, {
    key: 'name',
    value: function name(program) {
      this.program = program;
      return this;
    }
  }, {
    key: 'description',
    value: function description(_description) {
      this.description = _description;
      return this;
    }
  }, {
    key: 'option',
    value: function option(flagString, desc, modifier) {
      this.options.push({ flagString, desc, modifier });
      return this;
    }
  }, {
    key: 'parse',
    value: function parse(argv) {
      var flagTypes = (0, _lodash.chain)(this.options).map(function (_ref14) {
        var flagString = _ref14.flagString,
            desc = _ref14.desc,
            modifier = _ref14.modifier;

        var _parseFlagOption = parseFlagOption(flagString),
            flags = _parseFlagOption.flags,
            required = _parseFlagOption.required,
            optional = _parseFlagOption.optional;

        if (required || optional) {
          return flags.map(function (flag) {
            return { [flag]: { type: 'next', required, optional, desc, modifier } };
          });
        } else {
          return flags.map(function (flag) {
            return { [flag]: { type: 'bool', required, optional, desc, modifier } };
          });
        }
      }).flattenDeep().thru(function (arr) {
        return _lodash.extend.apply(null, arr);
      }).value();

      var specifiers = (0, _lodash.mapValues)(flagTypes, function (_ref15) {
        var type = _ref15.type;

        if (type === 'next') return _help.modifiers.anyDash.next;
        return _help.modifiers.anyDash.bool;
      });
      var flags = (0, _help.parseArgv)(argv, { specifiers });

      (0, _lodash.each)(flagTypes, function (_ref16, flag) {
        var type = _ref16.type,
            required = _ref16.required,
            optional = _ref16.optional;

        if (typeof flags[flag] === 'boolean' && type !== 'bool' && required) {
          throw new Error(`${flag}: missing required value ${required}`);
        }
      });

      var additions = (0, _lodash.chain)(flagTypes).map(function (_ref17, flag) {
        var modifier = _ref17.modifier,
            required = _ref17.required,
            optional = _ref17.optional,
            desc = _ref17.desc;

        var value = flags[flag] || false;
        if (typeof modifier === 'string') {
          return { [modifier]: value };
        } else if (typeof modifier === 'function') {
          return modifier({ value, flag, required, optional, desc });
        } else if ((0, _lodash.isArray)(modifier)) {
          return (0, _lodash.reduce)(modifier, function (acq, fn) {
            return _extends({}, acq, fn({ value, flag, required, optional, desc }));
          }, {});
        }
        return false;
      }).without(true).without(false).thru(function (v) {
        return _lodash.extend.apply(null, v);
      }).value();
      this.flags = _extends({}, flags, additions);
      return this;
    }
  }]);

  return Program;
}();

exports.Program = Program;
var program = exports.program = function program() {
  return new Program();
};

exports.default = program;
