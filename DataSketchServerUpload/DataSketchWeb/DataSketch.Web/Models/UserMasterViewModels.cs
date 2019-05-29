using DataSketch.DAL;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace DataSketch.Models
{
    public class UserMasterModel
    {
        [Display(Name = "UserId")]
        public long UserId { get; set; }

        [Required(ErrorMessage = "EmailAddress is required.")]
        [Display(Name = "EmailAddress")]
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

        [Display(Name = "RoleId")]
        public long RoleId { get; set; }

        [Display(Name = "Token")]
        public string Token { get; set; }

        [Required(ErrorMessage = "IsActive is required.")]
        [Display(Name = "IsActive")]
        public bool IsActive { get; set; }

        [Required(ErrorMessage = "IsDelete is required.")]
        [Display(Name = "IsDelete")]
        public bool IsDelete { get; set; }

        [Required(ErrorMessage = "CreatedBy is required.")]
        [Display(Name = "CreatedBy")]
        public long CreatedBy { get; set; }

        [Required(ErrorMessage = "CreatedOn is required.")]
        [Display(Name = "CreatedOn")]
        public DateTime CreatedOn { get; set; }

        [Display(Name = "UpdatedBy")]
        public long? UpdatedBy { get; set; }

        [Display(Name = "UpdatedOn")]
        public DateTime? UpdatedOn { get; set; }

        public static UserMasterModel Mapping(UserMaster db)
        {
            UserMasterModel model = new UserMasterModel();
            model.UserId = db.UserId;
            model.EmailAddress = db.EmailAddress;
            model.Password = db.Password;
            model.RoleId = db.RoleId;
            model.Token = db.Token;
            model.IsActive = db.IsActive;
            model.IsDelete = db.IsDelete;
            model.CreatedBy = db.CreatedBy;
            model.CreatedOn = db.CreatedOn;
            model.UpdatedBy = db.UpdatedBy;
            model.UpdatedOn = db.UpdatedOn;

            return model;
        }
        public static List<UserMasterModel> Mapping(List<UserMaster> lstdb)
        {
            List<UserMasterModel> lstModel = new List<UserMasterModel>();
            foreach (UserMaster db in lstdb)
            {
                lstModel.Add(Mapping(db));
            }
            return lstModel;
        }
    }
}