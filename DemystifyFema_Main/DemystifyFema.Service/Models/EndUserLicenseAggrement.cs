using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace DemystifyFema.Service.Models
{
    public class EndUserLicenseAggrement
    {
        public int? ID { get; set; }
        public string EULA { get; set; }
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

    public class AddEndUserLicenseAggrementRequest
    {
        public int ID { get; set; }
        public string EULA { get; set; }
    }

    public partial class EndUserLicenseAggrementGet_Result
    {
        public int? ID { get; set; }
        public string EULA { get; set; }
    }

    public class GetEndUserLicenseAggrementResponse
    {
        public int? ID { get; set; }
        public string EULA { get; set; }
    }

    public class GetEndUserLicenseAggrementRequest
    {
        public int? ID { get; set; }
        public string SearchText { get; set; }
        public int? PageNumber { get; set; }
        public int? PageSize { get; set; }
        public string OrderBy { get; set; }
        public string OrderByDirection { get; set; }
    }
}