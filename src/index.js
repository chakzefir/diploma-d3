import _ from 'lodash'

import Modal from "./modules/ModalView"
import Settings from "./modules/Settings"
import Force from "./modules/Force"
import Calc from "./modules/Calc"

class App {
    run(debug = false) {
        console.info('APP RUN');
        const settingsModalNode = document.querySelector('.modal--settings');
        const welcomeModalNode = document.querySelector('.modal--welcome');

        this.settingsModal = new Modal(settingsModalNode);
        this.welcomeModal = new Modal(welcomeModalNode, () => this.settingsModal.open());

        document.forms[0].addEventListener('submit', (submitEvent) => this.formHandler(submitEvent))

        if(debug) {
            new Force(Settings.dataGenerator(3))
            this.initTools()
        } else {
            this.welcomeModal.open();
        }
    }
    formHandler(submitEvent) {
        console.info('SETTINGS SUBMITTED');
        submitEvent.preventDefault();
        this.clearBody();

        const settings = Settings.getSettingsFromForm(submitEvent.target);
        const data = Settings.dataGenerator(settings.devicesQty, settings.topology);
        const force = new Force(data)

        this.settingsModal.close();
        this.initTools();
    }
    initTools() {
        this.calc = new Calc()

        document.querySelector('.tool--calc').addEventListener('click', () => {
            let clientsQty = document.querySelectorAll('.node--main').length;
            this.calc.view(clientsQty);
        })

        document.querySelector('.tool--settings').addEventListener('click', () => {
            this.settingsModal.open();
        })
    }
    clearBody() {
        let svgNode = document.querySelector('svg');

        if(svgNode) {
            document.body.removeChild(svgNode);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const app = new App();
    app.run(true);
})