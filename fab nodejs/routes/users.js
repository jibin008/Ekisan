var express = require('express');
var bodyParser = require('body-parser');
var db = require("../configure/db_connection")
var fileUpload=require("express-fileupload");

var router = express.Router();


exports.index = function(req, res) {
  res.send('respond with a resource');
}
// exports.crop = function(req, res) {
//   if(req.method == 'POST') {
//     db.query ( `INSERT INTO crop_tb (cropid, cropname, cropimage, quantity, price) VALUES ("${req.body.crop_id}", "${req.body.crop_name}", "${req.body.crop_image}", "${req.body.quantity}","${req.body.price}")`,function(err, result) {
//       if (err) throw err;
//       console.log('record inserted');
      
//       res.redirect('/');
//     });
//     }
//     res.render('crop')
//     };
exports.crop = function(req, res) {
  if(req.method == 'POST') {
    console.log(req.files)
    if (!req.files) {
          return res.status(400).send("No files were uploaded.");
        }
        else {
          var uploadedFile = req.files.crop_image
          const uploadPath = __dirname
            + "/uploads/" + uploadedFile.name;
            uploadedFile.mv(uploadPath, function (err) {
              if (err) {
                console.log(err);
                res.send("Failed !!");
              } else{
                db.query ( `INSERT INTO crop_tb (cropname, cropimage, quantity, price	
                  ) VALUES ("${req.body.crop_name}", "${req.body.uploadedFile.name}", "${req.body.quantity}","${req.body.price}"}","${req.body.licence_number}","${req.body.number_of_tools}")`,function(err, result) {
                  if (err) throw err;
                  console.log('record inserted');
                  
                  res.render('crop')
                });
              }
          })
        }
    }

    res.render('crop')
    };
    // exports.seed = function(req, res) {
    //   if(req.method == 'POST') {
    //     db.query ( `INSERT INTO seed_tb (seed_id,seed_name,seed_image,about_seed,manufacturing_date,expiry_date,stock_available	
    //       ) VALUES ("${req.body.seed_id}", "${req.body.seed_name}", "${req.body.seed_image}", "${req.body.about_seed}","${req.body.manufacturing_date}","${req.body.expiry_date}","${req.body.stock_available}")`,function(err, result) {
    //       if (err) throw err;
    //       console.log('record inserted');
          
    //       res.redirect('/');
    //     });
    //     }
    //     res.render('seed')
    //     };
    exports.seed = function(req, res) {
          if(req.method == 'POST') {
            console.log(req.files)
            if (!req.files) {
                  return res.status(400).send("No files were uploaded.");
                }
                else {
                  var uploadedFile = req.files.seed_image
                  const uploadPath = __dirname
                    + "/uploads/" + uploadedFile.name;
                    uploadedFile.mv(uploadPath, function (err) {
                      if (err) {
                        console.log(err);
                        res.send("Failed !!");
                      } else{
                        db.query ( `INSERT INTO seed_tb (seed_name,seed_image,about_seed,manufacturing_date,expiry_date,stock_available	) VALUES ( "${req.body.seed_name}", "${uploadedFile.name}", "${req.body.about_seed}","${req.body.manufacturing_date}","${req.body.expiry_date}","${req.body.stock_available}")`, function(err, result) {
                          if (err) throw err;
                          console.log('record inserted');
                          
                          res.render('seed')
                        });
                      }
                  })
                }
            }
            res.render('seed')
            };

      exports.tool = function(req, res) {
          if(req.method == 'POST') {
            console.log(req.files)
            if (!req.files) {
                  return res.status(400).send("No files were uploaded.");
                }
                else {
                  var uploadedFile = req.files.tool_image
                  const uploadPath = __dirname
                    + "/uploads/" + uploadedFile.name;
                    uploadedFile.mv(uploadPath, function (err) {
                      if (err) {
                        console.log(err);
                        res.send("Failed !!");
                      } else{
                        db.query ( `INSERT INTO tool_tb (Tool_ID,Tool_Name,Tool_image,Manufacturing_Date,License_Number,Number_of_Tools	
                          ) VALUES ("${req.body.tool_id}", "${req.body.tool_name}", "${uploadedFile.name}", "${req.body.manufacturing_date}","${req.body.licence_number}","${req.body.number_of_tools}")`,function(err, result) {
                          if (err) throw err;
                          console.log('record inserted');
                          
                          res.render('tool')
                        });
                      }
                  })
                }
            }
            res.render('tool')
            };
      // exports.fertilicer = function(req, res) {
      //         if(req.method == 'POST') {
      //           db.query ( `INSERT INTO fertilicer_tb (Fertilizer_Name,About_Fertilizer,Manufacturing_Date,Expiry_Date,Stock_Available,fertilizer_image		
      //             ) VALUES ("${req.body.fertilizer_name}","${req.body.about_fertilizer}","${req.body.manufacturing_date}","${req.body.expiry_date}","${req.body.stock_available}","${req.body.fertilizer_image}")`,function(err, result) {
      //             if (err) throw err;
      //             console.log('record inserted');
                  
      //             res.redirect('/');
      //           });
      //           }
      //           res.render('fertilicer')
      //           };
      exports.fertilicer = function(req, res) {
        if(req.method == 'POST') {
          console.log(req.files)
          if (!req.files) {
                return res.status(400).send("No files were uploaded.");
              }
              else {
                var uploadedFile = req.files.fertilizer_image
                const uploadPath = __dirname
                  + "/uploads/" + uploadedFile.name;
                  uploadedFile.mv(uploadPath, function (err) {
                    if (err) {
                      console.log(err);
                      res.send("Failed !!");
                    } else{
                      db.query ( `INSERT INTO fertilicer_tb (Fertilizer_Name,About_Fertilizer,Manufacturing_Date,Expiry_Date,Stock_Available,fertilizer_image		
                        ) VALUES ( "${req.body.fertilizer_name}", "${req.body.about_fertilizer}","${req.body.manufacturing_date}","${req.body.expiry_date}","${req.body.stock_available}", "${uploadedFile.name}")`,function(err, result) {
                        if (err) throw err;
                        console.log('record inserted');
                        
                        res.render('fertilicer')
                      });
                    }
                })
              }
          }
          res.render('fertilicer')
          };
      // exports.pesticide = function(req, res) {
      //             if(req.method == 'POST') {
      //               db.query ( `INSERT INTO fertilicer_tb (	Fertilizer_ID,Fertilizer_Name,About_Fertilizer,Manufacturing_Date,Expiry_Date,Stock_Available,fertilizer_image		
      //                 ) VALUES ("${req.body.pesticide_id}", "${req.body.pesticide_name}","${req.body.about_pesticide}","${req.body.manufacturing_date}","${req.body.expiry_date}","${req.body.stock_available}","${req.body.pesticide_image}")`,function(err, result) {
      //                 if (err) throw err;
      //                 console.log('record inserted');
                      
      //                 res.redirect('/');
      //               });
      //               }
      //               res.render('pesticide')
      //               };
      exports.pesticide = function(req, res) {
        if(req.method == 'POST') {
          console.log(req.files)
          if (!req.files) {
                return res.status(400).send("No files were uploaded.");
              }
              else {
                var uploadedFile = req.files.pesticide_image
                const uploadPath = __dirname
                  + "/uploads/" + uploadedFile.name;
                  uploadedFile.mv(uploadPath, function (err) {
                    if (err) {
                      console.log(err);
                      res.send("Failed !!");
                    } else{
                      db.query ( `INSERT INTO fertilicer_tb (Fertilizer_Name,About_Fertilizer,Manufacturing_Date,Expiry_Date,Stock_Available,fertilizer_image		
                        ) VALUES ( "${req.body.pesticide_name}","${req.body.about_pesticide}","${req.body.manufacturing_date}","${req.body.expiry_date}","${req.body.stock_available}", "${uploadedFile.name}")`,function(err, result) {
                        if (err) throw err;
                        console.log('record inserted');
                        
                        res.render('pesticide')
                      });
                    }
                })
              }
          }
          res.render('pesticide')
          };
      
      exports.notification = function(req, res) {
                      if(req.method == 'POST') {
                        db.query ( `INSERT INTO notification_tb (	Notification_ID,Notification_Content		
                          ) VALUES ("${req.body.notification_id}", "${req.body. notification_content}")`,function(err, result) {
                          if (err) throw err;
                          console.log('record inserted');
                          
                          res.redirect('/');
                        });
                        }
                        res.render('notification')
                        };
//   db.query(sql, function(err, result) {
//       if (err) throw err;
//       console.log('record inserted');
      
//       res.redirect('/');
//     });
//   }
//   res.render('crop')
// };
 





// exports.login = function(req, res) {
//   if(req.method == 'POST') {
//     console.log("Post")
//     res.redirect('/')
//   }
//   else {
//     console.log("Get")
//     res.render('login')
//   }
// }

exports.about = function(req, res) {
  if(req.method == 'POST') {
    console.log("Post")
    res.redirect('/')
  }
  else {
    console.log("Get")
    res.render('about')
  }
}
exports.registration = function(req, res) {
  if(req.method == 'POST') {   
    // var abc = ;
    db.query(`INSERT INTO login_table (
      name,address,gender,date_of_birth,whats_app_number,email_id,password
      ) VALUES ("${req.body.name_input}", "${req.body.address}", "${req.body.slt_gender}", "${req.body.date_of_birth}", "${req.body.whatsapp_num}", "${req.body.email}", "${req.body.password}")`,
     function(err, result) {
      if (err) throw err;
      console.log('record inserted');
      
      res.redirect('/');
    });
  }
  res.render('registration')
};






