import { createSlice } from "@reduxjs/toolkit";
const defaultSquares = () => new Array(9).fill(null);

const calculateWinner = (squares) => {
  const lines = [
    { comb: [0, 1, 2], left: 0, top: 20, rotate: 0 },
    { comb: [3, 4, 5], left: 0, top: 50, rotate: 0 },
    { comb: [6, 7, 8], left: 0, top: 80, rotate: 0 },

    { comb: [0, 3, 6], left: -1, top: 50, rotate: 90 },
    { comb: [1, 4, 7], left: 0, top: 50, rotate: 90 },
    { comb: [2, 5, 8], left: 1, top: 50, rotate: 90 },

    { comb: [0, 4, 8], left: 0, top: 50, rotate: 45 },
    { comb: [2, 4, 6], left: 0, top: 50, rotate: -45 },
  ];

  for (let { comb, left, top, rotate } of lines) {
    const [a, b, c] = comb;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: comb, left, top, rotate };
    }
  }

  return { winner: null, line: null, row: null, top: null, rotate: 0 };
};

const gameSlice = createSlice({
  name: "game",
  initialState: {
    squares: defaultSquares(),
    isX: true,
    winner: null,
    winningLine: [],
    messages: [],
    score: { X: 0, O: 0 },
    isNewGame: true,
    rotateDeg: 0,
    top: 0,
    left: 0
  },
  reducers: {
    makeMove: (state, action) => {
      const index = action.payload;
      if (state.squares[index] || state.winner) return;

      state.squares[index] = state.isX ? "X" : "O";
      state.isX = !state.isX;
      state.isNewGame=false;
       const { winner, line, rotate, left, top} = calculateWinner(state.squares);
      if (winner) {
       state.winner = winner;       
       state.winningLine = line;    
       state.rotateDeg = rotate;
       state.left = left;  
       state.top = top;   
       state.rotateDeg = rotate;
       state.score[winner] += 1;
  
} else  if (!state.squares.includes(null)) {
        state.winner = "draw";
        }
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    resetGame: (state) => {
      state.squares = defaultSquares();
      state.isX = true;
      state.winner = null;
       state.winningLine= [];
      state.messages = [];
      state.score={ X: 0, O: 0 };
      state.rotateDeg = 0;
      state.top=0;
      state.left=0;
    },
    newGame: (state) => {
      state.squares = defaultSquares();
      state.isX = true;
      state.winner = null;
       state.winningLine= [];
       state.isNewGame =true;
       state.rotateDeg = 0;
      state.top=0;
      state.left=0;
    },
  },
});

export const { makeMove, addMessage, resetGame, newGame } = gameSlice.actions;
export default gameSlice.reducer;
