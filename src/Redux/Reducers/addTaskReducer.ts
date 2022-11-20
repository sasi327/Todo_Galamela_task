import { ADD } from "../Constants/constants";



const initialState:any =[]

const addTaskreducer = (state = initialState, action: any) => {

    const { type, payload } = action;
    switch (type) {
        case ADD:
            return {
                ...state,

            }

        default: return state
    }

}
export default addTaskreducer