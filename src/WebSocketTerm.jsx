import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RcTerm from './RcTerm';

class WebSocketTerm extends Component {
    constructor(props) {
        super(props);
        this.socket = null;
        this.term = null;
    }

    componentDidMount() {
        const { url, splitWrite = false, onlyRead = false, beforeSendData = [], beforeWriteData = [] } = this.props;
        this.term = this.refs.rcterm.term;
        this.socket = new WebSocket(url);
        beforeWriteData.forEach(v => this.term.write(v))
        this.socket.onerror = (e) => {
            console.error('socket连接失败！');
        };
        this.socket.onopen = (e) => {
            console.log('socket连接成功！')
            beforeSendData.forEach(v => this.socket.send(v))
            !onlyRead && this.term.on('data', (data) => {
                this.socket.send(data);
            });
        };
        this.socket.onmessage = (e) => {
            if (splitWrite) {
                const data = e.data.split('\n');
                if (data[data.length - 1] === "") {
                    delete data[data.length - 1];
                }
                data.forEach(v => this.term.write(`${v}\n\r`));
            } else {
                this.term.write(e.data)
            }
        }
        this.socket.onclose = (error) => {
            console.warn('socket断开连接！')
        }
    }

    componentWillUnmount() {
        this.socket.close();
    }

    render() {
        const { termProps } = this.props;
        return (
            <div style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
                <RcTerm ref="rcterm" {...termProps}></RcTerm>
            </div >
        )
    }
}

WebSocketTerm.propTypes = {
    url: PropTypes.string.isRequired,
    splitWrite: PropTypes.bool,
    onlyRead: PropTypes.bool,
    beforeSendData: PropTypes.arrayOf(PropTypes.string),
    beforeWriteData: PropTypes.arrayOf(PropTypes.string),
    termProps: PropTypes.object,
}

export default WebSocketTerm;