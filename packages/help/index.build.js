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

var rename = exports.rename = function rename(name, defaultValue) {
  return function (_ref10) {
    var value = _ref10.value,
        flag = _ref10.flag;

    var _value = defaultValue || value;
    return { [name]: _value };
  };
};

var pad = exports.pad = function pad(str, width) {
  var len = Math.max(0, width - str.length);
  return str + Array(len + 1).join(' ');
};

var template = exports.template = function template(_ref11) {
  var name = _ref11.name,
      usage = _ref11.usage,
      description = _ref11.description,
      options = _ref11.options,
      padLength = _ref11.padLength;
  return `
Usage: ${name} ${usage}

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
    this._usage = '';
    this._description = '';
    this._name = '';
    return this;
  }

  _createClass(Program, [{
    key: 'help',
    value: function help() {
      var _name = this._name,
          _description = this._description,
          _usage = this._usage,
          options = this.options;

      var padLength = (0, _lodash.max)(options.map(function (_ref13) {
        var flagString = _ref13.flagString;
        return flagString;
      })).length + 10;
      return template({ name: _name, usage: _usage, description: _description, options, padLength });
    }
  }, {
    key: 'name',
    value: function name(_name2) {
      this._name = _name2;
      return this;
    }
  }, {
    key: 'description',
    value: function description(_description2) {
      this._description = _description2;
      return this;
    }
  }, {
    key: 'usage',
    value: function usage(_usage2) {
      this._usage = _usage2;
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
      // get options in shape for specifiers
      var defaultSpecifier = function defaultSpecifier(_ref14) {
        var required = _ref14.required,
            optional = _ref14.optional;

        if (required || optional) return { specifier: _help.modifiers.anyDash.next, specifierType: 'next' };
        return { specifier: _help.modifiers.anyDash.bool, specifierType: 'bool' };
      };
      var options = this.options;
      options = (0, _lodash.map)(options, function (option) {
        return _extends({}, option, parseFlagOption(option.flagString));
      });
      options = (0, _lodash.map)(options, function (option) {
        return _extends({}, option, defaultSpecifier(option));
      });
      // get specifiers in shape for parseArgv
      var specifiers = (0, _lodash.chain)(options).map(function (option) {
        return (0, _lodash.map)(option.flags, function (flag) {
          return [flag, option.specifier];
        });
      }).flatten().fromPairs().value();
      // provides flag values
      var flags = (0, _help.parseArgv)(argv, { specifiers });
      // throws error for required fields
      (0, _lodash.each)(flags, function (value, flag) {
        var option = (0, _lodash.find)(options, function (option) {
          return (0, _lodash.includes)(option.flags, flag);
        });
        if (option && typeof value === 'boolean' && option.specifierType !== 'bool' && option.required) {
          throw new Error(`${flag}: missing required value ${option.required}`);
        }
      });
      // apply modifiers
      var modifierValues = (0, _lodash.chain)(options).map(function (option) {
        return (0, _lodash.map)(option.flags, function (flag) {
          return _extends({ flag }, option);
        });
      }).flatten().map(function (option) {
        return _extends({}, option, { value: (0, _lodash.get)(flags, option.flag, undefined) });
      }).map(function (option) {
        var modifier = option.modifier,
            required = option.required,
            optional = option.optional,
            desc = option.desc,
            value = option.value,
            flag = option.flag;

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
      }).without(false).without(true).map(function (values) {
        return (0, _lodash.omitBy)(values, _lodash.isUndefined);
      }).thru(_help.mergeProperties).value();
      this.parsed = flags;
      this.modifiers = modifierValues;
      this.flags = _extends({}, flags, modifierValues);
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
