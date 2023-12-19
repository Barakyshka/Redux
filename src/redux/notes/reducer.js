const initialState = {
    notes: [],
    errors: null,
    loading: false,
};

const notesReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_NOTES':
            return {
                ...state,
                notes: action.payload,
                loading: false,
                errors: null
            };
        case 'SET_NOTES_ERRORS':
            return {
                ...state,
                errors: action.payload,
                loading: false,
            };
        case 'SET_NOTES_LOADING':
            return {
                ...state,
                loading: true,
            };
        default:
            return state;
    }
};

export default notesReducer;