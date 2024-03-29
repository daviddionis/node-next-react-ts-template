import dotenv from "dotenv";
dotenv.config({ path: '.env' });

import mysql from 'mysql2/promise'
import { __dirnameAtAPILevel } from '.';

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    multipleStatements: true,
    charset: 'utf8mb4',
    dateStrings: true,
}) as any;

export default pool;