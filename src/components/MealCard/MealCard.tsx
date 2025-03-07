import { Link } from "react-router";
import { setCartToLocalStorage } from "../../utils/utils";
import "./MealCard.css"

interface IMealCard {
  imgSrc?: string;
  name: string;
  category: string;
  origin: string;
  id: string;
  items: string[];
}

const MealCard: React.FC<IMealCard> = ({ imgSrc, name, category, origin, id, items }) => {
  return (
    <div className="meal-card">
      <img src={imgSrc} alt={name} />
      <Link to={`/reciep/${id}`}>
        <h4>{name}</h4>
      </Link>
      <div>
        <span>{category}</span>
        <span>Origin: {origin}</span>
      </div>
      <button onClick={() => {
        items.push(id)
        setCartToLocalStorage(items)
      }}>Add to card</button>
    </div>
  )
};

export default MealCard;
