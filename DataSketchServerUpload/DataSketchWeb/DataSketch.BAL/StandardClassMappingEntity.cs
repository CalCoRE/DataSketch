using DataSketch.BAL;
using DataSketch.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataSketch.BAL
{
    public class StandardClassMappingEntity : BaseEntity
    {
        public StandardClassMapping Create()
        {
            return db.StandardClassMappings.Create();
        }

        public long Save(StandardClassMapping master)
        {
            if (master.StandardClassId == 0)
            {
                db.StandardClassMappings.Add(master);
            }
            db.SaveChanges();
            return master.StandardClassId;
        }

        public bool DeleteMapping(long standardId,long classId)
        {
            StandardClassMapping standardClassMapping = GetStandardClassMappingById(standardId, classId);
            if (standardClassMapping != null)
            {
                standardClassMapping.IsDelete = true;
                standardClassMapping.IsActive = false;
                db.SaveChanges();
                return true;
            }
            else
                return false;
        }

        public bool Delete(long id)
        {
            StandardClassMapping master = GetStandardClassMappingById(id);
            if (master != null)
            {
                db.StandardClassMappings.Remove(master);
                db.SaveChanges();
                return true;
            }
            else
                return false;
        }

        public List<StandardClassMapping> GetAllStandardClassMapping()
        {
            return db.StandardClassMappings.Where(x => x.IsActive == true && x.IsDelete == false).ToList();
        }

        public StandardClassMapping GetStandardClassMappingById(long id)
        {
            return db.StandardClassMappings.Where(x => x.StandardId == id && x.IsDelete == false).FirstOrDefault();
        }

        public StandardClassMapping GetStandardClassMappingById(long standardId, long classId)
        {
            return db.StandardClassMappings.Where(x => x.StandardId == standardId && x.ClassId == classId && x.IsDelete == false).FirstOrDefault();
        }
    }
}