import React from 'react';
import Rating from 'react-rating';
import { Link } from 'react-router-dom';
import { Row, Col, Card, Badge } from 'react-bootstrap';
import { useSelector } from 'react-redux';

// Creates a dynamically generated Grid view list of results four cards wide
function GridView({ view, data }) {
  // Get results state {num of results per page, desired page num, List/Grid view}
  const { numResults, pageNum } = useSelector((state) => state.results);

  const modifiedData = [...data];
  // Add empty objects to the end of the data array until it is divisible by 4
  while (modifiedData.length % 4 !== 0) {
    modifiedData.push({});
  }

  const list = [];
  let listItem;

  // set the number of results that belong on one page
  const resultsLength = Math.min(numResults, modifiedData.length);

  // set starting index for results list
  const startIndex = (pageNum - 1) * numResults;

  if (view === 'grid') {
    // eslint-disable-next-line
    modifiedData.slice(startIndex, startIndex + resultsLength).forEach((element, index) => {
      if (element._id) {
        listItem = (
          <Col key={element._id}>
            <Card className="h-100">
              <Badge bg="primary" className="me-1 position-absolute e-3 t-n2 z-index-1">
                {element.badge}
              </Badge>
              <Card.Img src={element.imgSrc} className="card-img-top sh-22" alt="card image" />
              <Card.Body>
                <h5 className="heading mb-3">
                  <Link to={`/detail/${element._id}`} className="body-link stretched-link">
                    {element.title || 'Intentionally Left Blank'}
                  </Link>
                </h5>
                {element ? (
                  <h6>
                    {element.location?.city}, {element.location?.state}
                  </h6>
                ) : (
                  <p>' '</p>
                )}
              </Card.Body>
              <Card.Footer className="border-0 pt-0">
                <div className="mb-3">
                  <Rating
                    initialRating={element.rating}
                    readonly
                    emptySymbol={<i className="cs-star text-primary" />}
                    fullSymbol={<i className="cs-star-full text-primary" />}
                  />
                  <div className="text-muted d-inline-block text-small align-text-top ms-1"> ({element.numRatings}) </div>
                </div>
                <h5 className="mb-2">Renting For:</h5>
                <ul className="card-text mb-0" style={{ listStyleType: 'none' }}>
                  <li>{element.cost?.hourly > 0 ? `$ ${element.cost.hourly} per hour` : 'Unavailable Hourly'}</li>
                  <li>{element.cost?.daily > 0 ? `$ ${element.cost.daily} per day` : 'Unavailable Daily'}</li>
                  <li>{element.cost?.weekly > 0 ? `$ ${element.cost.weekly} per week` : 'Unavailable weekly'}</li>
                  <li>{element.cost?.monthly > 0 ? `$ ${element.cost.monthly} per month` : 'Unavailable Monthly'}</li>
                </ul>
              </Card.Footer>
            </Card>
          </Col>
        );
        list.push(listItem);
      }
    });
    return <Row className="row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-4 g-2 mb-5">{list}</Row>;
  }
  return <ul />;
}

export default GridView;
