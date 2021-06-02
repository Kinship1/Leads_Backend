import { db } from '../app.js';

export const add = (req, res) => {

    const lead = {
        name: req.body.name,
        ph_no: req.body.ph_no,
        address: req.body.address,
        status: 'New',
        reward: 0,
        user_id: res.locals.user_id
    }
    console.log(lead);
    db.query(`INSERT INTO leads (name, ph_no, address, user_id, reward, status  ) VALUES ('${lead.name}', '${lead.ph_no}', '${lead.address}', '${lead.user_id}', ${lead.reward}, '${lead.status}' )`, (err, result) => {
        if(err){
            res.status(406).send(err.sqlMessage);
        } else {
            res.status(200).send({
                message: "Lead Added",
                lead: lead,
            })
        }
    });
};

// function updateStatus(req, res){

//     const lead = {
//         name: req.body.name,
//         ph_no: req.body.ph_no,
//         address: req.body.address,
//         status: 'New',
//         reward: 0,
//         user_id: res.locals.user_id
//     }
//     console.log(lead);
//     db.query(`INSERT INTO leads (name, ph_no, address, user_id, reward, status  ) VALUES ('${lead.name}', '${lead.ph_no}', '${lead.address}', '${lead.user_id}', ${lead.reward}, '${lead.status}' )`, (err, result) => {
//         if(err){
//             res.status(406).send(err.sqlMessage);
//         } else {
//             res.status(200).send({
//                 message: "Lead Added",
//                 lead: lead,
//             })
//         }
//     });
// };

export const show = (req, res) => {

    db.query(`SELECT id, name, ph_no, address, reward, status, date FROM leads`, (err, result) => {
        if(err){
            console.log(err)
            res.status(406).send(err.sqlMessage);
        } else {
            console.log("Data Sent")
            res.status(200).send(result)
        }
    });
};

// module.exports = {
//     add: add,
//     show: show,
// }