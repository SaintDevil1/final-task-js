import {Component} from '../core/Component';
import {Form} from './Form';
import {List} from './List';
import {ListItem} from './ListItem';

export class App extends Component {
    setup(props) {
        this.state = {
            total: 0,
            donates: [],
        }

        this.$rootElement = document.createElement('div');
        this.$rootElement.className = 'app';
        this.$totalAmount = document.createElement('h1');
        this.$totalAmount.className = 'total-amount';
        this.$totalAmount.textContent = 'Итого: $';
        this.$span = document.createElement('span');
        this.$span.textContent = this.state.total;
        this.$totalAmount.appendChild(this.$span);
        this.$rootElement.appendChild(this.$totalAmount);

        const donateForm = new Form({
            onSubmit: this.onItemCreate.bind(this)
        });
        this.$rootElement.appendChild(donateForm.$rootElement);
        const donateList = new List();
        this.donateList = donateList;
        this.$rootElement.appendChild(donateList.$rootElement);
    }

    onItemCreate(amount) {
        const item = new ListItem({
            amount,
            onItemDelete: this.onItemDelete.bind(this)
        })
        this.state.donates.push(item);
        this.donateList.addItem(item);
        this.state.total += amount;
        this.$span.textContent = this.state.total;
    }

    onItemDelete(id) {
        const idDelete = this.state.donates.findIndex((d) => {
            return d.state.id === Number(id);
        });

        if (idDelete > -1) {
            const donateItem = this.state.donates.find(
                (d) => d.state.id === Number(id)
            );
            this.state.donates.splice(idDelete, 1);
            donateItem.removeItem(id);
            this.state.total -= donateItem.state.amount;
            this.$span.textContent = this.state.total;
        }
    }
}

