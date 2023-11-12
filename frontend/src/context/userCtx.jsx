import { createContext, useContext, useState } from "react";

const UserCtx = createContext();

export const useUserCtx = () => {
  return useContext(UserCtx);
};

// eslint-disable-next-line react/prop-types
export const UserProvider = ({ children }) => {
  const [userState, setUserState] = useState({
    currentUser: null,
    error: null,
    loading: null,
  });

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
        signOutUserFail
      }}
    >
      {children}
    </UserCtx.Provider>
  );
};
