import _ from 'lodash'
import Force from './modules/Force.js'

function component() {
    const element = document.createElement('div');

    // Lodash, currently included via a script, is required for this line to work
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');

    return element;
}

const forceData = {
    'links': [
        {
            source: 'Client1',
            target: 'Server',
            value: 1,
        }, {
            source: 'Client2',
            target: 'Server',
            value: 1,
        }, {
            source: 'Client3',
            target: 'Server',
            value: 2,
        }
    ],
    'nodes': [
        {
            id: 'Server',
            group: 1,
        }, {
            id: 'Client1',
            group: 2,
        }, {
            id: 'Client2',
            group: 2,
        }, {
            id: 'Client3',
            group: 2,
        }
    ]
};

document.body.appendChild(component());
const force = new Force(forceData);