import './EditProdutoPage.css'
import { createHeader } from '../../shared/Header.js'
import { logout } from '../../shared/util.js';

const pageName = 'Editar Produto';

class EditProdutoPage extends HTMLElement {
    connectedCallback() {
        this.classList.add('ion-page');
        const cabecalho = createHeader(pageName);
        
        const dscProdutoAtual = "Café Expresso"; 
        const valorUnitAtual = "5.50";

        this.innerHTML = `
            ${cabecalho}
            <ion-content class="ion-padding">
                <form id="form-edit-produto">
                    <ion-list>
                        <ion-item>
                            <ion-input type="text" name="dsc_produto" id="input-dsc"
                                value="${dscProdutoAtual}" readonly
                                label="Descrição do produto" label-placement="floating" required>
                            </ion-input>
                            <ion-button slot="end" fill="clear" id="btn-edit-dsc">
                                <ion-icon name="create-outline" slot="icon-only"></ion-icon>
                            </ion-button>
                        </ion-item>

                        <ion-item>
                            <ion-input type="number" step="0.01" name="valor_unit" id="input-valor"
                                value="${valorUnitAtual}" readonly
                                label="Valor Unitário" label-placement="floating" required>
                            </ion-input>
                            <ion-button slot="end" fill="clear" id="btn-edit-valor">
                                <ion-icon name="create-outline" slot="icon-only"></ion-icon>
                            </ion-button>
                        </ion-item>

                        <ion-item>
                            <ion-label id="label-status">Ativo</ion-label>
                            <ion-toggle slot="end" id="toggle-status" name="status" checked></ion-toggle>
                        </ion-item>
                    </ion-list>

                    <div class="ion-padding">
                        <ion-button expand="block" type="submit" class="ion-margin-top">
                            Atualizar Produto
                        </ion-button>
                        <ion-button expand="block" color="danger" id="btn-cancelar">
                            Cancelar
                        </ion-button>
                    </div>
                </form>
            </ion-content>
        `;

        this.setupEvents();
    }

    setupEvents() {
        this.querySelector('#logout-btn').addEventListener('click', logout);
        this.querySelector('#btn-cancelar').addEventListener('click', () => window.history.back());

        const toggle = this.querySelector('#toggle-status');
        const labelStatus = this.querySelector('#label-status');
        toggle.addEventListener('ionChange', (ev) => {
            labelStatus.textContent = ev.detail.checked ? 'Ativo' : 'Inativo';
        });

        this.handleEditField('dsc');
        this.handleEditField('valor');
    }

    handleEditField(fieldPrefix) {
        const input = this.querySelector(`#input-${fieldPrefix}`);
        const btn = this.querySelector(`#btn-edit-${fieldPrefix}`);
        const icon = btn.querySelector('ion-icon');

        btn.addEventListener('click', () => {
            const isReadonly = input.readonly;

            if (isReadonly) {
                input.readonly = false;
                icon.name = 'checkmark-outline';
                btn.color = 'success';
                input.setFocus();
            } else {
                input.readonly = true;
                icon.name = 'create-outline';
                btn.color = 'primary';
                
                console.log(`Campo ${fieldPrefix} atualizado para: ${input.value}`);
            }
        });
    }
}

customElements.define('edit-produto-page', EditProdutoPage);