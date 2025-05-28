import {Component} from '../core/Component';

export class Form extends Component {
    setup(props) {
        this.state = {
            amount: '',
        }

        this.$rootElement = document.createElement('form');
        this.$rootElement.className = 'donate-form';

        this.$donateFormLabel = document.createElement('label');
        this.$donateFormLabel.className = 'donate-form__input-label';
        this.$donateFormLabel.textContent = 'Введите сумму в $';

        this.$donateFormInput = document.createElement('input');
        this.$donateFormInput.className = 'donate-form__donate-input';
        this.$donateFormInput.name = 'amount';
        this.$donateFormInput.type = 'number';
        this.$donateFormInput.max = '100';
        this.$donateFormInput.min = '1';
        this.$donateFormInput.required = true;

        this.donateFormButton = document.createElement('Button');
        this.donateFormButton.className = 'donate-form__submit-button';
        this.donateFormButton.type = 'submit';
        this.donateFormButton.textContent = 'Задонатить';

        this.$rootElement.append(this.$donateFormInput, this.$donateFormLabel, this.donateFormButton);
        this.$donateFormInput.addEventListener('input', this.handleInput.bind(this));
        this.$rootElement.addEventListener('submit', this.handleSubmit.bind(this));
    }

    get isValid() {
        const amount = this.state.amount;
        return !isNaN(amount) && amount >= 1 && amount <= 100;
    }

    handleInput(event) {
        this.state.amount = event.target.value;
        //console.log(event.target.value);
        // console.log(this.isValid);
        this.donateFormButton.disabled = !this.isValid;
    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.isValid) {
            this.props.onSubmit(Number(this.state.amount));
            this.state.amount = '';
            this.$donateFormInput.value = '';
        }
    }
}
