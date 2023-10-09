import html from './app.html?raw';
import todoStore, {Filters} from '../store/todo.store';
import { renderTodos, renderPendingTodos } from './use-cases';


const ElementIDs = {
    TodoList: '.todo-list',
    NewTodoInput: '#new-todo-input',
    ClearCompleted: '.clear-completed',
    todoFilters: '.filtro',
    pendingCounter: '#pending-count'
}


export const App = (elementId) => {
    /**
     * @param {string} elementId
     */

    const displayTodos = () => {
        const todos = todoStore.getTodos(todoStore.getCurrentFilter());
        renderTodos(ElementIDs.TodoList, todos);
        updatePendingCount();
    }

    const updatePendingCount = () => {
        renderPendingTodos(ElementIDs.pendingCounter);
    }

    (()=>{
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).appendChild(app);
        displayTodos();
    })();

    //HTML References
    const newDescriptionInput = document.querySelector(ElementIDs.NewTodoInput);
    const todoListUL = document.querySelector(ElementIDs.TodoList);
    const clearCompletedButton = document.querySelector(ElementIDs.ClearCompleted);
    const filtersLIs = document.querySelectorAll(ElementIDs.todoFilters);

    //Listener
    newDescriptionInput.addEventListener('keyup', (event) => {
        if (event.key !== 'Enter') return;
        if(event.target.value.trim().length === 0) return;

        todoStore.addTodo(event.target.value);
        displayTodos();
        event.target.value = '';
    });

    todoListUL.addEventListener('click', (event) => {
        const element = event.target.closest('[data-id]');

        if(event.target.className === 'destroy') 
            todoStore.deleteTodo (element.getAttribute('data-id'));
        else if(event.target.className === 'toggle')
            todoStore.toggleTodo(element.getAttribute('data-id'));
        else 
            return;

        displayTodos();
    });

    clearCompletedButton.addEventListener('click', () => {
        todoStore.deleteCompleted();
        displayTodos();
    });

    filtersLIs.forEach(element => {
        element.addEventListener('click', (element) => {
            filtersLIs.forEach(element => {
                element.classList.remove('selected');
            });
            element.target.classList.add('selected');
            switch(element.target.text){
                case 'Todos':
                    todoStore.setFilter(Filters.All);
                    break;
                case 'Pendientes':
                    todoStore.setFilter(Filters.Pending);
                    break;
                case 'Completados':
                    todoStore.setFilter(Filters.Completed);
                    break;
            }

            displayTodos();
        })
    })

    
}