document.addEventListener('DOMContentLoaded', () => {
	// Global variables
	let isPlayerOne = true;
	let someoneWins = false;
	let turns = 0;
	const turnsMax = 9;
	let time = 0;
	const winCombinations = [
		['f-0', 'f-1', 'f-2'],
		['f-3', 'f-4', 'f-5'],
		['f-6', 'f-7', 'f-8'],
		['f-0', 'f-3', 'f-6'],
		['f-1', 'f-4', 'f-7'],
		['f-2', 'f-5', 'f-8'],
		['f-0', 'f-4', 'f-8'],
		['f-2', 'f-4', 'f-6'],
	];

	// The game
	function game() {
		// Game variables
		const fields = document.getElementsByClassName('field');

		// Iterate through all fields and set click handler
		for (let i = 0; i < fields.length; i++) {
			const field = fields.item(i);

			// Set click handler
			field.addEventListener('click', function () {
				// Check field state
				if (field.querySelector('.value').innerText != '') return;

				// Set player symbol
				const playerSymbol = isPlayerOne ? 'X' : 'O';
				field.querySelector('.value').innerText = playerSymbol;
				field.setAttribute('data-player-symbol', playerSymbol);
				field.classList.add('font-' + playerSymbol);

				// Add turn
				turns++;

				// Wait for render Symbol
				setTimeout(() => {
					// Check winner
					checkWinner(playerSymbol);
					// Check full field
					if (turns === turnsMax && !someoneWins) {
						if (window.confirm('Field is full, no one wins!')) {
							window.location.reload();
						}
					}
					// Toggle player
					if (!someoneWins) {
						isPlayerOne = !isPlayerOne;
						document.getElementById('player-info').querySelector('.value').innerText = isPlayerOne
							? '1'
							: '2';
					}
				}, 10);
			});
		}
	}

	// Set Timer
	function setTimer() {
		setInterval(() => {
			time++;
			document.getElementById('time-info').querySelector('.value').innerText = time;
		}, 1000);
	}

	function checkWinner(playerSymbol) {
		let win = 0;
		let playerFields = Array.from(document.querySelectorAll(`.field[data-player-symbol=${playerSymbol}]`));
		playerFields = playerFields.map((x) => x.id);

		return winCombinations.forEach((comp) => {
			win = 0;
			return playerFields.forEach((field) => {
				if (comp.includes(field)) win++;
				if (win === 3) {
					someoneWins = true;
					if (window.confirm(`Player ${isPlayerOne ? 1 : 2} wins!`)) {
						window.location.reload();
					}
				}
			});
		});
	}

	game();
	setTimer();
});

// Refresh Button
document.getElementById('restart-button').addEventListener('click', () => {
	window.location.reload();
});
