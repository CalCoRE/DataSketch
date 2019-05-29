using DataSketch.BAL;
using DataSketch.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataSketch.BAL
{
    public class TeacherMasterEntity : BaseEntity
    {
        public TeacherMaster Create()
        {
            return db.TeacherMasters.Create();
        }

        public long Save(TeacherMaster master)
        {
            if (master.TeacherId == 0)
            {
                db.TeacherMasters.Add(master);
            }
            db.SaveChanges();
            return master.TeacherId;
        }

        public bool Delete(long id)
        {
            TeacherMaster master = GetTeacherMasterById(id);
            if (master != null)
            {
                db.TeacherMasters.Remove(master);
                db.SaveChanges();
                return true;
            }
            else
                return false;
        }

        public List<TeacherMaster> GetAllTeacherMaster()
        {
            var RoleId = new RoleEntity().GetRole("T").RoleId;
            return (from t in db.TeacherMasters
             join u in db.UserMasters on t.UserId equals u.UserId
             where  t.IsDelete == false && u.RoleId == RoleId
             select t).ToList();
            //return db.TeacherMasters.Where(x => x.IsActive == true && x.IsDelete == false).ToList();
        }

        public TeacherMaster GetTeacherMasterById(long id)
        {
            return db.TeacherMasters.Where(x => x.TeacherId == id && x.IsDelete == false).FirstOrDefault();
        }
        public bool IsEmailExist(string EmailAddress)
        {
            return db.TeacherMasters.ToList().Exists(x => x.EmailAddress == EmailAddress && x.IsDelete == false);
        }
        public TeacherMaster GetTeacherByEmailAddress(string EmailAddress)
        {
            return db.TeacherMasters.Where(x => x.EmailAddress == EmailAddress && x.IsDelete == false).FirstOrDefault();
        }
    }
}