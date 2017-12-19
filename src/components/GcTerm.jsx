import React, { Component } from 'react';
import Terminal from './term';

class GcTerm extends Component {
    constructor(props) {
        super(props);
        this.termID = Date.now();
    }

    componentDidMount() {
        const termbox = document.getElementById(this.termID);
        this.term = new Terminal({
            cols: 120,
            rows: 24,
            useStyle: true,
        });
    }

    render() {
        return (
            <div id={this.termID}></div>
        )
    }
}

export default GcTerm;