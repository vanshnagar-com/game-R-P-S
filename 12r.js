let score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties: 0
  };

 

  let isautoplaying = false;
  let intervalId ;

  document.querySelector('.js-autoplay-button')
  .addEventListener('click' , ()=>{
    autoplay();
  })


  // reset button event listner
  document.querySelector('.js-reset-button')
  .addEventListener('click' , () =>{
      addPara();
               //yes button
      document.querySelector('.yes-button')
      .addEventListener('click' , ()=>{
        score.wins = 0;
        score.losses = 0;
        score.ties = 0;
        localStorage.removeItem('score');
        updateScoreElement();
        document.querySelector('.para-div').innerHTML = '';
      })
  //no button
      document.querySelector('.no-button')
      .addEventListener('click' ,()=>{
        document.querySelector('.para-div').innerHTML = '';
          })
  })


  function autoplay(){
    if(!isautoplaying){
    intervalId =   setInterval(() => {
         const playerMove = pickComputerMove();
  
          playGame(playerMove);
        }
   ,1000);

   isautoplaying = true;
   document.querySelector('.js-autoplay-button').innerHTML = 'Stop Playing';
    }else{
      clearInterval(intervalId);
      isautoplaying = false;
      document.querySelector('.js-autoplay-button').innerHTML = 'Auto Play';
    }
    
    }

// on click function
    const choiceButton =  document.querySelector('.js-rock-button');

    choiceButton.addEventListener('click' ,() =>{
      playGame('rock');
    } )

    document.querySelector('.js-paper-button')
    .addEventListener('click', ()=>{
      playGame('paper');
    })

    document.querySelector('.js-scissors-button')
    .addEventListener('click', ()=>{
      playGame('scissors');
    })

// key down 
    document.body.addEventListener('keydown' , (event) =>{
      if(event.key === 'r'){
        playGame('rock');
      }else if(event.key === 'p'){
        playGame('paper');
      }else if(event.key === 's'){
        playGame('scissors');
      }else if(event.key === 'a'){
        autoplay();
      }else if(event.key === 'Backspace'){
        addPara();

         //yes button
     document.querySelector('.yes-button')
     .addEventListener('click' , ()=>{
       score.wins = 0;
       score.losses = 0;
       score.ties = 0;
       localStorage.removeItem('score');
       updateScoreElement();
       document.querySelector('.para-div').innerHTML = '';
     })
 //no button
     document.querySelector('.no-button')
     .addEventListener('click' ,()=>{
       document.querySelector('.para-div').innerHTML = '';
         })
      }
    })

    


  updateScoreElement();

   function playGame(playerMove) {
    const computerMove = pickComputerMove();

    let result = '';

    if (playerMove === 'scissors') {
      if (computerMove === 'rock') {
        result = 'You loose!!';
      } else if (computerMove === 'paper') {
        result = 'YOU WON!!';
      } else if (computerMove === 'scissors') {
        result = 'Tie.';
      }

    } else if (playerMove === 'paper') {
      if (computerMove === 'rock') {
        result = 'YOU WON!!';
      } else if (computerMove === 'paper') {
        result = 'Tie.';
      } else if (computerMove === 'scissors') {
        result = 'You loose!!';
      }
      
    } else if (playerMove === 'rock') {
      if (computerMove === 'rock') {
        result = 'Tie.';
      } else if (computerMove === 'paper') {
        result = 'You loose!!';
      } else if (computerMove === 'scissors') {
        result = 'YOU WON!!';
      }
      
    }

    if (result === 'YOU WON!!') {
      score.wins += 1;
    } else if (result === 'You loose!!') {
      score.losses += 1;
    } else if (result === 'Tie.') {
      score.ties += 1;
    }
    
    localStorage.setItem('score', JSON.stringify(score));



    updateScoreElement();
    document.querySelector('.js-result').innerHTML = `${result}`;
    document.querySelector('.js-guess').innerHTML = `you <img src="images/${playerMove}-emoji.png" class="choice-image"> <img src="images/${computerMove}-emoji.png" class="choice-image"> computer`;
  }


  

  function pickComputerMove() {
    const randomNumber = Math.random();

    let computerMove = '';

    if (randomNumber >= 0 && randomNumber < 1 / 3) {
      computerMove = 'rock';
    } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
      computerMove = 'paper';
    } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
      computerMove = 'scissors';
    }

    return computerMove;
  }

  function updateScoreElement(){
    document.querySelector('.js-score').innerHTML
   = ` Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
  }


  function addPara(){
    document.querySelector('.para-div').innerHTML = '<p class="para" >are you sure you want to reset score?<button class="yes-button glow-on-hover">Yes</button><button class="no-button glow-on-hover">No</button></p>'
       
  }
