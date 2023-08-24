const {
  findEmail,
  findId,
  create,
  selectAllRecruiter,
  selectRecuiter,
  updateRecruiter,
  searchRecruiter,
  countData
} = require("../model/userRecruiter");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const authHelper = require("../helper/auth");
const commonHelper = require("../helper/common");

const userRecruiterController = {
  getAllUser: async (req, res) => {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 5;
      const offset = (page - 1) * limit;
      const sortby = req.query.sortby || "nama";
      const sort = req.query.sort?.toUpperCase() || "ASC"; // optional chaining
      const search = req.query.search || "";

      if (search) {
        result = await searchRecruiter(search, limit, offset, sortby, sort);
        count = await countData(search);
      } else {
        result = await selectAllRecruiter(limit, offset, sortby, sort);
        count = await countData();
      }

      const totalData = parseInt(count);
      const totalPage = Math.ceil(totalData / limit);
      const pagination = {
        currentPage: page,
        limit,
        totalData,
        totalPage,
      };

      commonHelper.response(
        res,
        result.rows,
        200,
        "get data success ",
        pagination
      );
    } catch (err) {
      console.log(err);
    }
  },

  getDetailRecruiter: async (req, res) => {
    const id = req.params.recruiter_id;
    const { rowCount } = await findId(id);
    if (!rowCount) {
      return res.json({ message: "ID is Not Found" });
    }
    selectRecuiter(id)
      .then((result) => {
        commonHelper.response(res, result.rows, 200, "get data success");
      })
      .catch((err) => res.send(err));
  },

  updateRecruiter: async (req, res) => {
    const id = req.params.recruiter_id;
    const {
      email_perusahaan,
      nama_perusahaan,
      jabatan,
      handphone,
      deskripsi_perusahaan,
    } = req.body;

    const { rowCount } = await findId(id);
    if (!rowCount) return res.json({ message: "Worker Not Found!" });

    const data = {
      id,
      email_perusahaan,
      nama_perusahaan,
      jabatan,
      handphone,
      deskripsi_perusahaan,
    };

    try {
      const result = await updateRecruiter(data);
      commonHelper.response(
        res,
        result.rows,
        200,
        "Worker data updated successfully"
      );
    } catch (err) {
      console.log(err);
      commonHelper.response(res, null, 500, "Error while updating worker data");
    }
  },

  registerRecruiter: async (req, res) => {
    const { nama, email, handphone, password, nama_perusahaan,jabatan } = req.body;
    const { rowCount } = await findEmail(email);
    if (rowCount) {
      return res.json({ message: "email is already taken" });
    }
    const passwordHash = bcrypt.hashSync(password);
    const id = uuidv4();
    const data = {
      id,
      email,
      passwordHash,
      nama,
      handphone,
      nama_perusahaan,
      jabatan,
      role: "recruiter",
    };
    create(data)
      .then((result) => {
        commonHelper.response(res, result.rows, 200, "email is created");
      })
      .catch((err) => {
        console.log(err);
      });
  },

  loginUser: async (req, res) => {
    const { email, password } = req.body;
    const {
      rows: [user],
    } = await findEmail(email);
    if (!user) {
      return res.json({ message: "email is incorrect" });
    }
    const isValidPassword = bcrypt.compareSync(password, user.password);
    if (!isValidPassword) {
      return res.json({ message: "passowrd is incorrect" });
    }
    delete user.password;
    const payload = {
      email: user.email,
    };
    user.token = authHelper.generateToken(payload);
    user.refreshToken = authHelper.refreshToken(payload);
    commonHelper.response(res, user, 201, "login is successful");
  },
  profile: async (req, res) => {
    const email = req.payload.email;
    const {
      rows: [user],
    } = await findEmail(email);
    delete user.password;
    commonHelper.response(res, user, 200);
  },
  refreshToken: (req, res) => {
    const refreshToken = req.body.refreshToken;
    const decoded = jwt.verify(refreshToken, process.env.SECRETE_KEY_JWT);
    const payload = {
      email: decoded.email,
    };
    const result = {
      token: authHelper.generateToken(payload),
      refershToken: authHelper.refreshToken(payload),
    };
    commonHelper.response(res, result, 200, "token is already generate");
  },

  selectAllRecruiter: async (req, res) => {
    try {
      const users = await selectAllRecruiter();
      commonHelper.response(res, users.rows, 200, "Get all users success");
    } catch (err) {
      console.log(err);
      commonHelper.response(res, null, 500, "Internal server error");
    }
  },
};

module.exports = userRecruiterController;
