import { useQuery } from "@tanstack/react-query";
import { Meal } from "./types";
import MealCard from "./components/MealCard/MealCard";
import "./App.css";
import { useEffect, useState } from "react";
import { getAllRecipes } from "./utils/fetchUtils";
import Pagination from "./components/Pagination/Pagination";
import SearchBar from "./components/SearchBar/SearchBar";
import { getCartFromLocalStorage } from "./utils/utils";
import { Link } from "react-router";

const App = () => {
	const [display, setDisplay] = useState<Meal[]>([]);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [totalPages, setTotalPages] = useState<number>(0);
	const { data, isError, isLoading } = useQuery<Meal[]>({
		queryFn: () => getAllRecipes(),
		queryKey: ["data"],
	});
	const [cartData, setCartData] = useState<string[]>([]);

	const itemsPerPage = 20;
	const lastItemIndex = currentPage * itemsPerPage;
	const firsItemIndex = lastItemIndex - itemsPerPage;

	useEffect(() => {
		if (data) {
      setDisplay(
        data.filter((d) => d !== null)
			);
			setTotalPages(Math.ceil(data?.length / itemsPerPage));
		}
  }, [data, currentPage]);
  
  useEffect(() => {
    setTotalPages(Math.ceil(display.length / itemsPerPage));
  }, [display])

	useEffect(() => {
		setCartData(getCartFromLocalStorage());
	}, []);

	if (isLoading) return <div>Loadin...</div>;

  if (isError) return <div>Error</div>;

  if (!data) return <div>No data</div>;

	return (
    <div className="home">
      <Link className="home-link" to="/cart">Cart</Link>
			<SearchBar data={data} setDisplay={setDisplay} first={firsItemIndex} last={lastItemIndex} />
			<div className="cards-block">
				{display.slice(firsItemIndex, lastItemIndex).map((d: Meal) => (
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
