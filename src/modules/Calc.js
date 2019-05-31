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
    countBudget(length, clientsQty) {
        const speedLoss = 0.5;
        const connectionLoss = 0.5;

        return speedLoss * length + connectionLoss * clientsQty;
    }
    view(clientsQty) {
        const length = this.countNodesDistance();
        const finalCash =  this.countCash(length);
        const loss = this.countBudget(length, clientsQty);
        const resultNode = document.createElement("DIV");

        resultNode.classList.add('calc-result');
        resultNode.innerHTML =
            `<h3>Результаты рассчётов</h3>
            Общая длинна кабеля всех магистралей: <b>${parseInt(length)}м</b><br> 
            Примерная стоимость кабелей ~ <b>${parseInt(finalCash)}₽</b><br>
            Количество абонентов: ${clientsQty}<br>
            Бюджет сети составит ~ <b>${parseInt(loss)}Дб</b>`;

        document.body.appendChild(resultNode);
    }
}

export default Calc