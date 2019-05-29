using DataSketch.BAL;
using DataSketch.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataSketch.BAL
{
    public class SchoolMasterEntity : BaseEntity
    {
        public SchoolMaster Create()
        {
            return db.SchoolMasters.Create();
        }

        public long Save(SchoolMaster master)
        {
            if (master.SchoolId == 0)
            {
                db.SchoolMasters.Add(master);
            }
            db.SaveChanges();
            return master.SchoolId;
        }

        public bool Delete(long id)
        {
            SchoolMaster master = GetSchoolMasterById(id);
            if (master != null)
            {
                db.SchoolMasters.Remove(master);
                db.SaveChanges();
                return true;
            }
            else
                return false;
        }
        public SchoolMaster SchoolExist(string SchoolName)
        {
            return db.SchoolMasters.Where(x => x.SchoolName == SchoolName && x.IsDelete == false).FirstOrDefault();
        }
        public List<SchoolMaster> GetAllSchoolMaster()
        {
            return db.SchoolMasters.Where(x => x.IsDelete == false).ToList();
        }

        public SchoolMaster GetSchoolMasterById(long id)
        {
            return db.SchoolMasters.Where(x => x.SchoolId == id && x.IsDelete == false).FirstOrDefault();
        }
    }
}