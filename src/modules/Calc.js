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

        document.querySelector('.calc-result').innerHTML =
            `Общая длинна кабеля всех магистралей: ${parseInt(length)}м<br> 
            Примерная стоимость кабелей ~ ${parseInt(finalCash)}₽<br>
            Количество абонентов: ${clientsQty}<br>
            Бюджет сети составит ~ ${parseInt(loss)}Дб
            `;
    }
}

export default Calc