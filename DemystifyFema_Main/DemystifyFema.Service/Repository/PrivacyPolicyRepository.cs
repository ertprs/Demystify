using DemystifyFema.Service.Common;
using DemystifyFema.Service.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity.Core.Objects;
using System.Linq;
using System.Web;

namespace DemystifyFema.Service.Repository
{
    public class PrivacyPolicyRepository : IPrivacyPolicy
    {
        #region Add privacy policy
        public int AddPrivacyPolicy(PrivacyPolicy privacypolicy)
        {
            using (DemsifyEntities dataContext = new DemsifyEntities())
            {
                ObjectParameter result = new ObjectParameter("Result", typeof(int));

                dataContext.Policy_AddUpdate(privacypolicy.Policy, result);

                return Convert.ToInt32(result.Value);
            }
        }
        #endregion

        #region Get Privacy Policy
        public IEnumerable<PrivacyPolicy> GetPrivacyPolicy(PrivacyPolicy privatePolicy)
        {
            using (DemsifyEntities dataContext = new DemsifyEntities())
            {
                ObjectParameter totalPageCount = new ObjectParameter("TotalPageCount", typeof(int));
                ObjectParameter totalRecord = new ObjectParameter("TotalRecord", typeof(int));

                var priPolicy = dataContext.GetPrivacyPolicy(privatePolicy.ID, Utility.TrimString(privatePolicy.SearchText), privatePolicy.PageNumber, privatePolicy.PageSize, privatePolicy.IsPagingRequired, Utility.TrimString(privatePolicy.OrderBy), Utility.TrimString(privatePolicy.OrderByDirection), totalPageCount, totalRecord).ToList();

                var policyList = new List<PrivacyPolicy>();
                foreach (var policyDetail in priPolicy)
                {
                    policyList.Add(new PrivacyPolicy()
                    {
                        ID = policyDetail.ID,
                        Policy = policyDetail.PrivacyPolicy,
                    });
                }
                return policyList;
            }
        }
        #endregion
    }
}