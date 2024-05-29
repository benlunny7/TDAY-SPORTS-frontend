import React, { createContext, useContext, useState } from 'react';

const DatabaseContext = createContext();

export const useDatabase = () => useContext(DatabaseContext);

export const DatabaseProvider = ({ children }) => {
    const [database, setDatabase] = useState('FastTwitchTDAY');
    const [collection, setCollection] = useState('Instagram');

    return (
        <DatabaseContext.Provider value={{ database, setDatabase, collection, setCollection }}>
            {children}
        </DatabaseContext.Provider>
    );
};

