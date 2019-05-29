using DataSketch.BAL;
using DataSketch.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataSketch.BAL
{
    public class TeacherStandardMappingEntity : BaseEntity
    {
        public TeacherStandardMapping Create()
        {
            return db.TeacherStandardMappings.Create();
        }

        public long Save(TeacherStandardMapping master)
        {
            if (master.TeacherStandardId == 0)
            {
                db.TeacherStandardMappings.Add(master);
            }
            db.SaveChanges();
            return master.TeacherStandardId;
        }

        public bool Delete(long id)
        {
            TeacherStandardMapping master = GetTeacherStandardMapping(id);
            if (master != null)
            {
                db.TeacherStandardMappings.Remove(master);
                db.SaveChanges();
                return true;
            }
            else
                return false;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="standardIds">Keep this ids and rest all delete</param>
        /// <param name="teacherId"></param>
        /// <returns></returns>
        public bool Delete(string[] standardIds, long teacherId)
        {
            try
            {
                List<TeacherStandardMapping> lstDelete = db.TeacherStandardMappings.AsEnumerable().Where(x => x.TeacherId == teacherId && !standardIds.ToList().Exists(y => Convert.ToInt64(y) == x.StandardId)).ToList();

                foreach (TeacherStandardMapping master in lstDelete)
                {
                    if (master != null)
                    {
                        db.TeacherStandardMappings.Remove(master);
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

        public List<TeacherStandardMapping> GetAllTeacherStandardMapping()
        {
            return db.TeacherStandardMappings.ToList();
        }

        public List<TeacherStandardMapping> GetAllTeacherStandardMapping(long teacherId)
        {
            return db.TeacherStandardMappings.Where(x => x.TeacherId == teacherId).ToList();
        }

        public TeacherStandardMapping GetTeacherStandardMapping(long id)
        {
            return db.TeacherStandardMappings.Where(x => x.TeacherStandardId == id).FirstOrDefault();
        }

        public TeacherStandardMapping GetTeacherStandardMapping(long teacherId, long standardId)
        {
            return db.TeacherStandardMappings.Where(x => x.TeacherId == teacherId && x.StandardId == standardId).FirstOrDefault();
        }

        public bool IsMappingExist(long teacherId, long standardId)
        {
            return db.TeacherStandardMappings.ToList().Exists(x => x.TeacherId == teacherId && x.StandardId == standardId);
        }
    }
}