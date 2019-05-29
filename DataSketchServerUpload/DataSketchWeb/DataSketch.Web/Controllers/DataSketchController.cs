using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace DataSketch.Web.Controllers
{
    [AllowAnonymous]
    public class DataSketchController : Controller
    {
        //
        // GET: /DataSketch/
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

        public ActionResult app()
        {
            return View();
        }
    }
}