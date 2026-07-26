import { createContext, useContext, useState } from "react";

const HistoryContext = createContext();

export const HistoryProvider = ({ children }) => {

    const [history, setHistory] = useState([]);

    const addHistory = (snapshot) => {

        setHistory((prev) => [
            snapshot,
            ...prev
        ]);

    };

    return (

        <HistoryContext.Provider
            value={{
                history,
                addHistory
            }}
        >
            {children}
        </HistoryContext.Provider>

    );

};

export const useHistory = () => useContext(HistoryContext);