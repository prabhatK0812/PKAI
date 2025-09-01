// importing nenon form neon database:
import {neon} from '@neondatabase/serverless'

// statement form step-4 of doc :
const sql = neon(`${process.env.DATABASE_URL}`); // in this we have provided env variable (database url)

// using this we can read & write the data in sql database

// to export this :
export default sql;