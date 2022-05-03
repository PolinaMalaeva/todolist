import React from "react";
import arrow from './img/arrow.png';
import arrow2 from './img/arrow2.png';
import arrow3 from './img/arrow3.png';
import arrow4 from './img/arrow4.png';

class PageStatistics extends React.Component<{numberTasks:number, numberDeleteTasks:number, numberEditTasks: number,
    timeFirstTask: string, timeLastTask: string,}, {}>{
    render() {
        return (
            <div className="wrap_statistics">
                <h1 className="title">Статистика по задачам</h1>
                 <div className="statistics_list">
                     <div className="number_added">
                         <div className="item">Количество добавленных задач за все время: </div>
                         <img src={arrow} alt=""/>
                         <div className="value">{this.props.numberTasks}</div>
                     </div>
                     <div className="number_deleted">
                         <div className="item">Количество удаленных задач за все время: </div>
                         <img src={arrow3} alt=""/>
                         <div className="value">{this.props.numberDeleteTasks}</div>
                     </div>
                     <div className="number_edited">
                         <div className="item">Количество отредактированных задач за все время: </div>
                         <img src={arrow4} alt=""/>
                         <div className="value">{this.props.numberEditTasks}</div>
                     </div>
                     <div className="time_adding_first">
                         <div className="item">Время добавления первой задачи: </div>
                         <img src={arrow2} alt=""/>
                         <div className="value">{this.props.timeFirstTask}</div>
                     </div>
                     <div className="time_adding_last">
                         <div className="item">Время добавления последней задачи: </div>
                         <img src={arrow} alt=""/>
                         <div className="value">{this.props.timeLastTask}</div>
                     </div>
                 </div>
            </div>
        );
    }

}

export default PageStatistics;