import { useEffect, useState } from "react";
import { Meal } from "../types";
import { getCartFromLocalStorage } from "../utils/utils";
import { getAllRecipesById } from "../utils/fetchUtils";
import { useQuery } from "@tanstack/react-query";
import MealCard from "../components/MealCard/MealCard";
import { extractIngredientsAndMeasures } from "../utils/utils";
import "./CartPage.css";
import { Link } from "react-router";

const ReciepPage = () => {
	const [cartIds, setCartIds] = useState<string[]>();
	const [ingredients, setIngredients] = useState<string[]>();
	const {
		data: recipesData,
		isError: isRecipesError,
		isLoading: isRecipesLoading,
	} = useQuery({
		queryFn: () => getAllRecipesById(cartIds || []),
		queryKey: ["cartData", cartIds],
	});

	useEffect(() => {
		setCartIds(getCartFromLocalStorage());
	}, []);

	useEffect(() => {
		if (recipesData) {
			const ing = recipesData.map((i) => {
				const { ingredients } = extractIngredientsAndMeasures(i);
				return ingredients;
			});
			setIngredients([...new Set(ing.flat())]);
		}
	}, [recipesData]);

	if (isRecipesLoading) return <div>Loadin...</div>;
	if (isRecipesError) return <div>Error</div>;
	if (recipesData?.length === 0)
		return <div>You haven't added anything here</div>;

  return (
    <div>
      <Link className="link" to="/" >Main Page</Link>
      <div className="cart-main">
        <div className="cart-ingredients">
          <h3>Products to buy:</h3>
          <ol>
            {ingredients && ingredients.map(i => <li key={i}>{i}</li>)}
          </ol>
        </div>
        <div>
          <h3>Cart:</h3>
          <div className="cart-cart">
            {recipesData?.map((d: Meal) => (
              <MealCard
                key={d.idMeal}
                id={d.idMeal}
                imgSrc={d.strMealThumb}
                name={d.strMeal}
                origin={d.strArea}
                category={d.strCategory}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
	);
};

export default ReciepPage;
