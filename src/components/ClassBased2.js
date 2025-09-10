import React from "react";

class ClassBased2 extends React.Component {
  constructor(props) {
    console.log("Constructor called");
    super(props);
    this.state = {
      userInfo: {
        name: "null",
        location: "null",
        bio: "null",
      },
    };
  }

  async componentDidMount() {
    console.log("Component Did Mount");
    const data = await fetch("https://api.github.com/users/akshaymarch7");
    const dataJson = await data.json();

    //updating the state variable
    this.setState({
      userInfo: dataJson,
    });
  }
  componentDidUpdate() {
    console.log("Component Did Update");
  }
  componentWillUnmount() {
    console.log("Component Will Unmount");
  }
  render() {
    console.log("Render Called !!");
    const { name, location, bio } = this.state.userInfo;
    return (
      <div>
        <h1>This is class based component</h1>
        <h2>Name : {name} </h2>
        <h2>Location : {location}</h2>
        <h2>Bio : {bio}</h2>
      </div>
    );
  }
}
export default ClassBased2;
