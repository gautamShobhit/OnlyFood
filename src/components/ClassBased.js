import React from "react";

class ClassBased extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //creates a state variable object
      //can hold any number of state variables
      count: 0,
    };
    console.log(this.props.name + "Child Constructor called");
  }

  componentDidMount() {
    console.log(this.props.name + "Child componentDidMount called");
  }
  render() {
    console.log(this.props.name + "Child render called");
    return (
      <div>
        <h1>this is class based component</h1>
        <h1>{this.props.name} Child</h1>
        <h2>Count : {this.state.count}</h2>
        <button
          onClick={() => {
            this.setState({
              //never change state variables directly
              //create an object like this and change inside it
              count: this.state.count + 1,
            });
          }}
        >
          Click me to increase count !!
        </button>
        <button
          onClick={() => {
            this.setState({
              count: 0,
            });
          }}
        >
          Reset Count
        </button>
      </div>
    );
  }
}
export default ClassBased;
