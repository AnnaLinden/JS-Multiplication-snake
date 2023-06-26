document.addEventListener('DOMContentLoaded', function() {
    const squares = document.querySelectorAll('.grid div');
    const scoreDisplay = document.querySelector('span');
    const startBtn = document.querySelector('.start');

    const width = 10;
    let currentIndex = 0; // first div in our grid
    let foodIndex = 0; // first div in our grid
    let currentSnake = [2,1,0]; // the div in our grid being 2 (or the HEAD), and 0 being the end (TAIL, with all 1's being the body from now on)
    let direction = 1;
    let score = 0;
    let speed = 0.9;
    let intervalTime = 0;
    let interval = 0;

    // to start, and restart the game
    function startGame() {
        currentSnake.forEach(index => squares[index].classList.remove('snake'));
        squares[foodIndex].classList.remove('food');
        clearInterval(interval);
        score = 0;
        randomFood();
        direction = 1;
        scoreDisplay.innerText = score;
        intervalTime = 1000;
        currentSnake = [2,1,0];
        currentIndex = 0;
        currentSnake.forEach(index => squares[index].classList.add('snake'));
        interval = setInterval(moveOutcomes, intervalTime);
    }

    // function that deals with ALL the move outcomes of the Snake
    function moveOutcomes() {
        // deals with snake hitting border and snake hitting self
        if (
            (currentSnake[0] + width >= (width * width) && direction === width) || // if snake hits bottom
            (currentSnake[0] % width === width -1 && direction === 1) || // if snake hits right wall
            (currentSnake[0] % width === 0 && direction === -1) || // if snake hits left wall
            (currentSnake[0] - width < 0 && direction === -width) || // if snake hits the top
            squares[currentSnake[0] + direction].classList.contains('snake') // if snake goes into itself
        ) {
            return clearInterval(interval); // this will clear the interval if any of the above happen
        }   
        // removes last element from our currentSnake array
        const tail = currentSnake.pop();
        // removes styling from last element
        squares[tail].classList.remove('snake');
        // adds square in direction we are heading
        currentSnake.unshift(currentSnake[0] + direction);
        // deals with snake getting food
        if(squares[currentSnake[0]].classList.contains('food')) {
            // removes the class of food
            squares[currentSnake[0]].classList.remove('food');
            // grows our snake by adding class of snake to it
            squares[tail].classList.add('snake');
            // grow our snake array
            currentSnake.push(tail);
            // generate new food
            randomFood();
            // add one to the score
            score++;
            // display our score
            scoreDisplay.textContent = score;
            // speed up our snake
            clearInterval(interval);
            intervalTime = intervalTime * speed;
            interval = setInterval(moveOutcomes, intervalTime);
        }
        squares[currentSnake[0]].classList.add('snake');
    }

    // generate new food once food is eaten
    function randomFood() {
        do{
            foodIndex = Math.floor(Math.random() * squares.length);
        } while(squares[foodIndex].classList.contains('snake')) // making sure food doesnt appear on the snake
        squares[foodIndex].classList.add('food');
    }


        // if snake goes into itself

        //assign functions to keycodes
        function control(e) {
            squares[currentIndex].classList.remove('snake');

            if(e.keyCode === 39) {
                direction = 1; // if we press the right arrow on our keyboard, the snake will go right one
            } else if (e.keyCode === 38) {
                direction = -width; // if we press the up arrow, the snake will go back ten divs, appearing to go up
            } else if (e.keyCode === 37) {
                direction = -1; // if we press left, the snake will go left one div
            } else if (e.keyCode === 40) {
                direction = +width; // if we press down, the snake head will instantly appear in the div ten divs from where you are now
            }
        }

        document.addEventListener('keyup', control);
        startBtn.addEventListener('click', startGame);

        
    



});