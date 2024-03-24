import { createContext, useContext, useEffect, useState } from "react";

//context api,I think for storing data globally especially the jwt token
const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [data, setData] = useState({ user: null, token: null, email: null});
  const [eventData, setEventData] = useState({});

  //getting infromation from successful login
  const login = (user, token,email) => {
    setData({ user, token, email});
  };
  const logout = () => {
    setData({ user: null, token: null });
    sessionStorage.removeItem("userData")
  };

  const eventsInfo = (info) => {
    setEventData(info);
  };
  useEffect(() => {
    const getData = async () => {
      try {
        const storedData = await sessionStorage.getItem("userData");
        if (storedData) {
          const parsed = JSON.parse(storedData);
          setData(parsed);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, []);

  // useEffect(() => {
  //   console.log(data); // This will log the updated data state after it has been set
  // }, [data]);
  return (
    <AuthContext.Provider
      value={{ data, login, logout, eventData, eventsInfo }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  return useContext(AuthContext);
};
