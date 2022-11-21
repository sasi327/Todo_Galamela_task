import TaskInterface from "../../Interfaces/TaskInterface";
import { ADD, DELETE, EDIT, UPDATE } from "../Constants/constants";



const initilaState = {
    allTasks : [],
    editTaskObj : {},
};

const addTaskreducer = (state = initilaState, action: any) => {
    let updatedTasks;
    let allTasksCopy;
    const { type, payload } = action;
    switch (type) {
        case ADD:
            return {
                ...state,
                allTasks : [...state.allTasks , payload],
                editTaskObj : {}
            }

        case UPDATE:
            allTasksCopy = [...state.allTasks];
            updatedTasks = allTasksCopy.map((t:TaskInterface) => {
                if (t.taskId === payload) {
                    t.status = !t.status;
                }
                return t
            })
            return {
                ...state,
                allTasks : updatedTasks,
                // editTaskObj : {}
            }
        case DELETE:
            allTasksCopy = [...state.allTasks];
            updatedTasks = allTasksCopy.filter((t:TaskInterface) => t.taskId !== payload)

            return {
                ...state,
                allTasks : updatedTasks
            }
        case EDIT:
            allTasksCopy = [...state.allTasks];
            updatedTasks = allTasksCopy.filter((t:TaskInterface) => t.taskId !== payload.taskId); 
            return {
                ...state,
                allTasks : updatedTasks,
                editTaskObj : payload,
            }
        default: return state
    }

}
export default addTaskreducer