import React, { Component } from 'react';
import Terminal from './term';

class GcTerm extends Component {
    constructor(props) {
        super(props);
        this.termID = Date.now();
        this.term = null;
    }

    componentDidMount() {
        const termbox = document.getElementById(this.termID);
        this.term = new Terminal({
            cols: 120,
            rows: 24,
            useStyle: true,
        });
        this.term.open(termbox);
    }

    render() {
        return (
            <div id={this.termID}></div>
        )
    }
}

export default GcTerm;