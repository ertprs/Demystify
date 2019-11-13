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
    public class SubscriptionPolicyAdminController : ApiController
    {
        private ISubscriptionPolicy iSubscriptionPolicy;
        public SubscriptionPolicyAdminController()
        {
            try
            {
                iSubscriptionPolicy = new SubscriptionPolicyRepository();
            }
            catch (Exception ex)
            {
                Utility.WriteLog("SubscriptionPolicyAdminController (Admin)", null, "Error while initialize repository.", ex.ToString());
            }
        }

        [HttpPost]
        [Route("subscriptionPolicy/add")]
        [ResponseType(typeof(Responses))]
        public IHttpActionResult AddSubscriptionPolicy(AddSubscriptionPolicyRequest addSubPolicy)
        {
            var responses = new Responses();
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var SubPolicy = new SubscriptionPolicy()
                {
                    SubPolicy = addSubPolicy.SubPolicy,
                };
                int result = iSubscriptionPolicy.AddSubscriptionPolicy(SubPolicy);
                if (result > 0)
                {
                    responses.Status = Utility.SUCCESS_STATUS_RESPONSE;
                    responses.Description = "Subscription Policy added successfully.";

                }
                else if (result == -2)
                {
                    responses.Status = Utility.ERROR_STATUS_RESPONSE;
                    responses.Description = "Subscription Policy alread exists.";
                }
                else
                {
                    responses.Status = Utility.ERROR_STATUS_RESPONSE;
                    responses.Description = "Error while adding Subscription Policy.";
                }
            }
            catch (Exception ex)
            {
                responses.Status = Utility.ERROR_STATUS_RESPONSE;
                responses.Description = "Error while adding Subscription Policy.";

                Utility.WriteLog("AddSubscriptionPolicy", addSubPolicy, "Error while adding Subscription Policy. (SubscriptionPolicyAdminController)", ex.ToString());
            }
            return Ok(responses);
        }

        [HttpGet]
        [Route("getSubscriptionPolicy")]
        [ResponseType(typeof(List<GetSubscriptionPolicyResponse>))]
        public IHttpActionResult GetSubscriptionPolicy([FromUri]GetSubscriptionPolicyRequest getTermsRequest)
        {
            var responses = new Responses();
            try
            {
                if (Utility.UserId < 0)
                    return BadRequest(Utility.INVALID_USER);

                if (getTermsRequest == null)
                    getTermsRequest = new GetSubscriptionPolicyRequest();

                if (getTermsRequest.PageSize == null)
                    getTermsRequest.PageSize = Convert.ToInt32(ConfigurationManager.AppSettings["PageSize"]);

                var termsCondition = new SubscriptionPolicy()
                {
                    ID = getTermsRequest.ID,
                    SearchText = getTermsRequest.SearchText,
                    PageNumber = getTermsRequest.PageNumber,
                    PageSize = Convert.ToInt32(getTermsRequest.PageSize),
                    IsPagingRequired = (getTermsRequest.PageNumber != null) ? true : false,
                    OrderBy = getTermsRequest.OrderBy,
                    OrderByDirection = getTermsRequest.OrderByDirection
                };

                var term = iSubscriptionPolicy.GetSubscriptionPolicy(termsCondition);

                if (term != null)
                {
                    if (term.ToString().Count() > 0)
                    {
                        var termsList = new List<GetSubscriptionPolicyResponse>();
                        foreach (var termsDetail in term)
                        {
                            termsList.Add(new GetSubscriptionPolicyResponse()
                            {
                                ID = termsDetail.ID,
                                SubPolicy = termsDetail.SubPolicy
                            });
                        }
                        responses.Status = Utility.SUCCESS_STATUS_RESPONSE;
                        responses.Description = "Subscription Policy retrieved successfully";
                        responses.Response = termsList;
                    }
                }

            }
            catch (Exception ex)
            {
                responses.Status = Utility.ERROR_STATUS_RESPONSE;
                responses.Description = "Error while retrieving Subscription Policy.";

                Utility.WriteLog("GetTermsCondition", getTermsRequest, "Error while retrieving Subscription Policy. (SubscriptionPolicyAdminController)", ex.ToString());
            }
            return Ok(responses);
        }
    }
}
