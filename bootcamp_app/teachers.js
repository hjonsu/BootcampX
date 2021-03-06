const {
  Pool
} = require('pg');

const pool = new Pool({
  user: 'jonsu',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

pool.connect(() => {
  console.log('Connected to the database');
});

const queryString = `SELECT DISTINCT teachers.name as teacher, cohorts.name as cohort
FROM teachers
JOIN assistance_requests ON teachers.id = teacher_id
JOIN students ON students.id = student_id
JOIN cohorts ON cohorts.id = cohort_id
WHERE cohorts.name LIKE $1
ORDER BY teachers.name;`;

const values = [`%${process.argv[2] || 'JUL02'}%`];

pool.query(queryString, values)
  .then(res => {
    res.rows.forEach(fn => {
      console.log(`${fn.teacher}: ${fn.cohort}`);
    });
  }).catch(err => console.error('query error', err.stack));