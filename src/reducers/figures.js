import { figuresTypes as types } from "../types";
import produce from "immer";

const INITIAL_STATE = {
  tourPlayerOne: true,
  selected: null,
  availableMove: null,
  items: [
    { position: "a1", figure: "rook", playerOne: true },
    { position: "b1", figure: "knight", playerOne: true },
    { position: "c1", figure: "bishop", playerOne: true },
    { position: "d1", figure: "queen", playerOne: true },
    { position: "e1", figure: "king", playerOne: true },
    { position: "f1", figure: "bishop", playerOne: true },
    { position: "g1", figure: "knight", playerOne: true },
    { position: "h1", figure: "rook", playerOne: true },
    { position: "a2", figure: "pawn", playerOne: true },
    { position: "b2", figure: "pawn", playerOne: true },
    { position: "c2", figure: "pawn", playerOne: true },
    { position: "d2", figure: "pawn", playerOne: true },
    { position: "e2", figure: "pawn", playerOne: true },
    { position: "f2", figure: "pawn", playerOne: true },
    { position: "g2", figure: "pawn", playerOne: true },
    { position: "h2", figure: "pawn", playerOne: true },
    { position: "a7", figure: "pawn", playerOne: false },
    { position: "b7", figure: "pawn", playerOne: false },
    { position: "c7", figure: "pawn", playerOne: false },
    { position: "d7", figure: "pawn", playerOne: false },
    { position: "e7", figure: "pawn", playerOne: false },
    { position: "f7", figure: "pawn", playerOne: false },
    { position: "g7", figure: "pawn", playerOne: false },
    { position: "h7", figure: "pawn", playerOne: false },
    { position: "a8", figure: "rook", playerOne: false },
    { position: "b8", figure: "knight", playerOne: false },
    { position: "c8", figure: "bishop", playerOne: false },
    { position: "d8", figure: "queen", playerOne: false },
    { position: "e8", figure: "king", playerOne: false },
    { position: "f8", figure: "bishop", playerOne: false },
    { position: "g8", figure: "knight", playerOne: false },
    { position: "h8", figure: "rook", playerOne: false },
  ],
};

const figuresReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.RESET_FIGURES:
      return produce(state, (draftState) => {
        draftState = INITIAL_STATE.items;
      });
    case types.SET_FIGURES:
      return produce(state, (draftState) => {
        draftState.items = action.items;
      });
    case types.SELECT_FIGURE:
      return produce(state, (draftState) => {
        if (state.selected === null) {
          const selected = state.items.find(
            (item) => item.position === action.position
          );
          draftState.availableMove = [];
          draftState.selected = selected.position;
        } else {
          draftState.selected = null;
          draftState.availableMove = null;
        }
      });
    case types.MOVE_FIGURE:
      return produce(state, (draftState) => {
        const selected = state.selected;
        const search = action.position;
        let newItems = state.items;
        if (selected !== search) {
          newItems = newItems.filter((item) => search !== item.position);
        }
        newItems = newItems.map((item) => {
          if (selected === item.position) {
            return { ...item, position: search };
          }
          return item;
        });
        draftState.items = newItems;
        draftState.selected = null;
        draftState.availableMove = null;
        draftState.tourPlayerOne = !state.tourPlayerOne;
      });
    default:
      return state;
  }
};

export default figuresReducer;
