import { Component } from "react";

export default class Result extends Component {
    render() {
        return(
            <div className="alert alert-primary mt-3">
                Score: {this.props.score}, 
                Errors: {this.props.errors}
            </div>
        )
    }
}