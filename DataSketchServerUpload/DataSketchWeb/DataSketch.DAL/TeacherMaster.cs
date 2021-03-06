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
    
    public partial class TeacherMaster
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public TeacherMaster()
        {
            this.StudentMasters = new HashSet<StudentMaster>();
            this.TeacherStandardMappings = new HashSet<TeacherStandardMapping>();
        }
    
        public long TeacherId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string EmailAddress { get; set; }
        public long SchoolId { get; set; }
        public bool IsActive { get; set; }
        public bool IsDelete { get; set; }
        public Nullable<long> CreatedBy { get; set; }
        public Nullable<System.DateTime> CreatedOn { get; set; }
        public Nullable<long> UpdateBy { get; set; }
        public Nullable<System.DateTime> UpdatedOn { get; set; }
        public long UserId { get; set; }
    
        public virtual SchoolMaster SchoolMaster { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<StudentMaster> StudentMasters { get; set; }
        public virtual UserMaster UserMaster { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<TeacherStandardMapping> TeacherStandardMappings { get; set; }
    }
}
