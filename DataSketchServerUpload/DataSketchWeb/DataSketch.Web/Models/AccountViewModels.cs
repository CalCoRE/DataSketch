using System.ComponentModel.DataAnnotations;

namespace DataSketch.Models
{
    public static class UserRole
    {
        public const string Administrator = "Administrator";
        public const string Teacher = "Teacher";
        public const string Student = "Student";
        public const string SuperAdministrator = "SuperAdministrator";
    }
    public class ExternalLoginConfirmationViewModel
    {
        [Required]
        [Display(Name = "User name")]
        public string UserName { get; set; }
    }
    
    public class ManageUserViewModel
    {
        [Required]
        [DataType(DataType.Password)]
        [Display(Name = "Current password")]
        public string OldPassword { get; set; }

        [Required]
        [StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        [Display(Name = "New password")]
        public string NewPassword { get; set; }

        [DataType(DataType.Password)]
        [Display(Name = "Confirm new password")]
        [Compare("NewPassword", ErrorMessage = "The new password and confirmation password do not match.")]
        public string ConfirmPassword { get; set; }

        public string EmailAddress { get; set; }
    }

    public class LoginViewModel
    {
        public LoginViewModel() 
        {
            toasterObject = new ToasterDataModel();
        }
        [Required(ErrorMessage = "User name is required.")]
        [Display(Name = "User name")]
        public string UserName { get; set; }

        [Required(ErrorMessage = "Password is required.")]
        [DataType(DataType.Password)]
        [Display(Name = "Password")]
        public string Password { get; set; }

        public string returnUrl { get; set; }

        [Display(Name = "Remember me?")]
        public bool RememberMe { get; set; }

        public ToasterDataModel toasterObject { get; set; }
    }

    public class RegisterViewModel
    {
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
    }
}
