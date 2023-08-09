import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ProductsPage = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const { data } = await axios.get('http://localhost:5000/products');
            setProducts(data);
        }

        fetchProducts();
    }, []);

    const displayProducts = [...products];

    // add 'coming soon' products if there are less than 8 products
    while (displayProducts.length < 8) {
        displayProducts.push({ _id: `coming-soon-${displayProducts.length}`, name: 'Coming soon', price: '', image: '/images/coming-soon.png' });
    }

    return (
        <Container>
            <Row>
                <Col>
                    <h2 className="my-3">Welcome to Golden Shoe</h2>
                    <Row>
                        {displayProducts.map(product => (
                            <Col sm={12} md={6} lg={3} key={product._id}>
                                <Card className="my-3">
                                    <Card.Img variant="top" src={product.image} />
                                    <Card.Body>
                                        <Card.Title>{product.name}</Card.Title>
                                        <Card.Text>
                                            Price: {product.price}£
                                        </Card.Text>
                                        <Link to={`/product/${product._id}`}>
                                            <Button variant="primary">View Product</Button>
                                        </Link>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}

export default ProductsPage;
