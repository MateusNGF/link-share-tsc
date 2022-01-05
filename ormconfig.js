
const DEV = (process.argv[2] !== 'dev' || process.argv[2] === undefined) ? false : true

module.exports = {
   "name": "default",
   "type": "postgres",
   "url": process.env.DATABASE_URL,
   "ssl": true,
   "extra": {
      "ssl": { "rejectUnauthorized": false }
   },
   "synchronize": true,
   "logging": false,
   "entities": [
      `${(DEV) ? "src/entity/index.ts" : "build/entity/index.js"}`
   ],
   "migrations": [
      `${(DEV) ? "src/database/migration/**/*.ts" : "build/database/migration/**/*.js"}`
   ],
   "subscribers": [
      `${(DEV) ? "src/subscriber/**/*.ts" : "build/subscriber/**/*.js"}`
   ],
   "cli": {
      "entitiesDir": "src/entity",
      "migrationsDir": "src/database/migration",
      "subscribersDir": "src/subscriber"
   }
}


