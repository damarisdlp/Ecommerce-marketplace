import React, { useState } from 'react';
import { Row, Col, Button, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { store } from 'store.js';
import { setAddingItem } from 'auth/authSlice';
import HtmlHead from 'components/html-head/HtmlHead';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import { setListView, setNumResults } from 'results/resultsSlice';
import GridItem from './components/GridItem';

const Marketplace = () => {
  const title = 'Marketplace';
  const description = 'Ecommerce Marketplace Page';

  const { currentUser, isLogin } = useSelector((state) => state.auth);
  const { listView } = useSelector((state) => state.results);
  const [toggleViewMode, setToggleViewMode] = useState(listView);
  const history = useHistory();

  store.dispatch(setNumResults(4));

  function userGreeting() {
    return <h1>Welcome Back, {currentUser.firstName}</h1>;
  }

  function guestGreeting() {
    return <h1>Please Sign In.</h1>;
  }

  // eslint-disable-next-line
  function Greeting(props) {
    if (isLogin) {
      return userGreeting();
    }
    return guestGreeting();
  }

  const toggleView = () => {
    if (toggleViewMode === 'grid') {
      setToggleViewMode('list');
      store.dispatch(setListView('list'));
    } else {
      setToggleViewMode('grid');
      store.dispatch(setListView('grid'));
    }
  };
  // Dynamically renders the List/Grid view button
  function diplayListViewButton() {
    let button;
    if (toggleViewMode === 'grid') {
      button = (
        <OverlayTrigger delay={{ show: 1000, hide: 0 }} placement="top" overlay={<Tooltip id="tooltip-top">List View</Tooltip>}>
          <Button variant="foreground-alternate" className="btn-icon btn-icon-only shadow" onClick={toggleView}>
            <CsLineIcons icon="list" />
          </Button>
        </OverlayTrigger>
      );
    } else if (toggleViewMode === 'list') {
      button = (
        <OverlayTrigger delay={{ show: 1000, hide: 0 }} placement="top" overlay={<Tooltip id="tooltip-top">Gallery View</Tooltip>}>
          <Button variant="foreground-alternate" className="btn-icon btn-icon-only shadow" onClick={toggleView}>
            <CsLineIcons icon="grid-1" />
          </Button>
        </OverlayTrigger>
      );
    } else {
      console.log('error in displayList');
    }
    return button;
  }

  // When  user clicks add item it sets addItemClick to true so addItemForm
  // will be displayed on profile page.  If user is not logged it, user will
  // routed to login page, otherwise they will be send to profile page where
  //  addItemForm will be displayed
  const addItemClicked = () => {
    store.dispatch(setAddingItem(true));

    if (isLogin) {
      history.push('/listMyItem');
    } else history.push('/login');
  };

  return (
    <>
      <HtmlHead title={title} description={description} />
      <Row>
        {/* Title Start */}
        <Col md="3" lg="5" xxl="7" className="mb-0">
          <div className="page-title-container me-1 mb-1  w-100 shadow">
            <Greeting name={currentUser.firstName} />
          </div>
          {/* Title End */}
        </Col>
        {/* Top Button Start */}
        <Col xxl="12" className="mb-1 text-end">
          {diplayListViewButton()}
          <Button type="button" onClick={addItemClicked} variant="outline-primary" className="btn-icon btn-icon-start ms-0 ms-sm-1 w-100 w-md-auto">
            <CsLineIcons icon="edit-square" /> <span>List an Item</span>
          </Button>
        </Col>
        {/* Top Button End */}
      </Row>
      {/* Popular Categories Start */}
      <br />
      <div>
        <h2>Bicycles</h2>
        <GridItem category="Sporting-Bikes" />
      </div>
      <br />
      <div>
        <h2>Cameras</h2>
        <GridItem category="Electronic-Photo" />
      </div>
      <br />
      <div>
        <h2>Tools</h2>
        <GridItem category="Outdoor-Tools" />
      </div>
      <br />
      <div>
        <h2>Vehicles</h2>
        <GridItem category="Vehicles-Electric" />
      </div>
      <div className="mb-7" />
      {/* Popular Categories End */}
    </>
  );
};

export default Marketplace;
