using DataSketch.BAL;
using DataSketch.DAL;
using DataSketch.Web.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace DataSketch.Web.Controllers
{
    [CustomAuthorizeAttribute]
    public class SketchMasterController : Controller
    {
        public SketchMasterEntity entity = new SketchMasterEntity();

        [HttpPost]
        public bool CheckFile(SketchFile sketchFile)
        {
            try
            {
                string filePath = Server.MapPath("~/DataSketchFile");
                Console.WriteLine(filePath);
                String userIdPath = filePath + "\\" + sketchFile.UserId[0];

                //If No any such directory then creates the new one
                if (!Directory.Exists(userIdPath))
                    Directory.CreateDirectory(filePath + "\\" + sketchFile.UserId[0]);

                String fileName = filePath + "\\" + sketchFile.UserId[0] + "\\" + sketchFile.FileName[0] + ".txt";
                FileInfo sketchFileInfo = new FileInfo(fileName);

                // Check if file already exists. If yes, delete it. 
                if (sketchFileInfo.Exists)
                    return false;
                else
                    Save(sketchFile);
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        [HttpPost]
        public dynamic Save(SketchFile file)
        {
            try
            {
                string userId = file.UserId[0];
                string fileName = file.FileName[0];
                string filePath = Server.MapPath("~/DataSketchFile");
                String userIdPath = filePath + "\\" + userId;

                //If no any such directory then creates the new one
                if (!Directory.Exists(userIdPath))
                    Directory.CreateDirectory(filePath + "\\" + userId);

                string fileFullPath = filePath + "\\" + userId + "\\" + fileName + ".txt";
                FileInfo sketchFileInfo = new FileInfo(fileFullPath);

                // Check if file already exists. If yes, delete it. 
                if (sketchFileInfo.Exists)
                {
                    sketchFileInfo.Delete();
                }

                // Create a new file 
                using (StreamWriter sw = sketchFileInfo.CreateText())
                {
                    sw.Write(file.FileContent[0]);
                    sw.Dispose();
                }

                SketchMasterEntity sketchMasterentity = new SketchMasterEntity();
                SketchMaster sketchMaster = sketchMasterentity.Create();
                SketchMaster checkRecord = sketchMasterentity.checkRecord(Convert.ToInt32(userId), fileName);
                if (checkRecord == null)
                {
                    sketchMaster.IsActive = true;
                    sketchMaster.IsDelete = false;
                    sketchMaster.SketchName = fileName;
                    sketchMaster.SketchPath = fileName + ".txt";
                    sketchMaster.UserId = Convert.ToInt32(userId);
                    sketchMaster.CreatedBy = Convert.ToInt32(userId);
                    sketchMaster.CreatedOn = DateTime.Now;
                    sketchMaster.UpdatedBy = null;
                    sketchMaster.UpdatedOn = null;
                    sketchMasterentity.Save(sketchMaster);
                }
            }
            catch (Exception ex)
            {
                return false;
            }
            return string.Empty;
        }

        [HttpGet]
        public JsonResult GetAllSketchMaster(long id)
        {
            try
            {
                return Json(entity.GetListById(id), JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(false);
            }
        }

        [HttpGet]
        public string GetSketch(long UserId, string SketchName)
        {
            try
            {
                string filePath = Server.MapPath("~/DataSketchFile");
                string fileName = filePath + "\\" + UserId + "\\" + SketchName + ".txt";
                StreamReader sr = System.IO.File.OpenText(fileName);
                string s = string.Empty;
                string File2 = string.Empty;
                while ((s = sr.ReadLine()) != null)
                {
                    File2 = s;
                }
                sr.Dispose();

                return File2;
            }
            catch (Exception ex)
            {
                return string.Empty;
            }
        }
    }
}