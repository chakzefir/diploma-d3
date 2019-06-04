import * as d3 from 'd3';

class Node {
    static removeOldAlts() {
        let altNode = document.querySelector('.node-alt')
        if(altNode) {
            document.body.removeChild(altNode)
        }
    }
    static appendMainAlt(d) {
        Node.removeOldAlts();

        d3.select('body')
            .append('div')
                .attr('class', 'node-alt')
                .attr('tabindex', -1)
                .attr('style', `top: ${d.y+10}px; left: ${d.x+10}px`)
                .html(`<h3>Настройка магистрали</h3><p>Магистраль №${d.index}</p>`)
            .append('p')
            .append('input')
                .attr('value', d.fiberQty)
                .attr('type', 'number')
                .attr('class', 'node-alt__input')
                .attr('step', 4)
                .attr('tabindex', 1)
                .on('change', function (changeEvent) {
                    Node.nodeChangeFiber(d, this.value)
                })

        d3.select('.node-alt').node().focus();
    }
    static appendClientAlt(d) {
        Node.removeOldAlts();

        d3.select('body')
            .append('div')
            .attr('class', 'node-alt')
            .attr('tabindex', -1)
            .attr('style', `top: ${d.y+10}px; left: ${d.x+10}px`)
            .html(`<h3>Сведения клиента</h3><p>Клиент №${d.number}</p>`)

        d3.select('.node-alt').node().focus();
    }
    static nodeChangeFiber(d, newFiberQty) {
        d3.select(`#${d.id}`).attr('fiberQty', newFiberQty);
    }
    static getClientsQty(nodes, group) {
        let result = []

        nodes.forEach((el) => {
            if (el.group === group && el.id.indexOf('Main') === -1) {
                result.push(el)
            }
        })

        return result.length
    }
}

export default Node