import ScreenMenu from "./src/navigation/ScreenMenu";
import { AuthProvider } from "./src/context/authContext";

const RootNavigation = () => {
  return (
    <AuthProvider>
      <ScreenMenu />
    </AuthProvider>
  );
};

export default RootNavigation;
