import todoStore, { Filters } from "../../store/todo.store";

let element;
/**
 * 
 * @param {string} elementId 
 */
export const renderPendingTodos = (elementId) => {
    if(!element) 
        element = document.querySelector(elementId);
    if(!element) 
        throw new Error(`Invalid elementId ${element}`);

    element.innerHTML = todoStore.getTodos(Filters.Pending).length;
};