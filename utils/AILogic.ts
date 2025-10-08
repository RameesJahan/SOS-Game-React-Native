// ========== AI MINIMAX FILE (sosAI.ts) ==========

import { cell, GameState, Player, SOSSlot } from '@/types/types';
import { checkSOS, checkIsGameOver } from './GameLogic';

// ========== TYPE DEFINITIONS ==========

export type Move = {
  row: number;
  col: number;
  slot: SOSSlot;
}

export type AIMove = {
  row: number;
  col: number;
  slot: SOSSlot;
  points: number;
  pos: cell[][];
}

export enum AIDifficulty {
  EASY = 'EASY',
  MEDIUM = 'MEDIUM',
  HARD = 'HARD'
}

// ========== HELPER FUNCTIONS ==========

/**
 * Gets all available moves on the board
 */
const getAvailableMoves = (board: GameState): Move[] => {
  const moves: Move[] = [];
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[row].length; col++) {
      if (board[row][col] === SOSSlot.E) {
        moves.push({ row, col, slot: SOSSlot.S });
        moves.push({ row, col, slot: SOSSlot.O });
      }
    }
  }
  return moves;
};

/**
 * Creates a deep copy of the board
 */
const cloneBoard = (board: GameState): GameState => {
  return board.map(row => [...row]);
};

/**
 * Evaluates the board state for a given player
 * Returns the score difference (AI score - opponent score)
 */
const evaluateBoard = (
  board: GameState,
  aiPlayerIndex: number,
  players: Player[]
): number => {
  const aiScore = players[aiPlayerIndex].score;
  const opponentScore = players.reduce((sum, player, idx) => 
    idx !== aiPlayerIndex ? sum + player.score : sum, 0
  );
  return aiScore - opponentScore;
};

/**
 * Simulates a move and returns the points earned
 */
const simulateMove = (
  board: GameState,
  move: Move
): { board: GameState; points: number; pos: cell[][] } => {
  const newBoard = cloneBoard(board);
  newBoard[move.row][move.col] = move.slot;
  const result = checkSOS(move.slot, move.row, move.col, newBoard);
  return {
    board: newBoard,
    points: result.points,
    pos: result.pos
  };
};

// ========== MINIMAX ALGORITHM ==========

/**
 * Minimax algorithm with alpha-beta pruning
 * 
 * @param board - Current game board state
 * @param depth - How many moves ahead to look
 * @param isMaximizing - Whether current player is maximizing (AI) or minimizing (opponent)
 * @param alpha - Alpha value for pruning
 * @param beta - Beta value for pruning
 * @param aiPlayerIndex - Index of AI player
 * @param players - Array of players with scores
 * @returns Best score for the current player
 */
const minimax = (
  board: GameState,
  depth: number,
  isMaximizing: boolean,
  alpha: number,
  beta: number,
  aiPlayerIndex: number,
  players: Player[]
): number => {
  // Base cases: game over or depth limit reached
  if (depth === 0 || checkIsGameOver(board)) {
    return evaluateBoard(board, aiPlayerIndex, players);
  }

  const moves = getAvailableMoves(board);
  
  if (isMaximizing) {
    let maxEval = -Infinity;
    
    for (const move of moves) {
      const { board: newBoard, points } = simulateMove(board, move);
      
      // Create temporary players array with updated AI score
      const tempPlayers = players.map((p, idx) => 
        idx === aiPlayerIndex ? { ...p, score: p.score + points } : p
      );
      
      // If AI scores points, it gets another turn (isMaximizing stays true)
      const nextIsMaximizing = points > 0 ? true : false;
      
      const evalScore = minimax(
        newBoard,
        depth - 1,
        nextIsMaximizing,
        alpha,
        beta,
        aiPlayerIndex,
        tempPlayers
      );
      
      maxEval = Math.max(maxEval, evalScore);
      alpha = Math.max(alpha, evalScore);
      
      if (beta <= alpha) {
        break; // Beta cutoff
      }
    }
    return maxEval;
  } else {
    let minEval = Infinity;
    
    for (const move of moves) {
      const { board: newBoard, points } = simulateMove(board, move);
      
      // Find opponent index (assuming 2 players)
      const opponentIndex = (aiPlayerIndex + 1) % players.length;
      
      // Create temporary players array with updated opponent score
      const tempPlayers = players.map((p, idx) => 
        idx === opponentIndex ? { ...p, score: p.score + points } : p
      );
      
      // If opponent scores points, they get another turn (isMaximizing stays false)
      const nextIsMaximizing = points > 0 ? false : true;
      
      const evalScore = minimax(
        newBoard,
        depth - 1,
        nextIsMaximizing,
        alpha,
        beta,
        aiPlayerIndex,
        tempPlayers
      );
      
      minEval = Math.min(minEval, evalScore);
      beta = Math.min(beta, evalScore);
      
      if (beta <= alpha) {
        break; // Alpha cutoff
      }
    }
    return minEval;
  }
};

// ========== MAIN AI FUNCTION ==========

/**
 * Main AI function to get the best move
 * 
 * @param board - Current game board
 * @param aiPlayerIndex - Index of AI player in players array
 * @param players - Array of all players
 * @param difficulty - Difficulty level (depth of search)
 * @returns Best move for AI
 */
export const getAIMove = (
  board: GameState,
  aiPlayerIndex: number,
  players: Player[],
  difficulty: AIDifficulty = AIDifficulty.MEDIUM
): AIMove | null => {
  const moves = getAvailableMoves(board);
  
  if (moves.length === 0) {
    return null;
  }

  // Set search depth based on difficulty
  const depth = difficulty === AIDifficulty.EASY ? 1 :
                difficulty === AIDifficulty.MEDIUM ? 2 :
                difficulty === AIDifficulty.HARD ? 3 : 4;

  let bestMove: Move | null = null;
  let bestScore = -Infinity;

  // Evaluate each possible move
  for (const move of moves) {
    const { board: newBoard, points, pos } = simulateMove(board, move);
    
    // Create temporary players array with updated AI score
    const tempPlayers = players.map((p, idx) => 
      idx === aiPlayerIndex ? { ...p, score: p.score + points } : p
    );
    
    // If AI scores, it continues; otherwise opponent's turn
    const nextIsMaximizing = points > 0 ? true : false;
    
    const score = minimax(
      newBoard,
      depth - 1,
      nextIsMaximizing,
      -Infinity,
      Infinity,
      aiPlayerIndex,
      tempPlayers
    );

    // Add some randomness for equal moves to make AI less predictable
    const adjustedScore = score + (Math.random() * 0.1);

    if (adjustedScore > bestScore) {
      bestScore = adjustedScore;
      bestMove = move;
    }
  }

  if (!bestMove) {
    return null;
  }

  // Calculate the actual result of the best move
  const result = checkSOS(bestMove.slot, bestMove.row, bestMove.col, board);
  
  return {
    row: bestMove.row,
    col: bestMove.col,
    slot: bestMove.slot,
    points: result.points,
    pos: result.pos
  };
};