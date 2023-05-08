const bodyElement = document.body
const container = document.getElementById('container')
let inputElement = document.createElement('input')
let buttonElement = document.createElement('button')
let divForm = document.createElement('div')
let divGrid = document.createElement('div')
let grid = document.createElement('div')


grid.className = ("grid")
divGrid.className = ('divGrid')
divForm.className = ('input-group mb-3, divForm')
inputElement.className = ("form-control")
buttonElement.className = ("btn btn-success")
buttonElement.innerHTML = "Начать"

bodyElement.append(container)
divForm.append(inputElement)
divForm.append(buttonElement)
container.append(divForm)
container.append(grid)


function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function fill () {
    function construction4x4() {
        let Array = []
        for (let i = 1; i<=8; i++){
            if(i<=8){
                Array.push(i)
                Array.push(i)
            }
        }
        shuffle(Array)
        for (let i = 0; i < Array.length; i++) {
            let block = document.createElement('div')
            let blockText = document.createElement('div')
            blockText.className = ('blockText')
            block.className = ('block')
            block.id = i
            blockText.textContent = Array[i]
            block.append(blockText)
            grid.append(block)
        }
    }
    function hideForAll() {
        let hideElement = document.querySelectorAll('.blockText')
        for (let i = 0; i<16; i++){
            hideElement[i].style.opacity = 0
        }
    }
    construction4x4()
    hideForAll()
}


function checkEndGame (){
    for (let i = 0; i<16; i++){
        let ID = document.getElementById("" + i)
        if (ID.style.opacity === "1"){
            alert("Игра окончена")
        }
    }
}

function game() {
    let opener = document.querySelectorAll('.blockText')
    let count = 0
    let firstClick = null
    let secondClick = null
    let firstClickContent = null
    let firstClickIndex = null
    let secondClickContent = null
    let secondClickIndex = null
    let isFirstClick = true

    for (let i = 0; i < opener.length; i++) {
        opener[i].addEventListener("click", () => {
            if (isFirstClick) {
                let index = document.getElementById('' + i)
                firstClick = opener[i]
                firstClickContent = opener[i].textContent
                firstClickIndex = index
                firstClick.style.opacity = 1
                isFirstClick = false
                count++
            } else {
                let index = document.getElementById('' + i)
                secondClick = opener[i]
                secondClickContent = opener[i].textContent
                secondClickIndex = index
                secondClick.style.opacity = 1
                isFirstClick = true
                count++
            }
            if (count === 2){
                if(firstClickContent === secondClickContent && firstClickIndex!==secondClickIndex){
                    console.log("Поздравляю вы нашли пару")
                    count = 0
                    checkEndGame()
                }else {
                    setTimeout(()=> {
                        console.log("Не угадали")
                        firstClick.style.opacity = 0
                        secondClick.style.opacity = 0
                        count = 0
                    }, 300)
                }
            }
        })
    }
}

function start (){
    alert("Введите 4x4, что бы начать игру")
    buttonElement.addEventListener('click', () =>{
        if (inputElement.value === "4х4" || inputElement.value === "4x4"){
            alert("Вы можете начать игру")
            game()
            buttonElement.disabled = true
        }else{
         alert ("Введите размер поля (4х4), что бы начать игру")
        }
    })
}


start()
fill()