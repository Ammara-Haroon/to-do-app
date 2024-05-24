import { createContext, useContext, useEffect, useState } from "react";
import { Category } from "../services/api-responses.interface";
import { getAllCategories } from "../services/category-services";

export const useCategoriesContext = () => useContext(CategoriesContext);

export interface ICategoriesContext {
  categories: Category[];
  //setCategories: (categories: Category[]) => void;
}

const defaults: ICategoriesContext = {
  categories: [],
 // setCategories: (data) => console.log(data),
};

export const CategoriesContext = createContext<ICategoriesContext>(defaults);

interface CategoriesContextProviderProps {
  children: string | JSX.Element | JSX.Element[]
}

export const CategoriesContextProvider = ({children}:{
    children: React.ReactNode;
}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  useEffect(() => {
    getAllCategories()
      .then((data) => setCategories(data))
      .catch((e) => console.warn(e));
  }, []);

  return (
    <CategoriesContext.Provider value={{categories}}>
      {children}
    </CategoriesContext.Provider>
  );
};

export default CategoriesContextProvider;