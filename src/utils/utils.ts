export const extractIngredientsAndMeasures = (
	meal: Record<string, string | null>
) => {
	const ingredients: string[] = [];
	const measures: string[] = [];

	for (let i = 1; i <= 20; i++) {
		const ingredient = meal[`strIngredient${i}`]?.trim();
		const measure = meal[`strMeasure${i}`]?.trim();

		if (ingredient) ingredients.push(ingredient);
		if (measure) measures.push(measure);
	}

	return { ingredients, measures };
};
