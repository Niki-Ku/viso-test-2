import useDebounce from "../../hooks/useDebounce";
import "./SearchBar.css";
import { useState } from "react";
import { Meal } from "../../types";
import { queryClient } from "../../main";

interface SearchBarProps {
	setDisplay: React.Dispatch<React.SetStateAction<Meal[]>>;
}

const SearchBar: React.FC<SearchBarProps> = ({ setDisplay }) => {
	const [value, setValue] = useState<string>("");
	const cachedData: Meal[] | undefined = queryClient.getQueryData(["data"]);
  const debounceValue = useDebounce(value)
  const filteredItems = cachedData?.filter((item) =>
    item?.strMeal.toLocaleLowerCase().includes(debounceValue.toLocaleLowerCase())
  );

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (filteredItems) {
			setDisplay(filteredItems);
		}
	};

	return (
    <div className="searchbar">
      Search:
			<form className="relative" onSubmit={(e) => handleSubmit(e)}>
				<input
					onChange={(e) => setValue(e.target.value)}
					type="search"
					value={value}
					placeholder="search"
					className=""
				/>
			</form>
		</div>
	);
};

export default SearchBar;
