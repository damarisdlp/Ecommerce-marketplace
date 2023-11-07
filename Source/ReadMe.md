# MongoDB Atlas

Database access has been set up with a white-list, thereby limiting access to the database to the IP addresses that are on the list.

MongoDB Atlas login page:

```
https://account.mongodb.com/account/login?n=%2Fv2%2F63e4ab9c1221406846c151c3%23%2Fclusters
```

## To connect the web application to the MongoDB database:

### Follow the emailed link from MongoBD Atlas.

Each of you should have already received an invitation to the project 'Peer2Peer'. Once you have successfully logged into the project:

- On the left nav bar, under 'security' heading click on 'Network Access'. -

  - Click the green '+ ADD IP ADDRESS' button (at top, on right-side of 'IP Access List' view)
  - Enter your IP Address to allow your machine to connect to the database through the 2LetItGo application.

### Next, you will need to start the server by opening a terminal at the directory named 'server' and enter:

```
    nodemon server.js  or  node server.js
```

- Note that the first time you start the server you may need to first enter:

  ```
  npm upgrade
  ```

- When you are ready to quit the server enter:

  ```
  Ctrl + c
  ```

### Finally, you will need to start the client by opening a terminal at the directory named 'client' and enter:

```
    yarn start
```

- Note that the first time you start the client you may need to first enter:

  ```
  yarn upgrade
  ```

- when you are ready to quit the client enter:

  ```
  Ctrl + c

  Ctrl + c
  ```

### Congratulations, your machine, your version of the application, and the project's MongoDB database are now integrated.
