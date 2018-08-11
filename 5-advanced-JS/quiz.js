var Question = function(question, options, answer) {
  this.question = question;
  this.options = options;
  this.answer = answer;
}

var Quiz = function(questions) {
  this.questions = questions;
  this.score = 0;

  this.chooseQuestion = function() {
    var r = Math.floor(Math.random() * this.questions.length);
    return this.questions[ r ];
  }

  this.askQuestion = function(question) {
    var message = 'Current Score: ' + this.score
                    + '\n\n' + question.question;
    for (var option in question.options) {
      message += '\n' + option + ': ' + question.options[ option ];
    }
    return prompt(message);
  }

  this.play = function() {
    var question = this.chooseQuestion();
    var chosen = this.askQuestion(question);

    if (chosen == question.answer) {
      alert('Correct! The answer is ' + question.options[ question.answer ]);
      this.score++;
    }
    else if (chosen === 'quit' || chosen === null)
      return;
    else
      alert('Better luck next time!');

    this.play();
  }
}

var quiz = new Quiz([
  new Question(
    'What phone do you have?',
    ['iPhone', 'OnePlus', 'Samsung', 'Nokia'],
    1
  ),
  new Question(
    'What is the name of your dog?',
    ['Bobby', 'Bernard', 'Boris'],
    0
  )
]);

quiz.play();
