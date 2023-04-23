const texto = document.querySelector('input');
const btnInsert = document.querySelector('.insert button');
const btnDeleteAll = document.querySelector('.header button');
const ul = document.querySelector('ul');

var itens = []



btnDeleteAll.onclick = () => {
    itens = []
    updateItem();
}

texto.addEventListener('keypress', e => {
    if(e.key === 'Enter' && texto.value != ''){
        setItem() 
    }
})

btnInsert.onclick = () => {
    if(texto.value != ''){
        setItem()
    }
}

function setItem(){
    if(itens.length >= 20){
        alert('Limite máxima de 20')
        return
    }
    else {
        itens.push({'item': texto.value, 'status': ''})
    updateItem()
    }
   
}

function updateItem(){
    localStorage.setItem('todolist',  JSON.stringify(itens))
    loadItens()
}

function loadItens(){
    ul.innerHTML = "";
    itens = JSON.parse(localStorage.getItem('todolist')) ?? []
    itens.forEach((item, i) => {
        insertItemTela(item.item, item.status, i)
    })
} 

function insertItemTela(texto, status, i){
    const li = document.createElement('li')

    li.innerHTML = `
    <div class="divLi">
      <input type="checkbox" ${status} data-i=${i} onchange="done(this, ${i});" />
      <span data-si=${i}>${texto}</span>
      <button onclick="removeItem(${i})" data-i=${i}><img src="imagem/trash-solid.svg"></button>
    </div>
    `
    ul.appendChild(li);

    if(status){
        document.querySelector(`[data-si="${i}"]`).classList.add('line-through')
    }else {
        document.querySelector(`[data-si="${i}"]`).classList.remove('line-through');
    }

    texto.value = '';
}

function done(chk, i){
    if(chk.checked){
        itens[i].status = 'checked'
    }else{
        itens[i].status = ''
    }
    updateItem()
}

function removeItem(i){
    itens.splice(i, 1)
    updateItem()
}
