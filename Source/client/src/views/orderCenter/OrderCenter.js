import React, { useEffect, useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { LAYOUT } from 'constants.js';
import HtmlHead from 'components/html-head/HtmlHead';
import BreadcrumbList from 'components/breadcrumb-list/BreadcrumbList';
import { setNumResults } from 'results/resultsSlice';
import useCustomLayout from 'hooks/useCustomLayout';
import { useSelector } from 'react-redux';
import GridViewList from 'components/GridViewList';
import { store } from 'store.js';

const OrderCenter = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function getItems() {
      try {
        const response = await fetch('http://localhost:5002/items/');
        if (!response.ok) {
          const message = `An error occurred: ${response.statusText}`;
          // eslint-disable-next-line
          window.alert(message);
          return;
        }
        const responseData = await response.json();
        setData(responseData);
      } catch (error) {
        console.error('Error fetching items', error);
      }
    }
    getItems();
  }, []);

  const title = 'Order Center';
  const description = 'Dashboard for all your orders';

  const { currentUser, isLogin } = useSelector((state) => state.auth);
  const { lynchpin } = currentUser;
  const usersItems = data.filter((item) => item.lynchpin === lynchpin);

  const breadcrumbs = [
    { to: 'marketplace', text: 'Home' },
    { to: 'myprofile', text: 'My Profile' },
    { to: 'orderCenter', text: 'Order Center' },
  ];

  store.dispatch(setNumResults(1000));

  // eslint-disable-next-line
  function DisplayPersonalizedMessage(props) {
    return <h3>{currentUser.firstName}'s Orders</h3>;
  }
  // eslint-disable-next-line
  function PromptLogin(props) {
    return <h3>Please Sign In to See Your Orders.</h3>;
  }
  // eslint-disable-next-line
  function DisplayDashboardMessage(props) {
    if (isLogin) {
      return <DisplayPersonalizedMessage />;
    }
    return <PromptLogin />;
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
        <Col xl="10" xxl="12" className="mb-5">
          <Card className="d-flex mb-2 flex-grow-1">
            <Card.Body className="pt-5">
              <DisplayDashboardMessage name={currentUser.name} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <div>
        <Row className="g-5">
          <Col xl="10" xxl="12" className="mb-5">
            <Card className="d-flex mb-2 flex-grow-1">
              <Card.Body className="pt-5">{isLogin ? <h3 className="mb-2">{currentUser.firstName}'s Active Listings</h3> : null}</Card.Body>
            </Card>
            <GridViewList data={usersItems} view="grid" />
          </Col>
        </Row>
      </div>
      <div className="mb-7" />
    </>
  );
};

export default OrderCenter;
