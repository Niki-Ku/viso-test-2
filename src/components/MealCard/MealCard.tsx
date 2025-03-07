import { Link } from "react-router";
import "./MealCard.css"

interface IMealCard {
  imgSrc?: string;
  name: string;
  category: string;
  origin: string;
  id: string;
}

const MealCard: React.FC<IMealCard> = ({ imgSrc, name, category, origin, id }) => {
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
    </div>
  )
};

export default MealCard;
