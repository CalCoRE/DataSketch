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
    
    public partial class SketchShareMapping
    {
        public long SketchShareId { get; set; }
        public long SketchId { get; set; }
        public long UserId { get; set; }
        public bool IsActive { get; set; }
        public bool IsDelete { get; set; }
        public long CreatedBy { get; set; }
        public System.DateTime CreatedOn { get; set; }
        public Nullable<long> UpdatedBy { get; set; }
        public Nullable<System.DateTime> UpdatedOn { get; set; }
    
        public virtual SketchMaster SketchMaster { get; set; }
        public virtual UserMaster UserMaster { get; set; }
    }
}
