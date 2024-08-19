import {
  cell,
  GameState,
  Player,
  PlayerData,
  SlotDirection,
  SOSSlot,
} from "@/types/types";

const Directions = [
  [
    [0, -1],
    [0, 1],
  ],
  [
    [1, 0],
    [-1, 0],
  ],
  [
    [1, 1],
    [-1, -1],
  ],
  [
    [-1, 1],
    [1, -1],
  ],
];

const DirList = [
  SlotDirection.HOR,
  SlotDirection.VER,
  SlotDirection.DIAGX,
  SlotDirection.DIAGY,
];

export const createGameState = (row: number) =>
  new Array(row).fill(0).map(() => new Array(row).fill(SOSSlot.E));

export const createPlayersArray = (playersList: PlayerData[]) => {
  return new Array(playersList.length).fill(0).map((_, index) => ({
    name: playersList[index].name === '' ? `Player ${index + 1}` : playersList[index].name,
    score: 0,
    color: playersList[index].color,
  }));
};

export const checkSOS = (
  slot: SOSSlot,
  row: number,
  col: number,
  board: GameState
) => {
  if (slot == SOSSlot.E) {
    return {
      points: 0,
      pos: [],
    };
  }

  if (slot == SOSSlot.S) {
    let points = 0;
    let pos: cell[][] = [];
    for (let a = 0; a < Directions.length; a++) {
      for (let [i, j] of Directions[a]) {
        const [x, y] = [row + i, col + j];
        const [x2, y2] = [row + i * 2, col + j * 2];
        if (
          checkValid(x, y, board) &&
          checkValid(x2, y2, board) &&
          board[x][y] == SOSSlot.O &&
          board[x2][y2] == SOSSlot.S
        ) {
          points++;
          pos.push([
            { x: row, y: col },
            { x, y },
            { x: x2, y: y2 },
          ]);
        }
      }
    }
    return {
      points,
      pos,
    };
  }

  if (slot == SOSSlot.O) {
    let points = 0;
    let pos: cell[][] = [];
    let dir: SlotDirection | null = null;
    for (let [i, j] of Directions) {
      const [x, y] = [row + i[0], col + i[1]];
      const [x2, y2] = [row + j[0], col + j[1]];
      if (
        checkValid(x, y, board) &&
        checkValid(x2, y2, board) &&
        board[x][y] == SOSSlot.S &&
        board[x2][y2] == SOSSlot.S
      ) {
        points++;
        pos.push([
          { x, y },
          { x: row, y: col },
          { x: x2, y: y2 },
        ]);
      }
    }

    return {
      points,
      pos,
    };
  }

  return {
    points: 0,
    pos: [],
  };
};

const checkValid = (row: number, col: number, board: GameState) => {
  return row >= 0 && row < board.length && col >= 0 && col < board.length;
};

export const changeTurn = (players: Player[], currentTurn: number) => {
  return (currentTurn + 1) % players.length;
};

export const getDirection = (slots: Array<cell>) => {
  let d = 0;
  let it = 0;
  for (let [i, j] of Directions) {
    const [x, y] = [slots[1].x + i[0], slots[1].y + i[1]];
    const [x2, y2] = [slots[1].x + j[0], slots[1].y + j[1]];
    
    if (x >= 0 && y >= 0 && x2 >= 0 && y2 >= 0) {
      if (
        ((slots[0].x == x && slots[0].y == y) ||
          (slots[0].x == x2 && slots[0].y == y2)) &&
        ((slots[2].x == x2 && slots[2].y == y2) ||
          (slots[2].x == x && slots[2].y == y))
      ) {
        d = it;
      }
    }
    it++;
  }

  return DirList[d];
};

export const checkIsGameOver = (board: GameState) => {
  let isOver = true;
  for (let row of board) {
    if (row.includes(SOSSlot.E)) {
      isOver = false;
      break;
    }
  }
  return isOver;
};

export const getWinners = (players: Player[]) => {
  let wins: Player[] = [];
  players.forEach((player) => {
    if (wins.length > 0) {
      if (wins[0].score < player.score) {
        wins = [player];
      } else if (wins[0].score == player.score) {
        wins.push(player);
      }
    } else {
      wins.push(player);
    }
  });
  return wins;
};
