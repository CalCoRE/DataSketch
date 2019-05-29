//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace DataSketch.DAL
{
    using System;
    using System.Collections.Generic;
    
    public partial class SketchMaster
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public SketchMaster()
        {
            this.SketchShareMappings = new HashSet<SketchShareMapping>();
        }
    
        public long SketchId { get; set; }
        public string SketchName { get; set; }
        public string SketchPath { get; set; }
        public long UserId { get; set; }
        public bool IsActive { get; set; }
        public bool IsDelete { get; set; }
        public long CreatedBy { get; set; }
        public System.DateTime CreatedOn { get; set; }
        public Nullable<long> UpdatedBy { get; set; }
        public Nullable<System.DateTime> UpdatedOn { get; set; }
    
        public virtual UserMaster UserMaster { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<SketchShareMapping> SketchShareMappings { get; set; }
    }
}
