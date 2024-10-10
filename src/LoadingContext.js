// src/LoadingContext.js

import React, { createContext, useContext, useState, useEffect } from 'react';

const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);

    // دالة لتفعيل التحميل
    const startLoading = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 10000); // تفعيل التحميل لمدة 10 ثواني
    };

    return (
        <LoadingContext.Provider value={{ loading, startLoading }}>
            {children}
        </LoadingContext.Provider>
    );
};

// دالة لاستخدام سياق التحميل
export const useLoading = () => {
    return useContext(LoadingContext);
};
