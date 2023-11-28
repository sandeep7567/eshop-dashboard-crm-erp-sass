import { useAppSelector } from "@/hooks/reduxHooks";

const isAuthenticated = () => {
  const { userInfo, isLoggedIn, isLoggedOut } = useAppSelector(
    (state) => state.auth
  );

  if (userInfo && isLoggedIn && !isLoggedOut) {
    return true;
  } else {
    return false;
  }
};

export default isAuthenticated;
