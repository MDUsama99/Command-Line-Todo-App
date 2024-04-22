#! /usr/bin/env node
import inquirer from "inquirer";

let todos: string[] = [];
let condition: boolean = true;

async function main(): Promise<void> {
    while(condition) {
        let choice = await inquirer.prompt({
            name: 'action',
            type: 'list',
            message: 'What would you like to do?',
            choices: [
                'Add a new task',
                'Mark a task as completed',
                'Delete a task',
                'View my current list of todos',
                'Exit'
            ]
        }) as { action: string };

        switch(choice.action) {
            case 'Add a new task':
                await addNewTask();
                break;
            case 'Mark a task as completed':
                await markTaskAsCompleted();
                break;
            case 'Delete a task':
                await deleteTask();
                break;
            case 'View my current list of todos':
                viewTodos();
                break;
            case 'Exit':
                condition = false;
                console.log('Goodbye!');
                break;
            default:
                console.log('Invalid choice');
        }
    }
}

async function addNewTask(): Promise<void> {
    let addTask = await inquirer.prompt({
        name: 'todo',
        type: 'input',
        message: 'What do you want to add to your Todos?'
    }) as { todo: string };
    todos.push(addTask.todo);
    console.log('Task added successfully!');
}

async function markTaskAsCompleted(): Promise<void> {
    let index = await selectTask('Which task would you like to mark as completed?');
    if (index !== -1) {
        todos[index] = '[✓] ' + todos[index];
        console.log('Task marked as completed!');
    }
}

async function deleteTask(): Promise<void> {
    let index = await selectTask('Which task would you like to delete?');
    if (index !== -1) {
        todos.splice(index, 1);
        console.log('Task deleted successfully!');
    }
}

function viewTodos(): void {
    console.log('Your current list of todos:');
    todos.forEach((todo, index) => {
        console.log(`${index + 1}. ${todo}`);
    });
}

async function selectTask(message: string): Promise<number> {
    let taskChoices = todos.map((todo, index) => `${index + 1}. ${todo}`);
    let selectedTask = await inquirer.prompt({
        name: 'taskIndex',
        type: 'list',
        message: message,
        choices: taskChoices
    }) as { taskIndex: string };
    return parseInt(selectedTask.taskIndex) - 1;
}

main();
