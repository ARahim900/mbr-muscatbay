import React, { useState, useCallback, useEffect, useRef } from 'react';

interface RangeSliderProps {
    min: number;
    max: number;
    onChange: ({ min, max }: { min: number; max: number }) => void;
    initialMin: number;
    initialMax: number;
}

export const RangeSlider: React.FC<RangeSliderProps> = ({ min, max, onChange, initialMin, initialMax }) => {
    const [minVal, setMinVal] = useState(initialMin);
    const [maxVal, setMaxVal] = useState(initialMax);
    const minValRef = useRef(initialMin);
    const maxValRef = useRef(initialMax);
    const range = useRef<HTMLDivElement>(null);

    // Update internal state if initial props change (e.g., on reset)
    useEffect(() => {
        setMinVal(initialMin);
        setMaxVal(initialMax);
        minValRef.current = initialMin;
        maxValRef.current = initialMax;
    }, [initialMin, initialMax]);
    
    const getPercent = useCallback(
        (value: number) => Math.round(((value - min) / (max - min)) * 100),
        [min, max]
    );

    useEffect(() => {
        const minPercent = getPercent(minVal);
        const maxPercent = getPercent(maxValRef.current);

        if (range.current) {
            range.current.style.left = `${minPercent}%`;
            range.current.style.width = `${maxPercent - minPercent}%`;
        }
    }, [minVal, getPercent]);

    useEffect(() => {
        const minPercent = getPercent(minValRef.current);
        const maxPercent = getPercent(maxVal);

        if (range.current) {
            range.current.style.width = `${maxPercent - minPercent}%`;
        }
    }, [maxVal, getPercent]);
    
    // Debounce onChange callback
    useEffect(() => {
        const handler = setTimeout(() => {
            onChange({ min: minVal, max: maxVal });
        }, 50);

        return () => {
            clearTimeout(handler);
        };
    }, [minVal, maxVal, onChange]);


    return (
        <div className="relative h-4 flex items-center">
            <input
                type="range"
                min={min}
                max={max}
                value={minVal}
                onChange={(event) => {
                    const value = Math.min(Number(event.target.value), maxVal - 1);
                    setMinVal(value);
                    minValRef.current = value;
                }}
                className="thumb thumb--left"
                style={{ zIndex: minVal > max - 100 ? 5 : 4 }}
            />
            <input
                type="range"
                min={min}
                max={max}
                value={maxVal}
                onChange={(event) => {
                    const value = Math.max(Number(event.target.value), minVal + 1);
                    setMaxVal(value);
                    maxValRef.current = value;
                }}
                className="thumb thumb--right"
            />

            <div className="relative w-full">
                <div className="absolute w-full h-1.5 bg-slate-200 rounded-full z-1" />
                <div ref={range} className="absolute h-1.5 bg-teal-500 rounded-full z-2" />
            </div>
        </div>
    );
};
