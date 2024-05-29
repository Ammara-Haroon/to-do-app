import { createContext, useContext, useEffect, useState } from "react";
import { Category } from "../services/api-responses.interface";
import { getAllCategories } from "../services/category-services";

export const useCategoriesContext = () => useContext(CategoriesContext);

export interface ICategoriesContext {
  categories: Category[];
  error:string|null;
}

const defaults: ICategoriesContext = {
  categories: [],
  error:null,
};
export const CategoriesContext = createContext<ICategoriesContext>(defaults);
export const CategoriesContextProvider = ({children}:{
    children: React.ReactNode;
}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string|null>(null);
  useEffect(() => {
    getAllCategories()
      .then((data) => setCategories(data))
      .catch((e) => setError(e.message));
  }, []);

  return (
    <CategoriesContext.Provider value={{categories,error}}>
      {children}
    </CategoriesContext.Provider>
  );
};

export default CategoriesContextProvider;