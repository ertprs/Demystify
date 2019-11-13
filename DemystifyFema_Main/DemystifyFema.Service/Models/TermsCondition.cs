using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace DemystifyFema.Service.Models
{
    public class TermsCondition
    {
        public int? ID { get; set; }
        public string TermsandCondition { get; set; }
        public string SearchText { get; set; }
        public int? PageNumber { get; set; }
        public int? PageSize { get; set; }
        public int TotalPageCount { get; set; }
        public int TotalRecord { get; set; }
        public bool IsPagingRequired { get; set; }
        public string OrderBy { get; set; }
        public string OrderByDirection { get; set; }
    }
    public class AddTermsConditionRequest
    {
        public int ID { get; set; }
        public string TermsandCondition { get; set; }
    }

    public partial class TermsConditionGet_Result
    {
        public int? ID { get; set; }
        public string TermsandCondition { get; set; }
    }

    public class GetTermsConditionResponse
    {
        public int? ID { get; set; }
        public string TermsandCondition { get; set; }
    }

    public class GetTermsConditionRequest
    {
        public int? ID { get; set; }
        public string SearchText { get; set; }
        public int? PageNumber { get; set; }
        public int? PageSize { get; set; }
        public string OrderBy { get; set; }
        public string OrderByDirection { get; set; }
    }
}