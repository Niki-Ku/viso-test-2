import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { getReciepById } from "../utils/fetchUtils";
import "./ReciepPage.css";
import { useEffect, useState } from "react";
import { extractIngredientsAndMeasures } from "../utils/utils";

const ReciepPage = () => {
	const { reciepId } = useParams();
	const [ingredients, setIngredients] = useState<string[] | undefined>();
	const [measures, setMeasure] = useState<string[] | undefined>();
	const {
		data: reciepData,
		isError,
		isLoading,
	} = useQuery({
		queryFn: () =>
			reciepId ? getReciepById(reciepId) : Promise.resolve(undefined),
		queryKey: [`reciep${reciepId}`],
	});

	useEffect(() => {
		if (reciepData) {
			const { ingredients: ingr, measures: meas } =
				extractIngredientsAndMeasures(reciepData[0]);
			setIngredients(ingr);
			setMeasure(meas);
		}
	}, [reciepData]);

	if (isLoading) return <div>Loadin...</div>;
	if (isError) return <div>Error</div>;
	if (!reciepData) return <p>No recipe found.</p>;

	return (
		<div>
			<img
				width={400}
				src={reciepData[0].strMealThumb}
				alt={reciepData[0].strMeal}
			/>
			<h2>{reciepData[0].strMeal}</h2>
			<h3>Category: {reciepData[0].strCategory}</h3>
			<h3>Category: {reciepData[0].strArea}</h3>
			<p>Category: {reciepData[0].strInstructions}</p>
			<div className="ingredients">
				<div>
					<h3>Ingrediets</h3>
					<ul>
						{ingredients?.map((i, index) => (
							<li key={`${i}${index}`}>{i}</li>
						))}
					</ul>
				</div>
				<div>
					<h3>Measure</h3>
					<ul>
						{measures?.map((i, index) => (
							<li key={`${i}${index}`}>{i}</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
};

export default ReciepPage;
