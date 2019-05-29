using DataSketch.DAL;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace DataSketch.Models
{
    public class StandardMasterModel
    {
        [Required(ErrorMessage = "Minimum one standard must be selected.")]
        [Display(Name = "Standard Id")]
        public long StandardId { get; set; }

        [Required(ErrorMessage = "Standard name cannot be blank.")]
        [Display(Name = "Standard name")]
        public string Standard { get; set; }

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

        public static StandardMasterModel Mapping(StandardMaster db)
        {
            StandardMasterModel model = new StandardMasterModel();
            model.StandardId = db.StandardId;
            model.Standard = db.Standard;
            model.IsActive = db.IsActive;
            model.IsDelete = db.IsDelete;
            model.CreatedBy = db.CreatedBy;
            model.CreatedOn = db.CreatedOn;
            model.UpdatedBy = db.UpdatedBy;
            model.UpdatedOn = db.UpdatedOn;

            return model;
        }
        public static List<StandardMasterModel> Mapping(List<StandardMaster> lstdb)
        {
            List<StandardMasterModel> lstModel = new List<StandardMasterModel>();
            foreach (StandardMaster db in lstdb)
            {
                lstModel.Add(Mapping(db));
            }
            return lstModel;
        }
    }
}