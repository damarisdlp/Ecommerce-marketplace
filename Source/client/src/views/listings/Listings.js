import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Row, Col, Button, Dropdown, Form, Tooltip, OverlayTrigger, Pagination } from 'react-bootstrap';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import HtmlHead from 'components/html-head/HtmlHead';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import GridView from 'components/GridViewList';
import ListView from 'components/ListViewList';
import BreadcrumbList from 'components/breadcrumb-list/BreadcrumbList';
import { setNumResults, setPageNum, setData } from 'results/resultsSlice';
import { setAddingItem } from 'auth/authSlice';
import { store } from 'store.js';

const Listings = () => {
  // Get results state at page load
  const { numResults, pageNum, listView, data } = useSelector((state) => state.results);
  const { isLogin } = useSelector((state) => state.auth);
  const history = useHistory();

  // add List View Selection state: Grid -> List -> Grid
  const [toggleViewMode, setToggleViewMode] = useState(listView);
  const title = 'My Listings';
  const description = 'A Users Rental Listings Page';

  const [totalPages, setTotalPages] = useState(Math.ceil(data.length / numResults));
  const [selectedItems, setSelectedItems] = useState([]);

  const breadcrumbs = [
    { to: 'marketplace', text: 'Home' },
    { to: 'myprofile', title: 'Profile' },
    { to: 'listings', title: 'My Listings' },
  ];

  const checkItem = (item) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter((x) => x !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  // Sets the global results array
  store.dispatch(setData(data));

  useEffect(() => {
    setTotalPages(Math.ceil(data.length / numResults));
  }, [data.length, numResults]);

  // Dynamically renders the List/Grid view button
  function diplayListViewButton() {
    let button;
    if (toggleViewMode === 'grid') {
      button = (
        <OverlayTrigger delay={{ show: 1000, hide: 0 }} placement="top" overlay={<Tooltip id="tooltip-top">List View</Tooltip>}>
          <Button variant="foreground-alternate" className="btn-icon btn-icon-only shadow" onClick={() => setToggleViewMode('list')}>
            <CsLineIcons icon="list" />
          </Button>
        </OverlayTrigger>
      );
    } else if (toggleViewMode === 'list') {
      button = (
        <OverlayTrigger delay={{ show: 1000, hide: 0 }} placement="top" overlay={<Tooltip id="tooltip-top">Gallery View</Tooltip>}>
          <Button variant="foreground-alternate" className="btn-icon btn-icon-only shadow" onClick={() => setToggleViewMode('grid')}>
            <CsLineIcons icon="grid-1" />
          </Button>
        </OverlayTrigger>
      );
    } else {
      console.log('error in displayList');
    }
    return button;
  }

  // Sets the global num of results to the user's choice and resets the page number to 1
  const handleSelect = (num) => {
    store.dispatch(setNumResults(num));
    store.dispatch(setPageNum(1));
  };

  // sets the new page number in resultsSlice
  const handlePageLinkClick = (num) => {
    store.dispatch(setPageNum(num));
  };

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
      <div className="page-title-container">
        <Row className="g-0">
          {/* Title Start */}
          <Col xs="auto" className="mb-2 mb-lg-0 me-auto">
            <div className="w-auto sw-md-25">
              <h1 className="mb-2 pb-0 display-4">{title}</h1>
              <BreadcrumbList items={breadcrumbs} />
            </div>
          </Col>
          {/* Title End */}

          {/* Top Buttons Start */}
          <Col xs="12" sm="auto" className="d-flex align-items-end justify-content-end mb-2 mb-sm-0 order-sm-3">
            <Button variant="outline-primary" onClick={addItemClicked} className="btn-icon btn-icon-start ms-0 ms-sm-1 w-100 w-md-auto">
              <CsLineIcons icon="edit-square" /> <span>List an Item</span>
            </Button>
          </Col>
          {/* Top Buttons End */}
        </Row>
      </div>

      <Row className="mb-3">
        <Col md="5" lg="3" xxl="2" className="mb-1">
          {/* Search Start */}
          <div className="d-inline-block float-md-start me-1 mb-1 search-input-container w-100 shadow bg-foreground">
            <Form.Control type="text" placeholder="Search My Listings" />
            <span className="search-magnifier-icon">
              <CsLineIcons icon="search" />
            </span>
            <span className="search-delete-icon d-none">
              <CsLineIcons icon="close" />
            </span>
          </div>
          {/* Search End */}
        </Col>
        <Col md="7" lg="9" xxl="10" className="mb-1 text-end">
          {/* List / Grid View Buttons Start */}
          {diplayListViewButton()}
          {/* List / Grid View Buttons End */}

          {/* Print Button Start */}
          <OverlayTrigger delay={{ show: 1000, hide: 0 }} placement="top" overlay={<Tooltip id="tooltip-top">Print</Tooltip>}>
            <Button variant="foreground-alternate" className="btn-icon btn-icon-only shadow">
              <CsLineIcons icon="print" />
            </Button>
          </OverlayTrigger>
          {/* Print Button End */}

          {/* Export Dropdown Start */}
          <Dropdown align={{ xs: 'end' }} className="d-inline-block ms-1">
            <OverlayTrigger delay={{ show: 1000, hide: 0 }} placement="top" overlay={<Tooltip id="tooltip-top">Export</Tooltip>}>
              <Dropdown.Toggle variant="foreground-alternate" className="dropdown-toggle-no-arrow btn btn-icon btn-icon-only shadow">
                <CsLineIcons icon="download" />
              </Dropdown.Toggle>
            </OverlayTrigger>
            <Dropdown.Menu className="shadow dropdown-menu-end">
              <Dropdown.Item href="#">Copy</Dropdown.Item>
              <Dropdown.Item href="#">Excel</Dropdown.Item>
              <Dropdown.Item href="#">Cvs</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          {/* Export Dropdown End */}

          {/* Results per page Dropdown Start */}
          <Dropdown align={{ xs: 'end' }} className="d-inline-block ms-1" onSelect={handleSelect}>
            <OverlayTrigger delay={{ show: 1000, hide: 0 }} placement="top" overlay={<Tooltip id="tooltip-top">Results per Page</Tooltip>}>
              <Dropdown.Toggle variant="foreground-alternate" className="shadow sw-25">
                {numResults} Results Per Page
              </Dropdown.Toggle>
            </OverlayTrigger>
            <Dropdown.Menu className="shadow dropdown-menu-end">
              <Dropdown.Item eventKey={12}>12 Results</Dropdown.Item>
              <Dropdown.Item eventKey={24}>24 Results</Dropdown.Item>
              <Dropdown.Item eventKey={48}>48 Results</Dropdown.Item>
              <Dropdown.Item eventKey={96}>96 Results</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          {/* Results per page Dropdown End */}
        </Col>
      </Row>

      {/* List Results Start */}
      {/* Display List View */}
      <ListView view={toggleViewMode} data={data} selectedItems={selectedItems} checkItem={checkItem} />
      {/* Display Grid View */}
      <GridView view={toggleViewMode} data={data} selectedItems={selectedItems} />
      {/* List Results End */}

      {/* Pagination Start - page navigation */}
      <div className="d-flex justify-content-center mt-5">
        <Pagination>
          <Pagination.First className="shadow" disabled={pageNum === 1} onClick={() => handlePageLinkClick(1)} />
          <Pagination.Prev className="shadow" disabled={pageNum === 1} onClick={() => handlePageLinkClick(pageNum - 1)}>
            <div className="pagination-box">
              <BsChevronLeft />
            </div>
          </Pagination.Prev>
          {pageNum > 2 && <Pagination.Ellipsis disabled />}
          {pageNum > 1 && (
            <Pagination.Item className="shadow" onClick={() => handlePageLinkClick(pageNum - 1)}>
              <div className="pagination-box">{pageNum - 1}</div>
            </Pagination.Item>
          )}
          <Pagination.Item className="shadow" active>
            <div className="pagination-box">{pageNum}</div>
          </Pagination.Item>
          {pageNum < totalPages && (
            <Pagination.Item className="shadow" onClick={() => handlePageLinkClick(pageNum + 1)}>
              <div className="pagination-box">{pageNum + 1}</div>
            </Pagination.Item>
          )}
          {pageNum < totalPages - 1 && <Pagination.Ellipsis disabled />}
          {/* eslint-disable-next-lin */}
          <Pagination.Next className="shadow" disabled={pageNum === totalPages} onClick={() => handlePageLinkClick(pageNum + 1)}>
            <div className="pagination-box">
              <BsChevronRight />
            </div>
          </Pagination.Next>
          {/* eslint-disable-next-lin */}
          <Pagination.Last className="shadow" disabled={pageNum === totalPages} onClick={() => handlePageLinkClick(totalPages)} />
        </Pagination>
      </div>
      {/* Pagination End - page navigation */}
    </>
  );
};

export default Listings;
