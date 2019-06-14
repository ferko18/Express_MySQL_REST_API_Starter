const apiconnection = require("../database/connection.js");
const router = require("express").Router();


// note errors are not handeled properly, this is just a test
//get all endpoint
router.get("/",  async (req, res) => {
    apiconnection.query(
        `select * from tbl1 `,
        (error, rows, fields) => {
          if (!error) {
            res.json(rows);
          } else {
            res.json(error);
          }
        }
      );

});

// get one endpoint
router.get("/:id", (req, res) => {
  const id = req.params.id;
  apiconnection.query(
    `select * from tbl1 where id = ${id}`,
    (error, rows, fields) => {
      if (!error) {
        res.json(rows);
      } else {
        res.json(error);
      }
    }
  );
});

//delete
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  apiconnection.query(
    `delete from tbl1 where id = ${id}`,
    (error, rows, fields) => {
      if (!error) {
        res.json({ message: `an item with id = ${id} is deleted` });
      } else {
        res.json(error);
      }
    }
  );
});

//post ....should send back the object posted

router.post("/", (req, res) => {
  name = req.body.name;
  apiconnection.query(
    `CALL userAdd ('${name}', @_LID)`,
    (error, rows, fields) => {
      if (error) {
        res.json({ message: `cant be saved to the database` });
      } else {
        res.json(rows[0][0]);
      }
    }
  );
});


//put ...should send back the object edited 

router.put("/:id", (req, res) => {
  const id = req.params.id;
  name = req.body.name;
  apiconnection.query(
    `CALL userUpdate (${id}, '${name}')`,
    (error, rows, fields) => {
      if (error) {
        res.json({ message: `cant be saved to the database` });
      } else {
        res.json( rows[0][0] );
      }
    }
  );
});

module.exports = router;
