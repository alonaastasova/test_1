import React from "react";
import s from './style.module.css';
import { useState } from "react";
import Product from "../Product";
import { useEffect } from "react";
import Search from "../Search";

function App() {

    const default_products = [
        {
            id: 1,
            title: 'Refrigerator',
            image: 'https://cdn.pixabay.com/photo/2013/07/13/11/46/refrigerator-158634_960_720.png'
        },
        {
            id: 2,
            title: 'Bike',
            image: 'https://cdn.pixabay.com/photo/2013/07/13/13/46/bicycle-161524__340.png'
        },
        {
            id: 3,
            title: 'Skateboard',
            image: 'https://cdn.pixabay.com/photo/2012/04/11/18/05/skateboard-29194_960_720.png'
        },
        {
            id: 4,
            title: 'Microwave',
            image: 'https://cdn.pixabay.com/photo/2012/04/11/17/29/microwave-29056__340.png'
        },
        {
            id: 5,
            title: 'Teapot',
            image: 'https://cdn.pixabay.com/photo/2017/11/24/16/29/tea-2975184_960_720.png'
        }
    ];

    const [products, setProducts] = useState(default_products);

    useEffect (() => {
        (async () => {
            const resp = await fetch('https://fakestoreapi.com/products');
            const data = await resp.json();
            setProducts(data.map(({id, title, image, price}) => ({id, title, image,price, show: true})));
        })();
    },[]);

    const delete_product = (id) => {
        setProducts(products.filter(product => product.id !== id))
    };

    const search = (substring) => {
        substring = substring.toLowerCase();
        const new_products = products.map(product => {
            product.show = product.title.toLowerCase().startsWith(substring);
            return product
        })
        setProducts(new_products)
    };

  return (
    <div>
        <Search search={search}/>
        <div className={s.product_container}>
        {
            products
            .filter(({show}) => show)
            .map(product => 
                <Product 
                key={product.id}
                {...product}
                delete_product = {delete_product}
            />)
        }
        </div>
    </div>
  );
}

export default App;