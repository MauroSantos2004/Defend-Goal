// Temos que encontrar altura e largura da página
var vidas = 1
var altura = 0
var largura = 0
var score = 0
var intervalo_de_tempo = 30
var criador_de_bola_tempo = 2000
 
// Por que colocamos uma variável fora e outra dentro da function ? 
// Para termos a alteração dentro da function, sendo afetado a altura ou largura do escopo global

function ajustar_tamanho(){
    altura = window.innerHeight 
    largura = window.innerWidth
}

ajustar_tamanho()// Dessa forma, nossas variáveis vai receber sempre a altura e largura atual da tela.

var cronometro = setInterval(function(){// nossa função para decrementar o cronômetro e por um break

    intervalo_de_tempo -=1

    
    if(intervalo_de_tempo < 0){
        clearInterval(cronometro)//Elimina a função para a memória da aplicação
        clearInterval(criar_bola)
        window.location.href = 'game_vitoria.html'
    }else{
        document.getElementById('cronometro').innerHTML = intervalo_de_tempo
    }
},1000)




function posicoes_aleatorias(){//Foi necessário encapsular tal código por causa da ordem de precedência.
    //Criar posições randomicas

    //Remover o bola anterior, caso exista.
    if(document.getElementById('bola')){
        document.getElementById('bola').remove()

        if(vidas > 5){// caso perca os 5 corações, acontece o game over!
            window.location.href = 'game_over.html'
        }else{
            document.getElementById('vida'+vidas).src='imagens/imagens/coracao_vazio.png'// Através desse código podemos recuperar o id da barra de vida e conseguir mudar a imagem para o coração vazio
        vidas++

        }
    }


    var position_X = Math.floor(Math.random() * largura) - 90
    var position_Y = Math.floor(Math.random() * altura) - 90

    position_X = position_X < 0 ? 0 :position_X// operador ternário, para caso a posição randomica seja igual a 0, lembrando que caso seja igual a 0, será -90 a posição, saindo assim da tela 
    position_Y = position_Y < 0 ? 0 :position_Y


    //Criação do elemento html
    var bola = document.createElement('img')
    bola.src = 'imagens/imagens/bola.png'//Estamos criando o elemento de forma dinâmica e atribuindo o elemento para o body da página
    bola.className = tamanhos_variaveis() + ' '+ olhar_direito_ou_esquerdo()// Dessa forma, capturamos o estilo criado para a class bola
    //Toda vez que utilizamos (bola.src) por exemplo, estamos fazendo uma referência para o objeto imagem criado a cima
    bola.style.left = position_X + 'px'//Aqui que estamos definindo as posições na tela
    bola.style.top = position_Y + 'px'
    bola.style.position = 'absolute'
    //Estamos posicionando dinamicamente a imagens

    bola.id = 'bola'


    bola.onclick = function(){
        this.remove()
        score++
        document.getElementById('score').innerHTML = score

    }//Nessa parte colocamos uma função para remover o nosso elemento 'bola' caso haja uma determinada ação sobre ele (click)



    document.body.appendChild(bola)//Estamos adicionando um filho para o body
    
    
}


//Tamanhos diferentes
function tamanhos_variaveis(){
    var classe = Math.floor(Math.random() * 4)
    //Foi criado essa função com o intuito de randomizar o tamanho do bola. Dependendo do valor randômico ele retornara o nome da
    // classe que mudará o tamanho da imagem do bola
    if(classe == 0){
        return 'bola'
    }
    if (classe==1) {
        return 'bola2'
    } 
    if(classe==2){
        return 'bola3'
    }else{
        return 'bola'
    }
}


//Qual lado o bola irá olhar
function olhar_direito_ou_esquerdo(){
    var classe = Math.floor(Math.random()*2)

    if(classe==0){
        return 'Lado_A'
    }else{
        return 'Lado_B'
    }
}



//Extrair o nível que é extraido da página Index



var nivel_da_play = window.location.search
nivel_da_play = nivel_da_play.replace('?', '')

if(nivel_da_play === 'normal'){
    //2000 = 2s
    criador_de_bola_tempo = 2000
}else if(nivel_da_play==='dificil'){
    //1500 = 1.5s
    criador_de_bola_tempo = 1500
}else if(nivel_da_play==='very_hard'){
    //750 = 0.5s
    criador_de_bola_tempo = 750
}

//Controlar o cronêmtro pelo o nivel
if(nivel_da_play === 'normal'){
    //2000 = 2s
    intervalo_de_tempo = 30
}else if(nivel_da_play==='dificil'){
    //1500 = 1.5s
    intervalo_de_tempo = 20
}else if(nivel_da_play==='very_hard'){
    //750 = 0.5s
    intervalo_de_tempo = 15
}
