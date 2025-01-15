import ScreenMenu from "./components/Menus/ScreenMenu";
import { AuthProvider } from "./context/authContext";
import { PostProvider } from "./context/postContext";

const RootNavigation = () => {
  return (
    <AuthProvider>
      <PostProvider>
        <ScreenMenu />
      </PostProvider>
    </AuthProvider>
  );
};

export default RootNavigation;
