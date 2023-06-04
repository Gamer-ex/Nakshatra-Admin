export const initial = {
  e: null,
  event: {},

  spotE: null,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "SET_E":
      return {
        ...state,
        e: action.e,
      };
    case "SET_EVENT":
      return {
        ...state,
        event: action.event,
      };
    case "SET_SPOT":
      return {
        ...state,
        spotE: action.spot,
      };
    default:
      return state;
  }
};
