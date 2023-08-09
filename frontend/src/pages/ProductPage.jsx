import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Card, Button, Form } from 'react-bootstrap';
import ReactImageMagnify from 'react-image-magnify';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const ProductPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState({sizes: []});
    const [loading, setLoading] = useState(true);
    const [selectedSize, setSelectedSize] = useState(null);
    const [cart, setCart] = useContext(CartContext);

    useEffect(() => {
        const fetchProduct = async () => {
            const { data } = await axios.get(`http://localhost:5000/products/${id}`);
            setProduct(data);
            setSelectedSize(data.sizes[0]);
            setLoading(false);
        }

        fetchProduct();
    }, [id]);

    const handleSizeChange = (event) => {
        setSelectedSize(product.sizes.find(size => size.size === event.target.value));
    };

    const nav = useNavigate();
    
    const addToCart = async () => {
        const updatedSelectedSize = { ...selectedSize, quantity: 1 }; // Add the quantity property
        const updatedCart = [...cart, { ...product, selectedSize: updatedSelectedSize, id: uuidv4() }];
        setCart(updatedCart);
        nav('/cart');
    };
    

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <Card style={{ width: '60%' }}>
                <ReactImageMagnify {...{
                    smallImage: {
                        alt: 'Product image',
                        isFluidWidth: true,
                        src: product.image,
                    },
                    largeImage: {
                        src: product.image,
                        width: 1200,
                        height: 1800,
                    },
                    enlargedImagePosition: 'over',
                    isActivatedOnTouch: true,
                    enlargedImageContainerStyle: { background: '#fff', zIndex: 9 },
                }} />
                <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text>
                        Price: £{product.price}
                    </Card.Text>
                    <Card.Text>
                        {product.description}
                    </Card.Text>
                    <Form.Select onChange={handleSizeChange}>
                        {product.sizes.map((sizeObj, index) => (
                            <option key={index} value={sizeObj.size}>
                                {sizeObj.size} (Available: {sizeObj.stock})
                            </option>
                        ))}
                    </Form.Select>
                    <Button variant="primary" onClick={addToCart}>Add to Cart</Button>
                </Card.Body>
            </Card>
        </div>
    );
}

export default ProductPage;
