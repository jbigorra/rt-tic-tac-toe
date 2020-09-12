describe('Tic-tac-toe', () => {
  describe('Game should', () => {
    const playerOneId = 'player1';
    const playerTwoId = 'player2';

    it('start with empty board and two players and player 1 as current player', () => {
      const match = new TicTacToe(playerOneId, playerTwoId);
      const emptyBoard = [['', '', ''], ['', '', ''], ['', '', '']];

      expect(match.board).toMatchObject(emptyBoard);
      expect(match.playerOne.id).toBe(playerOneId);
      expect(match.playerTwo.id).toBe(playerTwoId);
      expect(match.playerInTurn.id).toBe(playerOneId);
    });

    it('let play player 1 turn and switch playerInTurn to be player 2', () => {
      const match = new TicTacToe(playerOneId, playerTwoId);
      const boardWithOneturnPlayed = [['', 'X', ''], ['', '', ''], ['', '', '']];

      match.playTurn(playerOneId, { x: 1, y: 0 });

      expect(match.board).toMatchObject(boardWithOneturnPlayed);
      expect(match.playerInTurn.id).toBe(playerTwoId);
    });

    it('let player 2 play 2nd turn and switch playerInTurn to be player 1', () => {
      const match = new TicTacToe(playerOneId, playerTwoId);
      match.playTurn(playerOneId, { x: 1, y: 0 });
      const boardWithTwoturnPlayed = [['', 'X', ''], ['', '', ''], ['', '', 'O']];

      match.playTurn(playerTwoId, { x: 2, y: 2 });

      expect(match.board).toMatchObject(boardWithTwoturnPlayed);
      expect(match.playerInTurn.id).toBe(playerOneId);
    });

    it('let player 1 play 3rd turn and switch playerInTurn to be player 2', () => {
      const match = new TicTacToe(playerOneId, playerTwoId);
      match.playTurn(playerOneId, { x: 1, y: 0 });
      match.playTurn(playerTwoId, { x: 2, y: 2 });
      const boardWithTwoturnPlayed = [['', 'X', 'X'], ['', '', ''], ['', '', 'O']];

      match.playTurn(playerOneId, { x: 2, y: 0 });

      expect(match.board).toMatchObject(boardWithTwoturnPlayed);
      expect(match.playerInTurn.id).toBe(playerTwoId);
    });

    it('throw if playerId does not match player in turn', () => {
      const match = new TicTacToe(playerOneId, playerTwoId);

      expect(() => {
        match.playTurn(playerTwoId, { x: 2, y: 0 });
      }).toThrowError(TicTacToe.ERRORS.WRONG_PLAYER);

      expect(match.board).toMatchObject(emptyBoard);
      expect(match.playerInTurn.id).toBe(playerOneId);
    });
  });
});

const emptyBoard = [['', '', ''], ['', '', ''], ['', '', '']];

class TicTacToe {
  constructor (playerOneId, playerTwoId) {
    this.board = emptyBoard;
    this.playerOne = { id: playerOneId, symbol: 'X' };
    this.playerTwo = { id: playerTwoId, symbol: 'O' };
    this.playerInTurn = this.playerOne;
  }

  playTurn (playerId, playerMove = {}) {
    if (playerId !== this.playerInTurn.id) throw new Error(TicTacToe.ERRORS.WRONG_PLAYER);

    const { x, y } = playerMove;

    this.board[y][x] = this.playerInTurn.symbol;
    this.playerInTurn = this.playerInTurn.id === this.playerOne.id ? this.playerTwo : this.playerOne;
  }
}

TicTacToe.ERRORS = {
  WRONG_PLAYER: 'Attempt to play turn failed because player in turn ID does not match'
};
