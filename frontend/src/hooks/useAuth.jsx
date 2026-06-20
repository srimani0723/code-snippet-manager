// src/hooks/useAuth.jsx
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearAuth, checkUser, setAuth } from "../reducers/authCheckSlice";

const useAuth = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, loading, user, error } = useSelector(
    (state) => state.authCheck,
  );

  const clearAuthState = useCallback(() => {
    dispatch(clearAuth());
  }, [dispatch]);

  const setAuthState = useCallback(
    (data) => dispatch(setAuth(data)),
    [dispatch],
  );

  const runCheckUser = useCallback(() => dispatch(checkUser()), [dispatch]);

  return {
    isAuthenticated,
    loading,
    user,
    error,
    resetAuth: clearAuthState,
    setAuth: setAuthState,
    checkUser: runCheckUser,
  };
};

export default useAuth;
