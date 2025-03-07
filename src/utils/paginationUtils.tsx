import PageButton from "../components/PageButton/PageButton";

export const generatePagesButtons = (currPage: number, totalPages: number) => {
	const arr = [];

	// current page is near start
	if (currPage <= 3) {
		for (let i = 1; i <= 7 && i <= totalPages; i++) {
			arr.push(<PageButton key={`page${i}`} page={i} currPage={currPage} />);
		}

		if (totalPages > 7) {
			arr.push(
				<PageButton key="ellipsis" page={"..."} currPage={currPage} />,
				<PageButton key="last" page={totalPages} currPage={currPage} />
			);
		}
		return arr;
	}

	// current page is in the middle
	if (currPage > 3 && totalPages - currPage > 3) {
		arr.push(
			<PageButton key="first" page={1} currPage={currPage} />,
			<PageButton key="ellipsis-start" page={"..."} currPage={currPage} />
		);

		for (let i = currPage - 2; i <= currPage + 2; i++) {
			if (i > 0 && i <= totalPages) {
				arr.push(<PageButton key={`page${i}`} page={i} currPage={currPage} />);
			}
		}

		arr.push(
			<PageButton key="ellipsis-end" page={"..."} currPage={currPage} />,
			<PageButton key="last" page={totalPages} currPage={currPage} />
		);
		return arr;
	}

	// current page in the end
	if (currPage >= totalPages - 3) {
		arr.push(<PageButton key="first" page={1} currPage={currPage} />);

		if (totalPages > 7) {
			arr.push(<PageButton key="ellipsis" page={"..."} currPage={currPage} />);
		}

		for (let i = totalPages - 6; i <= totalPages; i++) {
			arr.push(<PageButton key={`page${i}`} page={i} currPage={currPage} />);
		}
		return arr;
	}
};
