/**
 * Created by yan on 16-1-20.
 */
import React from 'react';
import RcTerm from '../../lib/RcTerm';
import WebSocketTerm from '../../lib/WebSocketTerm';
import { render } from 'react-dom';

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div>
                    <p>WebSocketTerm</p>
                    <WebSocketTerm
                        url='ws://xxxx/xxxxx'
                        termProps={{
                            cols: 220,
                            rows: 18,
                        }} />
                </div>
                <div>
                    <p>RcTerm</p>
                    <RcTerm
                        cols={120}
                        rows={18} />
                </div>
            </div>
        )
    }
}


var element = document.createElement("div");
document.body.appendChild(element);
render(<App />, element);