using DemystifyFema.Service.Common;
using DemystifyFema.Service.Models;
using DemystifyFema.Service.Repository;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Description;

namespace DemystifyFema.Service.Controllers.Admin
{
    [Authorize(Roles = "Admin")]
    [RoutePrefix("admin/api")]
    public class SubscriptionPackageAdminController : ApiController
    {
        private ISubscriptionPackage iSubscriptionPackage;
        public SubscriptionPackageAdminController()
        {
            try
            {
                iSubscriptionPackage = new SubscriptionPackageRepository();
            }
            catch (Exception ex)
            {
                Utility.WriteLog("SubscriptionPackageAdminController (Admin)", null, "Error while initialize repository.", ex.ToString());
            }
        }

        [HttpGet]
        [Route("subscriptionPackages")]
        [ResponseType(typeof(List<GetSubscriptionPackageResponse>))]
        public IHttpActionResult GetSubscriptionPackage([FromUri]GetSubscriptionPackageRequest getSubscriptionPackageRequest)
        {
            var responses = new Responses();
            try
            {
                if (Utility.UserId < 0)
                    return BadRequest(Utility.INVALID_USER);

                if (getSubscriptionPackageRequest == null)
                    getSubscriptionPackageRequest = new GetSubscriptionPackageRequest();

                if (getSubscriptionPackageRequest.PageSize == null)
                    getSubscriptionPackageRequest.PageSize = Convert.ToInt32(ConfigurationManager.AppSettings["PageSize"]);

                var subscriptionPackage = new SubscriptionPackage()
                {
                    PackageId = getSubscriptionPackageRequest.PackageId,
                    SearchText = getSubscriptionPackageRequest.SearchText,
                    IsActive = getSubscriptionPackageRequest.IsActive,
                    PageNumber = getSubscriptionPackageRequest.PageNumber,
                    PageSize = Convert.ToInt32(getSubscriptionPackageRequest.PageSize),
                    IsPagingRequired = (getSubscriptionPackageRequest.PageNumber != null) ? true : false,
                    OrderBy = getSubscriptionPackageRequest.OrderBy,
                    OrderByDirection = getSubscriptionPackageRequest.OrderByDirection
                };
                var subscriptionPackages = iSubscriptionPackage.GetSubscriptionPackage(subscriptionPackage);

                var subPackageList = new List<GetSubscriptionPackageResponse>();
                foreach (var subscriptionPackageDetail in subscriptionPackages)
                {
                    subPackageList.Add(new GetSubscriptionPackageResponse()
                    {
                        PackageId = subscriptionPackageDetail.PackageId,
                        PackageName = subscriptionPackageDetail.PackageName,
                        PackageAmount = subscriptionPackageDetail.PackageAmount,
                        PackageDetail = subscriptionPackageDetail.PackageDetail,
                        IsActive = Convert.ToBoolean(subscriptionPackageDetail.IsActive),
                        CreatedBy = subscriptionPackageDetail.CreatedBy,
                        TotalPageCount = subscriptionPackageDetail.TotalPageCount,
                        TotalRecord = subscriptionPackageDetail.TotalRecord
                    });
                }

                responses.Status = Utility.SUCCESS_STATUS_RESPONSE;
                responses.Description = "subscription package retrieved successfully";
                responses.Response = subPackageList;
            }
            catch (Exception ex)
            {
                responses.Status = Utility.ERROR_STATUS_RESPONSE;
                responses.Description = "Error while retrieving subscription package.";

                Utility.WriteLog("GetSubscriptionPackage", getSubscriptionPackageRequest, "Error while retrieving subscription package. (SubscriptionPackageAdminController)", ex.ToString());
            }
            return Ok(responses);
        }

        [HttpPost]
        [Route("subscriptionPackages/add")]
        [ResponseType(typeof(Responses))]
        public IHttpActionResult AddSubscriptionPackage(AddSubscriptionPackageRequest addSubPackageRequest)
        {
            var responses = new Responses();
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var subPackage = new SubscriptionPackage()
                {
                    PackageName = addSubPackageRequest.PackageName,
                    PackageAmount = addSubPackageRequest.PackageAmount,
                    PackageDetail = addSubPackageRequest.PackageDetail,
                    CreatedBy = Utility.UserId
                };
                int result = iSubscriptionPackage.AddSubscriptionPackage(subPackage);
                if (result > 0)
                {
                    responses.Status = Utility.SUCCESS_STATUS_RESPONSE;
                    responses.Description = "Subscription Package added successfully.";

                }
                else if (result == -2)
                {
                    responses.Status = Utility.ERROR_STATUS_RESPONSE;
                    responses.Description = "subscription package alread exists.";
                }
                else
                {
                    responses.Status = Utility.ERROR_STATUS_RESPONSE;
                    responses.Description = "Error while adding subscription package.";
                }
            }
            catch (Exception ex)
            {
                responses.Status = Utility.ERROR_STATUS_RESPONSE;
                responses.Description = "Error while adding subscription package.";

                Utility.WriteLog("AddSubscriptionPackage", addSubPackageRequest, "Error while adding subscription package. (SubscriptionPackageAdminController)", ex.ToString());
            }
            return Ok(responses);
        }

        [HttpPost]
        [Route("subscriptionPackages/update")]
        [ResponseType(typeof(Responses))]
        public IHttpActionResult UpdateSubscriptionPackage(UpdateSubscriptionPackageRequest updateSubPackageRequest)
        {
            var responses = new Responses();
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                if (Utility.UserId < 0)
                    return BadRequest(Utility.INVALID_USER);

                var subPackages = new SubscriptionPackage()
                {
                    PackageId = updateSubPackageRequest.PackageId,
                    PackageName = updateSubPackageRequest.PackageName,
                    PackageAmount = updateSubPackageRequest.PackageAmount,
                    PackageDetail = updateSubPackageRequest.PackageDetail,
                    ModifiedBy = Utility.UserId
                };
                int result = iSubscriptionPackage.UpdateSubscriptionPackage(subPackages);

                switch (result)
                {
                    case 1:
                        responses.Status = Utility.SUCCESS_STATUS_RESPONSE;
                        responses.Description = "Subscription Package updated successfully.";
                        break;
                    case -2:
                        responses.Status = Utility.ERROR_STATUS_RESPONSE;
                        responses.Description = "Subscription Package already exists.";
                        break;
                    case -3:
                        responses.Status = Utility.ERROR_STATUS_RESPONSE;
                        responses.Description = "Subscription Package doesn't exist.";
                        break;
                    default:
                        responses.Status = Utility.ERROR_STATUS_RESPONSE;
                        responses.Description = "Error while updating subscription package.";
                        break;
                }
            }
            catch (Exception ex)
            {
                responses.Status = Utility.ERROR_STATUS_RESPONSE;
                responses.Description = "Error while updating subscription package.";

                Utility.WriteLog("UpdateSubscriptionPackage", updateSubPackageRequest, "Error while updating subscription package. (SubscriptionPackageAdminController)", ex.ToString());
            }
            return Ok(responses);
        }


        [HttpPost]
        [Route("subscriptionPackages/delete")]
        [ResponseType(typeof(Responses))]
        public IHttpActionResult DeleteSubscriptionPackage(DeleteSubscriptionPackageRequest deleteSubscriptionPackageRequest)
        {
            var responses = new Responses();
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                if (Utility.UserId < 0)
                    return BadRequest(Utility.INVALID_USER);

                var subPackage = new SubscriptionPackage()
                {
                    PackageId = deleteSubscriptionPackageRequest.PackageId,
                    ModifiedBy = Utility.UserId
                };

                int result = iSubscriptionPackage.DeleteSubscriptionPackage(subPackage);
                switch (result)
                {
                    case 1:
                        responses.Status = Utility.SUCCESS_STATUS_RESPONSE;
                        responses.Description = "Subscription Package deleted successfully.";
                        break;
                    case -2:
                        responses.Status = Utility.ERROR_STATUS_RESPONSE;
                        responses.Description = "Subscription Package doesn't exist.";
                        break;
                    default:
                        responses.Status = Utility.ERROR_STATUS_RESPONSE;
                        responses.Description = "Error while deleting subscription package.";
                        break;
                }
            }
            catch (Exception ex)
            {
                responses.Status = Utility.ERROR_STATUS_RESPONSE;
                responses.Description = "Error while deleting subscription package.";

                Utility.WriteLog("DeleteSubscriptionPackage", deleteSubscriptionPackageRequest, "Error while deleting subscription package. (SubscriptionPackageAdminController)", ex.ToString());
            }
            return Ok(responses);
        }
    }
}
