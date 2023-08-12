import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";

function fetchSuperHeroes() {
  return axios.get("http://localhost:4000/superheroes");
}

export const useSuperHeroesData = (onSuccess, onError) => {
  return useQuery("super-heroes", fetchSuperHeroes, {
    // cacheTime: 5000,
    // staleTime: 0, // default value is 0 for staleTime
    // refetchOnMount: true,
    // refetchOnMount: true,
    // refetchInterval: 2000, // it will stop fetching when window lose focus
    // refetchIntervalInBackground: true, // it will keep fetching in background also
    // enabled: false, // not fetch on component mount
    onSuccess: onSuccess, // fun will execute after query fetched.
    onError: onError, // funs will execute if there is error fetching
    // select: (data) => {
    //   const superHeroesName = data.data.map((hero) => hero.name);
    //   return superHeroesName;
    // },
  });
};

const addSuperHero = (hero) => {
  return axios.post("http://localhost:4000/superheroes", hero);
};

export const useAddSuperHeroData = () => {
  const queryClient = useQueryClient();

  return useMutation(addSuperHero, {
    // onSuccess: data => {
    //   /** Query Invalidation Start */
    //   // queryClient.invalidateQueries('super-heroes')
    //   /** Query Invalidation End */

    //   /** Handling Mutation Response Start */
    // queryClient.setQueryData('super-heroes', oldQueryData => {
    //   return {
    //     ...oldQueryData,
    //     data: [...oldQueryData.data, data.data]
    //   }
    // })
    //   /** Handling Mutation Response Start */
    // },
    /**Optimistic Update Start */
    onMutate: async (newHero) => {
      await queryClient.cancelQueries("super-heroes");
      const previousHeroData = queryClient.getQueryData("super-heroes");
      queryClient.setQueryData("super-heroes", (oldQueryData) => {
        return {
          ...oldQueryData,
          data: [
            ...oldQueryData.data,
            { id: oldQueryData?.data?.length + 1, ...newHero },
          ],
        };
      });
      return { previousHeroData };
    },
    onError: (_err, _newTodo, context) => {
      queryClient.setQueryData("super-heroes", context.previousHeroData);
    },
    onSettled: () => {
      queryClient.invalidateQueries("super-heroes");
    },
    /**Optimistic Update End */
  });
};
