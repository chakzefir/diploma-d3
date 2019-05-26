import _ from 'lodash'
import Force from './modules/Force.js'

class App {
    dataGenerator(qty = 3, topology = 'star') {
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
    bindEvents() {
        const formNode = document.forms[0];

        formNode.addEventListener('submit', (submitEvent) => this.formHandler(submitEvent))
    }
    formHandler(submitEvent) {
        submitEvent.preventDefault();
        console.info('SETTINGS SUBMITTED');
    }
    run() {
        console.info('APP RUN');
        this.bindEvents();
        // const force = new Force(this.dataGenerator(11));
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const app = new App();
    app.run();
})