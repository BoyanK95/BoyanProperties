import { createContext, useContext, useEffect, useMemo, useState } from "react";

const UserCtx = createContext();

export const useUserCtx = () => {
  return useContext(UserCtx);
};

// eslint-disable-next-line react/prop-types
export const UserProvider = ({ children }) => {
  /** Set Initial State that we get from localeStorage */
  const initialState = useMemo(() => {
    try {
      // Try to get user data from localStorage on initialization
      const storedUser = localStorage.getItem("currentUser");
      return storedUser
        ? JSON.parse(storedUser)
        : { currentUser: null, error: null, loading: null };
    } catch (error) {
      console.error("Error parsing localStorage:", error);
      return {
        currentUser: null,
        error: "Error parsing localStorage",
        loading: null,
      };
    }
  }, []);

  const [userState, setUserState] = useState(initialState);

  /** Set currentUser in locale storage everytime userState changes */
  useEffect(() => {
    localStorage.setItem("currentUser", JSON.stringify(userState));
  }, [userState]);

  const signInStart = () => {
    setUserState((prevState) => {
      return { ...prevState, loading: true };
    });
  };

  const signInSuccess = (user) => {
    setUserState({
      currentUser: user,
      error: null,
      loading: false,
    });

    localStorage.setItem("access_token", user.token);
    return user.token;
  };

  const signInFail = (error) => {
    setUserState((prevState) => ({ ...prevState, error, loading: false }));
  };

  const updateStart = () => {
    setUserState((prevState) => {
      return { ...prevState, loading: true };
    });
  };

  const updateSuccess = (user) => {
    setUserState({
      currentUser: user,
      error: null,
      loading: false,
    });
  };

  const updateFail = (error) => {
    setUserState((prevState) => ({ ...prevState, error, loading: false }));
  };

  const deleteUserStart = () => {
    setUserState((prevState) => {
      return { ...prevState, loading: true };
    });
  };

  const deleteUserSuccess = () => {
    setUserState({
      currentUser: null,
      error: null,
      loading: false,
    });
  };

  const deleteUserFail = (error) => {
    setUserState((prevState) => ({ ...prevState, error, loading: false }));
  };

  const signOutUserStart = () => {
    setUserState((prevState) => {
      return { ...prevState, loading: true };
    });
  };

  const signOutUserSuccess = () => {
    setUserState({
      currentUser: null,
      error: null,
      loading: false,
    });

    localStorage.removeItem("access_token");
  };

  const signOutUserFail = (error) => {
    setUserState((prevState) => ({ ...prevState, error, loading: false }));
  };

  return (
    <UserCtx.Provider
      value={{
        userState,
        signInStart,
        signInSuccess,
        signInFail,
        updateStart,
        updateSuccess,
        updateFail,
        deleteUserStart,
        deleteUserSuccess,
        deleteUserFail,
        signOutUserStart,
        signOutUserSuccess,
        signOutUserFail,
      }}
    >
      {children}
    </UserCtx.Provider>
  );
};
