using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using System.Xml.Linq;

namespace DemystifyFema.Service.Models
{
    public class AmendmentContent
    {
        public int? AmendmentContentId { get; set; }
        public int? IndexAmendmentId { get; set; }
        public string AmendmentContents { get; set; }
        public int? AmendmentContentModuleId { get; set; }
        public string SearchText { get; set; }
        public bool? IsActive { get; set; }
        public int? PageNumber { get; set; }
        public int? PageSize { get; set; }
        public int TotalPageCount { get; set; }
        public int TotalRecord { get; set; }
        public bool IsPagingRequired { get; set; }
        public string OrderBy { get; set; }
        public string OrderByDirection { get; set; }
        public int Result { get; set; }
    }

    public class IndexAmendmentContent
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public string Status { get; set; }
    }

    public class GetAmendmentContentRequest
    {
        public int? AmendmentContentId { get; set; }
        public int? IndexAmendmentId { get; set; }
        public int? AmendmentContentModuleId { get; set; }
        public string SearchText { get; set; }
        public bool? IsActive { get; set; }
        public bool? IsVerified { get; set; }
        public int? PageNumber { get; set; }
        public int? PageSize { get; set; }
        public string OrderBy { get; set; }
        public string OrderByDirection { get; set; }
    }

    public class GetAmendmentContentResponse
    {
        public int? AmendmentContentId { get; set; }
        public int? IndexAmendmentId { get; set; }
        public string AmendmentContents { get; set; }
        public bool IsActive { get; set; }
        public int TotalPageCount { get; set; }
        public int TotalRecord { get; set; }
    }
}