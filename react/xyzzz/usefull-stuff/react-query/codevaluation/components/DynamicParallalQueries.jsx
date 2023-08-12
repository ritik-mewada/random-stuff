/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import axios from "axios";
import { useQueries } from "react-query";

const fetchSuperHero = (heroId) => {
  return axios.get(`http://localhost:4000/superheroes/${heroId}`);
};

export const DynamicParallelQueries = ({ heroIds }) => {
  const queryResults = useQueries(
    heroIds.map((id) => {
      return {
        queryKey: ["super-hero", id],
        queryFn: () => fetchSuperHero(),
      };
    })
  );
  return <div>DynamicParallelQueries</div>;
};
