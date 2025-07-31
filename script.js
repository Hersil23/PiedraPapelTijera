document.addEventListener('DOMContentLoaded', function() {
  const choices = ['piedra', 'papel', 'tijera'];
  const results = {
      wins: 0,
      losses: 0,
      draws: 0,
      history: []
  };
  let roundsPlayed = 0;

  document.querySelectorAll('.choice').forEach(button => {
      button.addEventListener('click', function() {
          if (roundsPlayed < 5) {
              const userChoice = this.id;
              const computerChoice = choices[Math.floor(Math.random() * choices.length)];
              const result = determineWinner(userChoice, computerChoice);
              updateResults(result);
              updateHistory(userChoice, computerChoice);
              roundsPlayed++;
              if (roundsPlayed === 5) {
                  finalizeGame();
              }
          }
      });
  });

  function determineWinner(user, computer) {
      if (user === computer) {
          return 'draw';
      } else if (
          (user === 'piedra' && computer === 'tijera') ||
          (user === 'papel' && computer === 'piedra') ||
          (user === 'tijera' && computer === 'papel')
      ) {
          return 'win';
      } else {
          return 'lose';
      }
  }

  function updateResults(result) {
      if (result === 'win') {
          results.wins++;
          alert('¡Ganaste esta ronda!');
      } else if (result === 'lose') {
          results.losses++;
          alert('¡Perdiste esta ronda!');
      } else {
          results.draws++;
          alert('¡Empate!');
      }

      document.getElementById('wins').textContent = results.wins;
      document.getElementById('losses').textContent = results.losses;
      document.getElementById('draws').textContent = results.draws;
  }

  function updateHistory(userChoice, computerChoice) {
      const historyList = document.getElementById('historyList');
      const listItem = document.createElement('li');
      listItem.textContent = `Usuario: ${userChoice} - Computadora: ${computerChoice}`;
      historyList.prepend(listItem);

      results.history.push({ user: userChoice, computer: computerChoice });
      if (results.history.length > 5) {
          results.history.shift();
          historyList.removeChild(historyList.lastChild);
      }
  }

  function finalizeGame() {
      const wins = results.wins;
      const losses = results.losses;
      if (wins > losses) {
          alert('¡Felicidades! Eres el ganador del juego.');
      } else if (losses > wins) {
          alert('¡La computadora gana el juego! Mejor suerte la próxima vez.');
      } else {
          alert('¡Es un empate en el juego!');
      }

      // Reset game
      results.wins = 0;
      results.losses = 0;
      results.draws = 0;
      results.history = [];
      roundsPlayed = 0;
      document.getElementById('historyList').innerHTML = '';
  }
});