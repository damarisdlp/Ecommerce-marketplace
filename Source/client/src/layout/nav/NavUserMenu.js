import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { Col, Dropdown, Row } from 'react-bootstrap';
import { MENU_PLACEMENT } from 'constants.js';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import { layoutShowingNavMenu } from 'layout/layoutSlice';

const NavUserMenuContent = () => (
  <div>
    <Row className="mb-3 ms-0 me-0">
      <Col xs="12" className="ps-1 mb-2">
        <div className="text-extra-small text-primary">ACCOUNT</div>
      </Col>
      <Col xs="6" className="ps-1 pe-1">
        <ul className="list-unstyled">
          <li>
            <NavLink to="/myprofile">
              <span className="align-middle">Profile</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/accountSettings">
              <span className="align-middle">Settings</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/accountSecurity">
              <span className="align-middle">Security</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/accountBilling">
              <span className="align-middle">Billing</span>
            </NavLink>
          </li>
        </ul>
      </Col>
      <Col xs="6" className="ps-1 pe-1">
        <ul className="list-unstyled">
          <li>
            <NavLink to="/calendar">
              <span className="align-middle">Calendar</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/tasks">
              <span className="align-middle">Tasks</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/mailbox">
              <span className="align-middle">Mailbox</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/contacts">
              <span className="align-middle">Contacts</span>
            </NavLink>
          </li>
        </ul>
      </Col>
    </Row>
    <Row className="mb-1 ms-0 me-0">
      <Col xs="12" className="p-1 mb-2 pt-2">
        <div className="text-extra-small text-primary">APPLICATION</div>
      </Col>
      <Col xs="6" className="ps-1 pe-1">
        <ul className="list-unstyled">
          <li>
            <NavLink to="#" disabled>
              <span className="align-middle">Themes</span>
            </NavLink>
          </li>
        </ul>
      </Col>
      <Col xs="6" className="pe-1 ps-1">
        <ul className="list-unstyled">
          <li>
            <NavLink to="#" disabled>
              <span className="align-middle">Devices</span>
            </NavLink>
          </li>
        </ul>
      </Col>
    </Row>
    <Row className="mb-1 ms-0 me-0">
      <Col xs="12" className="p-1 mb-3 pt-3">
        <div className="separator-light" />
      </Col>
      <Col xs="6" className="ps-1 pe-1">
        <ul className="list-unstyled">
          <li>
            <NavLink to="/support">
              <CsLineIcons icon="help" className="me-2" size="17" /> <span className="align-middle">Support</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/supportDocsDetail">
              <CsLineIcons icon="file-text" className="me-2" size="17" /> <span className="align-middle">Docs</span>
            </NavLink>
          </li>
        </ul>
      </Col>
      <Col xs="6" className="pe-1 ps-1">
        <ul className="list-unstyled">
          <li>
            <NavLink to="/accountSettings">
              <CsLineIcons icon="gear" className="me-2" size="17" /> <span className="align-middle">Settings</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/logout">
              <CsLineIcons icon="logout" className="me-2" size="17" /> <span className="align-middle">Logout</span>
            </NavLink>
          </li>
        </ul>
      </Col>
    </Row>
  </div>
);

const NavUserMenuDropdownToggle = React.memo(
  React.forwardRef(({ onClick, expanded = false, user = {} }, ref) => (
    <a
      href="#/!"
      ref={ref}
      className="d-flex user position-relative"
      data-toggle="dropdown"
      aria-expanded={expanded}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onClick(e);
      }}
    >
      <img className="profile" alt={user.name} src={user.thumb} />
      <div className="name">{user.name}</div>
    </a>
  ))
);

// Dropdown needs access to the DOM of the Menu to measure it
const NavUserMenuDropdownMenu = React.memo(
  React.forwardRef(({ style, className }, ref) => {
    return (
      <div ref={ref} style={style} className={classNames('dropdown-menu dropdown-menu-end user-menu wide', className)}>
        <NavUserMenuContent />
      </div>
    );
  })
);

NavUserMenuDropdownMenu.displayName = 'NavUserMenuDropdownMenu';

const MENU_NAME = 'NavUserMenu';

const NavUserMenu = () => {
  const dispatch = useDispatch();
  const {
    placementStatus: { view: placement },
    behaviourStatus: { behaviourHtmlData },
    attrMobile,
    attrMenuAnimate,
  } = useSelector((state) => state.menu);

  const { isLogin, currentUser } = useSelector((state) => state.auth);
  const { color } = useSelector((state) => state.settings);
  const { showingNavMenu } = useSelector((state) => state.layout);

  const onToggle = (status, event) => {
    if (event && event.stopPropagation) event.stopPropagation();
    else if (event && event.originalEvent && event.originalEvent.stopPropagation) event.originalEvent.stopPropagation();
    dispatch(layoutShowingNavMenu(status ? MENU_NAME : ''));
  };

  useEffect(() => {
    dispatch(layoutShowingNavMenu(''));
    // eslint-disable-next-line
  }, [attrMenuAnimate, behaviourHtmlData, attrMobile, color]);

  if (!isLogin) {
    return <></>;
  }
  return (
    <Dropdown as="div" bsPrefix="user-container d-flex" onToggle={onToggle} show={showingNavMenu === MENU_NAME} drop="down">
      <Dropdown.Toggle as={NavUserMenuDropdownToggle} user={currentUser} />
      <Dropdown.Menu
        as={NavUserMenuDropdownMenu}
        className="dropdown-menu dropdown-menu-end user-menu wide"
        popperConfig={{
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: () => {
                  if (placement === MENU_PLACEMENT.Horizontal) {
                    return [0, 7];
                  }
                  if (window.innerWidth < 768) {
                    return [-84, 7];
                  }

                  return [-78, 7];
                },
              },
            },
          ],
        }}
      />
    </Dropdown>
  );
};
export default React.memo(NavUserMenu);
