import useDebounce from "../../hooks/useDebounce";
import "./SearchBar.css";
import { useState, useEffect } from "react";
import { Meal } from "../../types";

interface SearchBarProps {
	setDisplay: React.Dispatch<React.SetStateAction<Meal[]>>;
	first: number;
	last: number;

	data: Meal[];
}

const SearchBar: React.FC<SearchBarProps> = ({
	setDisplay,
	data,
}) => {
	const [value, setValue] = useState<string>("");
	const debounceValue = useDebounce(value);

	useEffect(() => {
		const filteredItems = data.filter((item) =>
			item?.strMeal.toLowerCase().includes(debounceValue.toLowerCase())
		);
		setDisplay(filteredItems);
	}, [debounceValue, setDisplay]);

	return (
		<div className="searchbar">
			<input
				onChange={(e) => setValue(e.target.value)}
				type="search"
				value={value}
				placeholder="search"
				className="searchbar"
			/>
		</div>
	);
};

export default SearchBar;
