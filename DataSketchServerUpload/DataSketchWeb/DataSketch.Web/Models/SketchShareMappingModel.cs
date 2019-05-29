using DataSketch.DAL;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace DataSketch.Models
{
    public class SketchShareMappingModel
    {
        [Required(ErrorMessage = "SketchShareId is required.")]
        [Display(Name = "SketchShareId")]
        public long SketchShareId { get; set; }

        [Required(ErrorMessage = "SketchId is required.")]
        [Display(Name = "SketchId")]
        public long SketchId { get; set; }

        [Required(ErrorMessage = "UserId is required.")]
        [Display(Name = "UserId")]
        public long UserId { get; set; }

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

        public static SketchShareMappingModel Mapping(SketchShareMapping db)
        {
            SketchShareMappingModel model = new SketchShareMappingModel();
            model.SketchShareId = db.SketchShareId;
            model.SketchId = db.SketchId;
            model.UserId = db.UserId;
            model.IsActive = db.IsActive;
            model.IsDelete = db.IsDelete;
            model.CreatedBy = db.CreatedBy;
            model.CreatedOn = db.CreatedOn;
            model.UpdatedBy = db.UpdatedBy;
            model.UpdatedOn = db.UpdatedOn;

            return model;
        }
        public static List<SketchShareMappingModel> Mapping(List<SketchShareMapping> lstdb)
        {
            List<SketchShareMappingModel> lstModel = new List<SketchShareMappingModel>();
            foreach (SketchShareMapping db in lstdb)
            {
                lstModel.Add(Mapping(db));
            }
            return lstModel;
        }
    }
}