using DataSketch.BAL;
using DataSketch.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataSketch.BAL
{
    public class StudentMasterEntity : BaseEntity
    {
        public StudentMaster Create()
        {
            return db.StudentMasters.Create();
        }

        public long Save(StudentMaster master)
        {
            if (master.StudentId == 0)
            {
                db.StudentMasters.Add(master);
            }
            db.SaveChanges();
            return master.StudentId;
        }

        public bool Delete(long id)
        {
            StudentMaster master = GetStudentMasterById(id);
            if (master != null)
            {
                db.StudentMasters.Remove(master);
                db.SaveChanges();
                return true;
            }
            else
                return false;
        }

        public List<StudentMaster> GetAllStudentMaster()
        {
            var RoleId = new RoleEntity().GetRole("S").RoleId;
            return (from s in db.StudentMasters
                    join u in db.UserMasters on s.UserId equals u.UserId
                    where s.IsDelete == false && u.RoleId == RoleId
                    select s).ToList();
        }
        public StudentMaster GetStudentMasterByStudentId(long id)
        {
            return db.StudentMasters.Where(x => x.StudentId == id && x.IsDelete == false).FirstOrDefault();
        }
        public StudentMaster GetStudentMasterById(long id)
        {
            return db.StudentMasters.Where(x => x.UserId == id && x.IsDelete == false).FirstOrDefault();
        }
        public StudentMaster CheckUserNameAvailability(string userName)
        {
            return db.StudentMasters.Where(x => x.UserName == userName && x.IsDelete == false).FirstOrDefault();
        }
        public List<StudentMaster> GetStudentByStandard(long standardId,long schoolId,long? UserId=0)
        {
            return db.StudentMasters.Where(x => x.StandardId == standardId && x.UserId != UserId && x.SchoolId == schoolId && x.IsActive == true && x.IsDelete == false).ToList();
        }
    }
}