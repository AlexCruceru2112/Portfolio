import { MovieProvider } from "./components/MovieContext";
import MovieList from "./components/MovieList";
import Nav from "./components/Nav";
import AddMovie from "./components/AddMovie";
function App() {
  return (
    <MovieProvider>
      <div className="container my-5 p-4 border rounded shadow-sm" style={{ width: 450 }}>
        <Nav />
        <AddMovie />
        <MovieList />
      </div>
    </MovieProvider>
  );
}

export default App;
