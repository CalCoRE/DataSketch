using DataSketch.DAL;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace DataSketch.Models
{
    public class SchoolMasterModel
    {
        [Required(ErrorMessage = "Minimum one school must be selected.")]
        [Display(Name = "School")]
        public long SchoolId { get; set; }

        [Required(ErrorMessage = "School name cannot be blank.")]
        [Display(Name = "School name")]
        public string SchoolName { get; set; }

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

        [Display(Name = "UpdatedBy")]
        public long? UpdatedBy { get; set; }

        [Display(Name = "UpdatedOn")]
        public DateTime? UpdatedOn { get; set; }

        public static SchoolMasterModel Mapping(SchoolMaster db)
        {
            SchoolMasterModel model = new SchoolMasterModel();
            model.SchoolId = db.SchoolId;
            model.SchoolName = db.SchoolName;
            model.IsActive = db.IsActive;
            model.IsDelete = db.IsDelete;
            model.CreatedBy = db.CreatedBy;
            model.CreatedOn = db.CreatedOn;
            model.UpdatedBy = db.UpdatedBy;
            model.UpdatedOn = db.UpdatedOn;

            return model;
        }
        public static List<SchoolMasterModel> Mapping(List<SchoolMaster> lstdb)
        {
            List<SchoolMasterModel> lstModel = new List<SchoolMasterModel>();
            foreach (SchoolMaster db in lstdb)
            {
                lstModel.Add(Mapping(db));
            }
            return lstModel;
        }
    }
}