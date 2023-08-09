import React from 'react';
import { Carousel, Card, Button, Container, Row, Col } from 'react-bootstrap';
import { FaPercent } from 'react-icons/fa';
import '../styles/HomePage.css';

const HomePage = () => {
    return (
        <div>
            <Container className="carousel-container">
                <Carousel interval={null}>
                    <Carousel.Item>
                        <img
                            className="d-block w-100 carousel-img"
                            src="https://via.placeholder.com/800x400"
                            alt="First slide"
                        />
                        <Carousel.Caption>
                            <h3>First slide label</h3>
                            <p>Some representative placeholder content for the first slide.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100 carousel-img"
                            src="https://via.placeholder.com/800x400"
                            alt="Second slide"
                        />

                        <Carousel.Caption>
                            <h3>Second slide label</h3>
                            <p>Some representative placeholder content for the second slide.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </Container>

            <Container className="bg-info text-white text-center py-5 my-3">
                <h1>Sales <FaPercent /></h1>
                <p>
                    This is a modified jumbotron that occupies the entire horizontal space of its parent.
                </p>
            </Container>

            <Container>
                <Row>
                    <Col md={4}>
                        <Card className="mb-3">
                            <Card.Img variant="top" src="https://via.placeholder.com/150" />
                            <Card.Body>
                                <Card.Title>Card Title</Card.Title>
                                <Card.Text>
                                    Some quick example text to build on the card title and make up the bulk of the card's content.
                                </Card.Text>
                                <Button variant="primary">Go somewhere</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card className="mb-3">
                            <Card.Img variant="top" src="https://via.placeholder.com/150" />
                            <Card.Body>
                                <Card.Title>Card Title</Card.Title>
                                <Card.Text>
                                    Some quick example text to build on the card title and make up the bulk of the card's content.
                                </Card.Text>
                                <Button variant="primary">Go somewhere</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card className="mb-3">
                            <Card.Img variant="top" src="https://via.placeholder.com/150" />
                            <Card.Body>
                                <Card.Title>Card Title</Card.Title>
                                <Card.Text>
                                    Some quick example text to build on the card title and make up the bulk of the card's content.
                                </Card.Text>
                                <Button variant="primary">Go somewhere</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default HomePage;
