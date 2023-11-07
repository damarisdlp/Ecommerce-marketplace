import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Row, Col, Button, Form, Modal } from 'react-bootstrap';
import Rating from 'react-rating';
import HtmlHead from 'components/html-head/HtmlHead';
import BreadcrumbList from 'components/breadcrumb-list/BreadcrumbList';
import GridView from 'components/GridViewList';
import { LAYOUT } from 'constants.js';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import useCustomLayout from 'hooks/useCustomLayout';
import { setNumResults } from 'results/resultsSlice';
import { store } from 'store.js';

const FilterMenuContent = () => {
  return (
    <div className="nav flex-column sw-30 pe-7">
      <Form className="mb-5">
        <p className="text-small text-muted mb-3">USER</p>
        <Row className="g-1 mb-3">
          <Col>
            <Form.Control type="text" placeholder="Username" />
          </Col>
          <Col xs="auto">
            <Button variant="outline-primary" className="btn-icon btn-icon-only">
              <CsLineIcons icon="chevron-right" />
            </Button>
          </Col>
        </Row>
      </Form>
      <Form className="mb-5">
        <p className="text-small text-muted mb-3">LOCATION</p>
        <Row className="g-1">
          <Col>
            <Form.Control type="text" placeholder="City, State" />
          </Col>
          <Col xs="auto">
            <Button variant="outline-primary" className="btn-icon btn-icon-only">
              <CsLineIcons icon="chevron-right" />
            </Button>
          </Col>
        </Row>
      </Form>
      <Form className="mb-5">
        <p className="text-small text-muted mb-3">RATING</p>
        <div className="form-check">
          <input type="radio" className="form-check-input" name="ratings" id="rating1" />
          <label className="form-check-label" htmlFor="rating1">
            <Rating initialRating={5} readonly emptySymbol={<i className="cs-star text-muted" />} fullSymbol={<i className="cs-star-full text-primary" />} />
          </label>
        </div>
        <div className="form-check">
          <input type="radio" className="form-check-input" name="ratings" id="rating2" />
          <label className="form-check-label" htmlFor="rating2">
            <Rating initialRating={4} readonly emptySymbol={<i className="cs-star text-muted" />} fullSymbol={<i className="cs-star-full text-primary" />} />
          </label>
        </div>
        <div className="form-check">
          <input type="radio" className="form-check-input" name="ratings" id="rating3" />
          <label className="form-check-label" htmlFor="rating3">
            <Rating initialRating={3} readonly emptySymbol={<i className="cs-star text-muted" />} fullSymbol={<i className="cs-star-full text-primary" />} />
          </label>
        </div>
        <div className="form-check">
          <input type="radio" className="form-check-input" name="ratings" id="rating4" />
          <label className="form-check-label" htmlFor="rating4">
            <Rating initialRating={2} readonly emptySymbol={<i className="cs-star text-muted" />} fullSymbol={<i className="cs-star-full text-primary" />} />
          </label>
        </div>
        <div className="form-check">
          <input type="radio" className="form-check-input" name="ratings" id="rating5" />
          <label className="form-check-label" htmlFor="rating5">
            <Rating initialRating={1} readonly emptySymbol={<i className="cs-star text-muted" />} fullSymbol={<i className="cs-star-full text-primary" />} />
          </label>
        </div>
      </Form>
      <Form className="mb-5">
        <p className="text-small text-muted mb-3">DURATION</p>
        <Form.Check type="checkbox" label="Hourly" id="durationCheckbox1" />
        <Form.Check type="checkbox" label="Daily" id="durationCheckbox2" />
        <Form.Check type="checkbox" label="Weekly" id="durationCheckbox3" />
        <Form.Check type="checkbox" label="Monthly" id="durationCheckbox4" />
      </Form>
      <Form className="mb-5">
        <p className="text-small text-muted mb-3">RATE</p>
        <Row className="g-1">
          <Col>
            <Form.Control type="text" placeholder="Min" />
          </Col>
          <Col>
            <Form.Control type="text" placeholder="Max" />
          </Col>
          <Col xs="auto">
            <Button variant="outline-primary" className="btn-icon btn-icon-only">
              <CsLineIcons icon="chevron-right" />
            </Button>
          </Col>
        </Row>
      </Form>
      <div className="d-flex flex-row justify-content-between w-100 w-sm-50 w-xl-100">
        <Button variant="outline-primary" className="w-100 me-2">
          Clear
        </Button>
        <Button variant="primary" className="w-100 me-2">
          Filter
        </Button>
      </div>
    </div>
  );
};

const Search = () => {
  const [isLgScreen] = useState(false);
  const [isOpenFiltersModal, setIsOpenFiltersModal] = useState(false);

  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const title = 'Search Results';
  const description = 'Search Results page';
  const { category } = useParams();

  useEffect(() => {
    if (category) {
      setSelectedCategory(category);
    }
  }, [category]);

  useEffect(() => {
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
    let results = items;
    store.dispatch(setNumResults(1000));

    if (searchTerm) {
      results = results.filter(
        (item) => item.title.toLowerCase().includes(searchTerm.toLowerCase()) || item.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory) {
      results = results.filter((item) => item.category && item.category.label === selectedCategory);
    }
    setFilteredItems(results);
  }, [searchTerm, selectedCategory, items]);

  const breadcrumbs = [
    { to: 'marketplace', text: 'Home' },
    { to: 'miscellaneous', text: 'Search' },
  ];

  useCustomLayout({ layout: LAYOUT.Boxed });

  function handleSearchSubmit(event) {
    event.preventDefault();
  }

  function handleSearchChange(event) {
    setSearchTerm(event.target.value);
  }

  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }

  return (
    <>
      <HtmlHead title={title} description={description} />
      <div className="page-title-container">
        <h1 className="mb-2 pb-0 display-4">{title}</h1>
        <BreadcrumbList items={breadcrumbs} />
      </div>
      {/* Filters Start */}
      <Row className="g-5">
        <Col xl="4" xxl="3" className="mb-5">
          <Card className="d-flex mb-5 flex-grow-1">
            <Card.Body>
              <h3 className="mb-3">Filters</h3>
              <p style={{ fontSize: '10px' }}>CATEGORY</p>
              <select value={selectedCategory} onChange={handleCategoryChange} className="form-select mb-5">
                <option value="">All Categories</option>
                <option value="Sporting-Bikes">Bicycles</option>
                <option value="Outdoor-Tools">Tools</option>
                <option value="Outdoor-Camping">Camping</option>
                <option value="Electronic-Video-Camera">Video Cameras</option>
                <option value="Electronic-Photo">Cameras</option>
                <option value="Vehicles-Electric">Electric Vehicles</option>
                <option value="Apparel-Men">Mens Apparel</option>
              </select>
              <FilterMenuContent />
            </Card.Body>
          </Card>
        </Col>
        {/* Filters End */}
        <Col xl="8" xxl="9" className="mb-5">
          <Card className="d-flex mb-2 flex-grow-1">
            <Card.Body className="pt-5">
              <h1 className="mb-3">Search</h1>
              <form onSubmit={handleSearchSubmit}>
                <input type="text" value={searchTerm} onChange={handleSearchChange} className="form-control mb-7" placeholder="Search by title, description " />
              </form>
              <div>
                {/* Display Results Start */}
                <GridView view="grid" data={filteredItems} />
                {/* Display Results Ends */}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Filters Modal Start */}
      {!isLgScreen && (
        <Modal className="modal-left" show={isOpenFiltersModal} onHide={() => setIsOpenFiltersModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title as="h5">Filters</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FilterMenuContent />
          </Modal.Body>
        </Modal>
      )}
      {/* Filters Modal End */}
      <div className="mb-7" />
    </>
  );
};
export default Search;
