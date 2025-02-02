import ScreenMenu from "./components/Menus/ScreenMenu";
import { AuthProvider } from "./context/authContext";

const RootNavigation = () => {
  return (
    <AuthProvider>
      <ScreenMenu />
    </AuthProvider>
  );
};

export default RootNavigation;
