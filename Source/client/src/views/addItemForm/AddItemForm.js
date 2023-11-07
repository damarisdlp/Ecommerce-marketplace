import { React, useRef, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { Row, Col, Button, Card, Modal } from 'react-bootstrap';
import { useFormik } from 'formik';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import useCustomLayout from 'hooks/useCustomLayout';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
import { LAYOUT } from 'constants.js';
import HtmlHead from 'components/html-head/HtmlHead';
import { store } from 'store.js';
import { setAddingItem } from 'auth/authSlice';
import 'react-image-lightbox/style.css';
import Select from 'react-select';
import Previews from './Previews';
import './AddItemForm.css';

const AddItemForm = () => {
  const { currentUser } = useSelector((state) => state.auth);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const initialValues = {
    itemTitle: ' ',
    itemDescription: ' ',
    hourly: '0',
    daily: '0',
    weekly: '0',
    monthly: '0',
    purchasePrice: '0',
  };

  const validationSchema = Yup.object({
    itemTitle: Yup.string().required('Title is required'),
    itemDescription: Yup.string().required('Description is required'),
    hourly: Yup.number().required('Hourly rate is required'),
    daily: Yup.number().required('Daily rate is required'),
    weekly: Yup.number().required('Weekly rate is required'),
    monthly: Yup.number().required('Monthly rate is required'),
    purchasePrice: Yup.number().required('Purchase price is required'),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
  });

  const { values, handleChange } = formik;
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);
  // const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Simplified version
  const [modalContent, setModalContent] = useState(null);
  let newItem = {};
  const history = useHistory();
  const title = 'List Item';
  const description = 'Listing Creation page';

  // Set starting focus on Item Title
  const inputRef = useRef();

  // Sets all the Key Value Pair for the Item object
  const { lynchpin, username } = currentUser;

  // Options for item category
  const category = [
    { value: '1.1', label: 'Apparel-Children' },
    { value: '1.2', label: 'Apparel-Women' },
    { value: '1.3', label: 'Apparel-Men' },
    { value: '2.1', label: 'Home-Appliances' },
    { value: '2.2', label: 'Home-Travel Gear' },
    { value: '2.3', label: 'Home-Furniture' },
    { value: '2.4', label: 'Home-Patio' },
    { value: '3.1', label: 'Outdoor-Tools' },
    { value: '3.2', label: 'Outdoor-Grill' },
    { value: '3.3', label: 'Outdoor-Camping' },
    { value: '3.4', label: 'Outdoor-Bikes/Scooter' },
    { value: '4.1', label: 'Vehicle-Gas' },
    { value: '4.2', label: 'Vehicle-Electric' },
    { value: '4.3', label: 'Vehicle-Recreational' },
    { value: '4.4', label: 'Vehicle-Personal Watercraft' },
    { value: '4.5', label: 'Vehicle-Jetski' },
    { value: '5.1', label: 'Electronic-Computer' },
    { value: '5.2', label: 'Electronic-TV' },
    { value: '5.3', label: 'Electronic-Photo' },
    { value: '5.3', label: 'Electronic-Video Camera' },
    { value: '6.1', label: 'Sporting-Bikes' },
    { value: '6.2', label: 'Sporting-Hockey' },
    { value: '6.3', label: 'Sporting-Baseball' },
    { value: '6.4', label: 'Sporting-Football' },
    { value: '6.5', label: 'Sporting-Socker' },
    { value: '6.6', label: 'Sporting-Rugby' },
    { value: '6.7', label: 'Sporting-Jai Alai' },
    { value: '6.8', label: 'Sporting-Tenis' },
  ];

  // Handle category selection
  const handleCategoryChange = (selectedOption) => {
    setSelectedCategory(selectedOption);
  };

  const toggleModal = (action) => {
    if (action === 'preview') {
      setModalContent('preview');
    } else if (action === 'submit') {
      setModalContent('submit');
      // history.push('/marketplace');
    } else {
      setModalContent(null);
    }
    setShowModal(!showModal);
    // onAfterClose(history.push('/marketplace'));
  };

  async function listItem(formValues) {
    store.dispatch(setAddingItem(false));

    const costs = {
      hourly: formValues.hourly,
      daily: formValues.daily,
      weekly: formValues.weekly,
      monthly: formValues.monthly,
      replaceCost: formValues.purchasePrice,
    };

    // Creates a new item object
    newItem = {
      title: formValues.itemTitle,
      description: formValues.itemDescription,
      cost: costs,
      visible: 'true',
      inCart: 'false',
      reserved: 'false',
      category: selectedCategory,
      rating: 'Be the first to rate this item.',
      numRatings: '0',
      badge: '',
      imgSrc: '/img/default/default_item.png',
      images: { 1: 'one', 2: 'two' },
      details: '/product/detail',
      location: {
        street: '555 Unkown Pl.',
        city: 'Somewhere',
        state: 'Undisclosed',
        zip: '12345',
      },
      username,
      lynchpin,
    };

    // Sends a post request and adds a new record to the database
    await fetch('http://localhost:5002/item/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newItem),
    })
      .then(() => {
        toggleModal('submit');
      })
      .catch((submitError) => {
        setError.alert(submitError.message);
      });
  }

  // eslint-disable-next-line
  function Greeting(props) {
    return <h3>Let's get your item listed {currentUser.firstName}</h3>;
  }

  useCustomLayout({ layout: LAYOUT.Boxed });

  const previewClicked = (event) => {
    event.preventDefault();
    toggleModal('preview');
    console.log('Preview has been clicked');
  };

  const submitClicked = (event, formValues) => {
    event.preventDefault();
    listItem(formValues);
    toggleModal('submit');
  };

  const quitClicked = () => {
    store.dispatch(setAddingItem(false));
    history.push('/marketplace');
  };

  return (
    <>
      <HtmlHead title={title} description={description} />
      {/* Title Start */}
      <div className="page-title-container">
        <NavLink className="muted-link pb-1 d-inline-block hidden breadcrumb-back" to="/">
          <span className="align-middle text-small ms-1">&nbsp;</span>
        </NavLink>
        <Greeting name={currentUser.name} />
      </div>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <Modal show={showModal} onHide={() => toggleModal(null)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{modalContent === 'preview' ? 'Preview' : 'Submission Successful'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalContent === 'preview' ? (
            <>
              <div>
                <strong>Title:</strong> {values.itemTitle}
              </div>
              <div>
                <strong>Description:</strong> {values.itemDescription}
              </div>
              <div>
                <strong>Per Hour:</strong> {values.hourly}
              </div>
              <div>
                <strong>Per Day:</strong> {values.dialy}
              </div>
              <div>
                <strong>Per Week:</strong> {values.weekly}
              </div>
              <div>
                <strong>Per Month:</strong> {values.monthly}
              </div>
              <div>
                <strong>Item Replacement Cost:</strong> {values.purchasePrice}
              </div>
            </>
          ) : (
            'Your item has been submitted successfully.'
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary" onClick={() => toggleModal(null)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Title End */}
      <Row>
        <Col>
          {/* Product Start */}
          <Card className="mb-5" max-height="1000px">
            <Card.Body>
              <form className="mb-4">
                <Row className="g-2 mb-4">
                  <Col xl="4" className="position-relative col-xl-4">
                    <Previews />
                  </Col>
                  <Col xl="*" className="sh-xl-60 d-flex flex-column justify-content-between col-xl-10 mx-auto">
                    <Row>
                      <Col>
                        <h4 className="addItemTitle" style={{ marginBottom: '10px' }}>
                          Title
                          <input
                            autoFocus
                            ref={inputRef}
                            id="itemTitle"
                            type="text"
                            required
                            value={values.itemTitle}
                            style={{ borderRadius: '5px', width: '100%', marginTop: '5px' }}
                            onChange={handleChange}
                          />
                        </h4>
                      </Col>
                      {/* Top Buttons Start */}
                      <Col className="text-end">
                        <div>
                          <div>
                            {/* eslint-disable-next-line */}
                            <Button 
                              variant="outline-primary"
                              className="btn-icon btn-icon-end mb-1"
                              style={{ marginRight: '10px' }}
                              type="preview"
                              onClick={previewClicked}
                            >
                              Preview <CsLineIcons icon="eye" />
                            </Button>
                            <Button
                              variant="outline-primary"
                              className="btn-icon btn-icon-end mb-1"
                              style={{ marginRight: '10px' }}
                              type="submit"
                              onClick={(event) => submitClicked(event, formik.values)}
                            >
                              Submit <CsLineIcons icon="save" />
                            </Button>
                            <Button
                              variant="outline-danger"
                              className="btn-icon btn-icon-end mb-1"
                              style={{ marginRight: '10px' }}
                              type="abort"
                              onClick={quitClicked}
                            >
                              Quit <CsLineIcons icon="slash" />
                            </Button>
                          </div>
                        </div>
                      </Col>
                      {/* Top Buttons End */}
                    </Row>
                    <Row className="mb-3">
                      <h4>Category </h4>
                      <Select value={selectedCategory} onChange={handleCategoryChange} options={category} placeholder="Select a category" />
                    </Row>
                    <Row className="mb-3">
                      <Col>
                        <div className="addItemPrice">
                          <label htmlFor="purchasePrice" style={{ marginRight: '10px' }}>
                            Item replacement cost (This value sets required minimum issurance a renter must have.)
                          </label>
                          <input
                            ref={inputRef}
                            id="purchasePrice"
                            type="number"
                            min={0}
                            step={0.01}
                            style={{ textAlign: 'right', borderRadius: '5px' }}
                            size="10"
                            required
                            value={values.purchasePrice}
                            onChange={handleChange}
                          />
                        </div>
                      </Col>
                    </Row>
                    {/* Start Rental Terms */}
                    <h4>Rental Terms:</h4>
                    <Row className="mt-1">
                      <Col>
                        <div className="addItemPrice" style={{ marginRight: '10px' }}>
                          <label htmlFor="hourly" style={{ marginRight: '10px' }}>
                            Per Hour
                          </label>
                          <input
                            ref={inputRef}
                            id="hourly"
                            type="number"
                            min={0}
                            step={0.01}
                            style={{ textAlign: 'right', borderRadius: '5px' }}
                            size="10"
                            required
                            value={values.hourly}
                            onChange={handleChange}
                          />
                        </div>
                      </Col>
                      <Col>
                        <div className="addItemPrice">
                          <label htmlFor="perDay" style={{ marginRight: '10px' }}>
                            Per Day
                          </label>
                          <input
                            ref={inputRef}
                            id="perDay"
                            type="number"
                            min={0}
                            step={0.01}
                            style={{ textAlign: 'right', borderRadius: '5px' }}
                            size="10"
                            required
                            value={values.perDay}
                            onChange={handleChange}
                          />
                        </div>
                      </Col>
                      <Col>
                        <div className="addItemPrice">
                          <label htmlFor="perWeek" style={{ marginRight: '10px' }}>
                            Per Week
                          </label>
                          <input
                            ref={inputRef}
                            id="perWeek"
                            type="number"
                            min={0}
                            step={0.01}
                            style={{ textAlign: 'right', borderRadius: '5px' }}
                            size="10"
                            required
                            value={values.perWeek}
                            onChange={handleChange}
                          />
                        </div>
                      </Col>
                      <Col>
                        <div className="addItemPrice">
                          <label htmlFor="perMonth" style={{ marginRight: '10px' }}>
                            Per Month
                          </label>
                          <input
                            ref={inputRef}
                            id="perMonth"
                            type="number"
                            min={0}
                            step={0.01}
                            style={{ textAlign: 'right', borderRadius: '5px' }}
                            size="10"
                            required
                            value={values.perMonth}
                            onChange={handleChange}
                          />
                        </div>
                      </Col>
                    </Row>
                    {/* End of Rental Terms */}
                    {/* Start Text Description */}
                    <Row>
                      <div>
                        <br />
                        <h4 className="addItemDescription">
                          Item Description
                          <textarea
                            ref={inputRef}
                            id="itemDescription"
                            rows="8"
                            cols="97"
                            required
                            value={values.itemDescription}
                            style={{ borderRadius: '10px', marginTop: '5px' }}
                            onChange={handleChange}
                          />
                        </h4>
                      </div>
                    </Row>
                    {/* End Text Description */}
                  </Col>
                </Row>
              </form>
            </Card.Body>
          </Card>
          {/* Product End */}
        </Col>
      </Row>
    </>
  );
};

export default AddItemForm;
