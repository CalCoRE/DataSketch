using DataSketch.BAL;
using DataSketch.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataSketch.BAL
{
    public class StandardMasterEntity : BaseEntity
    {
        public StandardMaster Create()
        {
            return db.StandardMasters.Create();
        }

        public long Save(StandardMaster master)
        {
            if (master.StandardId == 0)
            {
                db.StandardMasters.Add(master);
            }
            db.SaveChanges();
            return master.StandardId;
        }

        public bool Delete(long id)
        {
            StandardMaster master = GetStandardMasterById(id);
            if (master != null)
            {
                db.StandardMasters.Remove(master);
                db.SaveChanges();
                return true;
            }
            else
                return false;
        }

        public List<StandardMaster> GetAllStandardMaster()
        {
            return db.StandardMasters.Where(x => x.IsDelete == false).ToList();
        }

        public StandardMaster GetStandardMasterById(long id)
        {
            return db.StandardMasters.Where(x => x.StandardId == id && x.IsDelete == false).FirstOrDefault();
        }
        public StandardMaster GetStandardMasterByStandard(string Standard)
        {
            return db.StandardMasters.Where(x => x.Standard == Standard && x.IsDelete == false).FirstOrDefault();
        }
    }
}