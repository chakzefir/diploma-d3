import Force from './Force'

class Settings {
    static dataGenerator(qty = 3, topology = 'star') {
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
    static getSettingsFromForm(formNode) {
        return {
            topology: formNode.querySelector('#star').checked ? 'star' : 'bus',
            devicesQty: formNode.querySelector('#devices').value
        }
    }
}

export default Settings