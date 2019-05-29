using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DataSketch.Models
{
    public class ManageStudent
    {
        public long StudentId { get; set; }

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
        public int Teacher { get; set; }
        public List<TeacherMasterModel> lstTeacher { get; set; }

        [Required(ErrorMessage = "School is required.")]
        public int School { get; set; }
        public List<SchoolMasterModel> lstSchool { get; set; }

        [Required(ErrorMessage = "Standard is required.")]
        public int Standard { get; set; }
        public List<StandardMasterModel> lstStandard { get; set; }

        [Required(ErrorMessage = "Class is required.")]
        public int Class { get; set; }
        public List<ClassMasterModel> lstClass { get; set; }
        
    }

}

