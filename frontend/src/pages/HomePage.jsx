import { useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext";
import Cookies from "js-cookie";


function HomePage() {
  const { loginData, setLoginData } = useContext(AppContext);
  useEffect(() => {
    const userId = Cookies.get("userId");
    if (userId) {
      console.log(`The user id : ${userId}`);
      setLoginData(userId);

    } else {
      console.log("User id not found")
    }
  });

  console.log(loginData)
  return (
    <>
      <div>HomePage</div>
    </>
  );
}

export default HomePage;
