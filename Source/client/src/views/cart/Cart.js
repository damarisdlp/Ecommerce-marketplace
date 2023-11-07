import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { Card, Col, Row, ListGroup } from 'react-bootstrap';
import { LAYOUT } from 'constants.js';
import HtmlHead from 'components/html-head/HtmlHead';
import BreadcrumbList from 'components/breadcrumb-list/BreadcrumbList';
import useCustomLayout from 'hooks/useCustomLayout';
import { useSelector } from 'react-redux';
import CheckoutButton from 'views/checkout/CheckoutButton';

const Cart = () => {
  const addToCart = sessionStorage.getItem('addToCart') || null;
  const _id = sessionStorage.getItem('_id') || null;
  const { currentUser, isLogin } = useSelector((state) => state.auth);
  const [filteredItems, setFilteredItems] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [zipCode, setZipCode] = useState('');
  const [items, setItems] = useState([]);
  const { lynchpin } = currentUser;
  const cartRef = useRef({});
  const history = useHistory();

  const title = 'Cart';
  const description = 'Shopping Cart';

  // eslint-disable-next-line no-unused-vars
  const [rentalDuration, setRentalDuration] = useState({
    hours: 1,
    days: 0,
    weeks: 0,
    months: 0,
  });

  // if adding an item to the shopping cart
  useEffect(() => {
    async function updateOrAddCart() {
      const newCart = {
        lynchpin,
        cartItemIds: [_id],
      };

      try {
        if (cartRef.current && addToCart) {
          // update the cart by _id
          const updateUrl = `http://localhost:5002/shoppingCart/update/${cartRef.current._id}`;
          newCart.cartItemIds = [...cartRef.current.cartItemIds, _id];
          await fetch(updateUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newCart),
          });
        } else if (addToCart) {
          // create a new cart
          await fetch('http://localhost:5002/shoppingCart/add', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newCart),
          });
        }
        setCartItems((prevCartItems) => [...prevCartItems, _id]);
        sessionStorage.removeItem('addToCart');
      } catch (error) {
        console.error('Error updating or adding cart', error);
      }
    }

    async function getCartItems() {
      try {
        const response = await fetch('http://localhost:5002/shoppingCart/');
        if (!response.ok) {
          const message = `An error occurred: ${response.statusText}`;
          // eslint-disable-next-line no-alert
          window.alert(message);
          return;
        }
        const responseData = await response.json();
        if (isLogin) {
          // separate out the user's shopping cart
          const userCart = responseData.find((cart) => cart.lynchpin === lynchpin);
          cartRef.current = userCart;
          if (userCart) {
            setCartItems(userCart.cartItemIds);
          }
        }
        updateOrAddCart();
      } catch (error) {
        console.error('Error fetching cart items', error);
      }
    }

    getCartItems();
    sessionStorage.removeItem('addToCart');
  }, [addToCart, lynchpin, _id, history, isLogin]);

  useEffect(() => {
    // get all redntal listings from the database
    async function getItems() {
      try {
        const response = await fetch('http://localhost:5002/items/');
        if (!response.ok) {
          const message = `An error occurred: ${response.statusText}`;
          // eslint-disable-next-line no-alert
          window.alert(message);
          return;
        }
        const responseData = await response.json();
        setItems(responseData);
      } catch (error) {
        console.error('Error fetching items', error);
      }
    }

    getItems();
  }, []);

  useEffect(() => {
    if (cartItems.length > 0 && items.length > 0) {
      const uniqueCartItems = [...new Set(cartItems.filter((cartItemId) => cartItemId !== undefined))];
      const userItems = uniqueCartItems
        .map((cartItemId) => {
          const userItem = items.find((item) => String(item._id) === String(cartItemId));
          if (!userItem) {
            console.error(`Item with ID ${cartItemId} not found in items array`);
          } else {
            userItem.rentalDuration = {
              hours: 1,
              days: 0,
              weeks: 0,
              months: 0,
            };
          }
          return userItem;
        })
        .filter((item) => item !== undefined);

      setFilteredItems(userItems);
    }
  }, [cartItems, items]);

  useEffect(() => {
    let sum = 0;
    filteredItems.forEach((filteredItem) => {
      const { hourly, daily, weekly, monthly } = filteredItem.cost;
      const { hours, days, weeks, months } = filteredItem.rentalDuration;
      const itemCost = hourly * hours + daily * days + weekly * weeks + monthly * months;
      sum += itemCost;
    });
    setTotalCost(sum);
  }, [filteredItems, rentalDuration]);

  const breadcrumbs = [
    { to: 'marketplace', text: 'Home' },
    { to: 'Cart', text: 'Cart' },
  ];

  function DisplayPersonalizedCartMessage() {
    return <h3>{currentUser.firstName}'s Cart</h3>;
  }

  function PromptLogin() {
    return <h3>Please Sign In to See the Contents of Your Shopping Cart.</h3>;
  }

  function DisplayCartMessage() {
    if (isLogin) {
      return (
        <>
          <DisplayPersonalizedCartMessage />
          <p>Total cost: ${totalCost.toFixed(2)}</p>
        </>
      );
    }
    return <PromptLogin />;
  }
  const handleZipCodeChange = (event) => {
    setZipCode(event.target.value);
  };

  // eslint-disable-next-line no-unused-vars
  function handleRentalDurationChange(event, index, unit) {
    const newRentalDuration = {
      ...filteredItems[index].rentalDuration,
      [unit]: parseInt(event.target.value, 10),
    };
    const newFilteredItems = [...filteredItems];
    newFilteredItems[index].rentalDuration = newRentalDuration;
    setFilteredItems(newFilteredItems);
  }
  function renderRentalDurationSelect(item, index, unit) {
    return (
      <select
        value={item.rentalDuration[unit]}
        onBlur={(event) => handleRentalDurationChange(event, index, unit)}
        onChange={(event) => handleRentalDurationChange(event, index, unit)}
      >
        {[...Array(31).keys()].map((i) => (
          <option key={i} value={i}>
            {i} {unit}
          </option>
        ))}
      </select>
    );
  }

  useCustomLayout({ layout: LAYOUT.Boxed });
  return (
    <>
      <HtmlHead title={title} description={description} />
      <div className="page-title-container">
        <h1 className="mb-2 pb-0 display-4">{title}</h1>
        <BreadcrumbList items={breadcrumbs} />
      </div>
      <Row className="g-5">
        <Col xl="8" xxl="9" className="mb-5">
          <Card className="d-flex mb-2 flex-grow-1">
            <Card.Body className="pt-5">
              <DisplayCartMessage />
              {isLogin && (
                <ListGroup>
                  {filteredItems.map((item, index) => {
                    const { hourly, daily, weekly, monthly } = item.cost;
                    const { hours, days, weeks, months } = item.rentalDuration;
                    const itemCost = hourly * hours + daily * days + weekly * weeks + monthly * months;
                    return (
                      <ListGroup.Item key={item._id}>
                        <Row>
                          <Col md="auto">
                            <img src={item.imgSrc} alt={item.title} width="100" height="100" />
                          </Col>
                          <Col>
                            <h6>{item.title}</h6>
                            <p>Please select rental duration:</p>
                            {renderRentalDurationSelect(item, index, 'hours')} hours
                            {renderRentalDurationSelect(item, index, 'days')} days
                            {renderRentalDurationSelect(item, index, 'weeks')} weeks
                            {renderRentalDurationSelect(item, index, 'months')} months
                            <p style={{ marginTop: '20px' }}>
                              Current rental duration: {hours} hours, {days} days, {weeks} weeks, {months} months
                            </p>
                          </Col>
                          <Col md="auto">
                            <p>Cost: ${itemCost.toFixed(2)}</p>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    );
                  })}
                </ListGroup>
              )}
            </Card.Body>
          </Card>
        </Col>
        <Col xl="4" xxl="3" className="mb-5">
          <Card className="d-flex mb-2 flex-grow-1">
            <Card.Body>
              <h3 className="mb-3">Cart Summary</h3>
              <label htmlFor="zipCode">Zip Code:</label>
              <input
                type="text"
                id="zipCode"
                value={zipCode}
                onChange={handleZipCodeChange}
                placeholder="Enter zip code"
                style={{ borderRadius: '5px', marginTop: '5px', marginLeft: '10px', marginBottom: '20px' }}
              />
              <ListGroup>
                {filteredItems.map((item) => {
                  const { hourly, daily, weekly, monthly } = item.cost;
                  const { hours, days, weeks, months } = item.rentalDuration;
                  const itemCost = hourly * hours + daily * days + weekly * weeks + monthly * months;

                  return (
                    <ListGroup.Item key={item._id}>
                      <Row>
                        <Col>
                          <p>{item.title}</p>
                        </Col>
                        <Col md="auto">
                          <p>Cost: ${itemCost.toFixed(2)}</p>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  );
                })}
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <h6>Subtotal:</h6>
                    </Col>
                    <Col md="auto">
                      <h6>${totalCost.toFixed(2)}</h6>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <h6>Sales Tax: </h6>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <h6>Total:</h6>
                    </Col>
                    <Col md="auto">
                      <h6>${totalCost.toFixed(2)}</h6>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>{isLogin && <CheckoutButton totalCost={totalCost} />}</ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Cart;
