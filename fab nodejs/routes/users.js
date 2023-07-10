var express = require('express');
var bodyParser = require('body-parser');
var db = require("../configure/db_connection");
var fileUpload=require("express-fileupload");
var moment = require('moment');
var router = express.Router();


exports.index = function(req, res) {
  res.send('respond with a resource');
}
exports.logout = function(req, res) {
  req.session.destroy();
  res.redirect('/')
}
exports.users = function(req, res) {
  var data = [];
  db.query ( 'SELECT * FROM login_table WHERE usertype != 1 order by usertype, status',function(err, result) {
    if (err) throw err;
    if(result.length > 0) {
      data = result;
      console.log(data);
      res.render('users',{req: req, data:data, moment: require( 'moment' )})
    }
  });
}
exports.approve=function(req,res){
  data=[];
  var id=req.params['id']
  db.query ( 'UPDATE login_table SET status = 1 WHERE id ='+ id,function(err, result) {
    if (err) throw err;
    res.redirect('/users')
  });
}
exports.reject=function(req,res){
  data=[];  
  var id=req.params['id']
  db.query ( 'DELETE FROM login_table WHERE id ='+ id,function(err, result) {
    if (err) throw err;
    res.redirect('/users')
  });
}
exports.login = function(req, res) {
  uname = req.body.uname;
  pswd = req.body.pswd;
  console.log("----------------------");
  db.query ( 'SELECT * FROM login_table WHERE email_id = "' + uname + '" and password = "' + pswd + '" and status = 1',function(err, result) {
    console.log(result);
    console.log(err);
    if (err) throw err;
    if(result.length > 0) {
      req.session.ut = result[0].usertype;
      req.session.uid = result[0].id;
    }
    res.redirect('/')
  });
}
exports.crop = function(req, res) {
  data=[];
  if(req.method == 'POST') {
    if (!req.files) {
      return res.status(400).send("No files were uploaded.");
    }
    else {
      var uploadedFile = req.files.crop_image
      const uploadPath = __dirname
        + "/../public/uploads/"+ uploadedFile.name;
      uploadedFile.mv(uploadPath, function (err) {
        if (err) {
          // console.log(err);
          res.send("Failed !!");
        } else{
          db.query(`INSERT INTO crop_tb (cropname,cropimage,about_crop,quantity,unit,price)
            VALUES("${req.body.crop_name}", "${uploadedFile.name}","${req.body.about_crop}","${req.body.quantity}","${req.body.unit}","${req.body.price}" ) )`,function(err, result) {
            if (err) throw err;
            res.render('crop')
          });
        }
      })
    }
  }
  const query = 'SELECT * FROM crop_tb';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error executing the query:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    data = results;
    res.render('crop', {'data': data, req: req})
  });
}
exports.seed = function(req, res) {
  data=[];
  if(req.method == 'POST') {
    if (!req.files) {
      return res.status(400).send("No files were uploaded.");
    }
    else {
      var uploadedFile = req.files.seed_image
      const uploadPath = __dirname
        + "/../public/uploads/" + uploadedFile.name;
      uploadedFile.mv(uploadPath, function (err) {
        if (err) {
          res.send("Failed !!");
        } else{
          db.query ( `INSERT INTO seed_tb (seed_name,seed_image,about_seed,manufacturing_date,expiry_date,stock_available,unit, price	) VALUES ( "${req.body.seed_name}", "${uploadedFile.name}", "${req.body.about_seed}","${req.body.manufacturing_date}","${req.body.expiry_date}","${req.body.stock_available}","${req.body.unit}","${req.body.price}")`, function(err, result) {
            if (err) throw err;                  
            res.redirect('/seed')
          });
        }
      })
    }
  }
  else {
    const query = 'SELECT * FROM seed_tb';
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error executing the query:', err);
        res.status(500).send('Internal Server Error');
        return;
      }
      data = results;
      res.render('seed', {'data': data, req: req, moment: require('moment')})
    });
  }
}
exports.tool = function(req, res) {
  data=[];
  if(req.method == 'POST') {
    if (!req.files) {
      return res.status(400).send("No files were uploaded.");
    }
    else {
      var uploadedFile = req.files.tool_image
      const uploadPath = __dirname
        + "/../public/uploads/" + uploadedFile.name;
        uploadedFile.mv(uploadPath, function (err) {
          if (err) {
            // console.log(err);
            res.send("Failed !!");
          } else{
            db.query ( `INSERT INTO tool_tb (Tool_ID,Tool_Name,Tool_image,Manufacturing_Date,License_Number,Number_of_Tools,day_rent,hour_rent	
              ) VALUES ("${req.body.tool_id}", "${req.body.tool_name}", "${uploadedFile.name}", "${req.body.manufacturing_date}","${req.body.licence_number}","${req.body.number_of_tools}","${req.body.day_rent}","${req.body.hour_rent}")`,function(err, result) {
              if (err) throw err;            
              res.render('tool')
            });
          }
      })
    }
  } 
  const query = 'SELECT * FROM tool_tb';
  db.query(query, (err, results) => {
      if (err) {
        console.error('Error executing the query:', err);
        res.status(500).send('Internal Server Error');
        return;
      }
      data = results;
      res.render('tool', {'data': data, req: req})
  });
}
exports.buyfertilizer = function(req, res) {
  var id = req.query.id;
  var query = "SELECT * FROM fertilicer_tb WHERE Fertilizer_ID="+id;
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error executing the query:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    else {
      if(req.method == "POST") {
        var cost = parseInt(req.body.qty) * parseInt(results[0].price);
        var qry = 'INSERT INTO order_tb(uid, item_id, qty, address, amount, item_type) VALUES('+ req.session.uid +', ' + id + ', ' + req.body.qty + ',"' + req.body.address + '",' + cost  + ', 1)'
        db.query(qry, (err, ins) => {
          if (err) {
            throw err;
          }
          else {

            var stock = parseInt(results[0].Stock_Available) - parseInt(req.body.qty);
            var upqry = "UPDATE fertilicer_tb set Stock_Available = "+ stock +" WHERE Fertilizer_ID="+id;
            db.query(upqry, (err, results) => {
              if (err) {
                throw err;
              }
              else {
                res.redirect('/');
              }
            })
          }
        })
      }
      else {
        res.render('buy', {'data': results[0], req: req, moment: require( 'moment' )})
      }
    }
  });
}
exports.rent = function(req, res) {
  if(req.session.ut == 1)
    var qry = "select a.duration, a.qty, a.duration_unit, a.booked_for, b.Tool_Name, c.name from rent_tb a JOIN tool_tb b ON a.tid = b.Tool_ID JOIN login_table c ON a.uid = c.id";
  else
    var qry = "select a.duration, a.qty, a.duration_unit, a.booked_for, b.Tool_Name from rent_tb a JOIN tool_tb b ON a.tid = b.Tool_ID WHERE a.uid="+req.session.uid;
  db.query(qry, (err, results) => {
    if (err) {
      console.error('Error executing the query:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    else {
      res.render('rent', {req: req, moment: moment, data: results});
    }
  })
}
exports.addcart = function(req, res) {
  var id = req.body.i;
  var type = req.body.t;
  var chkQry = "select * from order_tb where item_type=" + type + " and status = 0 and item_id = " + id +" and uid = " + req.session.uid;
  if(type == '3') {
    var query = "SELECT * FROM crop_tb WHERE cropid="+id;  
  }
  else if(type == '1') {
    var query = "SELECT * FROM fertilicer_tb WHERE Fertilizer_ID="+id;
  }
  else if(type == '2') {
    var query = "SELECT * FROM fertilicer_tb WHERE Fertilizer_ID="+id;
  }
  else if(type == '4') {
    var query = "SELECT * FROM seed_tb WHERE seed_id="+id;
  }
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error executing the query:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    else {
      console.log(3333333);
      if(req.method == "POST") {
        var cost = parseInt(req.body.q) * parseInt(results[0].price);
        db.query(chkQry, (err, doc) => {
          if(err)
            throw err;
          else {
            if(doc.length){
              var qry = 'UPDATE order_tb SET qty=' + req.body.q + ', amount=' + cost + '  WHERE id = ' + doc[0].id + ' and status = 0' ;
            }
            else {
              var qry = 'INSERT INTO order_tb(uid, item_id, qty, amount, item_type) VALUES('+ req.session.uid +', ' + id + ', ' + req.body.q + ',' + cost  + ', ' + type + ')'
            }
            db.query(qry, (err, ins) => {
              if (err) {
                throw err;
              }   
              res.status(200).send({ msg: 'success' });
              
            })
          }
        });
      }
      else {
        res.render('buy', {'data': results[0], req: req, moment: require( 'moment' )})
      }
    }
  });
}
exports.addrent = function(req, res) {
  var qty = req.body.q;
  var addr = req.body.a;
  var d = moment(req.body.d).format('YYYY-MM-DD');
  var dur = req.body.dur;
  var du = req.body.du;
  var item = req.body.i;
  var qry = 'INSERT INTO rent_tb(uid, qty, tid, booked_for, duration, address, duration_unit) VALUES (' + req.session.uid + ',' + qty + ', ' + item + ',"' + d + '",' + dur + ',"' + addr + '",' + du + ')';
  console.log(qry);
  db.query(qry, (err, ins) => {
    if (err) {
      throw err;
    }   
    res.status(200).send({ msg: 'success' });
  })
}
exports.pay = function(req, res) {
  if(req.method == "POST") {
    var today = moment(new Date()).format('YYYY-MM-DD')
    var qry = "select * from order_tb WHERE uid = " + req.session.uid +" and status = 0";
    var update_qry = "UPDATE order_tb SET date = '" + today + "', status = 1 WHERE uid = " + req.session.uid +" and status = 0"
    db.query(qry, (err, doc) => {
      if(err)
        throw err;
      else {
        if(doc.length > 0) {
          db.query(update_qry, (err, updoc) => {
            if(err)
              throw err;
            else {
              for(var i = 0; i < doc.length; i++) {
                if(doc[i].item_type == 1 || doc[i].item_type == 2) {
                  var upqry = "UPDATE fertilicer_tb set Stock_Available = Stock_Available - "+doc[0].qty+" WHERE Fertilizer_ID="+doc[0].item_id;
                  db.query(upqry, (err, results) => {
                    if (err) {
                      throw err;
                    }
                  })
                } 
                else if(doc[i].item_type == 3) {
                  var upqry = "UPDATE crop_tb set quantity = quantity - "+doc[0].qty+" WHERE cropid="+doc[0].item_id;
                  db.query(upqry, (err, results) => {
                    if (err) {
                      throw err;
                    }
                  })
                }
                else if(doc[i].item_type == 4) {
                  var upqry = "UPDATE seed_tb set stock_available = stock_available - "+doc[0].qty+" WHERE seed_id="+doc[0].item_id;
                  db.query(upqry, (err, results) => {
                    if (err) {
                      throw err;
                    }
                  })
                }
              }
              res.redirect('/order')
            }
          });
        }
      }
    });
  }
}
exports.order = function(req, res) {
  var obj = {seed:[],crp: [], fer:[]};
  if(req.session.ut == 1) {
    var crp_qry = "select a.item_id, a.qty, a.date, a.item_type, a.amount, b.cropname as item_name, b.quantity as stock, b.cropimage as img, b.price as price, c.name from order_tb a JOIN crop_tb b ON a.item_id = b.cropid JOIN login_table c ON a.uid = c.id WHERE a.item_type = 3 and a.status = 1";
    var fer_qry = "select a.item_id, a.qty, a.date, a.item_type, a.amount, b.Fertilizer_Name as item_name, b.Stock_Available as stock, b.fertilizer_image as img, b.price as price, c.name from order_tb a JOIN fertilicer_tb b ON a.item_id = b.Fertilizer_ID JOIN login_table c ON a.uid = c.id WHERE (a.item_type = 1 or a.item_type = 2) and a.status = 1";
    var seed_qry = "select a.item_id, a.qty, a.date, a.item_type, a.amount, b.seed_name as item_name, b.stock_available as stock, b.seed_image as img, b.price as price, c.name from order_tb a JOIN seed_tb b ON a.item_id = b.seed_id JOIN login_table c ON a.uid = c.id WHERE a.item_type = 4 and a.status = 1";
  }
  else {
    var crp_qry = "select a.item_id, a.qty, a.date, a.item_type, a.amount, b.cropname as item_name, b.quantity as stock, b.cropimage as img, b.price as price from order_tb a JOIN crop_tb b ON a.item_id = b.cropid WHERE uid = " + req.session.uid +" and a.item_type = 3 and a.status = 1";
    var fer_qry = "select a.item_id, a.qty, a.date, a.item_type, a.amount, b.Fertilizer_Name as item_name, b.Stock_Available as stock, b.fertilizer_image as img, b.price as price from order_tb a JOIN fertilicer_tb b ON a.item_id = b.Fertilizer_ID WHERE uid = " + req.session.uid +" and (a.item_type = 1 or a.item_type = 2) and a.status = 1";
    var seed_qry = "select a.item_id, a.qty, a.date, a.item_type, a.amount, b.seed_name as item_name, b.stock_available as stock, b.seed_image as img, b.price as price from order_tb a JOIN seed_tb b ON a.item_id = b.seed_id WHERE uid = " + req.session.uid +" and a.item_type = 4 and a.status = 1";
  }
  db.query(crp_qry, (err, doc) => {
    if(err)
      throw err;
    else {
      if(doc.length)
        obj['crp'] = doc
      db.query(fer_qry, (err, ferdoc) => {
        if(err)
          throw err;
        else {
          if(ferdoc.length)
            obj['fer'] = ferdoc
          db.query(seed_qry, (err, seeddoc) => {
            if(err)
              throw err;
            else {
              if(seeddoc.length)
                obj['seed'] = seeddoc
              res.render('orders', {'data': obj, req: req, moment: moment})
            }
          })
        }
      })
    }
  })
}
exports.cart = function(req, res) {
  if(req.method == "POST") {
    var qry = "UPDATE order_tb SET address = '" + req.body.address + "' WHERE uid = " + req.session.uid +" and status = 0"
    db.query(qry, (err, doc) => {
      if(err)
        throw err;
      else {
        res.render('pay', {'data': req.body.amount, req: req, moment: require( 'moment' )})
      }
    });
  }
  else {
    var obj = {seed:[],crp: [], fer:[]};
    var crp_qry = "select a.item_id, a.qty, a.item_type, a.amount, b.cropname as item_name, b.quantity as stock, b.cropimage as img, b.price as price from order_tb a JOIN crop_tb b ON a.item_id = b.cropid WHERE uid = " + req.session.uid +" and a.item_type = 3 and status = 0";
    var fer_qry = "select a.item_id, a.qty, a.item_type, a.amount, b.Fertilizer_Name as item_name, b.Stock_Available as stock, b.fertilizer_image as img, b.price as price from order_tb a JOIN fertilicer_tb b ON a.item_id = b.Fertilizer_ID WHERE uid = " + req.session.uid +" and (a.item_type = 1 or a.item_type = 2) and status = 0";
    var seed_qry = "select a.item_id, a.qty, a.item_type, a.amount, b.seed_name as item_name, b.stock_available as stock, b.seed_image as img, b.price as price from order_tb a JOIN seed_tb b ON a.item_id = b.seed_id WHERE uid = " + req.session.uid +" and a.item_type = 4 and status = 0";
    db.query(crp_qry, (err, doc) => {
      if(err)
        throw err;
      else {
        if(doc.length)
          obj['crp'] = doc
        db.query(fer_qry, (err, ferdoc) => {
          if(err)
            throw err;
          else {
            if(ferdoc.length)
              obj['fer'] = ferdoc
            db.query(seed_qry, (err, seeddoc) => {
              if(err)
                throw err;
              else {
                if(seeddoc.length)
                  obj['seed'] = seeddoc
                res.render('cart', {'data': obj, req: req})
              }
            })
          }
        })
      }
    })
  }
}
exports.fertilicer = function(req, res) {
data=[];
if(req.method == 'POST') {
  if (!req.files) {
        return res.status(400).send("No files were uploaded.");
      }
      else {
        var uploadedFile = req.files.fertilizer_image
        const uploadPath = __dirname
          + "/../public/uploads/" + uploadedFile.name;
          uploadedFile.mv(uploadPath, function (err) {
            if (err) {
              // console.log(err);
              res.send("Failed !!");
            } else{
        
              db.query ( `INSERT INTO fertilicer_tb (type,Fertilizer_Name,About_Fertilizer,Manufacturing_Date,Expiry_Date,Stock_Available,fertilizer_image,unit,price
                ) VALUES ( "fertilicer", "${req.body.fertilizer_name}", "${req.body.about_fertilizer}","${req.body.manufacturing_date}","${req.body.expiry_date}","${req.body.stock_available}", "${uploadedFile.name}","${req.body.unit}", "${req.body.price}")`,function(err, result) {
                if (err) throw err;
                // console.log('record inserted');
                
                res.redirect('/fertilicer')
              });
            }
        })
      }
  }
  // const query = 'SELECT * FROM fertilicer_tb where type='fertilicer'';
  var query = "SELECT * FROM fertilicer_tb WHERE type = 'fertilicer' and Stock_Available > 0";
  if(req.session.ut == 1) {
    query = "SELECT * FROM fertilicer_tb WHERE type = 'fertilicer';";
  }
  db.query(query, (err, results) => {
      if (err) {
        console.error('Error executing the query:', err);
        res.status(500).send('Internal Server Error');
        return;
      }
      data = results;
      res.render('fertilicer', {'data': data, req: req, moment: require( 'moment' )})
  });
}
exports.pesticide = function(req, res) {
  data = [];
  if(req.method == 'POST') {
    if (!req.files) {
      return res.status(400).send("No files were uploaded.");
    }
    else {
      var uploadedFile = req.files.pesticide_image
      const uploadPath = __dirname
        + "/../public/uploads/" + uploadedFile.name;
      uploadedFile.mv(uploadPath, function (err) {
        if (err) {
          res.send("Failed !!");
        } else{
          db.query ( `INSERT INTO fertilicer_tb (type,Fertilizer_Name,About_Fertilizer,Manufacturing_Date,Expiry_Date,Stock_Available,fertilizer_image,,unit,price
            ) VALUES ( "pesticide","${req.body.pesticide_name}","${req.body.about_pesticide}","${req.body.manufacturing_date}","${req.body.expiry_date}","${req.body.stock_available}", "${uploadedFile.name}","${req.body.unit}","${req.body.price}")`,function(err, result) {
            if (err) throw err;
              res.render('pesticide', {req: req})
          });
        }
      })
    }
  }
  console.log(req.session.ut)
  var query = "SELECT * FROM fertilicer_tb WHERE type = 'pesticide' and Stock_Available > 0";
  if(req.session.ut == 1) {
    query = "SELECT * FROM fertilicer_tb WHERE type = 'pesticide';";
  }
  db.query(query, (err, results) => {
      if (err) {
        console.error('Error executing the query:', err);
        res.status(500).send('Internal Server Error');
        return;
      }
      data = results;
      res.render('pesticide', {'data': data, req: req, moment: require( 'moment' )})
  });
}
exports.profile = function(req, res) {
  if(req.method == 'POST') {
    db.query ( 'UPDATE login_table SET password= "' + req.body.password + '" WHERE id='+req.session.uid,function(err, result) {
      if (err) throw err;
      db.query ( 'SELECT * FROM login_table where id='+ req.session.uid,function(err, result) {
        if (err) throw err;
        res.render('profile', {req:req, me: result[0], moment: moment, stat:1})
      })
    });
  }
  else {
    db.query ( 'SELECT * FROM login_table where id='+ req.session.uid,function(err, result) {
      if (err) throw err;
      res.render('profile', {req:req, me: result[0], moment: moment})
    })
  }
};
exports.delnote = function(req, res) {
  var id=req.query['i']
  db.query ( 'DELETE FROM notification_tb WHERE Notification_ID='+ id,function(err, result) {
    if (err) throw err;
    res.redirect('/notification');
  });
}
exports.notification = function(req, res) {
  if(req.method == 'POST') {
    db.query ( `INSERT INTO notification_tb (	link, Notification_Content
      ) VALUES ("${req.body.link}", "${req.body. notification_content}")`,function(err, result) {
      if (err) throw err;
      res.redirect('/notification');
    });
  }
  else {
    db.query ( 'SELECT * FROM notification_tb',function(err, result) {
      if (err) throw err;
      res.render('notification', {req:req, notes: result})
    })
  }
};
exports.about = function(req, res) {
  if(req.method == 'POST') {
    res.redirect('/')
  }
  else {
    res.render('about')
  }
}
exports.registration = function(req, res) {
  if(req.method == 'POST') {   
    // var abc = ;
    var ut = (req.query['u']?req.query['u'].trim().toLowerCase():'p');
    var utval = 0;
    var stat = 0;
    if(ut == "f") {
      utval = 2;
    }
    else if(ut == "p") {
      utval = 3;
      stat = 1;
    }
    if(utval != 0) {
      db.query(`INSERT INTO login_table (
        name,address,gender,date_of_birth,whats_app_number,email_id,password, usertype, status
        ) VALUES ("${req.body.name_input}", "${req.body.address}", "${req.body.slt_gender}", "${req.body.date_of_birth}", "${req.body.whatsapp_num}", "${req.body.email}", "${req.body.password}","${utval}", "${stat}")`,
      function(err, result) {
        if (err) throw err;
        // console.log('record inserted');
        
        res.redirect('/');
      });
    }
  }
  else {
    res.render('registration')
  }
};
exports.edittool=function(req,res){
  data=[];
   var id=req.query['id']
    if(req.method=='POST'){
      var img ='';
      if (req.files) {
              var uploadedFile = req.files.tool_image
              const uploadPath = __dirname
                + "/../public/uploads/" + uploadedFile.name;
                uploadedFile.mv(uploadPath, function (err) {
                  if (err) {
                    res.send("Failed !!");
                  } else{ 
                    img =uploadedFile.name;
                    var sql= 'UPDATE  tool_tb SET Tool_Name = "'+ req.body.tool_name +'", Tool_Image="' + img + '",Manufacturing_Date="' + req.body.manufacturing_date + '", License_Number="' + req.body.licence_number + '",Number_of_Tools="' + req.body.number_of_tools + '", day_rent="' + req.body.day_rent + '", hour_rent="' + req.body.hour_rent + '" WHERE Tool_ID  = ' +id;
                    db.query(sql, (err, results) => {
                      if (err) {
                        console.error('Error executing the query:', err);
                        res.status(500).send('Internal Server Error');
                        return;        
                      } 
                      else {
                        res.redirect('/tool')
                      }
                    });
                  } 
                })
              }
              // console.log("-------------------" + img);
              else {
                // console.log('if');
                var sql= 'UPDATE  tool_tb SET Tool_Name = "'+ req.body.tool_name +'", Manufacturing_Date="' + req.body.manufacturing_date + '", License_Number="' + req.body.licence_number + '",Number_of_Tools="' + req.body.number_of_tools + '", day_rent="' + req.body.day_rent + '", hour_rent="' + req.body.hour_rent + '" WHERE Tool_ID  = ' +id;
                db.query(sql, (err, results) => {
                  if (err) {
                    console.error('Error executing the query:', err);
                    res.status(500).send('Internal Server Error');
                    return;        
                  } 
                  else {
                    res.redirect('/tool')
                  }
                });
              }
              
  }
  else {
    var query = "SELECT * FROM tool_tb WHERE Tool_ID = " +id ;
    console.log(query);
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error executing the query:', err);
        res.status(500).send('Internal Server Error');
        return;
      }
      data=results;
      res.render('edittool',{'data':data[0], req: req, moment: require( 'moment' )})
    });
  }
}
exports.editseed=function(req,res){
  data=[];
   var id=req.query['id']
    if(req.method=='POST'){
      var img ='';
      if (req.files) {
              var uploadedFile = req.files.seed_image
              const uploadPath = __dirname
                + "/../public/uploads/" + uploadedFile.name;
                uploadedFile.mv(uploadPath, function (err) {
                  if (err) {
                    res.send("Failed !!");
                  } else{ 
                    img =uploadedFile.name;
                    var sql= 'UPDATE  seed_tb SET seed_name = "'+ req.body.seed_name +'", seed_image="' + img + '",Manufacturing_Date="' + req.body.manufacturing_date + '", about_seed="' + req.body.about_seed + '", expiry_date="' + req.body.expiry_date + '", stock_available="' + req.body.stock_available + '", unit="' + req.body.unit + '", price="' + req.body.price + '" WHERE seed_id  = ' +id;
                    db.query(sql, (err, results) => {
                      if (err) {
                        console.error('Error executing the query:', err);
                        res.status(500).send('Internal Server Error');
                        return;        
                      } 
                      else {
                        res.redirect('/seed')
                      }
                    });
                  } 
                })
              }
              // console.log("-------------------" + img);
              else {
                // console.log('if');
                var sql= 'UPDATE  seed_tb SET seed_name = "'+ req.body.seed_name +'",Manufacturing_Date="' + req.body.manufacturing_date + '", about_seed="' + req.body.about_seed + '", expiry_date="' + req.body.expiry_date + '", stock_available="' + req.body.stock_available + '", unit="' + req.body.unit + '", price="' + req.body.price + '" WHERE seed_id  = ' +id;
                db.query(sql, (err, results) => {
                  if (err) {
                    console.error('Error executing the query:', err);
                    res.status(500).send('Internal Server Error');
                    return;        
                  } 
                  else {
                    res.redirect('/seed')
                  }
                });
              }
              
  }
  else {
    var query = "SELECT * FROM seed_tb WHERE seed_id = " +id ;
    console.log(query);
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error executing the query:', err);
        res.status(500).send('Internal Server Error');
        return;
      }
      data=results;
      console.log(data);
      res.render('editseed',{'sd':data[0], req: req, moment: require( 'moment' )})
    });
  }
}

exports.editfertilizer=function(req,res){
  data=[];
  // console.log(req.params['id']);
   var id=req.query['id']
    if(req.method=='POST'){
      var img ='';
      // console.log(111);
      if (req.files) {
        // console.log(2222);
              var uploadedFile = req.files.fertilizer_image
              const uploadPath = __dirname
                + "/../public/uploads/" + uploadedFile.name;
                uploadedFile.mv(uploadPath, function (err) {
                  if (err) {
                    // console.log(err);
                    res.send("Failed !!");
                  } else{ 
                    img =uploadedFile.name;
                    var sql= 'UPDATE  fertilicer_tb SET Fertilizer_Name = "'+ req.body.fertilizer_name +'", fertilizer_image="' + img + '",About_Fertilizer="' + req.body.about_fertilizer + '", Manufacturing_Date="' + req.body.manufacturing_date + '",Expiry_Date="' + req.body.expiry_date + '",Stock_Available="' + req.body.stock_available + '", unit="' + req.body.unit + '", price="' + req.body.price + '" WHERE Fertilizer_ID  = ' +id;
                    db.query(sql, (err, results) => {
                      if (err) {
                        console.error('Error executing the query:', err);
                        res.status(500).send('Internal Server Error');
                        return;        
                      } 
                      else {
                        res.redirect('/fertilicer')
                      }
                    });
                  } 
                })
              }
              // console.log("-------------------" + img);
              else {
                // console.log('if');
                var sql= 'UPDATE  fertilicer_tb SET Fertilizer_Name = "'+req.body.fertilizer_name+'", About_Fertilizer="'+req.body.about_fertilizer+'", Manufacturing_Date="'+req.body.manufacturing_date+'",Expiry_Date="'+req.body.expiry_date+'",Stock_Available="'+req.body.stock_available+'", unit="' + req.body.unit + '", price="' + req.body.price + '" WHERE Fertilizer_ID  =' +id;
                db.query(sql, (err, results) => {
                  if (err) {
                    console.error('Error executing the query:', err);
                    res.status(500).send('Internal Server Error');
                    return;        
                  } 
                  else {
                    res.redirect('/fertilicer')
                  }
                });
              }
              
  }
  else {
    var query = "SELECT * FROM fertilicer_tb WHERE Fertilizer_ID = " +id ;
    console.log(query);
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error executing the query:', err);
        res.status(500).send('Internal Server Error');
        return;
      }
      data=results;
      res.render('edit_fertilicer',{'data':data, req: req, moment: require( 'moment' )})
    });
  }
}

exports.editpesticide=function(req,res){
  data=[];
  // console.log(req.params['id']);
   var id=req.query['id']
    if(req.method=='POST'){
      var img ='';
      // console.log(111);
      if (req.files) {
        // console.log(2222);
              var uploadedFile = req.files.fertilizer_image
              const uploadPath = __dirname
                + "/../public/uploads/" + uploadedFile.name;
                uploadedFile.mv(uploadPath, function (err) {
                  if (err) {
                    // console.log(err);
                    res.send("Failed !!");
                  } else{ 
                    img =uploadedFile.name;
                    var sql= 'UPDATE  fertilicer_tb SET Fertilizer_Name = "'+ req.body.fertilizer_name +'", fertilizer_image="' + img + '",About_Fertilizer="' + req.body.about_fertilizer + '", Manufacturing_Date="' + req.body.manufacturing_date + '",Expiry_Date="' + req.body.expiry_date + '",Stock_Available="' + req.body.stock_available + '", unit="' + req.body.unit + '", price="' + req.body.price + '" WHERE Fertilizer_ID  = ' +id;
                    db.query(sql, (err, results) => {
                      if (err) {
                        console.error('Error executing the query:', err);
                        res.status(500).send('Internal Server Error');
                        return;        
                      } 
                      else {
                        res.redirect('/pesticide')
                      }
                    });
                  } 
                })
              }
              // console.log("-------------------" + img);
              else {
                // console.log('if');
                var sql= 'UPDATE  fertilicer_tb SET Fertilizer_Name = "'+req.body.fertilizer_name+'", About_Fertilizer="'+req.body.about_fertilizer+'", Manufacturing_Date="'+req.body.manufacturing_date+'",Expiry_Date="'+req.body.expiry_date+'",Stock_Available="'+req.body.stock_available+'", unit="' + req.body.unit + '", price="' + req.body.price + '" WHERE Fertilizer_ID  =' +id;
                db.query(sql, (err, results) => {
                  if (err) {
                    console.error('Error executing the query:', err);
                    res.status(500).send('Internal Server Error');
                    return;        
                  } 
                  else {
                    res.redirect('/pesticide')
                  }
                });
              }
              
  }
  else {
    var query = "SELECT * FROM fertilicer_tb WHERE Fertilizer_ID = " +id ;
    console.log(query);
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error executing the query:', err);
        res.status(500).send('Internal Server Error');
        return;
      }
      data=results;
      res.render('edit_fertilicer',{'data':data, req: req, moment: require( 'moment' )})
    });
  }
}

exports.editcrop=function(req,res){
  data=[];
  // console.log(req.params['id']);
   var id=req.query['id']
    if(req.method=='POST'){
      var img ='';
      // console.log(111);
      if (req.files) {
        // console.log(2222);
              var uploadedFile = req.files.crop_image
              const uploadPath = __dirname
                + "/../public/uploads/" + uploadedFile.name;
                uploadedFile.mv(uploadPath, function (err) {
                  if (err) {
                    // console.log(err);
                    res.send("Failed !!");
                  } else{ 
                    var sql= 'UPDATE  crop_tb SET cropimage="' + uploadedFile.name + '", cropname = "'+req.body.crop_name+'",quantity="'+req.body.quantity+'", price="'+req.body.price+'", unit="' + req.body.unit + '", price="' + req.body.price + '" WHERE cropid  =' +id;
                    db.query(sql, (err, results) => {
                      if (err) {
                        console.error('Error executing the query:', err);
                        res.status(500).send('Internal Server Error');
                        return;            
                      } 
                      else {
                        res.redirect('/crop')
                      }
                    });
                  } 
                })
              }
              // console.log("-------------------" + img);
              else {
                // console.log('if');
                var sql= 'UPDATE  crop_tb SET cropname = "'+req.body.crop_name+'",quantity="'+req.body.quantity+'", price="'+req.body.price+'", unit="' + req.body.unit + '", price="' + req.body.price + '" WHERE cropid  =' +id;
                db.query(sql, (err, results) => {
                  if (err) {
                    console.error('Error executing the query:', err);
                    res.status(500).send('Internal Server Error');
                    return;            
                  } 
                  else {
                    res.redirect('/crop')
                  }
                });
              }
  }
  else {
    const query = "SELECT * FROM crop_tb WHERE cropid = " +id ;
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error executing the query:', err);
        res.status(500).send('Internal Server Error');
        return;
      }
      data=results;
      res.render('editcrop',{'data':data, req: req})
    });
  }
}
