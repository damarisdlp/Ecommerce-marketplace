import React, { useEffect, useRef, useState } from 'react';
import { Button, Row, Col, Card, Dropdown, Form, OverlayTrigger, Tooltip, Tab } from 'react-bootstrap';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { store } from 'store.js';
import { setAddingItem } from 'auth/authSlice';
import { setNumResults } from 'results/resultsSlice';
import { LAYOUT } from 'constants.js';
import HtmlHead from 'components/html-head/HtmlHead';
import BreadcrumbList from 'components/breadcrumb-list/BreadcrumbList';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import useCustomLayout from 'hooks/useCustomLayout';
import Clamp from 'components/clamp';
import NewUser from './components/NewUser';
import ProfileItemList from './components/ProfileItemList';

const ProfileStandard = () => {
  const title = 'Profile';
  const description = 'Public Facing Profile, Standard User';
  const { isLogin } = useSelector((state) => state.auth);
  const { lynchpin } = useParams();
  const [loading, setLoading] = useState(true);
  const usersRef = useRef([]);
  const listerRef = useRef({});

  useEffect(() => {
    async function getUsers() {
      try {
        const response = await fetch('http://localhost:5002/users/');
        if (!response.ok) {
          console.log('response not ok');
          const message = `An error occurred: ${response.statusText}`;
          // eslint-disable-next-line no-alert
          window.alert(message);
          return;
        }
        const users = await response.json();
        usersRef.current = users;
        const lister = users.find((user) => user.lynchpin === lynchpin) || {};
        listerRef.current = lister;
        setLoading(false); // data is loaded, set loading state to false
      } catch (error) {
        console.error('Error fetching users', error);
      }
    }

    getUsers();
  });

  const breadcrumbs = [{ to: 'marketplace', text: 'Home' }];

  useCustomLayout({ layout: LAYOUT.Boxed });

  const history = useHistory();

  store.dispatch(setNumResults(1000));

  const addItemClicked = () => {
    store.dispatch(setAddingItem(true));

    if (isLogin) {
      history.push('/listMyItem');
    } else history.push('/login');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const image = listerRef.current.thumb;

  return (
    <>
      <HtmlHead title={title} description={description} />
      {/* Title and Top Buttons Start */}
      <div className="page-title-container mb-2">
        <Row>
          {/* Title Start */}
          <Col md="7">
            <BreadcrumbList items={breadcrumbs} />
          </Col>
          {/* Title End */}

          {/* Top Buttons Start */}
          <Col md="5" className="d-flex align-items-start justify-content-end">
            {/* eslint-disable-next-line */}
            <Button type="button"
              onClick={addItemClicked}
              variant="outline-primary" 
              className="btn-icon btn-icon-start ms-0 ms-sm-1 w-100 w-md-auto">
              <CsLineIcons icon="edit-square" /> <span>List an Item</span>
            </Button>
          </Col>
          {/* Top Buttons End */}
        </Row>
      </div>
      {/* Title and Top Buttons End */}

      <Row className="g-5">
        <Tab.Container id="profileStandard" defaultActiveKey="overview">
          {/* Sidebar Start */}
          <Col xl="4" xxl="3">
            <h2 className="small-title">Lender's Profile</h2>
            <Card className="mb-5">
              <Card.Body>
                <div className="d-flex align-items-center flex-column mb-4">
                  <div className="d-flex align-items-center flex-column">
                    <div className="sw-13 position-relative mb-3">
                      <img src={image} className="img-fluid rounded-xl" alt="thumb" />
                    </div>
                    <div className="sw-4 position-relative mb-3">
                      <NewUser creationDate={listerRef.current.creationDate} />
                    </div>
                    <div className="h5 mb-0">{listerRef.current.username}</div>
                    <div className="text-muted">Verification Status: {listerRef.current.verified || 'Pending'}</div>
                    <div className="text-muted">Account Created On: {listerRef.current.creationDate}</div>
                    <div className="text-muted">Average Review: {listerRef.current.review || 'Unreviewed'} </div>
                    <div className="text-muted">
                      <CsLineIcons icon="pin" className="me-1" />
                      <span className="align-middle">
                        {listerRef.current.city || 'Somewhere'}, {listerRef.current.state || 'Undisclosed'}
                      </span>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
          {/* Sidebar End */}

          {/* Content Start */}
          <Col xl="8" xxl="9">
            <Tab.Content>
              <Tab.Pane eventKey="overview">
                {/* Overview Tab Start */}

                {/* Lender's Bio Start */}
                <h2 className="small-title">Lender's Bio</h2>
                <Card className="mb-5">
                  <Card.Body>
                    <div className="d-flex align-items-center flex-column mb-4">
                      Lender's Bio will be displayed here, ex:
                      <br /> Hello everyone, I have many wonderful items available for rent as you can see listed below. Please message me if you have any
                      questions or comments. I'd love to hear from you.
                    </div>
                  </Card.Body>
                </Card>
                {/* Lender's Bio End */}

                {/* Lender's Rentals Start */}
                <h2 className="small-title">Lender's Rentals</h2>
                <div>
                  <ProfileItemList lynchpin={listerRef.current.lynchpin} />
                </div>
                {/* Lender's Rentals End */}

                {/* Lender's Reviews Start */}
                <h2 className="small-title">Lender's Reviews</h2>
                <Card className="mb-5">
                  <Card.Body>
                    <div className="sh-35">Lender's Reviews will be displayed here.</div>
                  </Card.Body>
                </Card>
                {/* Lender's Reviews End */}
              </Tab.Pane>
              <Tab.Pane eventKey="projects">
                {/* Projects Tab Start */}
                <h2 className="small-title">Projects</h2>
                {/* Search Start */}
                <Row className="mb-3 g-2">
                  <Col className="mb-1">
                    <div className="d-inline-block float-md-start me-1 mb-1 search-input-container w-100 shadow bg-foreground">
                      <Form.Control type="text" placeholder="Search" />
                      <span className="search-magnifier-icon">
                        <CsLineIcons icon="search" />
                      </span>
                      <span className="search-delete-icon d-none">
                        <CsLineIcons icon="close" />
                      </span>
                    </div>
                  </Col>
                  <Col xs="auto" className="text-end mb-1">
                    <OverlayTrigger placement="top" delay={{ show: 1000, hide: 0 }} overlay={<Tooltip>Result Count</Tooltip>}>
                      <Dropdown align={{ xs: 'end' }} className="d-inline-block ms-1">
                        <Dropdown.Toggle variant="foreground-alternate" className="shadow sw-13">
                          All
                        </Dropdown.Toggle>
                        <Dropdown.Menu
                          className="shadow dropdown-menu-end"
                          popperConfig={{
                            modifiers: [
                              {
                                name: 'computeStyles',
                                options: {
                                  gpuAcceleration: false,
                                },
                              },
                            ],
                          }}
                        >
                          <Dropdown.Item href="#/action-1">All</Dropdown.Item>
                          <Dropdown.Item href="#/action-2">Active</Dropdown.Item>
                          <Dropdown.Item href="#/action-3">Inactive</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </OverlayTrigger>
                  </Col>
                </Row>
                {/* Search End */}

                {/* Projects Content Start */}
                <Row className="row-cols-1 row-cols-sm-2 g-2">
                  <Col>
                    <Card className="h-100">
                      <Card.Body>
                        <NavLink to="#" className="stretched-link heading sh-5 d-inline-block h5">
                          <Clamp tag="span" clamp="2">
                            Basic Introduction to Bread Making
                          </Clamp>
                        </NavLink>
                        <div className="mb-2">
                          <CsLineIcons icon="diagram-2" className="text-muted me-2" size="17" />
                          <span className="align-middle text-alternate">Contributors: 4</span>
                        </div>
                        <div className="mb-2">
                          <CsLineIcons icon="trend-up" className="text-muted me-2" size="17" />
                          <span className="align-middle text-alternate">Active</span>
                        </div>
                        <div>
                          <CsLineIcons icon="check-square" className="text-muted me-2" size="17" />
                          <span className="align-middle text-alternate">Completed</span>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col>
                    <Card className="h-100">
                      <Card.Body>
                        <NavLink to="#" className="stretched-link heading sh-5 d-inline-block h5">
                          <Clamp tag="span" clamp="2">
                            4 Facts About Old Baking Techniques
                          </Clamp>
                        </NavLink>
                        <div className="mb-2">
                          <CsLineIcons icon="diagram-2" className="text-muted me-2" size="17" />
                          <span className="align-middle text-alternate">Contributors: 3</span>
                        </div>
                        <div className="mb-2">
                          <CsLineIcons icon="trend-up" className="text-muted me-2" size="17" />
                          <span className="align-middle text-alternate">Active</span>
                        </div>
                        <div>
                          <CsLineIcons icon="clock" className="text-muted me-2" size="17" />
                          <span className="align-middle text-alternate">Pending</span>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col>
                    <Card className="h-100">
                      <Card.Body>
                        <NavLink to="#" className="stretched-link heading sh-5 d-inline-block h5">
                          <Clamp tag="span" clamp="2">
                            Apple Cake Recipe for Starters
                          </Clamp>
                        </NavLink>
                        <div className="mb-2">
                          <CsLineIcons icon="diagram-2" className="text-muted me-2" size="17" />
                          <span className="align-middle text-alternate">Contributors: 8</span>
                        </div>
                        <div className="mb-2">
                          <CsLineIcons icon="lock-on" className="text-muted me-2" size="17" />
                          <span className="align-middle text-alternate">Locked</span>
                        </div>
                        <div>
                          <CsLineIcons icon="sync-horizontal" className="text-muted me-2" size="17" />
                          <span className="align-middle text-alternate">Continuing</span>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col>
                    <Card className="h-100">
                      <Card.Body>
                        <NavLink to="#" className="stretched-link heading sh-5 d-inline-block h5">
                          <Clamp tag="span" clamp="2">
                            A Complete Guide to Mix Dough for the Molds
                          </Clamp>
                        </NavLink>
                        <div className="mb-2">
                          <CsLineIcons icon="diagram-2" className="text-muted me-2" size="17" />
                          <span className="align-middle text-alternate">Contributors: 12</span>
                        </div>
                        <div className="mb-2">
                          <CsLineIcons icon="trend-up" className="text-muted me-2" size="17" />
                          <span className="align-middle text-alternate">Active</span>
                        </div>
                        <div>
                          <CsLineIcons icon="check-square" className="text-muted me-2" size="17" />
                          <span className="align-middle text-alternate">Completed</span>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col>
                    <Card className="h-100">
                      <Card.Body>
                        <NavLink to="#" className="stretched-link heading sh-5 d-inline-block h5">
                          <Clamp tag="span" clamp="2">
                            14 Facts About Sugar Products
                          </Clamp>
                        </NavLink>
                        <div className="mb-2">
                          <CsLineIcons icon="diagram-2" className="text-muted me-2" size="17" />
                          <span className="align-middle text-alternate">Contributors: 2</span>
                        </div>
                        <div className="mb-2">
                          <CsLineIcons icon="trend-down" className="text-muted me-2" size="17" />
                          <span className="align-middle text-alternate">Inactive</span>
                        </div>
                        <div>
                          <CsLineIcons icon="box" className="text-muted me-2" size="17" />
                          <span className="align-middle text-alternate">Archived</span>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col>
                    <Card className="h-100">
                      <Card.Body>
                        <NavLink to="#" className="stretched-link heading sh-5 d-inline-block h5">
                          <Clamp tag="span" clamp="2">
                            Easy and Efficient Tricks for Baking Crispy Breads
                          </Clamp>
                        </NavLink>
                        <div className="mb-2">
                          <CsLineIcons icon="diagram-2" className="text-muted me-2" size="17" />
                          <span className="align-middle text-alternate">Contributors: 2</span>
                        </div>
                        <div className="mb-2">
                          <CsLineIcons icon="trend-up" className="text-muted me-2" size="17" />
                          <span className="align-middle text-alternate">Active</span>
                        </div>
                        <div>
                          <CsLineIcons icon="clock" className="text-muted me-2" size="17" />
                          <span className="align-middle text-alternate">Pending</span>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col>
                    <Card className="h-100">
                      <Card.Body>
                        <NavLink to="#" className="stretched-link heading sh-5 d-inline-block h5">
                          <Clamp tag="span" clamp="2">
                            Apple Cake Recipe for Starters
                          </Clamp>
                        </NavLink>
                        <div className="mb-2">
                          <CsLineIcons icon="diagram-2" className="text-muted me-2" size="17" />
                          <span className="align-middle text-alternate">Contributors: 6</span>
                        </div>
                        <div className="mb-2">
                          <CsLineIcons icon="trend-down" className="text-muted me-2" size="17" />
                          <span className="align-middle text-alternate">Inactive</span>
                        </div>
                        <div>
                          <CsLineIcons icon="box" className="text-muted me-2" size="17" />
                          <span className="align-middle text-alternate">Archived</span>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col>
                    <Card className="h-100">
                      <Card.Body>
                        <NavLink to="#" className="stretched-link heading sh-5 d-inline-block h5">
                          <Clamp tag="span" clamp="2">
                            Simple Guide to Mix Dough
                          </Clamp>
                        </NavLink>
                        <div className="mb-2">
                          <CsLineIcons icon="diagram-2" className="text-muted me-2" size="17" />
                          <span className="align-middle text-alternate">Contributors: 22</span>
                        </div>
                        <div className="mb-2">
                          <CsLineIcons icon="lock-on" className="text-muted me-2" size="17" />
                          <span className="align-middle text-alternate">Locked</span>
                        </div>
                        <div>
                          <CsLineIcons icon="check-square" className="text-muted me-2" size="17" />
                          <span className="align-middle text-alternate">Completed</span>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col>
                    <Card className="h-100">
                      <Card.Body>
                        <NavLink to="#" className="stretched-link heading sh-5 d-inline-block h5">
                          <Clamp tag="span" clamp="2">
                            10 Secrets Every Southern Baker Knows
                          </Clamp>
                        </NavLink>
                        <div className="mb-2">
                          <CsLineIcons icon="diagram-2" className="text-muted me-2" size="17" />
                          <span className="align-middle text-alternate">Contributors: 3</span>
                        </div>
                        <div className="mb-2">
                          <CsLineIcons icon="trend-up" className="text-muted me-2" size="17" />
                          <span className="align-middle text-alternate">Active</span>
                        </div>
                        <div>
                          <CsLineIcons icon="sync-horizontal" className="text-muted me-2" size="17" />
                          <span className="align-middle text-alternate">Continuing</span>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col>
                    <Card className="h-100">
                      <Card.Body>
                        <NavLink to="#" className="stretched-link heading sh-5 d-inline-block h5">
                          <Clamp tag="span" clamp="2">
                            Recipes for Sweet and Healty Treats
                          </Clamp>
                        </NavLink>
                        <div className="mb-2">
                          <CsLineIcons icon="diagram-2" className="text-muted me-2" size="17" />
                          <span className="align-middle text-alternate">Contributors: 1</span>
                        </div>
                        <div className="mb-2">
                          <CsLineIcons icon="trend-down" className="text-muted me-2" size="17" />
                          <span className="align-middle text-alternate">Inactive</span>
                        </div>
                        <div>
                          <CsLineIcons icon="clock" className="text-muted me-2" size="17" />
                          <span className="align-middle text-alternate">Pending</span>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col>
                    <Card className="h-100">
                      <Card.Body>
                        <NavLink to="#" className="stretched-link heading sh-5 d-inline-block h5">
                          <Clamp tag="span" clamp="2">
                            Better Ways to Mix Dough for the Molds
                          </Clamp>
                        </NavLink>
                        <div className="mb-2">
                          <CsLineIcons icon="diagram-2" className="text-muted me-2" size="17" />
                          <span className="align-middle text-alternate">Contributors: 20</span>
                        </div>
                        <div className="mb-2">
                          <CsLineIcons icon="trend-up" className="text-muted me-2" size="17" />
                          <span className="align-middle text-alternate">Active</span>
                        </div>
                        <div>
                          <CsLineIcons icon="clock" className="text-muted me-2" size="17" />
                          <span className="align-middle text-alternate">Pending</span>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col>
                    <Card className="h-100">
                      <Card.Body>
                        <NavLink to="#" className="stretched-link heading sh-5 d-inline-block h5">
                          <Clamp tag="span" clamp="2">
                            Introduction to Baking Cakes
                          </Clamp>
                        </NavLink>
                        <div className="mb-2">
                          <CsLineIcons icon="diagram-2" className="text-muted me-2" size="17" />
                          <span className="align-middle text-alternate">Contributors: 13</span>
                        </div>
                        <div className="mb-2">
                          <CsLineIcons icon="trend-up" className="text-muted me-2" size="17" />
                          <span className="align-middle text-alternate">Active</span>
                        </div>
                        <div>
                          <CsLineIcons icon="check-square" className="text-muted me-2" size="17" />
                          <span className="align-middle text-alternate">Completed</span>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
                {/* Projects Content End */}
                {/* Projects Tab End */}
              </Tab.Pane>
              <Tab.Pane eventKey="permissions">
                {/* Permissions Tab Start */}
                <h2 className="small-title">Permissions</h2>
                <div className="mb-n2">
                  <Card className="mb-2">
                    <Card.Body className="py-4">
                      <label className="form-check custom-icon mb-0 checked-opacity-75">
                        <input type="checkbox" className="form-check-input" defaultChecked />
                        <span className="form-check-label">
                          <span className="content">
                            <span className="heading mb-1 lh-1-25">Create</span>
                            <span className="d-block text-small text-muted">
                              Chocolate cake biscuit donut cotton candy soufflé cake macaroon. Halvah chocolate cotton candy sweet roll jelly-o candy danish
                              dragée.
                            </span>
                          </span>
                        </span>
                      </label>
                    </Card.Body>
                  </Card>
                  <Card className="mb-2">
                    <Card.Body className="py-4">
                      <label className="form-check custom-icon mb-0 checked-opacity-75">
                        <input type="checkbox" className="form-check-input" />
                        <span className="form-check-label">
                          <span className="content">
                            <span className="heading mb-1 lh-1-25">Publish</span>
                            <span className="d-block text-small text-muted">Jelly beans wafer candy caramels fruitcake macaroon sweet roll.</span>
                          </span>
                        </span>
                      </label>
                    </Card.Body>
                  </Card>
                  <Card className="mb-2">
                    <Card.Body className="py-4">
                      <label className="form-check custom-icon mb-0 checked-opacity-75">
                        <input type="checkbox" className="form-check-input" />
                        <span className="form-check-label">
                          <span className="content">
                            <span className="heading mb-1 lh-1-25">Edit</span>
                            <span className="d-block text-small text-muted">Jelly cake jelly sesame snaps jelly beans jelly beans.</span>
                          </span>
                        </span>
                      </label>
                    </Card.Body>
                  </Card>
                  <Card className="mb-2">
                    <Card.Body className="py-4">
                      <label className="form-check custom-icon mb-0 checked-opacity-75">
                        <input type="checkbox" className="form-check-input" defaultChecked />
                        <span className="form-check-label">
                          <span className="content">
                            <span className="heading mb-1 lh-1-25">Delete</span>
                            <span className="d-block text-small text-muted">Danish oat cake pudding.</span>
                          </span>
                        </span>
                      </label>
                    </Card.Body>
                  </Card>
                  <Card className="mb-2">
                    <Card.Body className="py-4">
                      <label className="form-check custom-icon mb-0 checked-opacity-75">
                        <input type="checkbox" className="form-check-input" defaultChecked />
                        <span className="form-check-label">
                          <span className="content">
                            <span className="heading mb-1 lh-1-25">Add User</span>
                            <span className="d-block text-small text-muted">Soufflé chocolate cake chupa chups danish brownie pudding fruitcake.</span>
                          </span>
                        </span>
                      </label>
                    </Card.Body>
                  </Card>
                  <Card className="mb-2">
                    <Card.Body className="py-4">
                      <label className="form-check custom-icon mb-0 checked-opacity-75">
                        <input type="checkbox" className="form-check-input" />
                        <span className="form-check-label">
                          <span className="content">
                            <span className="heading mb-1 lh-1-25">Edit User</span>
                            <span className="d-block text-small text-muted">Biscuit powder brownie powder sesame snaps jelly-o dragée cake.</span>
                          </span>
                        </span>
                      </label>
                    </Card.Body>
                  </Card>
                  <Card className="mb-2">
                    <Card.Body className="py-4">
                      <label className="form-check custom-icon mb-0 checked-opacity-75">
                        <input type="checkbox" className="form-check-input" />
                        <span className="form-check-label">
                          <span className="content">
                            <span className="heading mb-1 lh-1-25">Delete User</span>
                            <span className="d-block text-small text-muted">
                              Liquorice jelly powder fruitcake oat cake. Gummies tiramisu cake jelly-o bonbon. Marshmallow liquorice croissant.
                            </span>
                          </span>
                        </span>
                      </label>
                    </Card.Body>
                  </Card>
                </div>
                {/* Permissions Tab End */}
              </Tab.Pane>
              <Tab.Pane eventKey="friends">
                {/* Friends Start */}
                <h2 className="small-title">Friends</h2>
                <Row className="row-cols-1 row-cols-md-2 row-cols-xxl-3 g-3">
                  <Col>
                    <Card>
                      <Card.Body>
                        <Row className="g-0 sh-6">
                          <Col xs="auto">
                            <img src="/img/profile/profile-1.webp" className="card-img rounded-xl sh-6 sw-6" alt="thumb" />
                          </Col>
                          <Col>
                            <div className="d-flex flex-row ps-4 h-100 align-items-center justify-content-between">
                              <div className="d-flex flex-column">
                                <div>Blaine Cottrell</div>
                                <div className="text-small text-muted">Project Manager</div>
                              </div>
                              <div className="d-flex">
                                <Button variant="outline-primary" size="sm" className="ms-1">
                                  Follow
                                </Button>
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col>
                    <Card>
                      <Card.Body>
                        <Row className="g-0 sh-6">
                          <Col xs="auto">
                            <img src="/img/profile/profile-2.webp" className="card-img rounded-xl sh-6 sw-6" alt="thumb" />
                          </Col>
                          <Col>
                            <div className="d-flex flex-row ps-4 h-100 align-items-center justify-content-between">
                              <div className="d-flex flex-column">
                                <div>Cherish Kerr</div>
                                <div className="text-small text-muted">Development Lead</div>
                              </div>
                              <div className="d-flex">
                                <Button variant="outline-primary" size="sm" className="ms-1">
                                  Follow
                                </Button>
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col>
                    <Card>
                      <Card.Body>
                        <Row className="g-0 sh-6">
                          <Col xs="auto">
                            <img src="/img/profile/profile-3.webp" className="card-img rounded-xl sh-6 sw-6" alt="thumb" />
                          </Col>
                          <Col>
                            <div className="d-flex flex-row ps-4 h-100 align-items-center justify-content-between">
                              <div className="d-flex flex-column">
                                <div>Kirby Peters</div>
                                <div className="text-small text-muted">Accounting</div>
                              </div>
                              <div className="d-flex">
                                <Button variant="outline-primary" size="sm" className="ms-1">
                                  Follow
                                </Button>
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col>
                    <Card>
                      <Card.Body>
                        <Row className="g-0 sh-6">
                          <Col xs="auto">
                            <img src="/img/profile/profile-4.webp" className="card-img rounded-xl sh-6 sw-6" alt="thumb" />
                          </Col>
                          <Col>
                            <div className="d-flex flex-row ps-4 h-100 align-items-center justify-content-between">
                              <div className="d-flex flex-column">
                                <div>Olli Hawkins</div>
                                <div className="text-small text-muted">Client Relations Lead</div>
                              </div>
                              <div className="d-flex">
                                <Button variant="outline-primary" size="sm" className="ms-1">
                                  Follow
                                </Button>
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col>
                    <Card>
                      <Card.Body>
                        <Row className="g-0 sh-6">
                          <Col xs="auto">
                            <img src="/img/profile/profile-5.webp" className="card-img rounded-xl sh-6 sw-6" alt="thumb" />
                          </Col>
                          <Col>
                            <div className="d-flex flex-row ps-4 h-100 align-items-center justify-content-between">
                              <div className="d-flex flex-column">
                                <div>Luna Wigglebutt</div>
                                <div className="text-small text-muted">Customer Engagement</div>
                              </div>
                              <div className="d-flex">
                                <Button variant="outline-primary" size="sm" className="ms-1">
                                  Follow
                                </Button>
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col>
                    <Card>
                      <Card.Body>
                        <Row className="g-0 sh-6">
                          <Col xs="auto">
                            <img src="/img/profile/profile-6.webp" className="card-img rounded-xl sh-6 sw-6" alt="thumb" />
                          </Col>
                          <Col>
                            <div className="d-flex flex-row ps-4 h-100 align-items-center justify-content-between">
                              <div className="d-flex flex-column">
                                <div>Kerr Jackson</div>
                                <div className="text-small text-muted">Frontend Developer</div>
                              </div>
                              <div className="d-flex">
                                <Button variant="outline-primary" size="sm" className="ms-1">
                                  Follow
                                </Button>
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col>
                    <Card>
                      <Card.Body>
                        <Row className="g-0 sh-6">
                          <Col xs="auto">
                            <img src="/img/profile/profile-7.webp" className="card-img rounded-xl sh-6 sw-6" alt="thumb" />
                          </Col>
                          <Col>
                            <div className="d-flex flex-row ps-4 h-100 align-items-center justify-content-between">
                              <div className="d-flex flex-column">
                                <div>Kathryn Mengel</div>
                                <div className="text-small text-muted">Team Leader</div>
                              </div>
                              <div className="d-flex">
                                <Button variant="outline-primary" size="sm" className="ms-1">
                                  Follow
                                </Button>
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col>
                    <Card>
                      <Card.Body>
                        <Row className="g-0 sh-6">
                          <Col xs="auto">
                            <img src="/img/profile/profile-8.webp" className="card-img rounded-xl sh-6 sw-6" alt="thumb" />
                          </Col>
                          <Col>
                            <div className="d-flex flex-row ps-4 h-100 align-items-center justify-content-between">
                              <div className="d-flex flex-column">
                                <div>Joisse Kaycee</div>
                                <div className="text-small text-muted">Copywriter</div>
                              </div>
                              <div className="d-flex">
                                <Button variant="outline-primary" size="sm" className="ms-1">
                                  Follow
                                </Button>
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col>
                    <Card>
                      <Card.Body>
                        <Row className="g-0 sh-6">
                          <Col xs="auto">
                            <img src="/img/profile/profile-9.webp" className="card-img rounded-xl sh-6 sw-6" alt="thumb" />
                          </Col>
                          <Col>
                            <div className="d-flex flex-row ps-4 h-100 align-items-center justify-content-between">
                              <div className="d-flex flex-column">
                                <div>Zayn Hartley</div>
                                <div className="text-small text-muted">Visual Effect Designer</div>
                              </div>
                              <div className="d-flex">
                                <Button variant="outline-primary" size="sm" className="ms-1">
                                  Follow
                                </Button>
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
                {/* Friends End */}
              </Tab.Pane>
              <Tab.Pane eventKey="about">
                {/* About Start */}
                <h2 className="small-title">About</h2>
                <Card>
                  <Card.Body>
                    <div className="mb-5">
                      <p className="text-small text-muted mb-2">ME</p>
                      <p>
                        Jujubes brownie marshmallow apple pie donut ice cream jelly-o jelly-o gummi bears. Tootsie roll chocolate bar dragée bonbon cheesecake
                        icing. Danish wafer donut cookie caramels gummies topping.
                      </p>
                    </div>
                    <div className="mb-5">
                      <p className="text-small text-muted mb-2">INTERESTS</p>
                      <p>
                        Chocolate cake biscuit donut cotton candy soufflé cake macaroon. Halvah chocolate cotton candy sweet roll jelly-o candy danish dragée.
                        Apple pie cotton candy tiramisu biscuit cake muffin tootsie roll bear claw cake. Cupcake cake fruitcake.
                      </p>
                    </div>
                    <div className="mb-5">
                      <p className="text-small text-muted mb-2">CONTACT</p>
                      <NavLink to="#" className="d-block body-link mb-1">
                        <CsLineIcons icon="screen" className="me-2" size="17" />
                        <span className="align-middle">blainecottrell.com</span>
                      </NavLink>
                      <NavLink to="#" className="d-block body-link mb-1">
                        <CsLineIcons icon="email" className="me-2" size="17" />
                        <span className="align-middle">contact@blainecottrell.com</span>
                      </NavLink>
                    </div>
                  </Card.Body>
                </Card>
                {/* About End */}
              </Tab.Pane>
            </Tab.Content>
          </Col>
          {/* Content End */}
        </Tab.Container>
      </Row>
    </>
  );
};

export default ProfileStandard;
