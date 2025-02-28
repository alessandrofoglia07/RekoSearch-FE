import React from 'react';
import { categories, Category } from '@/utils/categories';
import { useSearchParams } from 'react-router-dom';

interface Props {
    category: Category;
    setCategory: React.Dispatch<React.SetStateAction<Category>>;
}

const CategorySelector: React.FC<Props> = ({ category, setCategory }: Props) => {
    const [searchParams, setSeachParams] = useSearchParams();

    const handleCategoryChange = (e: React.MouseEvent<HTMLButtonElement>) => {
        setCategory(e.currentTarget.textContent as Category);
        searchParams.set('category', e.currentTarget.textContent as Category);
        setSeachParams(searchParams);
    };

    return (
        <div>
            {categories.map((cat) => (
                <button key={cat} className={`rounded-md px-4 py-2 ${category === cat ? 'bg-blue-500 text-white' : 'bg-gray-200'}`} onClick={handleCategoryChange}>
                    {cat}
                </button>
            ))}
        </div>
    );
};

export default CategorySelector;
