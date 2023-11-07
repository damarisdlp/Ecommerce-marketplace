import React from 'react';
import { NavLink } from 'react-router-dom';
import { Row, Col, Card, Badge } from 'react-bootstrap';
import { useSelector } from 'react-redux';

// Dynamically renders the product list in List view
function ListView({ view, data }) {
  // Get results state {num of results per page, desired page num, List/Grid view}
  const { numResults, pageNum } = useSelector((state) => state.results);

  const list = [];
  let listItem;
  let i = 0;

  // the number of results to display
  let resultsLength = 0;
  // set the number of results that belong on one page
  if (numResults < data.length) {
    resultsLength = numResults;
  } else {
    resultsLength = data.length;
  }

  // set starting index for results list
  i = (pageNum - 1) * numResults;
  // set ending index for results list
  let endIndex = Number(resultsLength) + Number(i);
  if (endIndex > data.length) {
    endIndex = data.length;
  }

  if (view === 'list') {
    // eslint-disable-next-line
    data.forEach((element) => {
      if (i < endIndex) {
        listItem = (
          // eslint-disable-next-line
          <li key={data[i]._id}>
            <Card className="mb-2">
              <Row className="g-0 h-100 sh-lg-9 position-relative">
                <Col xs="auto" className="position-relative">
                  <NavLink to={`/detail/${data[i]._id}`}>
                    <img src={data[i].imgSrc} alt="product" className="card-img card-img-horizontal sw-11 h-100" />
                  </NavLink>
                </Col>
                <Col className="py-4 py-lg-0 ps-5 pe-4 h-100">
                  <Row className="g-0 h-100 align-content-center">
                    <Col xs="11" lg="3" className="d-flex flex-column mb-lg-0 mb-3 pe-3 d-flex order-1 h-lg-100 justify-content-center">
                      <NavLink to={`/detail/${data[i]._id}`}>
                        {data.title}
                        <div className="text-med text-muted text-truncate">{data[i].title}</div>
                      </NavLink>
                    </Col>
                    {/* Rental Rates Begin */}
                    <Col lg="3" className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-3">
                      <ul className="card-text mb-0" style={{ listStyleType: 'none' }}>
                        <li>{data[i].cost.hourly > 0 ? `$ ${data[i].cost.hourly} per hour` : 'Unavailable Hourly'}</li>
                        <li>{data[i].cost.weekly > 0 ? `$ ${data[i].cost.weekly} per week` : 'Unavailable weekly'}</li>
                      </ul>
                    </Col>
                    <Col lg="3" className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-4">
                      <ul className="card-text mb-0" style={{ listStyleType: 'none' }}>
                        <li>{data[i].cost.weekly > 0 ? `$ ${data[i].cost.weekly} per week` : 'Unavailable weekly'}</li>
                        <li>{data[i].cost.monthly > 0 ? `$ ${data[i].cost.monthly} per month` : 'Unavailable Monthly'}</li>
                      </ul>
                    </Col>
                    {/* Rental Rates End */}
                    <Col lg="2" className="d-flex flex-column pe-1 mb-2 mb-lg-0 align-items-start justify-content-center order-5">
                      <Badge bg="outline-primary">{data[i].badge}</Badge>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Card>
          </li>
        );
        list.push(listItem);
        i += 1;
      }
    });
    return <ul style={{ listStyleType: 'none' }}>{list}</ul>;
  }
  return <ul />;
}

export default ListView;
