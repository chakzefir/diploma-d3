import _ from 'lodash'
import Force from './modules/Force.js'

function component() {
    const element = document.createElement('div');

    // Lodash, currently included via a script, is required for this line to work
    element.innerHTML = _.join(['Hello', 'Bachelor'], ' ');

    return element;
}

const initialForceData = { 'links': [ { source: 'Client1', target: 'Server', value: 1, }, { source: 'Client2', target: 'Server', value: 1, }, { source: 'Client3', target: 'Server', value: 2, } ], 'nodes': [ { id: 'Server', group: 1, }, { id: 'Client1', group: 2, }, { id: 'Client2', group: 2, }, { id: 'Client3', group: 2, } ] };

function dataGenerator(qty = 3, topology = 'star') {
    let linksArray = [];
    let nodesArray = [{id: 'Server', group: 1}];

    for(let i = 0; i < qty; i++) {
        let currentTarget = i === 0 || topology === 'star' ? 'Server' : `Client${Number(i-1)}`;

        linksArray.push({source: `Client${i}`,target: currentTarget})
        nodesArray.push({id: `Client${i}`, group: 2})
    }

    return {
        'links': linksArray,
        'nodes': nodesArray
    }
}


document.body.appendChild(component());
const force = new Force(dataGenerator(5));