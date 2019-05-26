class Modal {
    constructor(node, onClose = () => {}, onOpen = () => {}){
        this.node = node
        this.callbacks = {
            onClose: onClose,
            onOpen: onOpen
        }
        this.bindEvents();
    }
    bindEvents() {
        this.node.querySelector('[data-modal="close"]').addEventListener('click', clickEvent => {
            event.preventDefault();
            this.close();
        });
    }
    close() {
        this.node.style.display = 'none';
        this.callbacks.onClose();
    }
    open() {
        this.node.style.display = 'block';
        this.callbacks.onOpen();
    }
}

export default Modal