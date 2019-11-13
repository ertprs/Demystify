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
    public class TermsConditionAdminController : ApiController
    {
        private ITermsCondition iTermsCondition;
        public TermsConditionAdminController()
        {
            try
            {
                iTermsCondition = new TermsConditionRepository();
            }
            catch (Exception ex)
            {
                Utility.WriteLog("TermsConditionAdminController (Admin)", null, "Error while initialize repository.", ex.ToString());
            }
        }

        [HttpPost]
        [Route("termsCondition/add")]
        [ResponseType(typeof(Responses))]
        public IHttpActionResult AddTermsCondition(AddTermsConditionRequest addterms)
        {
            var responses = new Responses();
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var termsCondition = new TermsCondition()
                {
                    TermsandCondition = addterms.TermsandCondition,
                };
                int result = iTermsCondition.AddTermsCondition(termsCondition);
                if (result > 0)
                {
                    responses.Status = Utility.SUCCESS_STATUS_RESPONSE;
                    responses.Description = "Terms and Condition added successfully.";

                }
                else if (result == -2)
                {
                    responses.Status = Utility.ERROR_STATUS_RESPONSE;
                    responses.Description = "Terms and Condition alread exists.";
                }
                else
                {
                    responses.Status = Utility.ERROR_STATUS_RESPONSE;
                    responses.Description = "Error while adding Terms and Condition.";
                }
            }
            catch (Exception ex)
            {
                responses.Status = Utility.ERROR_STATUS_RESPONSE;
                responses.Description = "Error while adding Terms and Condition.";

                Utility.WriteLog("AddPrivacyPolicy", addterms, "Error while adding Terms and Condition. (TermsConditionAdminController)", ex.ToString());
            }
            return Ok(responses);
        }

        [HttpGet]
        [Route("getTermsCondition")]
        [ResponseType(typeof(List<GetTermsConditionResponse>))]
        public IHttpActionResult GetTermsCondition([FromUri]GetTermsConditionRequest getTermsRequest)
        {
            var responses = new Responses();
            try
            {
                if (Utility.UserId < 0)
                    return BadRequest(Utility.INVALID_USER);

                if (getTermsRequest == null)
                    getTermsRequest = new GetTermsConditionRequest();

                if (getTermsRequest.PageSize == null)
                    getTermsRequest.PageSize = Convert.ToInt32(ConfigurationManager.AppSettings["PageSize"]);

                var termsCondition = new TermsCondition()
                {
                    ID = getTermsRequest.ID,
                    SearchText = getTermsRequest.SearchText,
                    PageNumber = getTermsRequest.PageNumber,
                    PageSize = Convert.ToInt32(getTermsRequest.PageSize),
                    IsPagingRequired = (getTermsRequest.PageNumber != null) ? true : false,
                    OrderBy = getTermsRequest.OrderBy,
                    OrderByDirection = getTermsRequest.OrderByDirection
                };

                var term = iTermsCondition.GetTermsCondition(termsCondition);

                if (term != null)
                {
                    if (term.ToString().Count() > 0)
                    {
                        var termsList = new List<GetTermsConditionResponse>();
                        foreach (var termsDetail in term)
                        {
                            termsList.Add(new GetTermsConditionResponse()
                            {
                                ID = termsDetail.ID,
                                TermsandCondition = termsDetail.TermsandCondition
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
                responses.Description = "Error while retrieving terms and conditions.";

                Utility.WriteLog("GetTermsCondition", getTermsRequest, "Error while retrieving terms condition. (TermsConditionAdminController)", ex.ToString());
            }
            return Ok(responses);
        }
    }
}
