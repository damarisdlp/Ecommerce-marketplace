import React from 'react';

const NewUser = ({ creationDate }) => {
  // The following code will calculate how many days since the user registered
  const today = new Date().toISOString().slice(0, 10);
  const startDate = creationDate;
  const endDate = today;
  const diffInMs = new Date(endDate) - new Date(startDate);
  const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
  let userIsNew = false;
  if (diffInDays < 30) {
    userIsNew = true;
  }
  let display = '';

  if (userIsNew) {
    display = <img src="/img/icons/new.svg" alt="badge" />;
  }
  return display;
};

export default NewUser;
