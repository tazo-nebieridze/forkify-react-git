import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useContext, useState } from 'react';
import { StoreContextRecipe } from '../../App';
import LikesView from '../Likes';

const schema = yup.object().shape({
    recipe: yup.string().required(),
});

const Header = () => {

    const { stateRecipe, dispatchRecipe } = useContext(StoreContextRecipe);

    const { register, handleSubmit } = useForm({ resolver: yupResolver(schema) });

    const onSubmit = (data) => {
        dispatchRecipe({
            type: "changePrimitiveType",
            propertyId: "query",
            value: data?.recipe
        })
    }

    const onFormError = (errors, e) => {
        console.log(errors)
    }
    const [isOpen, setIsOpen] = useState(false)

    return (
        <header className="header">
            <img  src="/img/logo.png" alt="Logo" className="header__logo"/>
            <form className="search" onSubmit={handleSubmit(onSubmit, onFormError)}>
                <input 
                    type="text" {...register("recipe", { 
                        onChange: (e) => dispatchRecipe({
                            type: "changePrimitiveType",
                            propertyId: "inputQuery",
                            value: e.target.value
                        })
                    })} 
                    value={stateRecipe?.inputQuery || ''} 
                    className="search__field" 
                    placeholder="Search over 1,000,000 recipes..."
                />
                <button className="btn search__btn">
                    <svg className="search__icon">
                        <use href="/img/icons.svg#icon-magnifying-glass"></use>
                    </svg>
                    <span>Search</span>
                </button>
            </form>
            <div className="likes">
                {
                !!stateRecipe?.likes?.length && 
                    <div className="likes__field">
                        <svg className="likes__icon">
                            <use href="/img/icons.svg#icon-heart"></use>
                        </svg>
                    </div>
                }
                <LikesView />
            </div>
        </header>
    )
}

export default Header;