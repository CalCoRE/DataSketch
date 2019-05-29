using DataSketch.BAL;
using DataSketch.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataSketch.BAL
{
    public class RoleEntity : BaseEntity
    {
        public Role Create()
        {
            return db.Roles.Create();
        }

        public long Save(Role master)
        {
            if (master.RoleId == 0)
            {
                db.Roles.Add(master);
            }
            db.SaveChanges();
            return master.RoleId;
        }

        public bool Delete(long id)
        {
            Role master = GetRole(id);
            if (master != null)
            {
                db.Roles.Remove(master);
                db.SaveChanges();
                return true;
            }
            else
                return false;
        }

        public List<Role> GetAllRole()
        {
            return db.Roles.Where(x => x.IsActive == true && x.IsDelete == false).ToList();
        }

        public Role GetRole(long id)
        {
            return db.Roles.Where(x => x.RoleId == id && x.IsDelete == false).FirstOrDefault();
        }

        public Role GetRole(string roleAcronym)
        {
            return db.Roles.Where(x => x.RoleAcronym == roleAcronym && x.IsDelete == false).FirstOrDefault();
        }
    }
}