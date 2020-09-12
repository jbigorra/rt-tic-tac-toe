describe('Tic-tac-toe', () => {
  describe('Game should', () => {
    const playerOneId = 'player1';
    const playerTwoId = 'player2';

    it('Start with empty board and two players and player 1 as current player', () => {
      const match = new TicTacToe(playerOneId, playerTwoId);
      const emptyBoard = [['', '', ''], ['', '', ''], ['', '', '']];

      expect(match.board).toMatchObject(emptyBoard);
      expect(match.playerOne.id).toBe(playerOneId);
      expect(match.playerTwo.id).toBe(playerTwoId);
      expect(match.playerInTurn.id).toBe(playerOneId);
    });

    it('Let play player 1 turn and switch playerInTurn to be player 2', () => {
      const match = new TicTacToe(playerOneId, playerTwoId);
      const boardWithOneturnPlayed = [['', 'X', ''], ['', '', ''], ['', '', '']];

      match.playTurn(playerOneId, { x: 1, y: 0 });

      expect(match.board).toMatchObject(boardWithOneturnPlayed);
      expect(match.playerInTurn.id).toBe(playerTwoId);
    });

    it('Let player 2 play 2nd turn and switch playerInTurn to be player 1', () => {
      const match = new TicTacToe(playerOneId, playerTwoId);
      match.playTurn(playerOneId, { x: 1, y: 0 });
      const boardWithTwoturnsPlayed = [['', 'X', ''], ['', '', ''], ['', '', 'O']];

      match.playTurn(playerTwoId, { x: 2, y: 2 });

      expect(match.board).toMatchObject(boardWithTwoturnsPlayed);
      expect(match.playerInTurn.id).toBe(playerOneId);
    });

    it('Let player 1 play 3rd turn and switch playerInTurn to be player 2', () => {
      const match = new TicTacToe(playerOneId, playerTwoId);
      match.playTurn(playerOneId, { x: 1, y: 0 });
      match.playTurn(playerTwoId, { x: 2, y: 2 });
      const boardWithThreeturnsPlayed = [['', 'X', 'X'], ['', '', ''], ['', '', 'O']];

      match.playTurn(playerOneId, { x: 2, y: 0 });

      expect(match.board).toMatchObject(boardWithThreeturnsPlayed);
      expect(match.playerInTurn.id).toBe(playerTwoId);
    });

    it('Throw if playerId does not match player in turn', () => {
      const match = new TicTacToe(playerOneId, playerTwoId);

      expect(() => {
        match.playTurn(playerTwoId, { x: 2, y: 0 });
      }).toThrowError(TicTacToe.ERRORS.WRONG_PLAYER);

      expect(match.board).toMatchObject(emptyBoard);
      expect(match.playerInTurn.id).toBe(playerOneId);
    });

    it('Finish when some row has the same values', () => {
      const board = [['', 'X', 'X'], ['', '', ''], ['0', '', 'O']];
      const match = new TicTacToe(playerOneId, playerTwoId, board);

      match.playTurn(playerOneId, { x: 0, y: 0 });

      const expectedBoardAfterWin = [['X', 'X', 'X'], ['', '', ''], ['0', '', 'O']];
      expect(match.board).toMatchObject(expectedBoardAfterWin);
      expect(match.completed).toBeTruthy();
      expect(match.winner.id).toBe(playerOneId);
    });

    it('Finish when some colum has the same values', () => {
      const board = [['X', '', 'O'], ['X', '', ''], ['', '', 'O']];
      const match = new TicTacToe(playerOneId, playerTwoId, board);

      match.playTurn(playerOneId, { x: 0, y: 2 });

      const expectedBoardAfterWin = [['X', '', 'O'], ['X', '', ''], ['X', '', 'O']];
      expect(match.board).toMatchObject(expectedBoardAfterWin);
      expect(match.completed).toBeTruthy();
      expect(match.winner.id).toBe(playerOneId);
    });
  });
});

// Add test case for when the board is full and the game is finished without a winner\
// Add test case for diagonals

const emptyBoard = [['', '', ''], ['', '', ''], ['', '', '']];
const xSymbol = 'X';
const oSymbol = 'O';

class TicTacToe {
  constructor (playerOneId, playerTwoId, boardWithProgress) {
    this.board = boardWithProgress || emptyBoard;
    this.playerOne = { id: playerOneId, symbol: xSymbol };
    this.playerTwo = { id: playerTwoId, symbol: oSymbol };
    this.playerInTurn = this.playerOne;
    this.winner = null;
    this.completed = this.evaluateGameCompletion();
  }

  playTurn (playerId, playerMove = {}) {
    if (playerId !== this.playerInTurn.id) throw new Error(TicTacToe.ERRORS.WRONG_PLAYER);

    const { x, y } = playerMove;

    this.board[y][x] = this.playerInTurn.symbol;
    this.evaluateGameCompletion(this.playerInTurn);

    this.playerInTurn = this.playerInTurn.id === this.playerOne.id ? this.playerTwo : this.playerOne;
  }

  evaluateGameCompletion (player) {
    if (this.rowHasSameSymbol() || this.columHasSameSymbol() || this.diagonalHasSameSymbol()) {
      this.completed = true;
      this.winner = player;
      return;
    }

    if (this.boardIsFull()) {
      this.completed = true;
    }
  }

  rowHasSameSymbol () {
    const rowHasSameSymbol = (row) => {
      const firstValue = row[0];
      return row.every(value => value === firstValue);
    };

    return this.board.some(rowHasSameSymbol);
  }

  columHasSameSymbol () {
    let hasValidColumn = false;
    for (let x = 0; x < this.board.length; x++) {
      const initialValue = this.board[x][0];
      for (let y = 0; y < this.board.length; y++) {
        const value = this.board[y][x];
        if (initialValue !== value) {
          break;
        }
        if (y === this.board.length - 1) hasValidColumn = true;
      }
    }

    return hasValidColumn;
  }

  diagonalHasSameSymbol () {
    return false;
  }

  boardIsFull () {
    return false;
  }

  _setPlayerInTurn (playerId) {
    const symbol = playerId === this.playerOne.id ? this.playerOne.symbol : this.playerTwo.symbol;
    this.playerInTurn = { id: playerId, symbol };
  }
}

TicTacToe.ERRORS = {
  WRONG_PLAYER: 'Attempt to play turn failed because player in turn ID does not match'
};
