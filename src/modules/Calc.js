class Calc {
    static countNodesDistance() {
        const lines = document.querySelectorAll('line');
        let sum = 0;

        for(let i = 0; i < lines.length; i++) {
            sum += Number(lines[i].getAttribute('length'));
        }

        return sum;
    }
    countCash() {

    }
    static view() {
        const priceForMeter = 8.2;
        const length = Calc.countNodesDistance();

        const finalCash =  priceForMeter * length;

        document.querySelector('.calc__result').innerHTML = `С учётом общей длинны кабеля для всех абонентов (${parseInt(length)}м), примерная сумма составит ~ ${parseInt(finalCash)}₽`;
        console.log(length);
    }
}

export default Calc