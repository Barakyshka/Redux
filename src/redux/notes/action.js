import { Api } from "../../utils/api";
export const getNotes = (userId) => async (dispatch) => {
    try {
        dispatch(setNoteLoading)
        const res = await Api.getNotes({ userId });
        dispatch(setNoteData(res));
    } catch (error) {
        dispatch(setNoteErrors(error));
    }
};

export const deleteNote = (noteId,userId) => async (dispatch) => {
    try {
        dispatch(setNoteLoading)
        await Api.deleteNote(noteId)
        dispatch(getNotes(userId))
    } catch (error) {
        dispatch(setNoteErrors(error));
    }
}


export const setNoteLoading = () => {
    return {
        type: 'SET_LOADING',
    };
};

export const setNoteData = (notes) => {
    return { type: 'SET_NOTES', payload: notes };
};

export const setNoteErrors = (errors) => {
    return { type: 'SET_NOTES_ERRORS', payload: errors };
};

