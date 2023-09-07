
export const limitRecipeTitle = (title, limit = 17) => {
    const newTitle = [];
    if (title.length > limit) {
        title.split(' ').reduce((acc, cur) => {
            if (acc + cur.length <= limit) {
                newTitle.push(cur);
            }
            return acc + cur.length;
        }, 0);

        return `${newTitle.join(' ')}...`;
    }
    return title;
} 

export const parseIngredients = (ingredients) => {

    const newIngredients = ingredients.map(el => {
        const unitsLong = ['tablespoons','tablespoon','ounces','ounce','teaspoons','teaspoon', 'cups'];
        const unitsShort = ['tbsp','tbsp','oz','oz','tsp','tsp','cup'];
        const units = [...unitsShort, 'kg','g','pound'];

        // 1. uniform unit
        let ingredient = el.toLowerCase(); //1 teaspoon oregano or Italian seasoning blend // 1 teaspoon oregano or italian seasoning blend
        unitsLong.forEach((unit, i)=> {
            ingredient = ingredient.replace(unit, unitsShort[i]);
        });

        // 2. remove paranetheses
        ingredient = ingredient.replace(/ *\(([^)]*)\) */g, ' ');

        // 3. Parse ingredients into count, unit and ingredient
        // 1/2 tsp salt => [1/2 ,tsp, salt] // 4 cup all-purpose flour => ['4', 'cup', 'all-purpose', 'flour']
        const arrIng = ingredient.split(' ');
        const unitIndex = arrIng.findIndex(el2 => units.includes(el2));

        let objIng;
        if(unitIndex > -1){
            // There is a unit
            // ex: 4 1/2 // [4,1/2] // 4,2
            // ex: 4 tsp

            const arrCount = arrIng.slice(0,unitIndex); // ['4', '1/2', 'cup', 'all-purpose', 'flour'] => ['4','1/2']

            let count;
            if(arrCount.length === 1){
                count = eval(arrIng[0]);
            }else{
                count = eval(arrCount.join('+')); // ['4','1/2'] => '4+1/2' => 4.5
            }

            objIng = {
                count,
                unit: arrIng[unitIndex],
                ingredient: arrIng.slice(unitIndex + 1).join(' ')
            };
        }else if(parseInt(arrIng[0],10)){ // '7' => NaN => Number
            // There is NO unit, but Number
            objIng = {
                count: parseInt(arrIng[0],10),
                unit: '',
                ingredient: arrIng.slice(1).join(' ')
            }
        }else if(unitIndex === -1){
            // There is no Unit
            objIng = {
                count: 1,
                unit: '',
                ingredient
            };
        }


        return objIng;
    });

    return newIngredients;
}