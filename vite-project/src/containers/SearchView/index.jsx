import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { StoreContextRecipe } from "../../App";
import { limitRecipeTitle } from "../../utils";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const SearchView = () => {
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(6);
    const [page, setPage] = useState(1);

    const { stateRecipe } = useContext(StoreContextRecipe);

    const { isLoading, isError, data, error, refetch } = useQuery(stateRecipe?.query, fetchData, { 
        variables: stateRecipe?.query,
        skip: !stateRecipe?.query,
     });

    async function fetchData({ queryKey }){
        const [q] = queryKey;
        if(!q) return [];
        const result = await axios(`https://forkify-api.herokuapp.com/api/search?q=${q}`);

        return result?.data?.recipes;
    };

    useEffect(() => {
        stateRecipe?.query && refetch();
        setPage(1);
    }, [stateRecipe?.query]);

    useEffect(() => {
        setStart((page - 1) * 6);
        setEnd(page * 6);
    },[page]);

    if (isLoading) {
        return (
            <div className="loader">
                <svg>
                    <use href="img/icons.svg#icon-cw"></use>
                </svg>
            </div>
        )
    }

    if (isError) {
        return <span>Error: {error.message}</span>
    }

    return(
        <div className="results">
            <ul className="results__list">
                {
                    data && data?.slice(start, end).map((el, index) => (
                        <li key={index}>
                            <Link to={`/recipe/${el.recipe_id}`} className={classNames(stateRecipe?.recipeId === el.recipe_id ? 'results__link--active' : '', 'results__link')}>
                                <figure className="results__fig">
                                    <img src={el?.image_url} alt={limitRecipeTitle(el?.title)}/>
                                </figure>
                                <div className="results__data">
                                    <h4 className="results__name">{limitRecipeTitle(el?.title)}</h4>
                                    <p className="results__author">{el?.publisher}</p>
                                </div>
                            </Link>
                        </li>
                    ))
                }
            </ul>
            <div className="results__pages">
                { page > 1 && page <= (Math.ceil(data?.length / 5)) && <button className="btn-inline results__btn--prev" onClick={() => setPage(value => value - 1)}>
                    <span>Page { page - 1 }</span>
                    <svg className="search__icon">
                        <use href="/img/icons.svg#icon-triangle-left"></use>
                    </svg>
                </button>}
                {page < (Math.ceil(data?.length / 5)) && <button className="btn-inline results__btn--next"  onClick={() => setPage(value => value + 1)}>
                    <span>Page { page + 1 }</span>
                    <svg className="search__icon">
                        <use href="/img/icons.svg#icon-triangle-right"></use>
                    </svg>
                </button>}
            </div>
        </div>
    )
}

export default SearchView