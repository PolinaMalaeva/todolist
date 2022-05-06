import React from "react";
import List from "./List";

export interface IList {
    id: number,
    value: {
        title: {
            title: string,
            display: boolean
        }
        description: {
            description: string,
            display: boolean
        }
    },
    time: any
}

class PageTodoList extends React.Component<{
    numberTasks: number, numberDeleteTasks: number, numberEditTasks: number,
    timeFirstTask: string, timeLastTask: string, handleNumberTasks: any,
    handleNumberDeleteTasks: any, handleNumberEditTasks: any, handleTimeFirstTask: any, handleTimeLastTask: any,
}, { title: string, description: string, list: IList[] }> {
    errorInput: React.RefObject<HTMLDivElement>;
    inputTitle: React.RefObject<HTMLInputElement>;
    inputDescription: React.RefObject<HTMLTextAreaElement>;
    borderError: string;

    constructor(props: any) {
        super(props);

        this.state = {
            title: '',
            description: '',
            list: JSON.parse(localStorage.getItem('list')!) || [],
        }

        this.borderError = '2px solid red'
        this.errorInput = React.createRef();
        this.inputTitle = React.createRef();
        this.inputDescription = React.createRef();
        this.handleOnClickDelete = this.handleOnClickDelete.bind(this);
        this.updateState = this.updateState.bind(this);
    }

    handleOnChange(e: (React.ChangeEvent<HTMLElement>)) {
        if (e.target.constructor.name === 'HTMLInputElement') {
            this.inputTitle.current!.style.border = '';
            if ((e.target as HTMLInputElement).value.match(/\d/)) {
                this.errorInput.current!.style.cssText = `opacity: 1; z-index:10`;
                return (setTimeout(() => this.errorInput.current!.style.cssText = `opacity: 0; z-index:-1`, 5000))
            }
            this.setState({title: (e.target as HTMLInputElement).value});
        }
        if (e.target.constructor.name === 'HTMLTextAreaElement') {
            this.setState({description: (e.target as HTMLTextAreaElement).value});
            this.inputDescription.current!.style.border = '';
        }
    }

    handleOnClickBtn() {
        if (/\S/.test(this.state.title) && /\S/.test(this.state.description)) {
            let num = this.props.numberTasks + 1;
            localStorage.setItem('numberTasks', String(num));
            this.props.handleNumberTasks();

            this.setState({
                list: [...this.state.list, {
                    id: Math.random(),
                    value: {
                        title: {
                            title: this.state.title,
                            display: false
                        },
                        description: {
                            description: this.state.description,
                            display: false
                        }
                    },
                    time: new Date(),
                }]
            })
            this.setState({title: ''})
            this.setState({description: ''})
        } else if ((!this.state.title || /\s/.test(this.state.title)) && /\S/.test(this.state.description)) {
            this.inputTitle.current!.style.border = this.borderError
        } else if ((!this.state.description || /\s/.test(this.state.description)) && /\S/.test(this.state.title)) {
            this.inputDescription.current!.style.border = this.borderError
        } else {
            this.inputTitle.current!.style.border = this.borderError
            this.inputDescription.current!.style.border = this.borderError
        }
    }

    handleOnClickDelete(id: number) {
        let num = this.props.numberDeleteTasks + 1;
        localStorage.setItem('numberDeleteTasks', String(num));
        this.props.handleNumberDeleteTasks();
        let indexDeleteTask = this.state.list.findIndex(task => task.id == id);
        this.state.list.splice(indexDeleteTask, 1);
        this.setState({list: this.state.list});
        localStorage.setItem('list', JSON.stringify(this.state.list));
    }

    updateState() {
        this.setState({list: this.state.list});
        localStorage.setItem('list', JSON.stringify(this.state.list));
    }

    componentDidUpdate(prevProps: Readonly<{ numberTasks: number; numberDeleteTasks: number; numberEditTasks: number; timeFirstTask: string; timeLastTask: string; handleNumberTasks: any; handleNumberDeleteTasks: any; handleNumberEditTasks: any; handleTimeFirstTask: any; handleTimeLastTask: any }>, prevState: Readonly<{ title: string; description: string; list: IList[] }>, snapshot?: any) {
        if(prevProps.timeFirstTask == 'Задачи не добавлены' && this.state.list[0]) {
            localStorage.setItem('timeFirstTask', this.state.list[0].time);
            this.props.handleTimeFirstTask();
        }
        if((prevState.list != this.state.list) && this.state.list[this.state.list.length - 1]) {
            localStorage.setItem('list', JSON.stringify(this.state.list));
            localStorage.setItem('timeLastTask', this.state.list[this.state.list.length - 1].time);
            this.props.handleTimeLastTask();
        }
    }

    render() {
        return (
            <div className='wrap_todolist'>
                <h1 className='title'>Запишите свои задачи</h1>
                <div className="inputs">
                    <div>
                        <input ref={this.inputTitle} className="input_title" type="text" value={this.state.title}
                               placeholder="Название"
                               onChange={(e) => this.handleOnChange(e)}/>
                        <textarea ref={this.inputDescription} className="input_description"
                                  value={this.state.description}
                                  placeholder="Описание задачи"
                                  onChange={(e) => this.handleOnChange(e)}/>
                    </div>
                    <div>
                        <input className="btn" type="submit" value='' onClick={() => this.handleOnClickBtn()}/>
                    </div>
                </div>
                <div ref={this.errorInput} className="error_input">Ошибка! В названии задачи нельзя использовать
                    цифры.
                </div>
                <List list={this.state.list} numberEditTasks={this.props.numberEditTasks} handleNumberEditTasks = {this.props.handleNumberEditTasks} handleOnClickDelete={this.handleOnClickDelete} errorInput={this.errorInput}
                      updateState={this.updateState}/>
            </div>
        );
    }
}

export default PageTodoList;