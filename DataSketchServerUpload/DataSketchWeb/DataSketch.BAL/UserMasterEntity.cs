using DataSketch.DAL;
using DataSketch.BAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataSketch.BAL
{
    public class UserMasterEntity : BaseEntity
    {
        public ValidateUser_Result ValidateUser(UserMaster user)
        {
            return db.ValidateUser(user.EmailAddress, user.Password).FirstOrDefault();

        }
        public UserMaster Create()
        {
            return db.UserMasters.Create();
        }

        public long Save(UserMaster master)
        {
            if (master.UserId == 0)
            {
                db.UserMasters.Add(master);
            }
            db.SaveChanges();
            return master.UserId;
        }

        public bool Delete(long id)
        {
            UserMaster master = GetusermasterById(id);
            if (master != null)
            {
                db.UserMasters.Remove(master);
                db.SaveChanges();
                return true;
            }
            else
                return false;
        }

        public List<UserMaster> GetAllusermaster()
        {
            return db.UserMasters.Where(x => x.IsActive == true && x.IsDelete == false).ToList();
        }

        public UserMaster GetusermasterById(long id)
        {
            return db.UserMasters.Where(x => x.UserId == id && x.IsDelete == false).FirstOrDefault();
        }
        public UserMaster GetusermasterByEmailAddress(string emailAddress)
        {
            return db.UserMasters.Where(x => x.EmailAddress == emailAddress && x.IsDelete == false).FirstOrDefault();
        }
        public UserMaster IsTokenExist(string email,string token)
        {
            return db.UserMasters.Where(x => x.EmailAddress == email && x.Token == token && x.IsDelete == false).FirstOrDefault();
        }

        public List<UserMaster> GetUserMasterByRoleID(long id)
        {
            return db.UserMasters.Where(x => x.RoleId == id && x.IsDelete == false).ToList();
        }
    }
}