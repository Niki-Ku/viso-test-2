import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { Meal } from "./types";
import MealCard from "./components/MealCard/MealCard";
import "./App.css";
import { useEffect, useState } from "react";
import { getAllRecipes } from "./utils/fetchUtils";
import Pagination from "./components/Pagination/Pagination";
import SearchBar from "./components/SearchBar/SearchBar";
import { getCartFromLocalStorage } from "./utils/utils";

const App = () => {
  const [display, setDisplay] = useState<Meal[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0)
	const { data, isError, isLoading } = useQuery({
		queryFn: () => getAllRecipes(),
    queryKey: ["data"],
    cacheTime: 1000 * 60 * 60 * 24,
  } as UseQueryOptions<Meal[], Error>);
  const [cartData, setCartData] = useState<string[]>([])

  const itemsPerPage = 20
  const lastItemIndex = currentPage * itemsPerPage;
  const firsItemIndex = lastItemIndex - itemsPerPage;

  useEffect(() => {
    if (data) {
      setDisplay(data.slice(firsItemIndex, lastItemIndex).filter((d) => d !== null))
      setTotalPages(Math.ceil(data?.length / itemsPerPage))
    }
  }, [data, currentPage])

  useEffect(() => {
    setCartData(getCartFromLocalStorage())
  }, [])

	if (isLoading) return <div>Loadin...</div>;

	if (isError) return <div>Error</div>;

	return (
		<div>
      <SearchBar setDisplay={setDisplay} />
			<div className="cards-block">
        {display.map((d: Meal) => (
          <MealCard
            key={d.idMeal}
            id={d.idMeal}
            imgSrc={d.strMealThumb}
            name={d.strMeal}
            origin={d.strArea}
            category={d.strCategory}
            items={cartData}
          />
				))}
			</div>
      <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          setPage={setCurrentPage}
      />
		</div>
	);
};

export default App;
