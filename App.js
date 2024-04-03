import Navigation from "./StackNavigator";
import { UserProvider } from "./contexts/user";

export default function App() {
  return (
    <UserProvider>
      <Navigation />
    </UserProvider>
  );
}