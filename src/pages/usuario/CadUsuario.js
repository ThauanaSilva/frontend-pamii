import './CadUsuarioPage.css'
import { createHeader } from '../../shared/Header.js'
import { logout } from '../../shared/util.js'; 

const pageName = 'Cadastrar Usuário';

class CadUsuarioPage extends HTMLElement {
    connectedCallback() {
        this.classList.add('ion-page');
        const cabecalho = createHeader(pageName);
        
        this.innerHTML = `
            ${cabecalho}
            <ion-content class="ion-padding">
                <form id="form-cad-usuario">
                    <ion-list>
                        <ion-item>
                            <ion-input type="number" name="id" label="ID do Usuário" label-placement="floating" required></ion-input>
                        </ion-item>

                        <ion-item>
                            <ion-input type="text" name="nome" label="Nome Completo" label-placement="floating" required></ion-input>
                        </ion-item>

                        <ion-item>
                            <ion-input type="password" id="input-senha-cad" name="senha" label="Definir Senha" label-placement="floating" required></ion-input>
                            <ion-button slot="end" fill="clear" id="btn-show-password-cad">
                                <ion-icon name="eye-outline" slot="icon-only"></ion-icon>
                            </ion-button>
                        </ion-item>

                        <ion-item>
                            <ion-input type="number" id="input-perfil-cad" name="perfil" label="Perfil (1, 2 ou 3)" label-placement="floating" required></ion-input>
                            <ion-note slot="end" id="nota-perfil-cad" 
                                style="margin-right: 10px; font-weight: 800; font-size: 1.2rem; text-transform: uppercase;">
                            </ion-note>
                        </ion-item>

                        <ion-item>
                            <ion-label id="label-status-cad">Ativo</ion-label>
                            <ion-toggle slot="end" id="toggle-status-cad" checked></ion-toggle>
                        </ion-item>
                    </ion-list>

                    <div class="ion-padding">
                        <ion-button expand="block" type="submit" class="ion-margin-top">
                            Finalizar Cadastro
                        </ion-button>
                        <ion-button expand="block" color="danger" id="btn-cancelar-cad">
                            Cancelar
                        </ion-button>
                    </div>
                </form>
            </ion-content>
        `;

        this.setupEvents();
    }

    setupEvents() {
        // Logout e Botão de Voltar
        this.querySelector('#logout-btn').addEventListener('click', logout);
        this.querySelector('#btn-cancelar-cad').addEventListener('click', () => window.history.back());

        const inputSenha = this.querySelector('#input-senha-cad');
        const btnShowPass = this.querySelector('#btn-show-password-cad');
        const inputPerfil = this.querySelector('#input-perfil-cad');
        const notaPerfil = this.querySelector('#nota-perfil-cad');

        const niveisAcesso = { 
            "1": { texto: "Acesso Ouro", cor: "#D4AF37" }, 
            "2": { texto: "Acesso Prata", cor: "#A9A9A9" }, 
            "3": { texto: "Acesso Bronze", cor: "#8B4513" } 
        };

        // Lógica Mostrar/Ocultar Senha
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

        // Atualizar Nível de Acesso (Texto e Cor) em tempo real
        inputPerfil.addEventListener('ionInput', (ev) => {
            const valor = ev.target.value;
            const nivel = niveisAcesso[valor];

            if (nivel) {
                notaPerfil.textContent = nivel.texto;
                notaPerfil.style.color = nivel.cor;
            } else {
                notaPerfil.textContent = valor ? "Inválido" : "";
                notaPerfil.style.color = "red";
            }
        });

        // Toggle de Status (Mudar texto Ativo/Inativo)
        const toggle = this.querySelector('#toggle-status-cad');
        const labelStatus = this.querySelector('#label-status-cad');
        toggle.addEventListener('ionChange', (ev) => {
            labelStatus.textContent = ev.detail.checked ? 'Ativo' : 'Inativo';
        });

        // Evento de Envio do Formulário
        this.querySelector('#form-cad-usuario').addEventListener('submit', (e) => {
            e.preventDefault();
            console.log('Dados enviados para o cadastro!');
        });
    }
}

// Registro do componente (O nome aqui deve bater com o 'component' da ion-route)
customElements.define('cad-usuario-page', CadUsuarioPage);  