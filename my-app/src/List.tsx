import React from "react";
import {IList} from "./PageTodoList";

class List extends React.Component<{
    list: IList[], numberEditTasks: number, handleOnClickDelete: any,
    errorInput: React.RefObject<HTMLDivElement>, updateState: any, handleNumberEditTasks: any
},
    { valueTitle: string, valueDescription: string }> {

    taskEditTitle: React.RefObject<HTMLInputElement>;
    taskEditDescription: React.RefObject<HTMLTextAreaElement>;
    repeat: number[];

    constructor(props: any) {
        super(props);
        this.taskEditTitle = React.createRef();
        this.taskEditDescription = React.createRef();
        this.repeat = [];
    }

    handleOnClickEdit(id: number) {
        let repeat = this.repeat.find(idTask => idTask == id);
        if (!repeat) {
            let num = this.props.numberEditTasks + 1;
            localStorage.setItem('numberEditTasks', String(num));
            this.props.handleNumberEditTasks();
            this.repeat.push(id);
        }

        let editTask = this.props.list.find(task => task.id == id);
        let displayTitleTask = this.props.list.find(task => task.value.title.display)
        let displayDescriptionTask = this.props.list.find(task => task.value.description.display)
        if (!displayTitleTask && !displayDescriptionTask) {
            if (/\S/.test(editTask!.value.title.title)) {
                editTask!.value.title.display = !editTask!.value.title.display;
            }
            if (/\S/.test(editTask!.value.description.description)) {
                editTask!.value.description.display = !editTask!.value.description.display;
            }
        }
        this.props.updateState();
    }

    handleOnBlur(elem: string, id: number) {
        let editTask = this.props.list.find(task => task.id == id);
        if (elem === 'title') {
            if (/\S/.test(editTask!.value.title.title)) {
                editTask!.value.title.display = false;
            }
        } else {
            if (/\S/.test(editTask!.value.description.description)) {
                editTask!.value.description.display = false;
            }
        }
        this.props.updateState();
    }

    handleOnChange(e: (React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>), id: number) {
        let deleteTask = this.props.list.find(task => task.id == id);
        if (e.target.className.includes('edit_title')) {
            e.target.style.outline = '';
            if ((e.target as HTMLInputElement).value.match(/\d/)) {
                this.props.errorInput.current!.style.cssText = `opacity: 1; z-index:10`;
                return (setTimeout(() => this.props.errorInput.current!.style.cssText = `opacity: 0; z-index:-1`, 5000))
            }
            deleteTask!.value.title.title = e.target.value;
        } else {
            e.target.style.outline = '';
            deleteTask!.value.description.description = e.target.value;
        }
        this.props.updateState();
    }

    render() {
        return (
            this.props.list.map((task) => {
                    return (
                        <div className="task" key={task.id}>
                            <div className="task_title">
                                <input className="task_edit edit_title" type="text"
                                       value={task.value.title.title}
                                       style={{
                                           display: (task.value.title.display) ? 'block' : 'none',
                                           outline: (/\S/.test(task.value.title.title)) ? '' : '2px solid red'
                                       }}
                                       onChange={(e) => this.handleOnChange(e, task.id)}
                                       onBlur={() => this.handleOnBlur('title', task.id)}/>
                                {task.value.title.title}
                            </div>
                            <div className="task_description">
                                <textarea className="task_edit edit_description"
                                          value={task.value.description.description}
                                          style={{
                                              display: (task.value.description.display) ? 'block' : 'none',
                                              outline: (/\S/.test(task.value.description.description)) ? '' : '2px solid red'
                                          }}
                                          onChange={(e) => this.handleOnChange(e, task.id)}
                                          onBlur={() => this.handleOnBlur('description', task.id)}/>
                                {task.value.description.description}
                            </div>
                            <div className="control">
                                <div className="edit" onClick={(e) => {
                                    this.handleOnClickEdit(task.id)
                                }}>
                                    <svg fill="#000000" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" width="80px"
                                         height="80px">
                                        <path
                                            d="M 63.074219 10.003906 C 61.535156 10.003906 59.996094 10.589844 58.828125 11.757813 L 51.585938 19 L 15.140625 55.441406 L 9.257813 70.738281 L 24.558594 64.859375 L 24.707031 64.707031 L 68.242188 21.171875 C 70.578125 18.835938 70.578125 15.019531 68.242188 12.6875 L 67.3125 11.757813 C 66.148438 10.589844 64.609375 10.003906 63.074219 10.003906 Z M 63.074219 11.992188 C 64.09375 11.992188 65.113281 12.386719 65.902344 13.171875 L 66.828125 14.097656 C 68.398438 15.671875 68.398438 18.1875 66.828125 19.757813 L 66 20.585938 L 59.414063 14 L 60.242188 13.171875 C 61.027344 12.386719 62.050781 11.992188 63.074219 11.992188 Z M 58 15.414063 L 64.585938 22 L 61 25.585938 L 54.414063 19 Z M 53 20.414063 L 59.585938 27 L 24.65625 61.929688 C 24.480469 61.378906 24.207031 60.792969 23.707031 60.292969 C 22.972656 59.558594 22.046875 59.289063 21.320313 59.144531 C 21.089844 59.097656 21.089844 59.121094 20.902344 59.097656 C 20.878906 58.910156 20.902344 58.910156 20.855469 58.679688 C 20.710938 57.953125 20.441406 57.027344 19.707031 56.292969 C 19.207031 55.792969 18.621094 55.519531 18.070313 55.34375 Z M 53 23 C 52.449219 23 52 23.449219 52 24 C 52 24.550781 52.449219 25 53 25 C 53.550781 25 54 24.550781 54 24 C 54 23.449219 53.550781 23 53 23 Z M 50 26 C 49.449219 26 49 26.449219 49 27 C 49 27.550781 49.449219 28 50 28 C 50.550781 28 51 27.550781 51 27 C 51 26.449219 50.550781 26 50 26 Z M 47 29 C 46.449219 29 46 29.449219 46 30 C 46 30.550781 46.449219 31 47 31 C 47.550781 31 48 30.550781 48 30 C 48 29.449219 47.550781 29 47 29 Z M 44 32 C 43.449219 32 43 32.449219 43 33 C 43 33.550781 43.449219 34 44 34 C 44.550781 34 45 33.550781 45 33 C 45 32.449219 44.550781 32 44 32 Z M 41 35 C 40.449219 35 40 35.449219 40 36 C 40 36.550781 40.449219 37 41 37 C 41.550781 37 42 36.550781 42 36 C 42 35.449219 41.550781 35 41 35 Z M 38 38 C 37.449219 38 37 38.449219 37 39 C 37 39.550781 37.449219 40 38 40 C 38.550781 40 39 39.550781 39 39 C 39 38.449219 38.550781 38 38 38 Z M 35 41 C 34.449219 41 34 41.449219 34 42 C 34 42.550781 34.449219 43 35 43 C 35.550781 43 36 42.550781 36 42 C 36 41.449219 35.550781 41 35 41 Z M 32 44 C 31.449219 44 31 44.449219 31 45 C 31 45.550781 31.449219 46 32 46 C 32.550781 46 33 45.550781 33 45 C 33 44.449219 32.550781 44 32 44 Z M 29 47 C 28.449219 47 28 47.449219 28 48 C 28 48.550781 28.449219 49 29 49 C 29.550781 49 30 48.550781 30 48 C 30 47.449219 29.550781 47 29 47 Z M 26 50 C 25.449219 50 25 50.449219 25 51 C 25 51.550781 25.449219 52 26 52 C 26.550781 52 27 51.550781 27 51 C 27 50.449219 26.550781 50 26 50 Z M 23 53 C 22.449219 53 22 53.449219 22 54 C 22 54.550781 22.449219 55 23 55 C 23.550781 55 24 54.550781 24 54 C 24 53.449219 23.550781 53 23 53 Z M 16.660156 57.066406 C 16.753906 57.082031 16.824219 57.085938 16.929688 57.105469 C 17.453125 57.210938 18.027344 57.441406 18.292969 57.707031 C 18.558594 57.972656 18.789063 58.546875 18.894531 59.070313 C 19 59.59375 19 60 19 60 L 19 61 L 20 61 C 20 61 20.40625 61 20.929688 61.105469 C 21.453125 61.210938 22.027344 61.441406 22.292969 61.707031 C 22.558594 61.972656 22.789063 62.546875 22.894531 63.070313 C 22.914063 63.175781 22.917969 63.246094 22.933594 63.339844 L 16.003906 66.003906 L 13.996094 63.996094 Z"/>
                                    </svg>
                                </div>
                                <div className="delete" onClick={() => this.props.handleOnClickDelete(task.id)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100px"
                                         height="100px">
                                        <path
                                            d="M 46 13 C 44.35503 13 43 14.35503 43 16 L 43 18 L 32.265625 18 C 30.510922 18 28.879517 18.922811 27.976562 20.427734 L 26.433594 23 L 23 23 C 20.802666 23 19 24.802666 19 27 C 19 29.197334 20.802666 31 23 31 L 24.074219 31 L 27.648438 77.458984 C 27.88773 80.575775 30.504529 83 33.630859 83 L 66.369141 83 C 69.495471 83 72.11227 80.575775 72.351562 77.458984 L 75.925781 31 L 77 31 C 79.197334 31 81 29.197334 81 27 C 81 24.802666 79.197334 23 77 23 L 73.566406 23 L 72.023438 20.427734 C 71.120481 18.922811 69.489078 18 67.734375 18 L 57 18 L 57 16 C 57 14.35503 55.64497 13 54 13 L 46 13 z M 46 15 L 54 15 C 54.56503 15 55 15.43497 55 16 L 55 18 L 45 18 L 45 16 C 45 15.43497 45.43497 15 46 15 z M 32.265625 20 L 43.832031 20 A 1.0001 1.0001 0 0 0 44.158203 20 L 55.832031 20 A 1.0001 1.0001 0 0 0 56.158203 20 L 67.734375 20 C 68.789672 20 69.763595 20.551955 70.306641 21.457031 L 71.833984 24 L 68.5 24 A 0.50005 0.50005 0 1 0 68.5 25 L 73.5 25 L 77 25 C 78.116666 25 79 25.883334 79 27 C 79 28.116666 78.116666 29 77 29 L 23 29 C 21.883334 29 21 28.116666 21 27 C 21 25.883334 21.883334 25 23 25 L 27 25 L 61.5 25 A 0.50005 0.50005 0 1 0 61.5 24 L 28.166016 24 L 29.693359 21.457031 C 30.236405 20.551955 31.210328 20 32.265625 20 z M 64.5 24 A 0.50005 0.50005 0 1 0 64.5 25 L 66.5 25 A 0.50005 0.50005 0 1 0 66.5 24 L 64.5 24 z M 26.078125 31 L 73.921875 31 L 70.357422 77.306641 C 70.196715 79.39985 68.46881 81 66.369141 81 L 33.630859 81 C 31.53119 81 29.803285 79.39985 29.642578 77.306641 L 26.078125 31 z M 38 35 C 36.348906 35 35 36.348906 35 38 L 35 73 C 35 74.651094 36.348906 76 38 76 C 39.651094 76 41 74.651094 41 73 L 41 38 C 41 36.348906 39.651094 35 38 35 z M 50 35 C 48.348906 35 47 36.348906 47 38 L 47 73 C 47 74.651094 48.348906 76 50 76 C 51.651094 76 53 74.651094 53 73 L 53 69.5 A 0.50005 0.50005 0 1 0 52 69.5 L 52 73 C 52 74.110906 51.110906 75 50 75 C 48.889094 75 48 74.110906 48 73 L 48 38 C 48 36.889094 48.889094 36 50 36 C 51.110906 36 52 36.889094 52 38 L 52 63.5 A 0.50005 0.50005 0 1 0 53 63.5 L 53 38 C 53 36.348906 51.651094 35 50 35 z M 62 35 C 60.348906 35 59 36.348906 59 38 L 59 39.5 A 0.50005 0.50005 0 1 0 60 39.5 L 60 38 C 60 36.889094 60.889094 36 62 36 C 63.110906 36 64 36.889094 64 38 L 64 73 C 64 74.110906 63.110906 75 62 75 C 60.889094 75 60 74.110906 60 73 L 60 47.5 A 0.50005 0.50005 0 1 0 59 47.5 L 59 73 C 59 74.651094 60.348906 76 62 76 C 63.651094 76 65 74.651094 65 73 L 65 38 C 65 36.348906 63.651094 35 62 35 z M 38 36 C 39.110906 36 40 36.889094 40 38 L 40 73 C 40 74.110906 39.110906 75 38 75 C 36.889094 75 36 74.110906 36 73 L 36 38 C 36 36.889094 36.889094 36 38 36 z M 59.492188 41.992188 A 0.50005 0.50005 0 0 0 59 42.5 L 59 44.5 A 0.50005 0.50005 0 1 0 60 44.5 L 60 42.5 A 0.50005 0.50005 0 0 0 59.492188 41.992188 z"/>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    )
                }
            )
        )
    }
}


export default List;