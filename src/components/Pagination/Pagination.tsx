import { generatePagesButtons } from "../../utils/paginationUtils";
import "./Pagination.css";

interface IPagination {
	totalPages: number;
	currentPage: number;
	setPage: React.Dispatch<React.SetStateAction<number>>;
}

const Pagination: React.FC<IPagination> = ({
	totalPages,
	currentPage,
	setPage,
}) => {
	return (
		<div className="pagination">
			<button
				onClick={() => setPage((prev: number) => prev - 1)}
				disabled={currentPage <= 1}
			>
				Back
			</button>
			{generatePagesButtons(currentPage, totalPages)}
			<button
				onClick={() => setPage((prev: number) => prev + 1)}
				disabled={currentPage === totalPages}
			>
				Forvard
			</button>
		</div>
	);
};

export default Pagination;
