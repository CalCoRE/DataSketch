using DataSketch.BAL;
using DataSketch.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataSketch.BAL
{
    public class ClassMasterEntity : BaseEntity
    {
        public ClassMaster Create()
        {
            return db.ClassMasters.Create();
        }

        public long Save(ClassMaster master)
        {
            if (master.ClassId == 0)
            {
                db.ClassMasters.Add(master);
            }
            db.SaveChanges();
            return master.ClassId;
        }

        public bool Delete(long id)
        {
            ClassMaster master = GetClassMasterById(id);
            if (master != null)
            {
                db.ClassMasters.Remove(master);
                db.SaveChanges();
                return true;
            }
            else
                return false;
        }

        public List<ClassMaster> GetAllClassMaster()
        {            
            return db.ClassMasters.Where(x =>x.IsActive == true && x.IsDelete == false).ToList();
        }

        public List<ClassMaster> GetAllClassMaster(string prefix)
        {
            return db.ClassMasters.Where(x => x.ClassName.ToLower().Contains(prefix.ToLower())).ToList();            
        }

        public ClassMaster GetClassMasterByName(string ClassName)
        {
            return db.ClassMasters.Where(x => x.ClassName.ToLower() == ClassName.ToLower() && x.IsDelete == false).FirstOrDefault();
        }
        public ClassMaster GetClassMasterById(long id)
        {
            return db.ClassMasters.Where(x => x.ClassId == id && x.IsDelete == false).FirstOrDefault();
        }
        public List<ClassMaster> GetClassByStandard(long id)
        {
            List<ClassMaster> lstClass = new List<ClassMaster>();
            var list = (from n in db.StandardClassMappings 
                   join c in db.ClassMasters on n.ClassId equals c.ClassId
                   where n.StandardId == id && n.IsDelete == false
                   select new {
                       ClassId=c.ClassId,
                       ClassName=c.ClassName,
                       IsActive=n.IsActive
                   }).ToList();
            foreach (var c in list)
            {
                ClassMaster classMaster = new ClassMaster();
                classMaster.ClassId = c.ClassId;
                classMaster.ClassName = c.ClassName;
                classMaster.IsActive = c.IsActive;
                lstClass.Add(classMaster);
            }
            return lstClass;
            
        }
    }
}