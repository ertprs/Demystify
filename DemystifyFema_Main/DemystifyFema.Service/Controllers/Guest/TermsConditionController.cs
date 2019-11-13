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
    public class TermsConditionController : ApiController
    {

        private ITermsCondition iTerms;
        private IEndUserLicenseAggrement iEULA;
        private ISubscriptionPolicy iSubscriptionPolicy;
        public TermsConditionController()
        {
            try
            {
                iTerms = new TermsConditionRepository();
                iEULA = new EndUserLicenseAggrementRepository();
                iSubscriptionPolicy = new SubscriptionPolicyRepository();
            }
            catch (Exception ex)
            {
                Utility.WriteLog("TermsConditionController (Guest)", null, "Error while initialize repository.", ex.ToString());
            }
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("getTermsCondition_guest")]
        public IHttpActionResult GetTermsCondition([FromUri]GetTermsConditionRequest getPrivacyPolicyRequest)
        {
            var responses = new Responses();
            try
            {
                if (Utility.UserId < 0)
                    return BadRequest(Utility.INVALID_USER);

                if (getPrivacyPolicyRequest == null)
                    getPrivacyPolicyRequest = new GetTermsConditionRequest();

                if (getPrivacyPolicyRequest.PageSize == null)
                    getPrivacyPolicyRequest.PageSize = Convert.ToInt32(ConfigurationManager.AppSettings["PageSize"]);

                var terms = new TermsCondition()
                {
                    ID = getPrivacyPolicyRequest.ID,
                    SearchText = getPrivacyPolicyRequest.SearchText,
                    PageNumber = getPrivacyPolicyRequest.PageNumber,
                    PageSize = Convert.ToInt32(getPrivacyPolicyRequest.PageSize),
                    IsPagingRequired = (getPrivacyPolicyRequest.PageNumber != null) ? true : false,
                    OrderBy = getPrivacyPolicyRequest.OrderBy,
                    OrderByDirection = getPrivacyPolicyRequest.OrderByDirection
                };

                var termsCon = iTerms.GetTermsCondition(terms);

                if (termsCon != null)
                {
                    if (termsCon.ToString().Count() > 0)
                    {
                        var termsList = new List<GetTermsConditionResponse>();
                        foreach (var privacyDetail in termsCon)
                        {
                            termsList.Add(new GetTermsConditionResponse()
                            {
                                ID = privacyDetail.ID,
                                TermsandCondition = privacyDetail.TermsandCondition
                            });
                        }
                        responses.Status = Utility.SUCCESS_STATUS_RESPONSE;
                        responses.Description = "terms condition retrieved successfully";
                        responses.Response = termsList;
                    }
                }

            }
            catch (Exception ex)
            {
                responses.Status = Utility.ERROR_STATUS_RESPONSE;
                responses.Description = "Error while retrieving terms condition.";

                Utility.WriteLog("GetTermsCondition", getPrivacyPolicyRequest, "Error while retrieving terms condition. (TermsConditionController)", ex.ToString());
            }
            return Ok(responses);
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("geteula_guest")]
        public IHttpActionResult GetEndUserLicenseAggement([FromUri]GetEndUserLicenseAggrementRequest getEULARequest)
        {
            var responses = new Responses();
            try
            {
                if (Utility.UserId < 0)
                    return BadRequest(Utility.INVALID_USER);

                if (getEULARequest == null)
                    getEULARequest = new GetEndUserLicenseAggrementRequest();

                if (getEULARequest.PageSize == null)
                    getEULARequest.PageSize = Convert.ToInt32(ConfigurationManager.AppSettings["PageSize"]);

                var terms = new EndUserLicenseAggrement()
                {
                    ID = getEULARequest.ID,
                    SearchText = getEULARequest.SearchText,
                    PageNumber = getEULARequest.PageNumber,
                    PageSize = Convert.ToInt32(getEULARequest.PageSize),
                    IsPagingRequired = (getEULARequest.PageNumber != null) ? true : false,
                    OrderBy = getEULARequest.OrderBy,
                    OrderByDirection = getEULARequest.OrderByDirection
                };

                var termsCon = iEULA.GetEndUserLicenseAggrement(terms);

                if (termsCon != null)
                {
                    if (termsCon.ToString().Count() > 0)
                    {
                        var termsList = new List<GetEndUserLicenseAggrementResponse>();
                        foreach (var privacyDetail in termsCon)
                        {
                            termsList.Add(new GetEndUserLicenseAggrementResponse()
                            {
                                ID = privacyDetail.ID,
                                EULA = privacyDetail.EULA
                            });
                        }
                        responses.Status = Utility.SUCCESS_STATUS_RESPONSE;
                        responses.Description = "End User License Aggement retrieved successfully";
                        responses.Response = termsList;
                    }
                }

            }
            catch (Exception ex)
            {
                responses.Status = Utility.ERROR_STATUS_RESPONSE;
                responses.Description = "Error while retrieving End User License Aggement.";

                Utility.WriteLog("GetEndUserLicenseAggement", getEULARequest, "Error while retrieving End User License Aggement. (TermsConditionController)", ex.ToString());
            }
            return Ok(responses);
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("getSubscriptionPolicy_guest")]
        public IHttpActionResult GetSubscriptionPolicy([FromUri]GetSubscriptionPolicyRequest getEULARequest)
        {
            var responses = new Responses();
            try
            {
                if (Utility.UserId < 0)
                    return BadRequest(Utility.INVALID_USER);

                if (getEULARequest == null)
                    getEULARequest = new GetSubscriptionPolicyRequest();

                if (getEULARequest.PageSize == null)
                    getEULARequest.PageSize = Convert.ToInt32(ConfigurationManager.AppSettings["PageSize"]);

                var terms = new SubscriptionPolicy()
                {
                    ID = getEULARequest.ID,
                    SearchText = getEULARequest.SearchText,
                    PageNumber = getEULARequest.PageNumber,
                    PageSize = Convert.ToInt32(getEULARequest.PageSize),
                    IsPagingRequired = (getEULARequest.PageNumber != null) ? true : false,
                    OrderBy = getEULARequest.OrderBy,
                    OrderByDirection = getEULARequest.OrderByDirection
                };

                var termsCon = iSubscriptionPolicy.GetSubscriptionPolicy(terms);

                if (termsCon != null)
                {
                    if (termsCon.ToString().Count() > 0)
                    {
                        var termsList = new List<GetSubscriptionPolicyResponse>();
                        foreach (var privacyDetail in termsCon)
                        {
                            termsList.Add(new GetSubscriptionPolicyResponse()
                            {
                                ID = privacyDetail.ID,
                                SubPolicy = privacyDetail.SubPolicy
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

                Utility.WriteLog("GetSubscriptionPolicy", getEULARequest, "Error while retrieving Subscription Policy. (TermsConditionController)", ex.ToString());
            }
            return Ok(responses);
        }

    }
}
