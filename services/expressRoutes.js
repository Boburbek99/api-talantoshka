import author from "../api/author.js";

export function initializeRoutes(app) {
  app.use((req, res, next) => {
    console.log(`${req.method} Request ${req.path}`);
    next();
  });
  app.use(author);

}
