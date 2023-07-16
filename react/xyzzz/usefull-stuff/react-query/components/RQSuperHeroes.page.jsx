import { Link } from "react-router-dom";
import { useSuperHeroesData } from "../hooks/useSuperHeroes";

export const RQSuperHeroesPage = () => {
  const onSuccess = (data) => {
    console.log("Perform side effect after data fetching!", data);
  };
  const onError = (error) => {
    console.log("Perform side effect after encountering error!", error);
  };

  const { isLoading, data, isError, error, refetch } = useSuperHeroesData(
    onSuccess,
    onError
  );

  if (isLoading) return <h2>Loading...</h2>;
  if (isError) return <h2>{error.message}</h2>;
  return (
    <>
      <h2>React Query Super Heroes Page</h2>
      <button onClick={refetch}>Refetch</button>
      {/*fetch query when button is clicked */}
      {data?.data.map((hero) => {
        return (
          <div key={hero.id}>
            <Link to={`/super-heroes/${hero.id}`}>{hero.name}</Link>
          </div>
        );
      })}
      {/* before using select method */}
      {/* after using select method */}
      {/* {data.map((heroName) => {
        return <div key={heroName}>{heroName}</div>;
      })} */}
    </>
  );
};
