using DemystifyFema.Service.Common;
using DemystifyFema.Service.Models;
using DemystifyFema.Service.Repository;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Description;
using paytm;

namespace DemystifyFema.Service.Controllers.User
{
    [Authorize(Roles = "User")]
    [RoutePrefix("user/api")]
    public class SubscriptionUserController : ApiController
    {
        private ISubscription iSubscription;
        private IUserProfile iUserProfile;
        private IEndUserLicenseAggrement iEULA;
        public SubscriptionUserController()
        {
            try
            {
                iSubscription = new SubscriptionRepository();
                iUserProfile = new UserProfileRepository();
                iEULA = new EndUserLicenseAggrementRepository();
            }
            catch (Exception ex)
            {
                Utility.WriteLog("SubscriptionUserController (User)", null, "Error while initialize repository.", ex.ToString());
            }
        }

        [HttpGet]
        [Route("subscriptions")]
        [ResponseType(typeof(List<GetSubscriptionResponse>))]
        public IHttpActionResult GetSubscription([FromUri]GetSubscriptionRequest getSubscriptionRequest)
        {
            var responses = new Responses();
            try
            {
                if (Utility.UserId < 0)
                    return BadRequest(Utility.INVALID_USER);

                if (getSubscriptionRequest == null)
                    getSubscriptionRequest = new GetSubscriptionRequest();

                if (getSubscriptionRequest.PageSize == null)
                    getSubscriptionRequest.PageSize = Convert.ToInt32(ConfigurationManager.AppSettings["PageSize"]);

                var subscription = new Subscription()
                {
                    SubscriptionId = getSubscriptionRequest.SubscriptionId,
                    UserId = getSubscriptionRequest.UserId,
                    PackageId = getSubscriptionRequest.PackageId,
                    SearchText = getSubscriptionRequest.SearchText,
                    IsActive = getSubscriptionRequest.IsActive,
                    IsLegalAgreementAccepted = getSubscriptionRequest.IsLegalAgreementAccepted,
                    PageNumber = getSubscriptionRequest.PageNumber,
                    PageSize = Convert.ToInt32(getSubscriptionRequest.PageSize),
                    IsPagingRequired = (getSubscriptionRequest.PageNumber != null) ? true : false,
                    OrderBy = getSubscriptionRequest.OrderBy,
                    OrderByDirection = getSubscriptionRequest.OrderByDirection
                };
                var subscriptions = iSubscription.GetSubscription(subscription);

                var subscriptionList = new List<GetSubscriptionResponse>();
                foreach (var subscriptionDetail in subscriptions)
                {
                    subscriptionList.Add(new GetSubscriptionResponse()
                    {
                        SubscriptionId = Convert.ToInt32(subscriptionDetail.SubscriptionId),
                        UserId = Convert.ToInt32(subscriptionDetail.UserId),
                        UserName = subscriptionDetail.UserName,
                        PackageId = Convert.ToInt32(subscriptionDetail.PackageId),
                        PackageName = subscriptionDetail.PackageName,
                        StartDate = subscriptionDetail.StartDate,
                        EndDate = subscriptionDetail.EndDate,
                        PaymentDate = subscriptionDetail.PaymentDate,
                        Amount = subscriptionDetail.Amount,
                        IsExpired = Convert.ToBoolean(subscriptionDetail.IsExpired),
                        IsPending = subscriptionDetail.IsPending,
                        IsCanceled = subscriptionDetail.IsCanceled,
                        CancellationDate = subscriptionDetail.CancellationDate,
                        ActivationDate = subscriptionDetail.ActivationDate,
                        IsActive = Convert.ToBoolean(subscriptionDetail.IsActive),
                        //-----------------------------------------------------------------------------------------//
                        IsLegalAgreementAccepted = Convert.ToBoolean(subscriptionDetail.IsLegalAgreementAccepted),
                        //-----------------------------------------------------------------------------------------//
                        CreatedBy = subscriptionDetail.CreatedBy,
                        TotalPageCount = subscriptionDetail.TotalPageCount,
                        TotalRecord = subscriptionDetail.TotalRecord
                    });
                }

                responses.Status = Utility.SUCCESS_STATUS_RESPONSE;
                responses.Description = "Subscription retrieved successfully";
                responses.Response = subscriptionList;
            }
            catch (Exception ex)
            {
                responses.Status = Utility.ERROR_STATUS_RESPONSE;
                responses.Description = "Error while retrieving Subscription.";

                Utility.WriteLog("GetSubscription", getSubscriptionRequest, "Error while retrieving Subscription. (SubscriptionUserController)", ex.ToString());
            }
            return Ok(responses);
        }

        [HttpPost]
        [Route("subscriptions/add")]
        [ResponseType(typeof(Responses))]
        public IHttpActionResult AddSubscription(SubscriptionRequest subscriptionRequest)
        {
            var responses = new Responses();
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var subscription = new Subscription()
                {
                    UserId = subscriptionRequest.UserId ?? Utility.UserId,
                    PackageId = subscriptionRequest.PackageId,
                    CreatedBy = subscriptionRequest.UserId ?? Utility.UserId
                };
                int result = iSubscription.AddSubscription(subscription);

                switch (result)
                {
                    case -2:
                        responses.Status = Utility.ERROR_STATUS_RESPONSE;
                        responses.Description = "Subscription already exists.";
                        break;
                    default:
                        if (result > 0)
                        {
                            string userName = string.Empty;
                            var userProfile = new UserProfile()
                            {
                                UserId = subscriptionRequest.UserId ?? Utility.UserId
                            };
                            var userProfiles = iUserProfile.GetUserProfile(userProfile);
                            if (userProfiles != null)
                            {
                                userName = userProfiles.First().UserName;

                                var SubscriptionEmailHtmlCode = System.IO.File.ReadAllText(string.Format("{0}", HttpContext.Current.Server.MapPath(string.Format("{0}{1}", ConfigurationManager.AppSettings["EmailTemplatePath"], ConfigurationManager.AppSettings["SubscriptionAddEmailTemplateForUser"]))));

                                var mainTemplateHtmlCode = System.IO.File.ReadAllText(string.Format("{0}", HttpContext.Current.Server.MapPath(string.Format("{0}{1}", ConfigurationManager.AppSettings["EmailTemplatePath"], ConfigurationManager.AppSettings["MainEmailTemplate"]))));
                                mainTemplateHtmlCode = mainTemplateHtmlCode.Replace("[SITEURL]", ConfigurationManager.AppSettings["SiteUrl"]);
                                mainTemplateHtmlCode = mainTemplateHtmlCode.Replace("[SITENAME]", ConfigurationManager.AppSettings["SiteName"]);
                                mainTemplateHtmlCode = mainTemplateHtmlCode.Replace("[PAGECONTENT]", SubscriptionEmailHtmlCode);

                                string subject = "Subscription | Demystify Fema";
                                string body = mainTemplateHtmlCode;
                                string displayName = ConfigurationManager.AppSettings["SiteName"];
                                string emailTo = userName;
                                bool isMailSentToUser = Utility.SendMail(emailTo, string.Empty, string.Empty, subject, body, displayName, string.Empty, true);

                                SubscriptionEmailHtmlCode = string.Empty;
                                SubscriptionEmailHtmlCode = System.IO.File.ReadAllText(string.Format("{0}", HttpContext.Current.Server.MapPath(string.Format("{0}{1}", ConfigurationManager.AppSettings["EmailTemplatePath"], ConfigurationManager.AppSettings["SubscriptionAddEmailTemplateForAdmin"]))));
                                SubscriptionEmailHtmlCode = SubscriptionEmailHtmlCode.Replace("[USERNAME]", userName);

                                mainTemplateHtmlCode = string.Empty;
                                mainTemplateHtmlCode = System.IO.File.ReadAllText(string.Format("{0}", HttpContext.Current.Server.MapPath(string.Format("{0}{1}", ConfigurationManager.AppSettings["EmailTemplatePath"], ConfigurationManager.AppSettings["MainEmailTemplate"]))));
                                mainTemplateHtmlCode = mainTemplateHtmlCode.Replace("[SITEURL]", ConfigurationManager.AppSettings["SiteUrl"]);
                                mainTemplateHtmlCode = mainTemplateHtmlCode.Replace("[SITENAME]", ConfigurationManager.AppSettings["SiteName"]);
                                mainTemplateHtmlCode = mainTemplateHtmlCode.Replace("[PAGECONTENT]", SubscriptionEmailHtmlCode);

                                subject = "Subscription | Demystify Fema";
                                body = mainTemplateHtmlCode;
                                displayName = ConfigurationManager.AppSettings["SiteName"];
                                bool isMailSentToAdmin = Utility.SendMail(ConfigurationManager.AppSettings["AdminEmailId"], string.Empty, string.Empty, subject, body, displayName, string.Empty, true);
                                try
                                {
                                    var objSubscription = new Subscription()
                                    {
                                        SubscriptionId = result,
                                        IsMailSentToUser = isMailSentToUser,
                                        IsMailSentToAdmin = isMailSentToAdmin,
                                        ModifiedBy = Utility.UserId
                                    };
                                    iSubscription.UpdateSubscriptionMailSent(objSubscription);
                                }
                                catch (Exception ex)
                                {
                                    Utility.WriteLog("AddSubscription", subscriptionRequest, "Error while updating Subscription mail sent. (SubscriptionUserController)", ex.ToString());
                                }
                            }

                            responses.Status = Utility.SUCCESS_STATUS_RESPONSE;
                            responses.Description = "Subscription added successfully.";
                        }
                        else
                        {
                            responses.Status = Utility.ERROR_STATUS_RESPONSE;
                            responses.Description = "Error while updating Subscription.";
                        }
                        break;
                }
            }
            catch (Exception ex)
            {
                responses.Status = Utility.ERROR_STATUS_RESPONSE;
                responses.Description = "Error while adding Subscription.";

                Utility.WriteLog("AddSubscription", subscriptionRequest, "Error while adding Subscription. (SubscriptionUserController)", ex.ToString());
            }
            return Ok(responses);
        }

        [HttpPost]
        [Route("subscriptions/paytmPayment")]
        [ResponseType(typeof(Responses))]
        public IHttpActionResult PaytmPaymentProcess(AddSubscriptionRequest addSubscriptionRequest)
        {
            var responses = new Responses();
            try
            {
                Dictionary<String, String> paytmParams = new Dictionary<String, String>();
                paytmParams.Add("MID", addSubscriptionRequest.MID);
                paytmParams.Add("WEBSITE", addSubscriptionRequest.WEBSITE);
                paytmParams.Add("INDUSTRY_TYPE_ID", addSubscriptionRequest.INDUSTRY_TYPE_ID);
                paytmParams.Add("CHANNEL_ID", addSubscriptionRequest.CHANNEL_ID);
                paytmParams.Add("ORDER_ID", addSubscriptionRequest.ORDER_ID);
                paytmParams.Add("CUST_ID", addSubscriptionRequest.CUST_ID);
                paytmParams.Add("MOBILE_NO", addSubscriptionRequest.MOBILE_NO);
                paytmParams.Add("EMAIL", addSubscriptionRequest.EMAIL);
                paytmParams.Add("TXN_AMOUNT", Convert.ToString(addSubscriptionRequest.PackageAmount));
                paytmParams.Add("CALLBACK_URL", addSubscriptionRequest.CALLBACK_URL);
                String checksum = paytm.CheckSum.generateCheckSum("TJXf4B%698RFO_jC", paytmParams);
                paytmParams.Add("CHECKSUMHASH", checksum);

                string paytmURL = "https://securegw-stage.paytm.in/order/process";//"https://securegw-stage.paytm.in/theia/processTransaction?orderid=" + paytmParams.FirstOrDefault(x => x.Key == "ORDER_ID").Value;

                string outputHTML = "<html>";
                outputHTML += "<head>";
                outputHTML += "<title>Merchant Check Out Page</title>";
                outputHTML += "</head>";
                outputHTML += "<body>";
                outputHTML += "<center><h1>Please do not refresh this page...</h1></center>";
                outputHTML += "<form method='post' action='" + paytmURL + "' id='fsubmit' name='f1'>";
                outputHTML += "<table border='1'>";
                outputHTML += "<tbody>";
                foreach (string key in paytmParams.Keys)
                {
                    outputHTML += "<input type='hidden' name='" + key + "' value='" + paytmParams[key] + "'>";
                }
                outputHTML += "<input type='hidden' name='CHECKSUMHASH' value='" + checksum + "'>";
                outputHTML += "</tbody>";
                outputHTML += "</table>";
                outputHTML += "<script type='text/javascript'>";
                outputHTML += "document.f1.submit();";
                outputHTML += "</script>";
                outputHTML += "</form>";
                outputHTML += "</body>";
                outputHTML += "</html>";

                responses.Status = Utility.SUCCESS_STATUS_RESPONSE;
                responses.Description = "User payment information retrieved successfully";
                //responses.Response = outputHTML;
                responses.Response = outputHTML;

            }
            catch (Exception ex)
            {
                responses.Status = Utility.ERROR_STATUS_RESPONSE;
                responses.Description = "Error while User Payment Information retrieved";

                Utility.WriteLog("paytmPaymentProcess", addSubscriptionRequest, "Error while User Payment Information retrieved. (SubscriptionUserController)", ex.ToString());
            }
            return Ok(responses);
        }

        [HttpPost]
        [Route("userlegalagreement")]
        [ResponseType(typeof(Responses))]
        public IHttpActionResult UserLegalAgreement(UserProfile addUserLegalAggrement)
        {
            var responses = new Responses();
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var LegalAggrement = new UserProfile()
                {
                    UserId = Utility.UserId,
                    IsLegalAgreementAccepted = addUserLegalAggrement.IsLegalAgreementAccepted,
                    CreatedBy = Utility.UserId
                };
                int result = iSubscription.UserLegalAgreementAdd(LegalAggrement);

                if (result > 0)
                {
                    responses.Status = Utility.SUCCESS_STATUS_RESPONSE;
                    responses.Description = "Legal Aggrement successfully Done.";
                }
                else
                {
                    responses.Status = Utility.ERROR_STATUS_RESPONSE;
                    responses.Description = "Error in Legal Aggrement.";
                }

            }
            catch (Exception ex)
            {
                responses.Status = Utility.ERROR_STATUS_RESPONSE;
                responses.Description = "Error in Legal Aggrement.";

                Utility.WriteLog("AddSubscription", addUserLegalAggrement, "Error while adding Subscription. (SubscriptionUserController)", ex.ToString());
            }
            return Ok(responses);
        }


        [HttpGet]
        [Route("getEndUserLicenseAggrement")]
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
