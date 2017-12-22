import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Terminal from './term';

function sizeFormat({ parentNode, cols = 120, rows = 24, unitCol = 7.203, unitRow = 18 }) {
    if ((cols + '').indexOf('%') !== -1) {
        if (parentNode.clientWidth > 0)
            cols = Math.floor(parseInt(parseInt(cols) / 100 * parentNode.clientWidth - 10) / unitCol);
        else cols = 120;
    } else if ((cols + '').indexOf('px') !== -1) {
        cols = Math.floor(parseInt(cols) / unitCol);
    }
    if ((rows + '').indexOf('%') !== -1) {
        if (parentNode.clientHeight > 0)
            rows = Math.floor(parseInt(parseInt(rows) / 100 * parentNode.clientHeight - 10) / unitRow);
        else rows = 24;
    } else if ((rows + '').indexOf('px') !== -1) {
        rows = Math.floor(parseInt(rows) / unitRow);
    }
    return { cols, rows };
}

class RcTerm extends Component {
    constructor(props) {
        super(props);
        this.termID = Date.now();
        this.term = null;
    }

    componentDidMount() {
        let { autoResize = false, unitCol = 7.203, unitRow = 18, cols = 120, rows = 24, useStyle = true, fontSize = '11px', onResize, ...props } = this.props;
        const termbox = document.getElementById(this.termID);
        const parentNode = termbox.parentNode;
        this.term = new Terminal({
            ...sizeFormat({ parentNode, cols, rows, unitCol, unitRow }),
            useStyle,
            ...props,
        });
        this.term.open(termbox);
        document.getElementsByClassName('terminal')[0].style.fontSize = fontSize;
        if (autoResize) {
            window.addEventListener('resize', () => {
                const size = sizeFormat({ parentNode, cols, rows, unitCol, unitRow });
                if (size.cols <= 0 || size.rows <= 0) {
                    return false;
                }
                this.term.resize(size.cols, size.rows);
                !!onResize && onResize(size);
            })
        }
    }

    render() {
        return (
            <div id={this.termID} ></div>
        )
    }
}

RcTerm.propTypes = {
    autoResize: PropTypes.bool,
    unitCol: PropTypes.number,
    unitRow: PropTypes.number,
    cols: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    rows: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    onResize: PropTypes.func,
}

export default RcTerm;