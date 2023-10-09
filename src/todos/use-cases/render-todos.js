import { Todo } from '../models/todo.models.js';
import { createTodoHtml } from './';

let element;

/**
 * @param {string} elementId
 * @param {Todo} todos
 */
export const renderTodos = (elementId, todos = []) => {
    
    if (!element) element = document.querySelector(elementId);

    if (!element) throw new Error('element ${elementId} not found');

    element.innerHTML = '';

    todos.forEach(todo => {
        element.append(createTodoHtml(todo));
    });
}