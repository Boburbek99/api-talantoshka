import passport from 'passport';
import { Strategy } from 'passport-jwt';
import { ExtractJwt } from 'passport-jwt';
import { userQueries } from '../model/user.js'

import dotenv from 'dotenv';
dotenv.config();
const authSecret = process.env.AUTH_SECRET;

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey:authSecret
  };
  passport.use(new Strategy(jwtOptions,async (jwtPayload, done) => {
    const user = await userQueries.getUserById(jwtPayload.id);
    if (!user) {
      return done({ name: 'UnauthorizedError', message: 'Unauthorized' }, false);
    }
    return done(null, user);
}));

const requireAuth = ( req, res, next) => {
  passport.authenticate('jwt', { session: false }, (error, user, info) => {
    if (error) {
      console.log('Authentication Error:', error);
      return res.status(401).json({ message: `Authentication Error: ${error}` })
    }

    if (!user) {
      console.log('Unauthorized Access:', info.message);
      return res.status(401).json({ message: 'Unauthorized' });
    }
    req.user = user;
    next();
  })(req, res, next);
}

// function authRole(requiredRoles) {
//   return (req, res, next) => {
//     if (req.user && req.user.role && requiredRoles.includes(req.user.role)) {
//       next(); 
//     } else {
//       res.status(403).json({ message: 'Access forbidden' });
//     }
//   };
// }
  
export { passport, jwtOptions, requireAuth};