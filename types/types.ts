export enum SOSSlot {
  E,
  S,
  O
}

export type Player = {
  name: string
  score: number
  color: string
}

export type GameState = Array<Array<SOSSlot>>

export enum SlotDirection {
  HOR,
  VER,
  DIAGX,
  DIAGY
}

export type cell = {
  x: number
  y: number
}

export type PlayerData = {
  name: string;
  color: string;
}