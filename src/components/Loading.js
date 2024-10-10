import React from 'react';
import { useLoading } from '../LoadingContext';

const Loading = () => {
    const { loading } = useLoading();

    if (!loading) return null; // لا تعرض التحميل إذا لم يكن هناك تحميل

    return (
        <div style={styles.loader}></div>
    );
};

const styles = {
    loader: {
        border: '6px solid #f3f3f3', /* Light grey */
        borderTop: '6px solid #3498db', /* Blue */
        borderRadius: '50%',
        width: '40px',
        height: '40px',
        animation: 'spin 1s linear infinite',
        margin: '100px auto', // توسيط الدائرة
    },
};

export default Loading;
