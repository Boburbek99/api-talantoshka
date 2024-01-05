import author from "../api/author.js";
import user from "../api/user.js";
import collection from "../api/collection.js";
import tag from "../api/tag.js";

export function initializeRoutes(app) {
  app.use((req, res, next) => {
    console.log(`${req.method} Request ${req.path}`);
    next();
  });
  app.use(author);
  app.use(user);
  app.use(collection);
  app.use(tag);
}
