class Node {
    clickHandler(clickEvent){
        let coords = {
            Y: clickEvent.clientY,
            X: clickEvent.clientX,
        }

        this.appendAlt(coords, clickEvent.toElement.attributes)
    }
    static appendAlt(d, svgWidth, svgHeight) {
        let div = document.createElement("DIV")
        let input = document.createElement("INPUT")
        let addBtn = document.createElement("A")

        div.setAttribute("tabindex", -1);
        input.setAttribute("tabindex", 1);
        div.className = "node-alt";
        addBtn.className = "node-alt__add-fiber";
        addBtn.onclick = (clickEvent, d, g) => Node.clientAddAction(clickEvent, d, g);
        div.style.top = d.y+10+'px';
        div.style.left = d.x+10+'px';
        div.style.transform = `translate(${svgWidth/2}px, ${svgHeight/2}px)`;
        div.innerHTML = Node.nodeText(d.index);
        div.appendChild(addBtn);
        Node.removeOldAlts();
        let divNode = document.body.appendChild(div);
        divNode.focus();
    }
    static removeOldAlts() {
        let altNode = document.querySelector('.node-alt');
        if(altNode) {
            document.body.removeChild(altNode);
        }
    }
    static mainAltHTML(index, fiberQty = 4) {
        return `
            <h3>Настройка магистрали</h3>
            <p>Магистраль №${index}</p>
            <p>Количество жил: <input value="${fiberQty}" type="number" class="node-alt__input" pattern="" step="4"/></p>
        `
    }
    static clientAltHTML(index, fiberQty = 4) {
        return `
            <h3>Сведения клиента</h3>
            <p>Клиент №${index}</p>
        `
    }
}

export default Node