import "./PageButton.css";

interface IPageButton {
	page: number | string;
	currPage: number;
}

const PageButton: React.FC<IPageButton> = ({ page, currPage }) => {
	return (
		<span className={`page-count ${currPage === page && "active"}`}>
			{page}
		</span>
	);
};

export default PageButton;
