import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';



// при типизации объекта пишем все св-ва, а то что это будет массивом уже потом указываем там
// где этот тип данных применяться будет. Т.е. не массив типизируем
export type todolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type FilterValuesType = "all" | "active" | "completed";

function App() {

    // let [tasks, setTasks] = useState([
    //     {id: v1(), title: "HTML&CSS", isDone: true},
    //     {id: v1(), title: "JS", isDone: true},
    //     {id: v1(), title: "ReactJS", isDone: false},
    //     {id: v1(), title: "Rest API", isDone: false},
    //     {id: v1(), title: "GraphQL", isDone: false},
    // ]);
    // let [filter, setFilter] = useState<FilterValuesType>("all");

    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, setTodolists] = useState<Array<todolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState({
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    });

    function removeTask(todolistID:string,id: string) {
        setTasks({...tasks, [todolistID]: tasks[todolistID].filter(t => t.id !== id)})
        // let filteredTasks = tasks.filter(t => t.id !== id);
        // setTasks(filteredTasks);
    }

    function addTask(todolistID:string,title: string) {
        let task = {id: v1(), title: title, isDone: false};
        // let newTasks = [...tasks[todolistID], task] // почти тут наколхозил, был близок к правильнмоу ответу
        // console.log(newTasks)
        setTasks({ [todolistID]: [...tasks[todolistID],task],...tasks})
        // console.log({...tasks})
        // let newTasks = [task, ...tasks];
        // setTasks(newTasks);
    }

    function changeStatus(todolistID:string,taskId: string, isDone: boolean) {
        setTasks({...tasks, [todolistID]: tasks[todolistID].map((taskaa)=> taskaa.id === taskId? {...taskaa, isDone}: taskaa) })
        // let task = tasks.find(t => t.id === taskId);
        // if (task) {
        //     task.isDone = isDone;
        // }
        //
        // setTasks([...tasks]);
    }


    // let tasksForTodolist = tasks; // переносим в map которая уже в компоненте


    function changeFilter(todolistID:string, value: FilterValuesType) {
        // деструктуризация не нужна мап и так новый массив возвращает
        setTodolists(todolists.map((filtered)=> filtered.id === todolistID ? {...filtered, filter: value} : filtered))


        //мой вариант решения без тернарника, как я изначально подумал сделать
        // setTodolists(todolists.map((todoElem)=>{
        //     if (todoElem.id === todolistID){
        //         return (
        //            {...todoElem, filter:value}
        //         )
        //     } else{
        //         return todoElem;
        //     }
        // }))
    }

// при создании туду через мап дпустил ошибку стал работать с данными, которые к таскам относятся,
    // и затупил с аргументами мапа ===> вывод больше задач на CW и поиспользуй мап повсюду
    return (
        <div className="App">
            {todolists.map((mapTodolists) => {
                let tasksForTodolist = tasks[mapTodolists.id];

                if (mapTodolists.filter === "active") {
                    tasksForTodolist = tasks[mapTodolists.id].filter(t => !t.isDone);
                }
                if (mapTodolists.filter === "completed") {
                    tasksForTodolist = tasks[mapTodolists.id].filter(t => t.isDone);
                }

                return (
                    <Todolist
                        key={mapTodolists.id}
                        todolistID={mapTodolists.id}
                        title={mapTodolists.title}
                              tasks={tasksForTodolist}
                              removeTask={removeTask}
                              changeFilter={changeFilter}
                              addTask={addTask}
                              changeTaskStatus={changeStatus}
                              filter={mapTodolists.filter}
                    />
                )
            })}
        </div>
    );
}

export default App;
