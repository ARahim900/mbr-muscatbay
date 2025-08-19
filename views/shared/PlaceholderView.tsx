
import React from 'react';

interface PlaceholderViewProps {
    title: string;
}

export const PlaceholderView: React.FC<PlaceholderViewProps> = ({ title }) => (
    <div className="animate-fade-in flex items-center justify-center h-96 bg-white rounded-2xl shadow-md">
        <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-700">{title}</h2>
            <p className="mt-2 text-gray-500">This feature is currently under development. Please check back later.</p>
        </div>
    </div>
);
