import React from "react";
import devImg from "../assets/devImg.jpg";

class Dev extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    //destructuring
    const { name } = this.props;
    //JSX code
    return (
      <div className="flex font-poppins  justify-center flex-wrap rounded-3xl border-black dark:border-white border-b shadow-2xl dark:shadow-gray-400 p-5 bg-cyan-300 dark:bg-cyan-800">
        <div className="my-auto dev-img-container overflow-hidden border-0 rounded-full md:w-72 md:h-72 w-36 h-36">
          <img className="md:w-72" src={devImg} alt="dev image"></img>
        </div>
        <div className="dev-info md:ml-5 w-80 text-sm font-normal">
          <h1 className="font-bold md:text-2xl text-lg">{name}</h1>
          <h3>Specialization : Front-End Dev & Problem Solving</h3>
          <h3>Education : B.Tech Undergrad 🎓</h3>
          <p className="hidden md:block">
            Bio : As a frontend web enthusiast 💻, I've developed a solid
            foundation in HTML, CSS, and JavaScript 📊. I'm eager to expand my
            skill set and explore the latest advancements in software
            development 🚀. My ultimate goal is to become a skilled software
            developer 🎯, and I'm committed to learning, growing, and pushing
            beyond my limits to achieve it 💪. I believe that continuous
            learning, creativity, and perseverance are key to unlocking success
            in the ever-evolving tech landscape 🔓.
          </p>
        </div>
      </div>
    );
  }
}
export default Dev;
