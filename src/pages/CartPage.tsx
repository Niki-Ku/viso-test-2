import { useEffect, useState } from "react"
import { queryClient } from "../main";
import { Meal } from "../types";
import { getCartFromLocalStorage } from "../utils/utils";

const ReciepPage = () => {
  const [cartIds, setCartIds] = useState<string[]>();
  const [displayData, setDisplayData] = useState<Meal[]>();
	const cachedData: Meal[] | undefined = queryClient.getQueryData(["data"]);

  console.log(cartIds)
  console.log(cachedData)
  console.log(cachedData?.filter(i => cartIds?.includes(i.idMeal)))

  useEffect(() => {
    setCartIds(getCartFromLocalStorage());
    // setDisplayData(cachedData?.filter(i => cartIds?.includes(i.idMeal)))
  }, [])

  useEffect(() => {
    console.log(cachedData, cartIds)
    if (cachedData && cartIds) {
      setDisplayData(cachedData.filter(i => cartIds.includes(i.idMeal)));
    }
  }, [cachedData, cartIds]);

  useEffect(() => {
    console.log(displayData)

  }, [displayData])
  
  return (

    <div>
      cart Page
    </div>
	);
};

export default ReciepPage;
