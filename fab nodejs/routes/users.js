var express = require('express');
var bodyParser = require('body-parser');
var db = require("../configure/db_connection")
var fileUpload=require("express-fileupload");

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
            res.render('seed')
          });
        }
      })
    }
  }
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

exports.notification = function(req, res) {
  if(req.method == 'POST') {
    db.query ( `INSERT INTO notification_tb (	Notification_ID,Notification_Content		
      ) VALUES ("${req.body.notification_id}", "${req.body. notification_content}")`,function(err, result) {
      if (err) throw err;
      // console.log('record inserted');
      
      res.redirect('/');
    });
  }
  res.render('notification')
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
    var ut = (req.query['u']?req.query['u'].trim().toLowerCase():'');
    var utval = 0;
    var stat = 0;
    if(ut == "p") {
      stat = 1;
      utval = 4;
    }
    else if(ut == "f") {
      utval = 3;
    }
    else if(ut == "o") {
      utval = 2;
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
