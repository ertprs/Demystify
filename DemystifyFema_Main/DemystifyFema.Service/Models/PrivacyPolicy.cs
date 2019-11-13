using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace DemystifyFema.Service.Models
{
    public class PrivacyPolicy
    {
        public int? ID { get; set; }
        public string Policy { get; set; }
        public string SearchText { get; set; }
        public int? PageNumber { get; set; }
        public int? PageSize { get; set; }
        public int TotalPageCount { get; set; }
        public int TotalRecord { get; set; }
        public bool IsPagingRequired { get; set; }
        public string OrderBy { get; set; }
        public string OrderByDirection { get; set; }
        public int Result { get; set; }
    }

    public class AddPrivacyPolicyRequest
    {
        public int ID { get; set; }
        public string PrivacyPolicy { get; set; }
    }

    public partial class PrivacyPolicyGet_Result
    {
        public int? ID { get; set; }
        public string PrivacyPolicy { get; set; }
    }

    public class GetPrivacyPolicyResponse
    {
        public int? ID { get; set; }
        public string PrivacyPolicy { get; set; }
    }

    public class GetPrivacyPolicyRequest
    {
        public int? ID { get; set; }
        public string SearchText { get; set; }
        public int? PageNumber { get; set; }
        public int? PageSize { get; set; }
        public string OrderBy { get; set; }
        public string OrderByDirection { get; set; }
    }
}