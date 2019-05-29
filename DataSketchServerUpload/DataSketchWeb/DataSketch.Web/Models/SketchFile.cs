using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DataSketch.Web.Models
{
    public class SketchFile
    {
        public dynamic FileName { get; set; }
        public dynamic SketchName { get; set; }
        public dynamic UserId { get; set; }
        public dynamic UserName { get; set; }
        public dynamic FileContent { get; set; }
    }
}