import { MovieProvider } from "./MovieContext";
import MovieList from "./MovieList";
import Nav from "./Nav";
import AddMovie from "./AddMovie";
function App() {
  return (
    <MovieProvider>
      <div className="container my-5 px-4 py-2 border rounded" style={{ width: 450 }}>
        <AddMovie />
        <Nav />
        <MovieList />
      </div>
    </MovieProvider>
  );
}

export default App;
