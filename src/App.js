import AppContextProvider from "./context/AppContext";
import AppRouter from "./pages/AppRouter";


function App() {
  return (
    <AppContextProvider>
      <AppRouter />
    </AppContextProvider>
  );
}

export default App;
