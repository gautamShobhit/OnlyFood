//Created once, they can be utilised anywhere throughout our app
//This resolves props drilling issue
//Props Drilling --> Refers to the practice of passing down the props from a parent to it's descendents which are heavily nested
//It becomes a tedious job once nesting becomes complex and hard to drill props all the way to leaf child

import { createContext } from "react";

//This context will hold details of currently logged in user

const UserContext = createContext({
  loggedInUser: "Shobhit",
});

export default UserContext;
