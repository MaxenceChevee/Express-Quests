const database = require("../../database");
const getUsers = (req, res) => {
    database
        .query("select * from users")
        .then(([Users]) => {
            res.json(Users); // use res.json instead of console.log
        })
        .catch((err) => {
            res.sendStatus(500);
        });
};

const getUserById = (req, res) => {
    const id = parseInt(req.params.id);

    database
        .query("select * from Users where id = ?", [id])
        .then(([Users]) => {
            if (Users[0] != null) {
                res.json(Users[0]);
            } else {
                res.sendStatus(404);
            }
        })
        .catch((err) => {
            res.sendStatus(500);
        });
};
const postUser = (req, res) => {
    const { firstname, lastname, email, city, language } = req.body;

    database
        .query(
            "INSERT INTO users (firstname, lastname, email, city, language) VALUES (?, ?, ?, ?, ?)",
            [firstname, lastname, email, city, language]
        )
        .then(([result]) => {
            res.status(201).send({ id: result.insertId });
        })
        .catch((err) => {
            res.sendStatus(500);
        })
};
const updateUser = (req, res) => {
    const id = parseInt(req.params.id);
    const { firstname, lastname, email, city, language } = req.body;

    database
        .query(
            "update users set firstname = ?, lastname = ?, email = ?, city = ?, language = ? where id = ?",
            [firstname, lastname, email, city, language, id]
        )
        .then(([result]) => {
            if (result.affectedRows === 0) {
                res.sendStatus(404);
            } else {
                res.sendStatus(204);
            }
        })
        .catch((err) => {
            res.sendStatus(500);
        });
};
module.exports = {
    getUsers,
    getUserById,
    postUser,
    updateUser,
};