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

var _RcTerm = require('./RcTerm');

var _RcTerm2 = _interopRequireDefault(_RcTerm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WebSocketTerm = function (_Component) {
    _inherits(WebSocketTerm, _Component);

    function WebSocketTerm(props) {
        _classCallCheck(this, WebSocketTerm);

        var _this = _possibleConstructorReturn(this, (WebSocketTerm.__proto__ || Object.getPrototypeOf(WebSocketTerm)).call(this, props));

        _this.socket = null;
        _this.term = null;
        return _this;
    }

    _createClass(WebSocketTerm, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            var _props = this.props,
                url = _props.url,
                _props$splitWrite = _props.splitWrite,
                splitWrite = _props$splitWrite === undefined ? false : _props$splitWrite,
                _props$onlyRead = _props.onlyRead,
                onlyRead = _props$onlyRead === undefined ? false : _props$onlyRead,
                _props$beforeSendData = _props.beforeSendData,
                beforeSendData = _props$beforeSendData === undefined ? [] : _props$beforeSendData,
                _props$beforeWriteDat = _props.beforeWriteData,
                beforeWriteData = _props$beforeWriteDat === undefined ? [] : _props$beforeWriteDat;

            this.term = this.refs.rcterm.term;
            this.socket = new WebSocket(url);
            beforeWriteData.forEach(function (v) {
                return _this2.term.write(v);
            });
            this.socket.onerror = function (e) {
                console.error('socket连接失败！');
            };
            this.socket.onopen = function (e) {
                console.log('socket连接成功！');
                beforeSendData.forEach(function (v) {
                    return _this2.socket.send(v);
                });
                !onlyRead && _this2.term.on('data', function (data) {
                    _this2.socket.send(data);
                });
            };
            this.socket.onmessage = function (e) {
                if (splitWrite) {
                    var data = e.data.split('\n');
                    if (data[data.length - 1] === "") {
                        delete data[data.length - 1];
                    }
                    data.forEach(function (v) {
                        return _this2.term.write(v + '\n\r');
                    });
                } else {
                    _this2.term.write(e.data);
                }
            };
            this.socket.onclose = function (error) {
                console.warn('socket断开连接！');
            };
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.socket.close();
        }
    }, {
        key: 'render',
        value: function render() {
            var termProps = this.props.termProps;

            return _react2.default.createElement(
                'div',
                { style: { width: '100%', height: '100%', overflow: 'hidden' } },
                _react2.default.createElement(_RcTerm2.default, _extends({ ref: 'rcterm' }, termProps))
            );
        }
    }]);

    return WebSocketTerm;
}(_react.Component);

WebSocketTerm.propTypes = {
    url: _propTypes2.default.string.isRequired,
    splitWrite: _propTypes2.default.bool,
    onlyRead: _propTypes2.default.bool,
    beforeSendData: _propTypes2.default.arrayOf(_propTypes2.default.string),
    beforeWriteData: _propTypes2.default.arrayOf(_propTypes2.default.string),
    termProps: _propTypes2.default.object
};

exports.default = WebSocketTerm;
//# sourceMappingURL=WebSocketTerm.js.map