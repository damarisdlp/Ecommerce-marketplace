import React, { useState, useEffect } from 'react';
import ListViewList from 'components/ListViewList';

const ProfileItemList = ({ lynchpin }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function getItems() {
      try {
        const response = await fetch('http://localhost:5002/items/');
        if (!response.ok) {
          const message = `An error occurred: ${response.statusText}`;
          // eslint-disable-next-line
          window.alert(message);
          return;
        }
        const responseData = await response.json();
        setData(responseData);
      } catch (error) {
        console.error('Error fetching items', error);
      }
    }
    getItems();
  }, []);

  const usersItems = data.filter((item) => item.lynchpin === lynchpin);

  return (
    <>
      <ListViewList data={usersItems} view="list" />
    </>
  );
};

export default ProfileItemList;
