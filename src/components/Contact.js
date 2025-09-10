import React from "react";

class Contact extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}
  render() {
    return (
      <div className="pt-40 about-info justify-items-center font-poppins ">
        <h1 className="text-xl">Wanna talk about something....?</h1>
        <div className="m-4 border-1 rounded-lg">
          <form>
            <div>
              <input
                className="border-1 rounded-lg p-2 m-2"
                type="text"
                placeholder="Your Name"
              ></input>
              <input
                className="border-1 rounded-lg p-2 m-2 "
                type="text"
                placeholder="Message"
              ></input>
            </div>
            <div className="flex justify-center">
              <button className="bg-cyan-300 border-1 rounded-lg p-2 m-2 hover:cursor-pointer">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Contact;
