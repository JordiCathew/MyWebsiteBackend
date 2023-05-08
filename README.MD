# My website (Backend)

Hey there, this is the README for the backend of my website, this project is a MERN project (MongoDB, Express.js, React.js, and Node.js for the backend). The main goal of the project was to learn more about web development, which I did, a lot. Please have in mind before seeing my code that this is my first time working with a lot of these libraries so I might have made a lot of naive mistakes, please, tell me if you see them. This backend is small, since it only serves as a way to contact my MongoDB database, below I explain in a little more detail:

## How does the connection with the frontend works?

The functions of the backend are limited in this project, but still, I deemed it necessary to introduce some security for the connection with the frontend: 

```javascript
// Allow requests only from specified origin
app.use(function(req, res, next) {
  const allowedOrigins = ["https://jordicathew.com"];
  const origin = req.headers.origin;
  if (allowedOrigins.indexOf(origin) > -1) {
      next(); 
  } else {
    res.status(403).send("Access denied");
  }
});
```

This codes checks if the request to the backend is coming from the frontend, if it is, then the rest of the code that's below is executed, if it's not, a message is rendered that denies the access of the information that's transferred from the database.

If everything goes right, the server checks for a GET request on one of these routes: 

```javascript

app.get('/api', async (req, res) => { ...

```
or
```javascript

app.get('/api/:postsId', async (req, res) => { ...

```
In the first case the whole lists of posts is sent to the frontend (to _Blog.jsx_ precisely), in the second case only the specific post required gets sent (to _TemplatePosts.jsx_). If an error occurs inside one of these cases, an error status is sent to the frontend.

## License

See the LICENSE.md file for license rights and limitations (GNU GPLv3).
