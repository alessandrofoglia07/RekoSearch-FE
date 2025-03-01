import React from 'react';

interface Props {
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
}

const Navbar: React.FC<Props> = ({ search, setSearch }: Props) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    return (
        <nav className='fixed top-0 left-0 z-50 m-4 mb-8 flex h-12 w-[calc(100svw-2rem)] items-center justify-between'>
            <a className='h-full pr-4 md:pr-8' href='/'>
                RekoSearch
            </a>
            <div className='-md:w-3/4 flex h-full items-center md:pr-8'>
                <input type='text' placeholder='Search for an image' spellCheck='false' value={search} onChange={handleChange} />
            </div>
            <div className='flex h-full w-10 items-center justify-end md:w-[calc(3rem+150px)]'></div>
        </nav>
    );
};

export default Navbar;
