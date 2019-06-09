class Settings {
    static dataGenerator(mainQty = 3, topology = 'star', clientsQty = 0) {
        let linksArray = [];
        let nodesArray = [{id: 'Server'}];

        for(let i = 1; i < Number(mainQty) + 1; i++) {
            let currentTarget = i === 1 || topology === 'star' ? 'Server' : `Main${Number(i-1)}`;

            linksArray.push({source: `Main${i}`,target: currentTarget})
            nodesArray.push({id: `Main${i}`, group: i, fiberQty: 4, clientsQty: 0, distance: 0.8})

            for(let j = 1; j < Number(clientsQty) + 1; j++) {
                nodesArray.push({id: `Client${i}.${j}`, group: i, number: `${i}.${j}`, distance: 0.2})
                linksArray.push({source: `Main${i}`,target: `Client${i}.${j}`})
            }
        }

        return {
            'links': linksArray,
            'nodes': nodesArray
        }
    }
    static toggleMap() {
        document.querySelector('svg').classList.toggle('map-active')
        document.querySelector('.tool--map').classList.toggle('tool--map--active')
    }
    static getSettingsFromForm(formNode) {
        return {
            topology: formNode.querySelector('#star').checked ? 'star' : 'bus',
            devicesQty: formNode.querySelector('#devices').value
        }
    }
}

export default Settings