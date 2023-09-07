import { useContext } from "react";
import { Link } from "react-router-dom";
import { StoreContextRecipe } from "../../App";
import { limitRecipeTitle } from "../../utils";



const LikesView = () => {

    const { stateRecipe } = useContext(StoreContextRecipe);

    return(
        <div className="likes__panel">
            <ul className="likes__list">
                {
                    stateRecipe?.likes.map((el, index) => (
                        <li key={index}>
                            <Link to={`/recipe/${el?.id}`} className="likes__link">
                                <figure className="likes__fig">
                                    <img src={el?.img} alt={el.title}/>
                                </figure>
                                <div className="likes__data">
                                    <h4 className="likes__name">{limitRecipeTitle(el.title)}</h4>
                                    <p className="likes__author">{el?.publisher}</p>
                                </div>
                            </Link>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default LikesView;