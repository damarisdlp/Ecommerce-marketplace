import React, { useMemo } from 'react';
import { Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { getMenuItems } from 'routing/helper';
import routesAndMenuItems from 'routing/routes';
import routesAndMenuItemsLI from 'routing/routesLI';
import SidebarMenuItems from './SidebarMenuItems';

const SidebarMenu = () => {
  const { isLogin, currentUser } = useSelector((state) => state.auth);
  const { useSidebar } = useSelector((state) => state.menu);

  // user is not logged in
  const menuItemsMemo = useMemo(
    () =>
      getMenuItems({
        data: routesAndMenuItems.sidebarItems,
        isLogin,
        userRole: currentUser.role,
      }),
    [isLogin, currentUser]
  );

  // user is logged in
  const menuItemsMemoLI = useMemo(
    () =>
      getMenuItems({
        data: routesAndMenuItemsLI.sidebarItems,
        isLogin,
        userRole: currentUser.role,
      }),
    [isLogin, currentUser]
  );

  if (!useSidebar === true) {
    return <></>;
  }
  if (!isLogin) {
    return (
      <Col xs="auto" className="side-menu-container">
        <ul className="sw-25 side-menu mb-0 primary" id="menuSide">
          <SidebarMenuItems menuItems={menuItemsMemo} />
        </ul>
      </Col>
    );
  }
  return (
    <Col xs="auto" className="side-menu-container">
      <ul className="sw-25 side-menu mb-0 primary" id="menuSide">
        <SidebarMenuItems menuItems={menuItemsMemoLI} />
      </ul>
    </Col>
  );
};
export default SidebarMenu;
