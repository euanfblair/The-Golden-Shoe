import React from 'react';
import { Carousel, Card, Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css';

const HomePage = () => {
    return (
        <div>
            <Container className="carousel-container">
                <Carousel interval={null}>
                    <Carousel.Item>
                        <img
                            className="d-block w-100 carousel-img"
                            src="https://www.brooksrunning.com/dw/image/v2/BGPF_PRD/on/demandware.static/-/Sites-brooks-master-catalog/default/dw124d598f/original/110386/110386-048-l-launch-9-mens-fast-running-shoe.jpg?sw=1388&sh=868&sm=cut&sfrm=png&bgcolor=F1F3F6"
                            alt="Shoe of the month"
                        />
                        <Carousel.Caption>
                            <h3>Shoe of the month</h3>
                            <p>25% off</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100 carousel-img"
                            src="https://limeshoeco.co.uk/wp-content/uploads/2023/03/Salwaterblue.webp"
                            alt="Summer Sale"
                        />
                        <Carousel.Caption>
                            <h3>Summer Sale</h3>
                            <p>50% off</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </Container>

            <Container className="bg-info text-white text-center py-5 my-3">
                <h1>Summer Sale - up to 50% off selected lines</h1>
                <p>
                    This is a modified jumbotron that occupies the entire horizontal space of its parent.
                </p>
            </Container>

            <Container>
                <Row>
                    <Col md={4}>
                        <Card className="custom-card mb-3">
                            <Card.Img className="custom-card-img" variant="top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyLl-RItigTKHMmUO3xNRpnVTYhXfWmP06Yg&usqp=CAU" />
                            <Card.Body className="custom-card-body">
                                <Card.Title>Boots</Card.Title>
                                <Card.Text>
                                    Some quick example text to build on the card title and make up the bulk of the card's content.
                                </Card.Text>
                                <Button as={Link} to="/products" variant="primary">Go to Products</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card className="custom-card mb-3">
                            <Card.Img className="custom-card-img" variant="top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQA-FwfPt_Rxhf_x8YZy-MFcIui1WJncN5ttg&usqp=CAU" />
                            <Card.Body className="custom-card-body">
                                <Card.Title>Trainers</Card.Title>
                                <Card.Text>
                                    Some quick example text to build on the card title and make up the bulk of the card's content.
                                </Card.Text>
                                <Button as={Link} to="/products" variant="primary">Go to Products</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card className="custom-card mb-3">
                            <Card.Img className="custom-card-img" variant="top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVQ-E22ksezgb1oioYuEH7wVk-zvA8ZOS-DQ&usqp=CAU" />
                            <Card.Body className="custom-card-body">
                                <Card.Title>Leisure</Card.Title>
                                <Card.Text>
                                    Some quick example text to build on the card title and make up the bulk of the card's content.
                                </Card.Text>
                                <Button as={Link} to="/products" variant="primary">Go to Products</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default HomePage;
