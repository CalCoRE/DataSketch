using DataSketch.DAL;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DataSketch.Models
{
    public class StudentMasterModel
    {
        public StudentMasterModel()
        {
            lstStudentList=new List<StudentMasterModel>();
        }
        public long StudentId { get; set; }

        public long SketchId { get; set; }

        public long? UserId { get; set; }
        [Required(ErrorMessage = "First name is required.")]
        [Display(Name = "First name")]
        public string FirstName { get; set; }

        [Required(ErrorMessage = "Last name is required.")]
        [Display(Name = "Last name")]
        public string LastName { get; set; }

        [Required(ErrorMessage = "User name is required.")]
        [Display(Name = "User name")]
        public string UserName { get; set; }

        [Required(ErrorMessage = "Password is required.")]
        [StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        [Display(Name = "Password")]
        public string Password { get; set; }

        [Required(ErrorMessage = "Confirm password is required.")]
        [DataType(DataType.Password)]
        [Display(Name = "Confirm password")]
        [Compare("Password", ErrorMessage = "The password and confirmation password do not match.")]
        public string ConfirmPassword { get; set; }

        [Required(ErrorMessage = "Teacher is required.")]
        public long Teacher { get; set; }
        public List<TeacherMasterModel> lstTeacher { get; set; }

        [Required(ErrorMessage = "School is required.")]
        public long School { get; set; }
        public List<SchoolMasterModel> lstSchool { get; set; }

        [Required(ErrorMessage = "Standard is required.")]
        public long Standard { get; set; }
        public List<StandardMasterModel> lstStandard { get; set; }

        [Required(ErrorMessage = "Class is required.")]
        public long Class { get; set; }
        public List<ClassMasterModel> lstClass { get; set; }

        public bool IsActive { get; set; }

        public bool IsDelete { get; set; }

        public long? CreatedBy { get; set; }

        public DateTime? CreatedOn { get; set; }

        public long? UpdatedBy { get; set; }

        public DateTime? UpdatedOn { get; set; }

        public enum ShareSketch
        {
            Individual = 1,
            Class = 2
        }

        public string SketchAccess;

        public List<StudentMasterModel> lstCheckedStudent { get; set; }

        public List<StudentMasterModel> lstStudentList { get; set; }

        public static StudentMasterModel Mapping(StudentMaster db)
        {
            StudentMasterModel model = new StudentMasterModel();
            model.StudentId = db.StudentId;
            model.FirstName = db.FirstName;
            model.LastName = db.LastName;
            model.UserName = db.UserName;
            model.Teacher = db.TeacherId;
            model.School = db.SchoolId;
            model.Standard = db.StandardId;
            model.Class = db.ClassId;
            model.IsActive = db.IsActive;
            model.IsDelete = db.IsDelete;
            model.CreatedBy = db.CreatedBy;
            model.CreatedOn = db.CreatedOn;
            model.UpdatedBy = db.UpdatedBy;
            model.UpdatedOn = db.UpdatedOn;
            model.UserId = db.UserId;

            return model;
        }
        public static List<StudentMasterModel> Mapping(List<StudentMaster> lstdb)
        {
            List<StudentMasterModel> lstModel = new List<StudentMasterModel>();
            foreach (StudentMaster db in lstdb)
            {
                lstModel.Add(Mapping(db));
            }
            return lstModel;
        }
    }


}
