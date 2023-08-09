import React, { useContext } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import { CartContext } from '../context/CartContext';

const CartItem = ({ item, index, removeFromCart }) => {
    const [cart, setCart] = useContext(CartContext);

    // Function to update the quantity of the item in the cart
    const updateQuantity = (index, newQuantity) => {
        setCart(
            cart.map((cartItem, itemIndex) => 
                itemIndex === index 
                ? { ...cartItem, selectedSize: {...cartItem.selectedSize, quantity: newQuantity} } 
                : cartItem
            )
        );
    };

    // If selectedSize doesn't exist, return null
    if (!item.selectedSize) {
        return null;
    }

    return (
        <Card style={{ width: '18rem', marginBottom: '10px' }}>
            <Card.Img variant="top" src={item.image} />
            <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>
                    Price: £{item.price}
                </Card.Text>
                <h5>Size: {item.selectedSize.size}</h5>
                <Form.Control 
                    as="select"
                    value={item.selectedSize.quantity || 0}
                    onChange={(e) => updateQuantity(index, parseInt(e.target.value))}
                >
                    {[...Array(item.selectedSize.stock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>{x + 1}</option>
                    ))}
                </Form.Control>
                <Button variant="danger" onClick={() => removeFromCart(index)}>Remove</Button>
            </Card.Body>
        </Card>
    );
}

export default CartItem;
