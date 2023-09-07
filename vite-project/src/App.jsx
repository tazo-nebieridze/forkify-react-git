import { createContext, useEffect, useReducer, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./containers/layout";
import RecipeView from "./containers/RecipeView";
import { recipeReducer } from "./state/Reducer/Recipe";
import { recipeState } from "./state/State/Recipe";
import { subDays, addDays } from 'date-fns';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"


export const StoreContextRecipe = createContext({});

function App() {
  const [startDate, setStartDate] = useState(new Date());

  const [stateRecipe, dispatchRecipe] = useReducer(recipeReducer, recipeState);
console.log(2)
  useEffect(() => {
    dispatchRecipe({
      type: "initLikes",
      value: JSON.parse(window.localStorage.getItem("likes")) || []
  });
  },[])

  return (
    <StoreContextRecipe.Provider value={{stateRecipe, dispatchRecipe}}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/recipe/:id" element={<RecipeView />} />
        </Route>
      </Routes>
      
    </StoreContextRecipe.Provider>
  );
}

export default App;
