//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace DemystifyFema.Service.Models
{
    using System;
    
    public partial class FemaindexGet_Result
    {
        public int Indexid { get; set; }
        public Nullable<int> Regulationid { get; set; }
        public Nullable<int> Notificationid { get; set; }
        public string IndexNo { get; set; }
        public string Indexname { get; set; }
        public string FemaId { get; set; }
        public string UpdatedIndexNo { get; set; }
        public string UpdatedIndexName { get; set; }
        public Nullable<bool> Isactive { get; set; }
        public Nullable<bool> Isdeleted { get; set; }
        public Nullable<System.DateTime> Entereddate { get; set; }
        public Nullable<int> SortId { get; set; }
        public string IndexContent { get; set; }
    }
}