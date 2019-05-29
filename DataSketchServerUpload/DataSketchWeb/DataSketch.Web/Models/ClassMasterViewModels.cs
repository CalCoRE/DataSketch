using DataSketch.DAL;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace DataSketch.Models
{
    public class ClassMasterModel
    {
        public long standard { get; set; }
        [Required(ErrorMessage = "ClassId is required.")]
        [Display(Name = "ClassId")]
        public long ClassId { get; set; }

        [Required(ErrorMessage = "ClassName is required.")]
        [Display(Name = "ClassName")]
        public string ClassName { get; set; }

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

        public static ClassMasterModel Mapping(ClassMaster db)
        {
            ClassMasterModel model = new ClassMasterModel();
            model.ClassId = db.ClassId;
            model.ClassName = db.ClassName;
            model.IsActive = db.IsActive;
            model.IsDelete = db.IsDelete;
            model.CreatedBy = db.CreatedBy;
            model.CreatedOn = db.CreatedOn;
            model.UpdatedBy = db.UpdatedBy;
            model.UpdatedOn = db.UpdatedOn;

            return model;
        }
        public static List<ClassMasterModel> Mapping(List<ClassMaster> lstdb)
        {
            List<ClassMasterModel> lstModel = new List<ClassMasterModel>();
            foreach (ClassMaster db in lstdb)
            {
                lstModel.Add(Mapping(db));
            }
            return lstModel;
        }
    }
}