import React from 'react';

const LoadingScreen = () => {
    return (
        <div className={'h-screen w-screen opacity-30 absolute top-0 left-0 bg-gray-300 flex justify-center items-center'}>
            <span className="loading loading-spinner "></span>
        </div>
    );
};

export default LoadingScreen;