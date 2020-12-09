//Variables
const enviarBtn = document.querySelector('#enviar');
const resetBtn = document.querySelector('#resetBtn');

const formulario = document.querySelector('#enviar-mail');

const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');

const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

EventListerner();
function EventListerner () {
    document.addEventListener('DOMContentLoaded', iniciarApp);

    email.addEventListener('blur', validarFormulario);

    asunto.addEventListener('blur', validarFormulario);

    mensaje.addEventListener('blur', validarFormulario);

    enviarBtn.addEventListener('click', enviarEmail);

    resetBtn.addEventListener('click', () => {
        formulario.reset();
        iniciarApp();
    })
}

//Funciones
function iniciarApp () {
    console.log('iniciando app');
    enviarBtn.disable = true;
    enviarBtn.classList.add('cursor-not-allowed','opacity-50');
}

function validarFormulario (e) {
    if (e.target.value.length > 0) {        
        const error = document.querySelector('p.error');
        if (error) {
            error.remove();
        }

        e.target.classList.remove('border','border-red-500');
        e.target.classList.add('border','border-green-500');        
        
    } else {
        e.target.classList.remove('border','border-green-500');
        e.target.classList.add('border','border-red-500');

        mostrarError('Todos los campos son obligatorios');
    }

    if(e.target.type === 'email') {
        if (er.test (e.target.value)) {
            const error = document.querySelector('p.error');
            if (error) {
                error.remove();
            }

            e.target.classList.remove('border','border-red-500');
            e.target.classList.add('border','border-green-500');
            
        } else {
            mostrarError('Formato de Email invalido');
            e.target.classList.remove('border','border-green-500');
            e.target.classList.add('border','border-red-500');
        }
    }

    if (er.test (email.value) && asunto.value !== '' && mensaje.value !== '') {        
        enviarBtn.disable = false;
        enviarBtn.classList.remove('cursor-not-allowed','opacity-50');
    }
}

function mostrarError(mensaje) {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = mensaje;
    mensajeError.classList.add('border','border-red-500','background-red-100', 'text-red-500', 'text-center', 'p-3', 'mt-5', 'error');

    const errores = document.querySelectorAll('.error');
    if (errores.length === 0) {
    formulario.appendChild(mensajeError);
    }
}

function enviarEmail (e) {
    e.preventDefault();
    const spinner = document.querySelector('#spinner');
    spinner.style.display = "flex";

    setTimeout(() => {
        spinner.style.display = "none";
        
        const parrafo = document.createElement('p');        
        parrafo.classList.add('bg-green-500','text-white', 'text-center', 'p-5', 'my-5');
        parrafo.textContent = 'El email se envio correctamente';
        
        formulario.insertBefore(parrafo,spinner);
        
        setTimeout(() => {
            parrafo.remove();
            formulario.reset();
        }, 3600);

    }, 3000);
}