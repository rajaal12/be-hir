const pool = require("../config/db");

const create = (data) => {
  const { nama, email, nama_perusahaan, jabatan, passwordHash, handphone, id, role } = data;
  return pool.query(
    `INSERT INTO user_recruiter(recruiter_id,nama,nama_perusahaan,email,jabatan,handphone,password,role) VALUES('${id}','${nama}','${nama_perusahaan}','${email}','${jabatan}','${handphone}','${passwordHash}','${role}')`
  );
};

const updateRecruiter = (data) => {
  const { email_perusahaan, nama_perusahaan, jabatan, handphone, id,deskripsi_perusahaan  } = data;
  return pool.query(
    `UPDATE user_recruiter SET email_perusahaan='${email_perusahaan}',nama_perusahaan='${nama_perusahaan}',jabatan='${jabatan}',deskripsi_perusahaan='${deskripsi_perusahaan}',handphone='${handphone}'  WHERE recruiter_id='${id}'`
  );
};

const findEmail = (email) => {
  return new Promise((resolve, reject) =>
    pool.query(
      `SELECT * FROM user_recruiter WHERE email = '${email}'`,
      (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    )
  );
};

const countData = () => {
  return pool.query("SELECT COUNT(*) user_recruiter");
};

const findId = (id) => {
  return new Promise((resolve, reject) =>
    pool.query(
      `SELECT recruiter_id FROM user_recruiter WHERE recruiter_id='${id}'`,
      (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    )
  );
};

const selectAllRecruiter = (limit, offset, sortby, sort) => {
  return pool.query(
    // `SELECT user_worker.*, skill_worker.skill_name FROM user_worker LEFT JOIN skill_worker ON user_worker.worker_id = skill_worker.worker_id ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`

    // `SELECT * FROM user_worker ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`
//     `SELECT user_worker.worker_id, 
//     user_worker.nama, 
//     string_agg(skill_worker.skill_name, ', ') AS skills
// FROM user_worker 
// LEFT JOIN skill_worker ON user_worker.worker_id = skill_worker.worker_id 
// GROUP BY user_worker.worker_id, user_worker.nama
// ORDER BY ${sortby} ${sort} 
// LIMIT ${limit} OFFSET ${offset};
// `
`SELECT
    uw.worker_id,
    uw.nama,
    uw.domisili,
    uw.jobdesk,
    array_agg(sw.skill_name ORDER BY sw.skill_name) AS skills
FROM user_worker uw
LEFT JOIN skill_worker sw ON uw.worker_id = sw.worker_id
GROUP BY uw.worker_id, uw.nama, uw.domisili, uw.jobdesk
ORDER BY ${sortby} ${sort}
LIMIT ${limit} OFFSET ${offset}`
  );
};

const searchRecruiter = (search, limit, offset, sortby, sort) => {
  return pool.query(
    `SELECT * FROM user_recruiter WHERE nama ILIKE '%${search}%' ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`
  );
};

const selectRecuiter = (id) => {
  return pool.query(`SELECT * FROM user_recruiter WHERE recruiter_id='${id}'`);
};

module.exports = {
  findEmail,
  findId,
  create,
  selectAllRecruiter,
  selectRecuiter,
  updateRecruiter,
  searchRecruiter,
  countData,
};
