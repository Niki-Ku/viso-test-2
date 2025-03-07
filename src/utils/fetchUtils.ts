const getReciepByLetter = async (letter: string) => {
	try {
		const response = await fetch(
			`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`
		);
		const data = await response.json();
		return data.meals;
	} catch (error) {
		console.log(error);
	}
};

// this variat takes less time but returns too many requests error

// export const getAllRecipes = async () => {
//   const letters = 'abcdefghijklmnopqrstuvwxyz'

//   const promises = letters.split('').map(async (l: string) => await getReciepByLetter(l))
//   const results = await Promise.all(promises);
//   const meals = results.flat()

//   return meals
// }

// this variat takes more time but returns everything without errors
export const getAllRecipes = async () => {
	const letters = "abcdefghijklmnopqrstuvwxyz";
	const arr = [];
	for (const letter of letters) {
		arr.push(await getReciepByLetter(letter));
	}
	return arr.flat();
};

export const getReciepById = async (id: string) => {
	try {
		const response = await fetch(
			`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
		);
		const data = await response.json();
		return data.meals;
	} catch (error) {
		console.log(error);
	}
};
