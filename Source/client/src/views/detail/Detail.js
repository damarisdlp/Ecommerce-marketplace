import React, { useState } from 'react';
import { NavLink, useParams, Link, useHistory } from 'react-router-dom';
import Rating from 'react-rating';
import Lightbox from 'react-image-lightbox';
import { Row, Col, Button, Card, Spinner, ProgressBar, Badge } from 'react-bootstrap';
import BreadcrumbList from 'components/breadcrumb-list/BreadcrumbList';
import HtmlHead from 'components/html-head/HtmlHead';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import GlideGallery from 'components/carousel/GlideGallery';
import Clamp from 'components/clamp';
import 'react-image-lightbox/style.css';
import { useSelector } from 'react-redux';

let listing = {};

const Detail = () => {
  const { isLogin } = useSelector((state) => state.auth);
  const history = useHistory();
  const data = JSON.parse(sessionStorage.getItem('resultsData'));
  let { _id } = useParams() || null;

  const breadcrumbs = [
    { to: 'marketplace', text: 'Home' },
    { to: 'myprofile', title: 'My Profile' },
    { to: 'listings', title: 'Details' },
  ];

  try {
    if (_id) {
      sessionStorage.setItem('_id', _id);
    } else {
      _id = sessionStorage.getItem('_id');
    }
  } catch (error) {
    console.log(error);
  } finally {
    data.forEach((element) => {
      if (element._id === _id) {
        listing = element;
      }
    });
    sessionStorage.setItem('listing', JSON.stringify(listing));
  }

  const title = 'Listing Details';
  const description = 'Rental Listing Details Page';

  const galleyItems = [
    {
      large: listing.imgSrc,
      thumb: listing.imgSrc,
    },
    {
      large: '/img/product/large/product-2.webp',
      thumb: '/img/product/small/product-2.webp',
    },
    {
      large: '/img/product/large/product-3.webp',
      thumb: '/img/product/small/product-3.webp',
    },
    {
      large: '/img/product/large/product-4.webp',
      thumb: '/img/product/small/product-4.webp',
    },
    {
      large: '/img/product/large/product-5.webp',
      thumb: '/img/product/small/product-5.webp',
    },
  ];

  const [photoIndex, setPhotoIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const openLightbox = (index) => {
    setPhotoIndex(index);
    setIsOpen(true);
  };

  const addToCart = () => {
    if (!isLogin) {
      history.push('/login');
    }
  };
  return (
    <>
      <HtmlHead title={title} description={description} />
      <div className="page-title-container">
        <Row className="g-0">
          {/* Title Start */}
          <Col className="col-auto mb-3 mb-sm-0 me-auto">
            <div className="w-auto sw-md-30">
              <h1 className="mb-2 pb-0 display-4">{title} </h1>
              <BreadcrumbList items={breadcrumbs} />
            </div>
          </Col>
          {/* Title End */}

          {/* Top Buttons Start */}
          <Col xs="12" sm="auto" className="d-flex align-items-end justify-content-end mb-2 mb-sm-0 order-sm-3" />
          {/* Top Buttons End */}
        </Row>
      </div>

      {/* Product Start */}
      <Card className="mb-5">
        <Card.Body>
          <Row className="g-5">
            <Col xl="7" className="position-relative">
              <span className="badge rounded-pill bg-primary me-1 position-absolute e-n1 t-3 z-index-1 py-2 px-3">{listing.badge}</span>
              <GlideGallery>
                <GlideGallery.LargeItems>
                  {galleyItems.map((item, index) => (
                    <GlideGallery.Item key={`boxed.large.${index}`}>
                      <img
                        alt="detail"
                        src={item.large}
                        className="responsive border-0 rounded-md img-fluid mb-3 w-100 sh-35 sh-md-45 sh-xl-60"
                        onClick={() => openLightbox(index)}
                      />
                    </GlideGallery.Item>
                  ))}
                </GlideGallery.LargeItems>
                <GlideGallery.ThumbItems>
                  {galleyItems.map((item, index) => (
                    <GlideGallery.Item key={`boxed.thumb.${index}`}>
                      <img alt="thumb" src={item.thumb} className="responsive rounded-md img-fluid" />
                    </GlideGallery.Item>
                  ))}
                </GlideGallery.ThumbItems>
              </GlideGallery>
            </Col>
            <Col xl="5" className="sh-xl-60 d-flex flex-column justify-content-between">
              <div>
                <h2 className="mb-4">{listing.title}</h2>
                <div className="h3" />
                <div>
                  <Rating
                    className="me-2"
                    initialRating={listing.rating}
                    readonly
                    emptySymbol={<i className="cs-star text-primary" />}
                    fullSymbol={<i className="cs-star-full text-primary" />}
                  />
                  <div className="text-muted d-inline-block text-small align-text-top">({listing.numRatings} Reviews)</div>
                </div>
                <p className="mt-2 mb-7">{listing.description}</p>
                <Row className="mb-4 g-8">
                  <Col>
                    <h4>Location:</h4>
                    <h6>
                      {listing.location.city}, {listing.location.state}, {listing.location.zip}
                    </h6>
                  </Col>
                </Row>
                <Row className="d-flex align-items-center">
                  <Col>
                    <h6 className="mb-3 mr-0">Listed by:</h6>
                  </Col>
                  <Col>
                    <Link to={`/profile/${listing.lynchpin}`}>
                      <Button variant="link" className="mb-2 d-inline-block text-med">
                        {listing.username}
                      </Button>
                    </Link>
                  </Col>
                </Row>
                {/* Rental Pricing Start */}
                <Row className="mb-1 g-8">
                  <Col>
                    <h4>Pricing:</h4>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <table className="table m-n2">
                      <thead>
                        <tr>
                          <th scope="col" className="text-small text-uppercase text-muted">
                            Rate
                          </th>
                          <th scope="col" className="text-small text-uppercase text-muted">
                            AMOUNT
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Hourly</td>
                          {listing.cost.hourly > 0 ? <td>${listing.cost.hourly} per hour</td> : <td>Unavailable Hourly</td>}
                        </tr>
                        <tr>
                          <td>Daily</td>
                          {listing.cost.daily > 0 ? <td>${listing.cost.daily} per day</td> : <td>Unavailable Daily</td>}
                        </tr>
                        <tr>
                          <td>Weekly</td>
                          {listing.cost.weekly > 0 ? <td>${listing.cost.weekly} per day</td> : <td>Unavailable Weekly</td>}
                        </tr>
                        <tr>
                          <td>Monthly</td>
                          {listing.cost.monthly > 0 ? <td>${listing.cost.monthly} per day</td> : <td>Unavailable Monthly</td>}
                        </tr>
                        <tr>
                          <td>Minimum Insurance Coverage</td>
                          <td>${listing.cost.replaceCost} for this item</td>
                        </tr>
                      </tbody>
                    </table>
                  </Col>
                </Row>
                {/* Rental Pricing End */}
              </div>
              <div>
                {/* Buttons Begin */}
                <br className="mb-5" />
                <NavLink to="/cart" onClick={() => sessionStorage.setItem('addToCart', true)}>
                  <Button variant="primary" className="btn-icon btn-icon-end mb-1" onClick={addToCart}>
                    <span>Add to Cart</span> <CsLineIcons icon="cart" />
                  </Button>
                </NavLink>
                <Link to="/messages">
                  <Button variant="primary" className="itemChatBtn btn-icon btn-icon-end mb-1">
                    <span>Chat</span> <CsLineIcons icon="message" />
                  </Button>
                </Link>
              </div>
              {/* Buttons End */}
            </Col>
          </Row>
          <br className="mb-7" />
          <br className="mb-2" />
        </Card.Body>
      </Card>
      {/* Product End */}

      <Row>
        <Col xl="8" className="mb-5">
          {/* Product Details Begin */}
          <h2 className="small-title">Product Details</h2>
          <Card className="mb-5">
            <Card.Body>
              <h4>{listing.title}</h4>
              <p className="mb-4">{listing.description}</p>
            </Card.Body>
          </Card>
          {/* Product Details End */}

          {/* Reviews Begin */}
          <h2 className="small-title">Reviews</h2>
          <Card className="mb-5">
            <Card.Body>
              <Row className="mb-5">
                <Col xs="12" sm="auto" className="mb-3 mb-sm-0">
                  <div className="w-100 sw-sm-19 sw-md-23 border sh-16 rounded-md d-flex flex-column align-items-center justify-content-center">
                    <div className="cta-1 text-alternate mb-2">{listing.rating}</div>
                    <div>
                      <Rating
                        className="align-middle"
                        initialRating={listing.rating}
                        readonly
                        emptySymbol={<i className="cs-star text-primary" />}
                        fullSymbol={<i className="cs-star-full text-primary" />}
                      />
                      <span className="text-muted"> ({listing.numRatings})</span>
                    </div>
                  </div>
                </Col>
                <Col>
                  <Row className="align-items-center">
                    <Col>
                      <ProgressBar className="progress-md" now={80} />
                    </Col>
                    <Col xs="auto" className="sw-20 text-end">
                      <span className="me-3 text-muted text-small">%80</span>
                      <Rating
                        className="align-middle"
                        initialRating={5}
                        readonly
                        emptySymbol={<i className="cs-star text-muted" />}
                        fullSymbol={<i className="cs-star-full text-primary" />}
                      />
                    </Col>
                  </Row>
                  <Row className="align-items-center">
                    <Col>
                      <ProgressBar className="progress-md" now={10} />
                    </Col>
                    <Col xs="auto" className="sw-20 text-end">
                      <span className="me-3 text-muted text-small">%10</span>
                      <Rating
                        className="align-middle"
                        initialRating={4}
                        readonly
                        emptySymbol={<i className="cs-star text-muted" />}
                        fullSymbol={<i className="cs-star-full text-primary" />}
                      />
                    </Col>
                  </Row>
                  <Row className="align-items-center">
                    <Col>
                      <ProgressBar className="progress-md" now={5} />
                    </Col>
                    <Col xs="auto" className="sw-20 text-end">
                      <span className="me-3 text-muted text-small">%5</span>
                      <Rating
                        className="align-middle"
                        initialRating={3}
                        readonly
                        emptySymbol={<i className="cs-star text-muted" />}
                        fullSymbol={<i className="cs-star-full text-primary" />}
                      />
                    </Col>
                  </Row>
                  <Row className="align-items-center">
                    <Col>
                      <ProgressBar className="progress-md" now={0} />
                    </Col>
                    <Col xs="auto" className="sw-20 text-end">
                      <span className="me-3 text-muted text-small">%0</span>
                      <Rating
                        className="align-middle"
                        initialRating={2}
                        readonly
                        emptySymbol={<i className="cs-star text-muted" />}
                        fullSymbol={<i className="cs-star-full text-primary" />}
                      />
                    </Col>
                  </Row>
                  <Row className="align-items-center">
                    <Col>
                      <ProgressBar className="progress-md" now={5} />
                    </Col>
                    <Col xs="auto" className="sw-20 text-end">
                      <span className="me-3 text-muted text-small">%5</span>
                      <Rating
                        className="align-middle"
                        initialRating={1}
                        readonly
                        emptySymbol={<i className="cs-star text-muted" />}
                        fullSymbol={<i className="cs-star-full text-primary" />}
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>
              <div className="mb-n3 border-last-none">
                <Row className="g-0 w-100 border-bottom border-separator-light pb-3 mb-3">
                  <Col xs="auto">
                    <div className="sw-5 me-3">
                      <img src="/img/profile/profile-2.webp" className="img-fluid rounded-xl" alt="thumb" />
                    </div>
                  </Col>
                  <Col className="pe-3">
                    <div>Cherish Kerr</div>
                    <div className="text-muted text-small mb-2">2 days ago</div>
                    <Rating
                      className="align-middle"
                      initialRating={5}
                      readonly
                      emptySymbol={<i className="cs-star text-primary" />}
                      fullSymbol={<i className="cs-star-full text-primary" />}
                    />
                    <div className="text-medium text-alternate lh-1-25">Macaroon!</div>
                  </Col>
                </Row>
                <Row className="g-0 w-100 border-bottom border-separator-light pb-3 mb-3">
                  <Col xs="auto">
                    <div className="sw-5 me-3">
                      <img src="/img/profile/profile-1.webp" className="img-fluid rounded-xl" alt="thumb" />
                    </div>
                  </Col>
                  <Col className="pe-3">
                    <div>Olli Hawkins</div>
                    <div className="text-muted text-small mb-2">3 days ago</div>
                    <Rating
                      className="align-middle"
                      initialRating={5}
                      readonly
                      emptySymbol={<i className="cs-star text-primary" />}
                      fullSymbol={<i className="cs-star-full text-primary" />}
                    />
                    <div className="text-medium text-alternate lh-1-25">Cupcake cake fruitcake. Powder chocolate bar soufflé gummi bears topping donut.</div>
                  </Col>
                </Row>
                <Row className="g-0 w-100 border-bottom border-separator-light pb-3 mb-3">
                  <Col xs="auto">
                    <div className="sw-5 me-3">
                      <img src="/img/profile/profile-3.webp" className="img-fluid rounded-xl" alt="thumb" />
                    </div>
                  </Col>
                  <Col className="pe-3">
                    <div>Kirby Peters</div>
                    <div className="text-muted text-small mb-2">4 days ago</div>
                    <Rating
                      className="align-middle"
                      initialRating={5}
                      readonly
                      emptySymbol={<i className="cs-star text-primary" />}
                      fullSymbol={<i className="cs-star-full text-primary" />}
                    />
                    <div className="text-medium text-alternate lh-1-25">Nice, very tasty.</div>
                  </Col>
                </Row>
                <Row className="g-0 w-100 border-bottom border-separator-light pb-3 mb-3">
                  <Col xs="auto">
                    <div className="sw-5 me-3">
                      <img src="/img/profile/profile-4.webp" className="img-fluid rounded-xl" alt="thumb" />
                    </div>
                  </Col>
                  <Col className="pe-3">
                    <div>Zayn Hartley</div>
                    <div className="text-muted text-small mb-2">1 week ago</div>
                    <Rating
                      className="align-middle"
                      initialRating={5}
                      readonly
                      emptySymbol={<i className="cs-star text-primary" />}
                      fullSymbol={<i className="cs-star-full text-primary" />}
                    />
                    <div className="text-medium text-alternate lh-1-25">
                      Chupa chups topping pastry halvah. Jelly cake jelly sesame snaps jelly beans jelly beans. Biscuit powder brownie powder sesame snaps
                      jelly-o dragée cake. Pie tiramisu cake jelly lemon drops. Macaroon sugar plum apple pie carrot cake jelly beans chocolate.
                    </div>
                  </Col>
                </Row>
              </div>
            </Card.Body>
          </Card>
          {/* Reviews End */}

          {/* FAQ's Begin */}
          <h2 className="small-title">Faq</h2>
          <Card>
            <Card.Body className="mb-n4">
              <Row className="g-0 mb-4">
                <Col xs="auto">
                  <p className="sw-2 text-primary mb-2 fw-bold">1.</p>
                </Col>
                <Col>
                  <p className="text-primary ps-3 mb-2 fw-bold">
                    Carrot cake jelly-o lemon drops toffee tootsie roll. Brownie topping toffee apple pie apple pie?
                  </p>
                  <p className="text-body ps-3 mb-0">
                    Danish croissant bonbon danish muffin icing sugar plum marzipan oat cake. Biscuit powder brownie powder sesame snaps jelly-o dragée cake.
                    Pie tiramisu cake jelly lemon drops. Macaroon sugar plum apple pie carrot cake jelly beans chocolate. Brownie bear claw tart. Powder danish
                    ice cream brownie chupa.
                  </p>
                </Col>
              </Row>
              <Row className="g-0 mb-4">
                <Col xs="auto">
                  <p className="sw-2 text-primary mb-2 fw-bold">2.</p>
                </Col>
                <Col>
                  <p className="text-primary ps-3 mb-2 fw-bold">Caramels wafer jelly beans?</p>
                  <p className="text-body ps-3 mb-0">Chupa chups topping pastry halvah. Jelly cake jelly sesame snaps jelly beans jelly beans. </p>
                </Col>
              </Row>
              <Row className="g-0 mb-4">
                <Col xs="auto">
                  <p className="sw-2 text-primary mb-2 fw-bold">3.</p>
                </Col>
                <Col>
                  <p className="text-primary ps-3 mb-2 fw-bold">Gingerbread jelly beans topping donut?</p>
                  <p className="text-body ps-3 mb-0">
                    Gingerbread caramels topping gummi bears halvah dessert cake. Wafer muffin gingerbread danish donut donut tootsie roll. Soufflé chocolate
                    cake chupa chups danish brownie pudding fruitcake.
                  </p>
                </Col>
              </Row>
              <Row className="g-0 mb-4">
                <Col xs="auto">
                  <p className="sw-2 text-primary mb-2 fw-bold">4.</p>
                </Col>
                <Col>
                  <p className="text-primary ps-3 mb-2 fw-bold">Dragée dessert gummies liquorice halvah chocolate?</p>
                  <p className="text-body ps-3 mb-0">
                    Ice cream ice cream candy gingerbread tiramisu jelly-o jelly. Brownie bear claw tart. Powder danish ice cream brownie chupa chups cupcake
                    sweet roll. Tart ice cream biscuit cupcake.
                  </p>
                </Col>
              </Row>
              <Row className="g-0 mb-4">
                <Col xs="auto">
                  <p className="sw-2 text-primary mb-2 fw-bold">5.</p>
                </Col>
                <Col>
                  <p className="text-primary ps-3 mb-2 fw-bold">Brownie topping toffee apple pie?</p>
                  <p className="text-body ps-3 mb-0">
                    Cake danish gingerbread wafer. Sugar plum sweet jelly-o chocolate cake lemon drops. Jujubes brownie marshmallow apple pie donut ice cream
                    jelly-o jelly-o gummi bears. Tootsie roll chocolate bar dragée bonbon cheesecake icing. Danish wafer donut cookie caramels gummies topping.
                    Toffee cupcake gummi bears gummies dragée danish chocolate bar. Roll cupcake sugar plum.
                  </p>
                </Col>
              </Row>
            </Card.Body>
          </Card>
          {/* Faq End */}
        </Col>
        <Col xl="4">
          {/* Similar Products Begin */}
          <h2 className="small-title">Similar Products</h2>
          <Row className="g-2 row-cols-1 row-cols-md-2 row-cols-xl-1">
            <Col>
              <Card>
                <Row className="g-0 sh-16 sh-sm-17">
                  <Col xs="auto" className="h-100 position-relative">
                    <Badge bg="primary" className="me-1 position-absolute e-n2 t-2 z-index-1">
                      {data[2].badge}
                    </Badge>
                    <img src={data[2].imgSrc} alt="alternate text" className="card-img card-img-horizontal h-100 sw-11 sw-sm-16" />
                  </Col>
                  <Col>
                    <Card.Body className="d-flex align-items-center h-100 py-3">
                      <div className="mb-0 h6">
                        <NavLink to={`/detail/${data[2]._id}`} className="body-link stretched-link d-block mb-1 sh-3 h6 lh-1-5">
                          <Clamp tag="span" clamp="1">
                            {data[2].title}
                          </Clamp>
                        </NavLink>
                        <div className="card-text mb-2">
                          <div className="text-muted text-overline text-small sh-2">
                            <del>{data[2].cost.hourly}</del>
                          </div>
                          <div>{data[2].cost.daily}</div>
                        </div>
                        <div>
                          <Rating
                            initialRating={5}
                            readonly
                            emptySymbol={<i className="cs-star text-primary" />}
                            fullSymbol={<i className="cs-star-full text-primary" />}
                          />
                          <div className="text-muted d-inline-block text-small align-text-top">(5)</div>
                        </div>
                      </div>
                    </Card.Body>
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col>
              <Card>
                <Row className="g-0 sh-16 sh-sm-17">
                  <Col xs="auto" className="h-100 position-relative">
                    <Badge bg="primary" className="me-1 position-absolute e-n2 t-2 z-index-1">
                      {data[5].badge}
                    </Badge>
                    <img src={data[5].imgSrc} alt="alternate text" className="card-img card-img-horizontal h-100 sw-11 sw-sm-16" />
                  </Col>
                  <Col>
                    <Card.Body className="d-flex align-items-center h-100 py-3">
                      <div className="mb-0 h6">
                        <NavLink to={`/detail/${data[5]._id}`} className="body-link stretched-link d-block mb-1 sh-3 h6 lh-1-5">
                          <Clamp tag="span" clamp="1">
                            {data[5].title}
                          </Clamp>
                        </NavLink>
                        <div className="card-text mb-2">
                          <div className="text-muted text-overline text-small sh-2">
                            <del>{data[5].cost.hourly}</del>
                          </div>
                          <div>{data[5].cost.daily}</div>
                        </div>
                        <div>
                          <Rating
                            initialRating={5}
                            readonly
                            emptySymbol={<i className="cs-star text-primary" />}
                            fullSymbol={<i className="cs-star-full text-primary" />}
                          />
                          <div className="text-muted d-inline-block text-small align-text-top">(2)</div>
                        </div>
                      </div>
                    </Card.Body>
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col>
              <Card>
                <Row className="g-0 sh-16 sh-sm-17">
                  <Col xs="auto" className="h-100 position-relative">
                    <Badge bg="primary" className="me-1 position-absolute e-n2 t-2 z-index-1">
                      {data[1].badge}
                    </Badge>
                    <img src={data[1].imgSrc} alt="alternate text" className="card-img card-img-horizontal h-100 sw-11 sw-sm-16" />
                  </Col>
                  <Col>
                    <Card.Body className="d-flex align-items-center h-100 py-3">
                      <div className="mb-0 h6">
                        <NavLink to={`/detail/${data[1]._id}`} className="body-link stretched-link d-block mb-1 sh-3 h6 lh-1-5">
                          <Clamp tag="span" clamp="1">
                            {data[1].title}
                          </Clamp>
                        </NavLink>
                        <div className="card-text mb-2">
                          <div className="text-muted text-overline text-small sh-2">
                            <del>{data[1].cost.hourly}</del>
                          </div>
                          <div>{data[1].cost.daily}</div>
                        </div>
                        <div>
                          <Rating
                            initialRating={5}
                            readonly
                            emptySymbol={<i className="cs-star text-primary" />}
                            fullSymbol={<i className="cs-star-full text-primary" />}
                          />
                          <div className="text-muted d-inline-block text-small align-text-top">(5)</div>
                        </div>
                      </div>
                    </Card.Body>
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col>
              <Card>
                <Row className="g-0 sh-16 sh-sm-17">
                  <Col xs="auto" className="h-100 position-relative">
                    <Badge bg="primary" className="me-1 position-absolute e-n2 t-2 z-index-1">
                      {data[3].badge}
                    </Badge>
                    <img src={data[3].imgSrc} alt="alternate text" className="card-img card-img-horizontal h-100 sw-11 sw-sm-16" />
                  </Col>
                  <Col>
                    <Card.Body className="d-flex align-items-center h-100 py-3">
                      <div className="mb-0 h6">
                        <NavLink to={`/detail/${data[3]._id}`} className="body-link stretched-link d-block mb-1 sh-3 h6 lh-1-5">
                          <Clamp tag="span" clamp="1">
                            {data[3].title}
                          </Clamp>
                        </NavLink>
                        <div className="card-text mb-2">
                          <div className="text-muted text-overline text-small sh-2">
                            <del>{data[3].cost.hourly}</del>
                          </div>
                          <div>{data[3].cost.daily}</div>
                        </div>
                        <div>
                          <Rating
                            initialRating={5}
                            readonly
                            emptySymbol={<i className="cs-star text-primary" />}
                            fullSymbol={<i className="cs-star-full text-primary" />}
                          />
                          <div className="text-muted d-inline-block text-small align-text-top">(5)</div>
                        </div>
                      </div>
                    </Card.Body>
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col>
              <Card>
                <Row className="g-0 sh-16 sh-sm-17">
                  <Col xs="auto" className="h-100 position-relative">
                    <Badge bg="primary" className="me-1 position-absolute e-n2 t-2 z-index-1">
                      {data[6].badge}
                    </Badge>
                    <img src={data[6].imgSrc} alt="alternate text" className="card-img card-img-horizontal h-100 sw-11 sw-sm-16" />
                  </Col>
                  <Col>
                    <Card.Body className="d-flex align-items-center h-100 py-3">
                      <div className="mb-0 h6">
                        <NavLink to={`/detail/${data[6]._id}`} className="body-link stretched-link d-block mb-1 sh-3 h6 lh-1-5">
                          <Clamp tag="span" clamp="1">
                            {data[6].title}
                          </Clamp>
                        </NavLink>
                        <div className="card-text mb-2">
                          <div className="text-muted text-overline text-small sh-2">
                            <del>{data[6].cost.hourly}</del>
                          </div>
                          <div>{data[6].cost.daily}</div>
                        </div>
                        <div>
                          <Rating
                            initialRating={5}
                            readonly
                            emptySymbol={<i className="cs-star text-primary" />}
                            fullSymbol={<i className="cs-star-full text-primary" />}
                          />
                          <div className="text-muted d-inline-block text-small align-text-top">(5)</div>
                        </div>
                      </div>
                    </Card.Body>
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col>
              <Card>
                <Row className="g-0 sh-16 sh-sm-17">
                  <Col xs="auto" className="h-100 position-relative">
                    <Badge bg="primary" className="me-1 position-absolute e-n2 t-2 z-index-1">
                      {data[4].badge}
                    </Badge>
                    <img src={data[4].imgSrc} alt="alternate text" className="card-img card-img-horizontal h-100 sw-11 sw-sm-16" />
                  </Col>
                  <Col>
                    <Card.Body className="d-flex align-items-center h-100 py-3">
                      <div className="mb-0 h6">
                        <NavLink to={`/detail/${data[4]._id}`} className="body-link stretched-link d-block mb-1 sh-3 h6 lh-1-5">
                          <Clamp tag="span" clamp="1">
                            {data[4].title}
                          </Clamp>
                        </NavLink>
                        <div className="card-text mb-2">
                          <div className="text-muted text-overline text-small sh-2">
                            <del>{data[4].cost.hourly}</del>
                          </div>
                          <div>{data[4].cost.daily}</div>
                        </div>
                        <div>
                          <Rating
                            initialRating={5}
                            readonly
                            emptySymbol={<i className="cs-star text-primary" />}
                            fullSymbol={<i className="cs-star-full text-primary" />}
                          />
                          <div className="text-muted d-inline-block text-small align-text-top">(5)</div>
                        </div>
                      </div>
                    </Card.Body>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
          {/* Similar Products End */}
        </Col>
      </Row>

      {/* Lightbox Begin */}
      {isOpen && (
        <Lightbox
          mainSrc={galleyItems[photoIndex].large}
          nextSrc={galleyItems[(photoIndex + 1) % galleyItems.length].large}
          prevSrc={galleyItems[(photoIndex + galleyItems.length - 1) % galleyItems.length].large}
          onCloseRequest={() => setIsOpen(false)}
          onMovePrevRequest={() => setPhotoIndex((photoIndex + galleyItems.length - 1) % galleyItems.length)}
          onMoveNextRequest={() => setPhotoIndex((photoIndex + 1) % galleyItems.length)}
          loader={<Spinner animation="border" />}
          wrapperClassName="rounded-lg"
        />
      )}
      {/* Lightbox End */}
    </>
  );
};

export default Detail;
