using DataSketch.DAL;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace DataSketch.Models
{
    public class TeacherMasterModel
    {
        [Required(ErrorMessage = "TeacherId is required.")]
        [Display(Name = "TeacherId")]
        public long TeacherId { get; set; }

        [Required(ErrorMessage = "First name is required.")]
        [Display(Name = "First name")]
        public string FirstName { get; set; }

        [Required(ErrorMessage = "Last name is required.")]
        [Display(Name = "Last name")]
        public string LastName { get; set; }

        public string FullName { get; set; }
        [Required(ErrorMessage = "Email address is required.")]
        [Display(Name = "Email address")]
        [RegularExpression(@"^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,})$", ErrorMessage = "Invalid Email")]
        public string EmailAddress { get; set; }

        [Required(ErrorMessage = "Password is required.")]
        [Display(Name = "Password")]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        [Required(ErrorMessage = "Confirm password is required.")]
        [DataType(DataType.Password)]
        [Display(Name = "Confirm password")]
        [Compare("Password", ErrorMessage = "The password and confirmation password do not match.")]
        public string ConfirmPassword { get; set; }

        [Required(ErrorMessage = "School is required.")]
        [Display(Name = "School Id")]
        public long SchoolId { get; set; }

        [Required(ErrorMessage = "IsActive is required.")]
        [Display(Name = "IsActive")]
        public bool IsActive { get; set; }

        [Required(ErrorMessage = "IsDelete is required.")]
        [Display(Name = "IsDelete")]
        public bool IsDelete { get; set; }

        [Display(Name = "CreatedBy")]
        public long? CreatedBy { get; set; }

        [Display(Name = "CreatedOn")]
        public DateTime? CreatedOn { get; set; }

        [Display(Name = "UpdateBy")]
        public long? UpdateBy { get; set; }

        [Display(Name = "UpdatedOn")]
        public DateTime? UpdatedOn { get; set; }

        [Display(Name = "UserId")]
        public long? UserId { get; set; }
        
        public string SchoolName { get; set; }

        public List<SchoolMasterModel> lstSchool { get; set; }

        public List<StandardMasterModel> lstStandard { get; set; }

        public List<long> lstCheckedStandard { get; set; }

        public static TeacherMasterModel Mapping(TeacherMaster db)
        {
            TeacherMasterModel model = new TeacherMasterModel();
            model.TeacherId = db.TeacherId;
            model.FirstName = db.FirstName;
            model.LastName = db.LastName;
            model.FullName = db.FirstName + " " + db.LastName;
            model.EmailAddress = db.EmailAddress;            
            model.SchoolId = db.SchoolId;
            model.SchoolName = db.SchoolMaster.SchoolName;
            model.IsActive = db.IsActive;
            model.IsDelete = db.IsDelete;
            model.CreatedBy = db.CreatedBy;
            model.CreatedOn = db.CreatedOn;
            model.UpdateBy = db.UpdateBy;
            model.UpdatedOn = db.UpdatedOn;
            model.UserId = db.UserId;
            model.lstStandard = new List<StandardMasterModel>();           

            if (db.TeacherStandardMappings != null)
            {
                foreach (TeacherStandardMapping master in db.TeacherStandardMappings)
                {
                    model.lstStandard.Add(StandardMasterModel.Mapping(master.StandardMaster));
                }
            }

            return model;
        }
        public static List<TeacherMasterModel> Mapping(List<TeacherMaster> lstdb)
        {
            List<TeacherMasterModel> lstModel = new List<TeacherMasterModel>();
            foreach (TeacherMaster db in lstdb)
            {
                lstModel.Add(Mapping(db));
            }
            return lstModel;
        }
    }
}