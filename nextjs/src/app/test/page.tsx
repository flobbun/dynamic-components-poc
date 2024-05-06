"use client";

import ProductCard from 'app/components/customizables/product/ProductCard';
import { Product } from 'app/types';
import { useState } from 'react';
import Grid from 'react-grid-layout';

export default function TestPage() {
    const [layout, setLayout] = useState([
        { i: 'widget1', x: 0, y: 0, w: 2, h: 4 },
    ]);

    const products: Product[] = [
        {
            image: 'https://via.placeholder.com/150',
            name: 'Product Example',
            price: 100
        },
        {
            image: 'https://via.placeholder.com/150',
            name: 'Product Example 2',
            price: 200
        },
        {
            image: 'https://via.placeholder.com/150',
            name: 'Product Example 3',
            price: 300
        },
        {
            image: 'https://via.placeholder.com/150',
            name: 'Product Example 4',
            price: 400
        },
        {
            image: 'https://via.placeholder.com/150',
            name: 'Product Example 5',
            price: 500
        },
        {
            image: 'https://via.placeholder.com/150',
            name: 'Product Example 6',
            price: 600
        }
    ]

    const handleClick = () => {
        setLayout([
            ...layout,
            {
                i: `widget${layout.length + 1}`,
                x: 0,
                y: 0,
                w: 2,
                h: 4,
            },
        ]);
    }

    return (
        <>
            <Grid
                className="layout w-3/4"
                layout={layout}
                cols={4}
                rowHeight={30}
                width={400}
                onLayoutChange={(newLayout) => setLayout(newLayout)}
            >
                {layout.map((item, i) => (
                    <div key={item.i} style={{ background: '#009688' }}>
                        {`Widget ${item.i}`}
                    </div>
                ))}
            </Grid>
            <button onClick={handleClick}>Add widget</button>
        </>
    );
}