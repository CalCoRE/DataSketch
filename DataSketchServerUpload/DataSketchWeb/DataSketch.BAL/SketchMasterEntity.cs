using DataSketch.BAL;
using DataSketch.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataSketch.BAL
{
    public class SketchMasterEntity : BaseEntity
    {
        public SketchMaster Create()
        {
            return db.SketchMasters.Create();
        }

        public long Save(SketchMaster master)
        {
            if (master.SketchId == 0)
            {
                db.SketchMasters.Add(master);
            }
            db.SaveChanges();
            return master.SketchId;
        }

        public bool Delete(long id)
        {
            //SketchMaster master = GetSketchMasterById(id);
            //if (master != null)
            //{
            //    db.SketchMasters.Remove(master);
            //    db.SaveChanges();
            //    return true;
            //}
            //else
            //    return false;
            return true;
        }

        public List<SketchMaster> GetAllSketchMaster()
        {
            return db.SketchMasters.Where(x => x.IsActive == true && x.IsDelete == false).ToList();
        }

        public List<SketchMaster> GetSketchMasterById(long id)
        {
            return db.SketchMasters.Where(x => x.UserId == id && x.IsDelete == false).ToList();
        }

        public SketchMaster checkRecord(long id, string fileName)
        {
            return db.SketchMasters.Where(x => x.UserId == id && x.IsDelete == false && x.SketchName == fileName).FirstOrDefault();
        }

        public IEnumerable<String> GetListById(long id)
        {
            List<String> GetAllSketchList = (from p in SketchMasters where p.IsActive == true && p.IsDelete == false && p.UserId == id select p.SketchName).ToList();
            //db.SketchMasters.Where(x => x.IsActive == true && x.IsDelete == false && x.UserId == id).AsEnumerable().ToList();
            return GetAllSketchList;
        }

        public SketchMaster GetSketchBySketchIdAndUserId(long UserId,long SketchId)
        {
            return db.SketchMasters.Where(x => x.UserId == UserId && x.SketchId == SketchId && x.IsDelete == false).FirstOrDefault();
        }
    }
}