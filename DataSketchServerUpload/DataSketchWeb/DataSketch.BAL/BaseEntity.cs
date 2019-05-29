using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataSketch.DAL;
namespace DataSketch.BAL
{
    public class BaseEntity:DataSketchEntities
    {
        public DataSketchEntities db = null;
        public BaseEntity()
        {
            db = new DataSketchEntities();
        }
    }
}
