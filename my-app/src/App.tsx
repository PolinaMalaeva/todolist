import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import PageMain from "./PageMain";
import PageTodoList from "./PageTodoList";
import PageStatistics from "./PageStatistics";
import Navigation from "./Navigation";

class App extends React.Component<any, any> {
    constructor(props: any) {
        super(props);

        this.state = {
            numberTasks: +localStorage.getItem('numberTasks')! || 0,
            numberDeleteTasks: +localStorage.getItem('numberDeleteTasks')! || 0,
            numberEditTasks: +localStorage.getItem('numberEditTasks')! || 0,
            timeFirstTask: localStorage.getItem('timeFirstTask')! || 'Задачи не добавлены',
            timeLastTask: localStorage.getItem('timeLastTask')! || 'Задачи не добавлены'
        };

        this.handleNumberTasks = this.handleNumberTasks.bind(this);
        this.handleNumberDeleteTasks = this.handleNumberDeleteTasks.bind(this);
        this.handleNumberEditTasks = this.handleNumberEditTasks.bind(this);
        this.handleTimeFirstTask = this.handleTimeFirstTask.bind(this);
        this.handleTimeLastTask = this.handleTimeLastTask.bind(this);
    }

    handleNumberTasks() {
        this.setState({numberTasks: +localStorage.getItem('numberTasks')!})
    }

    handleNumberDeleteTasks() {
        this.setState({numberDeleteTasks: +localStorage.getItem('numberDeleteTasks')!})
    }

    handleNumberEditTasks() {
        this.setState({numberEditTasks: +localStorage.getItem('numberEditTasks')!})
    }

    handleTimeFirstTask() {
        this.setState({timeFirstTask: localStorage.getItem('timeFirstTask')!})
    }

    handleTimeLastTask() {
        this.setState({timeLastTask: localStorage.getItem('timeLastTask')!})
    }

    render() {
        return (
            <BrowserRouter>
                <div className='wrap'>
                    <Navigation />
                    <div className='main'>
                        <Routes>
                            <Route path="/" element={<PageMain/>}/>
                            <Route path="/PageTodoList" element={<PageTodoList numberTasks={this.state.numberTasks}
                                                                               numberDeleteTasks={this.state.numberDeleteTasks}
                                                                               numberEditTasks={this.state.numberEditTasks}
                                                                               timeFirstTask={this.state.timeFirstTask}
                                                                               timeLastTask={this.state.timeLastTask}

                                                                               handleNumberTasks={this.handleNumberTasks}
                                                                               handleNumberDeleteTasks={this.handleNumberDeleteTasks}
                                                                               handleNumberEditTasks={this.handleNumberEditTasks}
                                                                               handleTimeFirstTask={this.handleTimeFirstTask}
                                                                               handleTimeLastTask={this.handleTimeLastTask}
                            />}/>
                            <Route path="/PageStatistics" element={<PageStatistics numberTasks={this.state.numberTasks}
                                                                                   numberDeleteTasks={this.state.numberDeleteTasks}
                                                                                   numberEditTasks={this.state.numberEditTasks}
                                                                                   timeFirstTask={this.state.timeFirstTask}
                                                                                   timeLastTask={this.state.timeLastTask}
                            />}/>
                        </Routes>
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
