/* What this file contains
1. fetching pokemon
2. handling error with Error Boundry
3. handle waiting fallback
*/
import { ErrorBoundry } from "react-error-boundry"; // install this package;

// create dummy data to render something while loading data from api
// Make sure you make dummy data for render inside FallbackInfo which should be same as api response so that you do not have to write jsx again for rendering actual data.
function PokemonInfoFallback({ name }) {
  const initialName = React.useRef(name).current;
  const fallbackPokemonData = {
    name: initialName,
    number: "XXX",
    image: "/img/pokemon/fallback-pokemon.jpg",
    attacks: {
      special: [
        { name: "Loading Attack 1", type: "Type", damage: "XX" },
        { name: "Loading Attack 2", type: "Type", damage: "XX" },
      ],
    },
    fetchedAt: "loading...",
  };
  return <PokemonDataView pokemon={fallbackPokemonData} />;
}
// this component will render the actul pokemon data
function PokemonDataView({ pokemon }) {
  return (
    <div>
      <div className="pokemon-info__img-wrapper">
        <img src={pokemon.image} alt={pokemon.name} />
      </div>
      <section>
        <h2>
          {pokemon.name}
          <sup>{pokemon.number}</sup>
        </h2>
      </section>
      <section>
        <ul>
          {pokemon.attacks.special.map((attack) => (
            <li key={attack.name}>
              <label>{attack.name}</label>:{" "}
              <span>
                {attack.damage} <small>({attack.type})</small>
              </span>
            </li>
          ))}
        </ul>
      </section>
      <small className="pokemon-info__fetch-time">{pokemon.fetchedAt}</small>
    </div>
  );
}
// in this component we will put all the logic for fetching, loading and error
function PokemonInfo({ pokemonName }) {
  const [state, setState] = React.useState({
    status: pokemonName ? "pending" : "idle",
    pokemon: null,
    error: null,
  });
  const { status, error, pokemon } = state;
  React.useEffect(() => {
    if (!pokemonName) return;

    setState({ status: "pending" });
    fetch(pokemonName).then(
      (pokemonData) => {
        setState({ pokemon, status: "resolved" });
      },
      (error) => {
        setState({ error, status: "rejected" });
      }
    );
  }, [pokemonName]);

  if (status === "idle") {
    return "submit a pokemon";
  } else if (status === "pending") {
    return <PokemonInfoFallback name={pokemonName} />;
  } else if (status === "rejected") {
    throw error;
  } else if (status === "resolved") {
    <PokemonDataView pokemon={pokemon} />;
  }
  throw new Error("This should be impossible");
}
// when you get error then ErrorFallBack will be called
function ErrorFallback({ error, resetErrorBoundary }) {
  // error and resetErrorBoundary will be by default given by ErrorBoundry
  return (
    <div role="alert">
      There was an error:{" "}
      <pre style={{ whiteSpace: "normal" }}>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try Again</button>
    </div>
  );
}
// this will be the root component
function App() {
  const [pokemonName, setPokemonName] = useState("");

  const handleReset = () => {
    setPokemonName(""); // make your all states to default
  };
  return (
    <div>
      <input type="text" /> // get pokemon name here
      <ErrorBoundry
        FallbackComponent={ErrorFallback}
        onReset={handleReset}
        resetKeys={[pokemonName]} // it will reset error boundry when pokemonName chanegs
      >
        <PokemonInfo pokemonName={pokemonName} />
      </ErrorBoundry>
    </div>
  );
}
