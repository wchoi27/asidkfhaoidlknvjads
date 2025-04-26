document.addEventListener("DOMContentLoaded", function() {
  // Array for Questions
  var questionArray = [
    "What is the capital of Australia?",
    "What is the capital of Liberia?",
    "What is the capital of Taiwan?",
    "What is the capital of Japan?",
    "What is the capital of China?",
    "What is the capital of Turkey?",
    "What is the capital of Colombia?",
    "What is the capital of India?"
  ];

  // Array For Answers
  var answerArray = [
    ["Canberra", "Melbourne", "Sydney", "Darwin"],
    ["Arthington", "Monrovia", "Tuzon", "Marshall"],
    ["Tainan City", "Taichung", "Taipei", "Hsinchu"],
    ["Kyoto", "Hiroshima", "Tokyo", "Osaka"],
    ["Hong Kong", "Macau", "Shanghai", "Beijing"],
    ["Ankara", "Istanbul", "Antalya", "Bursa"],
    ["Medellin", "Bogota", "Cartagena", "Cali"],
    ["Mumbai", "Hyderabad", "Bangalore", "New Delhi"]
  ];

  //Array of Correct Answers
  var correctAnswers = [
    "A. Canberra",
    "B. Monrovia",
    "C. Taipei",
    "C. Tokyo",
    "D. Beijing",
    "A. Ankara",
    "B. Bogota",
    "D. New Delhi"
  ];

  // Store correct anwers no
  let correctAnswersNo = 0;
  // store wrong answers no
  let wrongAnswersNo = 0;
  // store no of quetsions that are not answered
  let unAnsweredNo = 0;
  // initial timecount for timer
  let timecount = 30;
  // store interval for clearing it
  let interval = '';
  // //Select Start Quiz Button 
  let startBtn = document.getElementById('start-button');
  //timer element
  let timer = document.querySelector('.timer_block');
  // select QnA Block Element
  let questionBlock = document.querySelector('.que-n-ans_block');

  // timer function
  let time = function (questionIndex) {
    // clearTimeout(time);
    if (timecount === 0) {
      //no of questions that are not answered increased
      unAnsweredNo++;
      // called repeat function after 30 s
      repeat(questionIndex + 1, questionArray.length);
      return;
    }
    // set the value of timer in  html
    timer.innerHTML = `<p class="center">Time Left : <span class="time">${timecount}</span></p>`;
    // derease timecount
    timecount--;
    //reassign the interval tp setTimeout() to clear it after
    interval = setTimeout(() => {
      return time(questionIndex);
    }, 1000);
  }

  // function for display options that take array and index
  let displayOptions = function(ansarr, index) {
    let optionBlock = '';
    // use map to work on every item in answerarray and then manipulate it
    return optionBlock += ansarr[index].map((item) => {
      return(
        `<button class="option">${item}</button>`
      )
    }).join('');
  }

  // display Qns and Options set t
  let displayQnABlock = function(qnsarr, index) {
    return `<div class="question">
      <p class="question">Q${index+1}- ${qnsarr[index]}</p>
    </div>
    <div class="options_block">
      ${displayOptions(answerArray, index)}
    </div>`; // return the set of set of question and it's option
  }

  // store elemt for display msg when ans is correct
  let correctAnswerBlock = document.querySelector('.correct');
  // store elemt for display msg when ans is wrong
  let wrongAnswerBlock = document.querySelector('.wrong');

  // let hide blocks when  an options cliked for show msg of answer is
  //right or not
  let hideBlocks = function() {
    timer.style.display = 'none';
    questionBlock.style.display = 'none';
  }

  // let show blocks after showing msg of answer is
  //right or not
  let showBlock = function() {
    timer.style.display = 'block';
    questionBlock.style.display = 'block';
  }

  // function for checkoptions that is correct or not
  let checkOptions = function(elm, correctArr, index) {
    elm.forEach(option => { // set event to every option
      option.addEventListener('click', (e) => {
        if (e.target.innerHTML === correctArr[index].split(' ')[1]) { //if it is correct the n
          correctAnswersNo++; // increase no of correct answer
          // clearTimeout(time);

          hideBlocks();
          correctAnswerBlock.style.display = 'block'; // show correct answer msg block
          
          setTimeout(() => {
            showBlock();
            correctAnswerBlock.style.display = 'none'; 
            repeat(1+index, questionArray.length);
          }, 1500);
        } else {
          wrongAnswersNo++; // else increase the number of the wrong answers
          // clearTimeout(time);
          hideBlocks();
          wrongAnswerBlock.style.display = 'block'; // show wrong answer msg block

          setTimeout(() => {
            showBlock();
            wrongAnswerBlock.style.display = 'none';
            repeat(1+index, questionArray.length); 
          }, 1500);
        }
      });
    });
  }

  // function for display player stats at the end of the game
  let displayStats = function() {
    let main = document.querySelector('main'); // select the main block
    main.innerHTML =  ` 
      <h2 class="stat_header">Your Statics</h2>
      <div class="display_stat_block">
        <div class="answer_count_block"><span> Correct Answers = </span><span id="correct-answer">${correctAnswersNo}</span></div>
        <div class="answer_count_block"><span> Wrong Answers = </span><span id="wrong-answer">${wrongAnswersNo}</span></div>
        <div class="answer_count_block"><span> UnAnswered = </span><span id="answer-not">${unAnsweredNo}</span></div>  
      </div>
    ` // add the all stat block in the main
  }

  //repeat function take intial index and eleemnt length
  let repeat = function (i, elmLen) {
    if (i >= elmLen) {
      displayStats();  // at the end of all question displaty stats
      return; // call end here
    }
    
    timecount = 30; // set timecount to 30 when ever the repeat called
    clearTimeout(interval); // clearing  the timeout i.e stored in interval variable

    time(i); // calling time() after clearing setTimeout()

    questionBlock.innerHTML = displayQnABlock(questionArray, i); //set question block to value of display QnAns() 

    let options = document.querySelectorAll('.option');  
    checkOptions(options, correctAnswers, i); // call checkOptions for chacing the options
  }

  // function for stating game
  let startGame = function () {
    // calling repeat() function for setting questions
    repeat(0, questionArray.length);
    // hide startBtn when it clicked
    startBtn.style.display = 'none';
  }

  //Initialize function
  function init() {
    // set an event listner to the  startBtn for starting game
    startBtn.addEventListener('click', startGame); 
  }
  //calling initialized function
  init()

})
