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
        document.querySelector('.calc').addEventListener('click', () => {
            Calc.view();
        })

        if(debug) {
            this.settingsModal.open();
            // new Force(Settings.dataGenerator(3))
        } else {
            this.welcomeModal.open();
        }
    }
    formHandler(submitEvent) {
        console.info('SETTINGS SUBMITTED');
        submitEvent.preventDefault();

        const settings = Settings.getSettingsFromForm(submitEvent.target);
        const data = Settings.dataGenerator(settings.devicesQty, settings.topology);
        const force = new Force(data)

        this.settingsModal.close();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const app = new App();
    app.run();
})