import types from './types';
import produce from 'immer';

const INITIAL_STATE = {
  selected: null,
  items: [
    { position: "a1", figure: "wrook" },
    { position: "b1", figure: "wknight" },
    { position: "c1", figure: "wbishop" },
    { position: "d1", figure: "wqueen" },
    { position: "e1", figure: "wking" },
    { position: "f1", figure: "wbishop" },
    { position: "g1", figure: "wknight" },
    { position: "h1", figure: "wrook" },
    { position: "a2", figure: "wpawn" },
    { position: "b2", figure: "wpawn" },
    { position: "c2", figure: "wpawn" },
    { position: "d2", figure: "wpawn" },
    { position: "e2", figure: "wpawn" },
    { position: "f2", figure: "wpawn" },
    { position: "g2", figure: "wpawn" },
    { position: "h2", figure: "wpawn" },
    { position: "a7", figure: "bpawn" },
    { position: "b7", figure: "bpawn" },
    { position: "c7", figure: "bpawn" },
    { position: "d7", figure: "bpawn" },
    { position: "e7", figure: "bpawn" },
    { position: "f7", figure: "bpawn" },
    { position: "g7", figure: "bpawn" },
    { position: "h7", figure: "bpawn" }, 
    { position: "a8", figure: "brook" },
    { position: "b8", figure: "bknight" },
    { position: "c8", figure: "bbishop" },
    { position: "d8", figure: "bqueen" },
    { position: "e8", figure: "bking" },
    { position: "f8", figure: "bbishop" },
    { position: "g8", figure: "bknight" },
    { position: "h8", figure: "brook" },
  ]
};

const figuresReducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case types.RESET_FIGURES:
      return produce(state, draftState => {
        draftState.items = INITIAL_STATE.figures;
      });
    case types.SET_FIGURES:
      return produce(state, draftState => {
        draftState.items = action.items;
      });
    case types.SELECT_FIGURE:
      return produce(state, draftState => {
        let selected = state.selected;
         if(selected !== null)
          selected = null;
        else {
          selected = state.items.find((item) => 
            item.position === action.position
          ).position;
        }          
        draftState.selected = selected
      });
    case types.MOVE_FIGURE:
      return produce(state, draftState => {
        const selected = state.selected;
        const search = action.position;
        let newItems = state.items
        if(selected !== search) {
          newItems = newItems.filter((item) => 
          search !== item.position
          );
        };
        newItems = newItems.map((item) => {
          if(selected === item.position) {
            return { ...item, position: search }
          }
          return item
        });
        draftState.items = newItems;
        draftState.selected = null;
      });
    default:
      return state;
  };
};

export default figuresReducer;