import Modal from './modal.js'

const modal = Modal()

const modalTitle = document.querySelector('.modal h2')
const modalDescription = document.querySelector('.modal p')
const modalButton = document.querySelector('.modal button')

// pegar todos os botões que existem com a classe check
const checkButtons = document.querySelectorAll(".actions a.check")

checkButtons.forEach(button => {
    // add a escuta
    button.addEventListener("click", handleClick)
})

// quando delete for clicado abre a modal
const deleteButton = document.querySelectorAll('.actions a.delete')

deleteButton.forEach( button => {
    button.addEventListener("click", (event) => handleClick(event, false))
})

function handleClick(event, check = true) {
    event.preventDefault();
    const slug = check ? "check" : "delete"
    const roomId = document.querySelector('#room-id').dataset.id
    const questionId = event.target.dataset.id
    
    const form = document.querySelector('.modal form')
    form.setAttribute('action', `/question/${roomId}/${questionId}/${slug}`)

    modalTitle.innerHTML = check ? "Marcar como lida" : "Excluir pergunta"
    modalDescription.innerHTML = check ? "Tem certeza que você deseja marcar como<br>lida esta pergunta?" : "Tem certeza que você deseja excluir esta pergunta?"
    modalButton.innerHTML = check ? "Sim, marcar como lida" : "Sim, excluir"
    check ? modalButton.classList.remove('red') : modalButton.classList.add('red')
    
    // abre a modal
    modal.open()
}

const copyButton = document.querySelector('.buttons .copy')
copyButton.addEventListener("click", () => copy())

// copia o id da sala para clipboard
function copy() {
    /* Get the text field */
    var copyText = document.getElementById("room-id");
  
    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /* For mobile devices */
  
     /* Copy the text inside the text field */
    navigator.clipboard.writeText(copyText.value);
  
    /* Alert the copied text */
    alert("Número da sala copiado");
  }