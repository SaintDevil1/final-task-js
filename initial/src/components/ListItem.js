import {Component} from '../core/Component';

export class ListItem extends Component {
    setup(props) {
        this.state = {
            id: Date.now(),
            date: new Date(),
            amount: props.amount
        }
        this.$rootElement = document.createElement('div');
        this.$rootElement.className = 'donate-item';
        this.$rootElement.dataset.id = this.state.id;
        const formattedDate = this.formatDate(this.state.date);
        this.$rootElement.append(`${formattedDate} - $${this.props.amount}`);

        const deleteButton = document.createElement('button')
        deleteButton.className = 'delete-button'
        deleteButton.textContent = 'Удалить'

        deleteButton.addEventListener('click', this.handleDelete.bind(this));
        this.$rootElement.append(deleteButton)
    }

    formatDate(date) {
        const pad = num => (num < 10 ? '0' + num : num);
        const year = date.getFullYear();
        const month = pad(date.getMonth() + 1);
        const day = pad(date.getDate());
        const hours = pad(date.getHours());
        const minutes = pad(date.getMinutes());
        const seconds = pad(date.getSeconds());

        return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
    }

    handleDelete(event) {
        const item = event.target.closest('.donate-item')
        const id = item.dataset.id;
        this.props.onItemDelete(id)
    }

    removeItem(id) {
        const item = document.querySelector(`.donate-item[data-id="${id}"]`);
        item.remove();
    }
}