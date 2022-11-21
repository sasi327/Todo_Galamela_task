import { ADD, DELETE, EDIT, UPDATE } from "../Constants/constants"


export const addTask = (payload: any) => {
    return {
        type: ADD,
        payload: {
            ...payload,
            status: false,
            isEditMode: false
        }
    }
}

export const updateTask = (payload: any) => {
    return {
        type: UPDATE,
        payload
    }
}

export const editTask = (payload: any) => {
    return {
        type: EDIT,
        payload: {
            ...payload,
            isEditMode: true
        }
    }
}

export const deleteTask = (payload: any) => {
    return {
        type: DELETE,
        payload
    }
}


