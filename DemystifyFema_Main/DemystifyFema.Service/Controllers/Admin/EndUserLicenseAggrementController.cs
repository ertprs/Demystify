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
    public class EndUserLicenseAggrementController : ApiController
    {
        private IEndUserLicenseAggrement iEULA;
        public EndUserLicenseAggrementController()
        {
            try
            {
                iEULA = new EndUserLicenseAggrementRepository();
            }
            catch (Exception ex)
            {
                Utility.WriteLog("EndUserLicenseAggrementController (Admin)", null, "Error while initialize repository.", ex.ToString());
            }
        }

        [HttpPost]
        [Route("eula/add")]
        [ResponseType(typeof(Responses))]
        public IHttpActionResult AddEndUserLicenseAggement(AddEndUserLicenseAggrementRequest addterms)
        {
            var responses = new Responses();
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var eular = new EndUserLicenseAggrement()
                {
                    EULA = addterms.EULA,
                };
                int result = iEULA.AddEndUserLicenseAggrement(eular);
                if (result > 0)
                {
                    responses.Status = Utility.SUCCESS_STATUS_RESPONSE;
                    responses.Description = "End User License Aggrement added successfully.";

                }
                else if (result == -2)
                {
                    responses.Status = Utility.ERROR_STATUS_RESPONSE;
                    responses.Description = "End User License Aggrement alread exists.";
                }
                else
                {
                    responses.Status = Utility.ERROR_STATUS_RESPONSE;
                    responses.Description = "Error while adding End User License Aggrement.";
                }
            }
            catch (Exception ex)
            {
                responses.Status = Utility.ERROR_STATUS_RESPONSE;
                responses.Description = "Error while adding End User License Aggrement.";

                Utility.WriteLog("AddEndUserLicenseAggement", addterms, "Error while adding End User License Aggrement. (EndUserLicenseAggrementController)", ex.ToString());
            }
            return Ok(responses);
        }

        [HttpGet]
        [Route("geteula")]
        [ResponseType(typeof(List<GetEndUserLicenseAggrementResponse>))]
        public IHttpActionResult GetEndUserLicenseAggement([FromUri]GetEndUserLicenseAggrementRequest getEULA)
        {
            var responses = new Responses();
            try
            {
                if (Utility.UserId < 0)
                    return BadRequest(Utility.INVALID_USER);

                if (getEULA == null)
                    getEULA = new GetEndUserLicenseAggrementRequest();

                if (getEULA.PageSize == null)
                    getEULA.PageSize = Convert.ToInt32(ConfigurationManager.AppSettings["PageSize"]);

                var termsCondition = new EndUserLicenseAggrement()
                {
                    ID = getEULA.ID,
                    SearchText = getEULA.SearchText,
                    PageNumber = getEULA.PageNumber,
                    PageSize = Convert.ToInt32(getEULA.PageSize),
                    IsPagingRequired = (getEULA.PageNumber != null) ? true : false,
                    OrderBy = getEULA.OrderBy,
                    OrderByDirection = getEULA.OrderByDirection
                };

                var EULA = iEULA.GetEndUserLicenseAggrement(termsCondition);

                if (EULA != null)
                {
                    if (EULA.ToString().Count() > 0)
                    {
                        var eulaList = new List<GetEndUserLicenseAggrementResponse>();
                        foreach (var termsDetail in EULA)
                        {
                            eulaList.Add(new GetEndUserLicenseAggrementResponse()
                            {
                                ID = termsDetail.ID,
                                EULA = termsDetail.EULA
                            });
                        }
                        responses.Status = Utility.SUCCESS_STATUS_RESPONSE;
                        responses.Description = "End User License Aggement retrieved successfully";
                        responses.Response = eulaList;
                    }
                }

            }
            catch (Exception ex)
            {
                responses.Status = Utility.ERROR_STATUS_RESPONSE;
                responses.Description = "Error while retrieving End User License Aggrement.";

                Utility.WriteLog("GetTermsCondition", getEULA, "Error while retrieving End User License Aggrement. (EndUserLicenseAggrementController)", ex.ToString());
            }
            return Ok(responses);
        }
    }
}
