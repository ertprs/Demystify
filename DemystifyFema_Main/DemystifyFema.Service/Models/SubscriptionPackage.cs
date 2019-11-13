using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace DemystifyFema.Service.Models
{
    public class SubscriptionPackage
    {
        public int? PackageId { get; set; }
        public string PackageName { get; set; }
        public decimal? PackageAmount { get; set; }
        public string PackageDetail { get; set; }
        public string PackageTypeName { get; set; }
        public int? PackageTypeId { get; set; }
        public int? PackageDuration { get; set; }
        public int? Days { get; set; }
        public int ModifiedBy { get; set; }
        public string SearchText { get; set; }
        public bool? IsActive { get; set; }
        public int CreatedBy { get; set; }
        public int? PageNumber { get; set; }
        public int? PageSize { get; set; }
        public int TotalPageCount { get; set; }
        public int TotalRecord { get; set; }
        public bool IsPagingRequired { get; set; }
        public string OrderBy { get; set; }
        public string OrderByDirection { get; set; }
        public int Result { get; set; }
    }
    public class GetSubscriptionPackageRequest
    {
        public int? PackageId { get; set; }
        public string SearchText { get; set; }
        public bool? IsActive { get; set; }
        public bool? IsVerified { get; set; }
        public int? PageNumber { get; set; }
        public int? PageSize { get; set; }
        public string OrderBy { get; set; }
        public string OrderByDirection { get; set; }
    }
    public class AddSubscriptionPackageRequest
    {
        [Required]
        public string PackageName { get; set; }
        public decimal? PackageAmount { get; set; }
        public string PackageDetail { get; set; }
    }

    public class UpdateSubscriptionPackageRequest
    {
        [Required]
        public int PackageId { get; set; }
        [Required]
        public string PackageName { get; set; }
        public decimal? PackageAmount { get; set; }
        public string PackageDetail { get; set; }
    }

    public class DeleteSubscriptionPackageRequest
    {
        [Required]
        public int PackageId { get; set; }
    }
    public class GetSubscriptionPackageResponse
    {
        public int? PackageId { get; set; }
        public string PackageName { get; set; }
        public decimal? PackageAmount { get; set; }
        public string PackageDetail { get; set; }
        public string PackageTypeName { get; set; }
        public int? PackageTypeId { get; set; }
        public int? PackageDuration { get; set; }
        public int? Days { get; set; }
        public bool IsActive { get; set; }
        public int CreatedBy { get; set; }
        public int TotalPageCount { get; set; }
        public int TotalRecord { get; set; }
    }
}