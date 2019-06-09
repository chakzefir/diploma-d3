class Calc {
    countNodesDistance() {
        const lines = document.querySelectorAll('line');
        let sum = 0;

        for(let i = 0; i < lines.length; i++) {
            sum += Number(lines[i].getAttribute('length'));
        }

        return sum;
    }
    countCash(length) {
        const priceForMeter = 8.2;

        return priceForMeter * length;
    }
    static countBudget(distance, clientsQty) {
        const speedLoss = 0.2;
        const connectionLoss = 0.5;
        const result = speedLoss * distance + connectionLoss * clientsQty;

        return Number(result).toFixed(2);
    }
    static getCount() {
        const nodeElements = document.querySelectorAll('.node:not(.node--server)');
        const qtyOfMains = document.querySelectorAll('.node--main').length;
        let count = {};

        for(let i = 0; i < nodeElements.length; i++) {
            let id = nodeElements[i].getAttribute('id');
            let groupNumber = nodeElements[i].getAttribute('group');
            let qtyOfClients = document.querySelectorAll(`.node--client[group="${groupNumber}"]`).length;
            let distance = nodeElements[i].getAttribute('distance');
            let qtyOfSameType = id.indexOf('Main') === 0 ? qtyOfMains : qtyOfClients;

            count[id] = {
                id: id,
                distance: distance,
                qtyOfClients: qtyOfClients,
                loss: Calc.countBudget(distance, qtyOfClients)
            }
        }

        return count;
    }
    static view(results) {
        console.table(results)
        const resultTableNode = document.createElement("TABLE");
        const resultsContainer = document.querySelector('.results');
        let tableHTML = '<tr><th>Идентификатор</th><th>Бюджет потерь</th><th>Расстояние</th></tr>';

        for (let el in results) {
            if(results.hasOwnProperty(el)) {
                el = results[el];
                if(el.id.indexOf('Main') === 0) {
                    let groupIndex = el.id.split('Main')[1];
                    tableHTML += `<tr class="main-row"><td class="main-cell">Магистраль №${groupIndex}</td><td>${el.loss}Дб</td><td>${el.distance}км</td></tr>`
                } else {
                    let groupIndex = el.id.split('Client')[1];
                    tableHTML += `<tr class="client-row"><td class="client-cell">Абонент №${groupIndex}</td><td>${el.loss}Дб</td><td>${el.distance}км</td></tr>`
                }
            }
        }

        resultTableNode.classList.add('results__table');
        resultTableNode.innerHTML =
            `<h3>Рассчёт потерь</h3>
            ${tableHTML}`;

        resultsContainer.innerHTML = "";
        resultsContainer.appendChild(resultTableNode);
    }
}

export default Calc