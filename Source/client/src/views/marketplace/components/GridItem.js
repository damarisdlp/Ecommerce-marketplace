import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import HtmlHead from 'components/html-head/HtmlHead';
import GridView from 'components/GridViewList';
import ListView from 'components/ListViewList';
import { setListView, setData } from 'results/resultsSlice';

const GridItem = ({ category }) => {
  const [filteredData, setFilteredData] = useState([]);
  const { listView } = useSelector((state) => state.results);
  // Get results state at page load
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
        setData(responseData);
        sessionStorage.setItem('resultsData', JSON.stringify(responseData));
        const results = responseData.filter((x) => x.category.label === category);
        setFilteredData(results);
        setListView('grid');
      } catch (error) {
        console.error('Error fetching items', error);
      }
    }

    getItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const title = 'MarketPlace';
  const description = 'Ecommerce Bikes Page';

  return (
    <>
      <HtmlHead title={title} description={description} />
      {/* List Results Start */}
      <ListView data={filteredData} view={listView} />
      <GridView data={filteredData} view={listView} />
      {/* List Results End */}
    </>
  );
};

export default GridItem;
