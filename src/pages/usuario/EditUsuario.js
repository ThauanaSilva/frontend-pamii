import './UsuarioPage.css'
import { createHeader } from '../../shared/Header.js'
import { logout } from '../../shared/util.js'; 

const pageName = 'Consultar Usuário';

class UsuarioPage extends HTMLElement {
    connectedCallback() {
        this.classList.add('ion-page');
        const cabecalho = createHeader(pageName);
        
        this.innerHTML = `
            ${cabecalho}
            <ion-content class="ion-padding">
                <form id="form-usuario">
                    <ion-list>
                        <ion-item>
                            <ion-input type="number" id="input-id"
                                label="Digite o ID" label-placement="floating" placeholder="Ex: 10 ou 20">
                            </ion-input>
                            <ion-button slot="end" fill="clear" id="btn-buscar">
                                <ion-icon name="search-outline" slot="icon-only"></ion-icon>
                            </ion-button>
                        </ion-item>

                        <ion-item>
                            <ion-input type="text" id="input-nome" readonly
                                label="Nome" label-placement="floating">
                            </ion-input>
                            <ion-button slot="end" fill="clear" id="btn-edit-nome">
                                <ion-icon name="create-outline" slot="icon-only"></ion-icon>
                            </ion-button>
                        </ion-item>

                        <ion-item>
                            <ion-input type="password" id="input-senha" readonly
                                label="Senha" label-placement="floating">
                            </ion-input>
                            <ion-button slot="end" fill="clear" id="btn-show-password">
                                <ion-icon name="eye-outline" slot="icon-only"></ion-icon>
                            </ion-button>
                            <ion-button slot="end" fill="clear" id="btn-edit-senha">
                                <ion-icon name="create-outline" slot="icon-only"></ion-icon>
                            </ion-button>
                        </ion-item>

                        <ion-item>
                            <ion-input type="number" id="input-perfil" readonly
                                label="Perfil (Nível)" label-placement="floating">
                            </ion-input>
                            <ion-note slot="end" id="nota-perfil" 
                                style="margin-right: 15px; font-weight: 800; font-size: 1.2rem; text-transform: uppercase;">
                            </ion-note>
                            <ion-button slot="end" fill="clear" id="btn-edit-perfil">
                                <ion-icon name="create-outline" slot="icon-only"></ion-icon>
                            </ion-button>
                        </ion-item>

                        <ion-item>
                            <ion-label id="label-status">Status</ion-label>
                            <ion-toggle slot="end" id="toggle-status"></ion-toggle>
                        </ion-item>
                    </ion-list>

                    <div class="ion-padding">
                        <ion-button expand="block" type="submit" class="ion-margin-top">
                            Salvar Alterações
                        </ion-button>
                        <ion-button expand="block" color="danger" id="btn-cancelar">
                            Voltar
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

        const inputId = this.querySelector('#input-id');
        const btnBuscar = this.querySelector('#btn-buscar');
        const notaPerfil = this.querySelector('#nota-perfil');
        const inputSenha = this.querySelector('#input-senha');
        const btnShowPass = this.querySelector('#btn-show-password');

        const niveisAcesso = { "1": "Acesso Ouro", "2": "Acesso Prata", "3": "Acesso Bronze" };
        const usuariosFake = {
            "10": { nome: "Thauana", senha: "senhaThauana123", perfil: 1, status: true },
            "20": { nome: "Eric", senha: "ericSenha789", perfil: 2, status: false }
        };

        const atualizarTextoPerfil = (valor) => {
            const nivel = niveisAcesso[valor];
            notaPerfil.textContent = nivel || "";

            if (valor == 1) {
                notaPerfil.style.color = "#D4AF37";
            } else if (valor == 2) {
                notaPerfil.style.color = "#A9A9A9";
            } else if (valor == 3) {
                notaPerfil.style.color = "#8B4513";
            } else {
                notaPerfil.style.color = "red";
            }
        };

        btnShowPass.addEventListener('click', () => {
            const icon = btnShowPass.querySelector('ion-icon');
            if (inputSenha.type === 'password') {
                inputSenha.type = 'text';
                icon.name = 'eye-off-outline';
            } else {
                inputSenha.type = 'password';
                icon.name = 'eye-outline';
            }
        });

        btnBuscar.addEventListener('click', () => {
            const user = usuariosFake[inputId.value];
            if (user) {
                this.querySelector('#input-nome').value = user.nome;
                inputSenha.value = user.senha;
                this.querySelector('#input-perfil').value = user.perfil;
                this.querySelector('#toggle-status').checked = user.status;
                this.querySelector('#label-status').textContent = user.status ? 'Ativo' : 'Inativo';
                atualizarTextoPerfil(user.perfil);
            } else {
                alert("Usuário não encontrado!");
            }
        });

        this.querySelector('#input-perfil').addEventListener('ionInput', (ev) => {
            atualizarTextoPerfil(ev.target.value);
        });

        this.handleEditField('nome');
        this.handleEditField('senha');
        this.handleEditField('perfil');

        this.querySelector('#toggle-status').addEventListener('ionChange', (ev) => {
            this.querySelector('#label-status').textContent = ev.detail.checked ? 'Ativo' : 'Inativo';
        });
    }

    handleEditField(fieldId) {
        const input = this.querySelector(`#input-${fieldId}`);
        const btn = this.querySelector(`#btn-edit-${fieldId}`);
        btn.addEventListener('click', () => {
            const icon = btn.querySelector('ion-icon');
            input.readonly = !input.readonly;
            icon.name = input.readonly ? 'create-outline' : 'checkmark-outline';
            btn.color = input.readonly ? 'primary' : 'success';
        });
    }
}

customElements.define('usuario-page', UsuarioPage);