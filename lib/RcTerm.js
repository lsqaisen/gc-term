'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _term = require('./term');

var _term2 = _interopRequireDefault(_term);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function sizeFormat(_ref) {
    var parentNode = _ref.parentNode,
        _ref$cols = _ref.cols,
        cols = _ref$cols === undefined ? 120 : _ref$cols,
        _ref$rows = _ref.rows,
        rows = _ref$rows === undefined ? 24 : _ref$rows,
        _ref$unitCol = _ref.unitCol,
        unitCol = _ref$unitCol === undefined ? 7.203 : _ref$unitCol,
        _ref$unitRow = _ref.unitRow,
        unitRow = _ref$unitRow === undefined ? 18 : _ref$unitRow;

    if ((cols + '').indexOf('%') !== -1) {
        if (parentNode.clientWidth > 0) cols = Math.floor(parseInt(parseInt(cols) / 100 * parentNode.clientWidth - 10) / unitCol);else cols = 120;
    } else if ((cols + '').indexOf('px') !== -1) {
        cols = Math.floor(parseInt(cols) / unitCol);
    }
    if ((rows + '').indexOf('%') !== -1) {
        if (parentNode.clientHeight > 0) rows = Math.floor(parseInt(parseInt(rows) / 100 * parentNode.clientHeight - 10) / unitRow);else rows = 24;
    } else if ((rows + '').indexOf('px') !== -1) {
        rows = Math.floor(parseInt(rows) / unitRow);
    }
    return { cols: cols, rows: rows };
}

var RcTerm = function (_Component) {
    _inherits(RcTerm, _Component);

    function RcTerm(props) {
        _classCallCheck(this, RcTerm);

        var _this = _possibleConstructorReturn(this, (RcTerm.__proto__ || Object.getPrototypeOf(RcTerm)).call(this, props));

        _this.termID = Date.now();
        _this.term = null;
        return _this;
    }

    _createClass(RcTerm, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            var _props = this.props,
                _props$autoResize = _props.autoResize,
                autoResize = _props$autoResize === undefined ? false : _props$autoResize,
                _props$unitCol = _props.unitCol,
                unitCol = _props$unitCol === undefined ? 7.203 : _props$unitCol,
                _props$unitRow = _props.unitRow,
                unitRow = _props$unitRow === undefined ? 18 : _props$unitRow,
                _props$cols = _props.cols,
                cols = _props$cols === undefined ? 120 : _props$cols,
                _props$rows = _props.rows,
                rows = _props$rows === undefined ? 24 : _props$rows,
                _props$useStyle = _props.useStyle,
                useStyle = _props$useStyle === undefined ? true : _props$useStyle,
                _props$fontSize = _props.fontSize,
                fontSize = _props$fontSize === undefined ? '11px' : _props$fontSize,
                onResize = _props.onResize,
                props = _objectWithoutProperties(_props, ['autoResize', 'unitCol', 'unitRow', 'cols', 'rows', 'useStyle', 'fontSize', 'onResize']);

            var termbox = document.getElementById(this.termID);
            var parentNode = termbox.parentNode;
            this.term = new _term2.default(_extends({}, sizeFormat({ parentNode: parentNode, cols: cols, rows: rows, unitCol: unitCol, unitRow: unitRow }), {
                useStyle: useStyle
            }, props));
            this.term.open(termbox);
            document.getElementsByClassName('terminal')[0].style.fontSize = fontSize;
            if (autoResize) {
                window.addEventListener('resize', function () {
                    var size = sizeFormat({ parentNode: parentNode, cols: cols, rows: rows, unitCol: unitCol, unitRow: unitRow });
                    if (size.cols <= 0 || size.rows <= 0) {
                        return false;
                    }
                    _this2.term.resize(size.cols, size.rows);
                    !!onResize && onResize(size);
                });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement('div', { id: this.termID });
        }
    }]);

    return RcTerm;
}(_react.Component);

RcTerm.propTypes = {
    autoResize: _propTypes2.default.bool,
    unitCol: _propTypes2.default.number,
    unitRow: _propTypes2.default.number,
    cols: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),
    rows: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),
    onResize: _propTypes2.default.func
};

exports.default = RcTerm;
//# sourceMappingURL=RcTerm.js.map