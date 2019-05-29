using DataSketch.BAL;
using DataSketch.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataSketch.BAL
{
    public class SketchShareMappingEntity : BaseEntity
    {
        public SketchShareMapping Create()
        {
            return db.SketchShareMappings.Create();
        }

        public long Save(SketchShareMapping master)
        {
            if (master.SketchShareId == 0)
            {
                db.SketchShareMappings.Add(master);
            }
            db.SaveChanges();
            return master.SketchShareId;
        }

        public bool Delete(long id)
        {
            SketchShareMapping master = GetSketchShareMappingById(id);
            if (master != null)
            {
                db.SketchShareMappings.Remove(master);
                db.SaveChanges();
                return true;
            }
            else
                return false;
        }

        public bool Delete(string[] UserId, long SketchId)
        {
            try
            {
                List<SketchShareMapping> lstDelete = null;
                 if(UserId != null)
                 { 
                    lstDelete = db.SketchShareMappings.AsEnumerable().Where(x => x.SketchId == SketchId && !UserId.ToList().Exists(y => Convert.ToInt64(y) == x.UserId)).ToList();
                 }
                else
                 {
                     lstDelete = db.SketchShareMappings.AsEnumerable().Where(x => x.SketchId == SketchId).ToList();
                 }
                foreach (SketchShareMapping master in lstDelete)
                {
                    if (master != null)
                    {
                        db.SketchShareMappings.Remove(master);
                    }
                }
                db.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public List<SketchShareMapping> GetAllSketchShareMapping()
        {
            return db.SketchShareMappings.Where(x => x.IsActive == true && x.IsDelete == false).ToList();
        }

        public SketchShareMapping GetSketchShareMappingById(long id)
        {
            return db.SketchShareMappings.Where(x => x.SketchShareId == id && x.IsDelete == false).FirstOrDefault();
        }
        public bool IsMappingExist(long SketchId,long StudentId)
        {
            return db.SketchShareMappings.ToList().Exists(x => x.SketchId == SketchId && x.UserId == StudentId && x.IsDelete == false);
        }
        public List<SketchShareMapping> GetSketchShareStudents(long SketchId)
        {
            return db.SketchShareMappings.Where(x => x.SketchId == SketchId && x.IsDelete == false).ToList();
        }
    }
}