using DataSketch.DAL;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace DataSketch.Models
{
    public class SetUpSchooolModel
    {
        public SetUpSchooolModel() 
        {
            toasterObject = new ToasterDataModel();
        }

        public SchoolMasterModel School { get; set; }
        public StandardMasterModel Standard { get; set; }
        public ClassMasterModel Class { get; set; }        
        public long StandardId { get; set; }
        public bool isEditAction { get; set; }
        public long oldStandardId { get; set; }
        public long oldClassId { get; set; }
        public List<SchoolMasterModel> lstSchool { get; set; }
        public List<StandardMasterModel> lstStandard { get; set; }
        public List<ClassMasterModel> lstClass { get; set; }
        public ToasterDataModel toasterObject { get; set; }
    }
}