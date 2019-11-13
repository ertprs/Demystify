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


namespace DemystifyFema.Service.Controllers.Guest
{
    [Authorize(Roles = "Guest")]
    [RoutePrefix("guest/api")]
    public class PolicyController : ApiController
    {
        private IPrivacyPolicy iPrivacyPolicy;
        public PolicyController()
        {
            try
            {
                iPrivacyPolicy = new PrivacyPolicyRepository();
            }
            catch (Exception ex)
            {
                Utility.WriteLog("PolicyController (Guest)", null, "Error while initialize repository.", ex.ToString());
            }
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("getPrivacyPolicy_guest")]
        public IHttpActionResult GetPrivacyPolicy([FromUri]GetPrivacyPolicyRequest getPrivacyPolicyRequest)
        {
            var responses = new Responses();
            try
            {
                if (Utility.UserId < 0)
                    return BadRequest(Utility.INVALID_USER);

                if (getPrivacyPolicyRequest == null)
                    getPrivacyPolicyRequest = new GetPrivacyPolicyRequest();

                if (getPrivacyPolicyRequest.PageSize == null)
                    getPrivacyPolicyRequest.PageSize = Convert.ToInt32(ConfigurationManager.AppSettings["PageSize"]);

                var privacyPolicy = new PrivacyPolicy()
                {
                    ID = getPrivacyPolicyRequest.ID,
                    SearchText = getPrivacyPolicyRequest.SearchText,
                    PageNumber = getPrivacyPolicyRequest.PageNumber,
                    PageSize = Convert.ToInt32(getPrivacyPolicyRequest.PageSize),
                    IsPagingRequired = (getPrivacyPolicyRequest.PageNumber != null) ? true : false,
                    OrderBy = getPrivacyPolicyRequest.OrderBy,
                    OrderByDirection = getPrivacyPolicyRequest.OrderByDirection
                };

                var pivacypolicy = iPrivacyPolicy.GetPrivacyPolicy(privacyPolicy);

                if (pivacypolicy != null)
                {
                    if (pivacypolicy.ToString().Count() > 0)
                    {
                        var privacyList = new List<GetPrivacyPolicyResponse>();
                        foreach (var privacyDetail in pivacypolicy)
                        {
                            privacyList.Add(new GetPrivacyPolicyResponse()
                            {
                                ID = privacyDetail.ID,
                                PrivacyPolicy = privacyDetail.Policy
                            });
                        }
                        responses.Status = Utility.SUCCESS_STATUS_RESPONSE;
                        responses.Description = "privacy policy retrieved successfully";
                        responses.Response = privacyList;
                    }
                }

            }
            catch (Exception ex)
            {
                responses.Status = Utility.ERROR_STATUS_RESPONSE;
                responses.Description = "Error while retrieving privacy policy.";

                Utility.WriteLog("GetPrivacyPolicyPackage", getPrivacyPolicyRequest, "Error while retrieving privacy policy. (PrivacyPolicyAdminController)", ex.ToString());
            }
            return Ok(responses);
        }
    }
}
