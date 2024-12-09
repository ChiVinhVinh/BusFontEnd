import React from 'react';

const Overlay = ({ onClick }: { onClick: () => void }) => {
    return (
        <div
            onClick={onClick}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                zIndex: 1000,
            }}
        />
    );
};

export default Overlay;