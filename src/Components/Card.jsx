import { Component } from "react";

class Card extends Component {
    getColor(status) {
        return status === 1 ? "" :
            status === 0 ? "text-danger" :
                status === -1 ? "bg-dark text-white" :
                    "text-secondary";
    }
    render() {
        return (<div class="card mt-4">
            <div class="card-header d-flex flex-wrap">
                {this.props.words.map((wordObj) => {
                    return <h3 className={`px-2 ${this.getColor(wordObj.status)}`}>{wordObj.word}</h3>
                })}
            </div>
            <div class="card-body">
                <div className="input-group">
                    <input id="words-input" type='text' className="form-control form-control-lg" placeholder="Start Typing Here..." onKeyDown={this.props.startTimer} onChange={this.props.handleUserInput}/>
                    <span class="input-group-text" id="timer"> {this.props.timer} </span>
                    <button type = "button" className="btn btn-primary">Reset</button>
                </div>

            </div>
        </div>)
    }
}

export default Card;