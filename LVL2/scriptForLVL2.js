var $gameZone = document.querySelector('.game-zone')
var $score = document.querySelector('#score')
var $button = document.querySelector('button')
var $blocks = document.querySelectorAll('.blocks')
var $timer = document.querySelector('.timer')

var isGameStarted = false
var score = 0
var first
var block1
var lifes
var clickCounter = 0
var time = 0.0
var interval

hide($gameZone)

$gameZone.addEventListener('click', blockClicked)
$button.addEventListener('click', startGame)



function showWorkspace(){
    showAllBlocks()
    setTimeout(function(){
        show(document.querySelector('#box1'))
        show(document.querySelector('#box2'))
        show(document.querySelector('#box3'))
        show(document.querySelector('#box4'))
        show(document.querySelector('#box5'))
        show(document.querySelector('#box6'))
        show(document.querySelector('#box7'))
        show(document.querySelector('#box8'))
        show(document.querySelector('#box9'))
        show(document.querySelector('#box10'))
        show(document.querySelector('#box11'))
        show(document.querySelector('#box12'))
        interval = showTime()
        isGameStarted = true
    },3000)

}

function hide(block) {
    block.style.visibility = 'hidden'
}

function show(block) {
    block.style.visibility = ''
}

function startGame(){
    lifes = 3
    score = 0
    time = 0.0
    $timer.textContent = 'Время игры: ' + time.toFixed(1) + ' sec'
    show($gameZone)
    $button.style.visibility = 'hidden'
    document.querySelector('.lose-block').style.visibility = 'hidden'
    document.querySelector('.win-block').style.visibility = 'hidden'
    renderBlocks()
    showWorkspace()
}

function blockClicked(event) {
    if(!event.target.dataset.box || isGameStarted === false) return

    if (clickCounter === 0) {
        block1 = event.target
        first = block1.getAttribute('content')
    }

    hide(block1)
    clickCounter++

    if (clickCounter === 2) {
        clickCounter = 0
        hide(event.target)
        if (first !== event.target.getAttribute('content')) {
            lifes--
            if (lifes === 0) {
                loseGame()
                return
            }

            disableBlocks()
            
            setTimeout(function() {
                show(block1)
                show(event.target)
                $score.textContent = 'Осталось попыток: ' + lifes
                enableBlocks()
            },1000)
            
        } else {
            score += 1
            if(score === 6) winGame()
        }
    } 
}

function showTime() {
    setInterval(function() {
        if (isGameStarted)
        $timer.textContent = 'Время игры: ' + (time+=0.1).toFixed(1) + ' sec'
    },100)
}

function loseGame() {
    isGameStarted = false
    $score.textContent = 'Осталось попыток: ' + lifes
    showAllBlocks()
    document.querySelector('.lose-block').style.visibility = 'visible'
    $button.style.visibility = 'visible'
    $button.textContent = 'Попробовать еще раз'
}

function winGame() {
    isGameStarted = false
    document.querySelector('.win-block h1').textContent = 'Подзравляем! Вы справились за ' + time.toFixed(1) + ' секунд'
    document.querySelector('.win-block').style.visibility = 'visible'
    clearInterval(interval)
    $button.style.visibility = 'visible'
    $button.textContent = 'Сыграть еще раз'
}

function showAllBlocks(){
    hide(document.querySelector('#box1'))
    hide(document.querySelector('#box2'))
    hide(document.querySelector('#box3'))
    hide(document.querySelector('#box4'))
    hide(document.querySelector('#box5'))
    hide(document.querySelector('#box6'))
    hide(document.querySelector('#box7'))
    hide(document.querySelector('#box8'))
    hide(document.querySelector('#box9'))
    hide(document.querySelector('#box10'))
    hide(document.querySelector('#box11'))
    hide(document.querySelector('#box12'))
}

function renderBlocks() {
    var arrayCounter = 0;
    var blockPositions = [[170,100],[170,270],[170,440],[170,610],[330,100],[330,270],[330,440],[330,610],[490,100],[490,270],[490,440],[490,610]]
    var number

        for(var i = 0; i < $blocks.length; i++ ) {
            number = getRandom(0,blockPositions.length)
            while (blockPositions[number] === -1) {
                number = arrayCounter++   
            }
            $blocks[i].style.top = blockPositions[number][0] + 'px'
            $blocks[i].style.left = blockPositions[number][1] + 'px'
            blockPositions[number] = -1
    }
}

function getRandom(min, max){
    return parseInt(Math.random()*(max-min)+min)
}

function disableBlocks() {
    document.querySelector('#box1').style.pointerEvents = 'none'
    document.querySelector('#box2').style.pointerEvents = 'none'
    document.querySelector('#box3').style.pointerEvents = 'none'
    document.querySelector('#box4').style.pointerEvents = 'none'
    document.querySelector('#box5').style.pointerEvents = 'none'
    document.querySelector('#box6').style.pointerEvents = 'none'
    document.querySelector('#box7').style.pointerEvents = 'none'
    document.querySelector('#box8').style.pointerEvents = 'none'
    document.querySelector('#box9').style.pointerEvents = 'none'
    document.querySelector('#box10').style.pointerEvents = 'none'
    document.querySelector('#box11').style.pointerEvents = 'none'
    document.querySelector('#box12').style.pointerEvents = 'none'
}

function enableBlocks() {
    document.querySelector('#box1').style.pointerEvents = 'all'
    document.querySelector('#box2').style.pointerEvents = 'all'
    document.querySelector('#box3').style.pointerEvents = 'all'
    document.querySelector('#box4').style.pointerEvents = 'all'
    document.querySelector('#box5').style.pointerEvents = 'all'
    document.querySelector('#box6').style.pointerEvents = 'all'
    document.querySelector('#box7').style.pointerEvents = 'all'
    document.querySelector('#box8').style.pointerEvents = 'all'
    document.querySelector('#box9').style.pointerEvents = 'all'
    document.querySelector('#box10').style.pointerEvents = 'all'
    document.querySelector('#box11').style.pointerEvents = 'all'
    document.querySelector('#box12').style.pointerEvents = 'all'
}

