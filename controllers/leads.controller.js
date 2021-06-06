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
    const user_id = res.locals.user_id;
    if (user_id===4){
        db.query(`SELECT id, name, ph_no, address, reward, status, date FROM leads`, (err, result) => {
            if(err){
                console.log(err)
                res.status(406).send(err.sqlMessage);
            } else {
                console.log("result", result)
                res.status(200).send(result)
            }
        });

    } else {
    db.query(`SELECT id, name, ph_no, address, reward, status, date FROM leads WHERE user_id= '${user_id}'`, (err, result) => {
        if(err){
            console.log(err)
            res.status(406).send(err.sqlMessage);
        } else {
            console.log("result", result)
            res.status(200).send(result)
        }
    });
}
};


export const edit = (req, res) => {

    const lead = {
        id: req.body.id,
        name: req.body.name,
        ph_no: req.body.ph_no,
        address: req.body.address,
    }
    console.log(lead);
    db.query(`UPDATE leads SET name='${lead.name}', ph_no='${lead.ph_no}', address='${lead.address}' WHERE id = '${lead.id}'`, (err, result) => {
        if(err){
            res.status(406).send(err.sqlMessage);
        } else {
            res.status(200).send({
                message: "Lead Edited",
                lead: lead,
            })
        }
    });
};

