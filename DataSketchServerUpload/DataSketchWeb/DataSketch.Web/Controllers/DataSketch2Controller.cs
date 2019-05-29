using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace DataSketch.Web.Controllers
{
    public class DataSketch2Controller : Controller
    {
        public ActionResult Index(string userId, string sketchName, string mode)
        {
            ViewBag.IsLogin = (Session != null && Session["UserId"] != null && Convert.ToInt64(Session["UserId"]) > 0);
            if (!string.IsNullOrEmpty(Convert.ToString(userId)))
            {
                ViewBag.UserId = userId;
                ViewBag.SketchName = sketchName;
                ViewBag.Mode = mode;
            }
            return View();
        }
	}
}