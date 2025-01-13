import { createContext, useEffect, useState } from 'react';

const SearchContext = createContext();

const SearchProvider = ({ children }) => {
    const [search, setSearch] = useState('');

    const handleSearch = (searchT) => {
        setSearch(searchT);
        // console.log(searchT);
    }

    return (
        <SearchContext.Provider value={{ search, handleSearch }}>
            {children}
        </SearchContext.Provider>
    );
}

export { SearchContext, SearchProvider };