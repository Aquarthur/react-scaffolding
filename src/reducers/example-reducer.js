const STATE_DEFAULT = {};

const exampleReducer = (state = STATE_DEFAULT, action) => {
  switch (action.type) {
    default:
      return Object.assign({}, STATE_DEFAULT);
  }
};

export default exampleReducer;
