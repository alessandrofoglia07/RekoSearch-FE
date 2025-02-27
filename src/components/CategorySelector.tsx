import React from 'react';
import { categories, Category } from '@/utils/categories';

interface Props {
    category: Category;
    setCategory: React.Dispatch<React.SetStateAction<Category>>;
}

const CategorySelector: React.FC<Props> = ({ category, setCategory }: Props) => {
    return (
        <div>
            {categories.map((cat) => (
                <button key={cat} className={`rounded-md px-4 py-2 ${category === cat ? 'bg-blue-500 text-white' : 'bg-gray-200'}`} onClick={() => setCategory(cat as Category)}>
                    {cat}
                </button>
            ))}
        </div>
    );
};

export default CategorySelector;
