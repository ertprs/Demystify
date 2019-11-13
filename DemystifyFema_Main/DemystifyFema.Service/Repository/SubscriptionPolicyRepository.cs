using DemystifyFema.Service.Common;
using DemystifyFema.Service.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity.Core.Objects;
using System.Linq;
using System.Web;

namespace DemystifyFema.Service.Repository
{
    public class SubscriptionPolicyRepository : ISubscriptionPolicy 
    {
        #region Add Subscription Policy
        public int AddSubscriptionPolicy(SubscriptionPolicy subPolicy)
        {
            using (DemsifyEntities dataContext = new DemsifyEntities())
            {
                ObjectParameter result = new ObjectParameter("Result", typeof(int));

                dataContext.SubscriptionPolicy_Add(subPolicy.SubPolicy, result);

                return Convert.ToInt32(result.Value);
            }
        }
        #endregion

        #region Get Subscription Policy
        public IEnumerable<SubscriptionPolicy> GetSubscriptionPolicy(SubscriptionPolicy subPolicy)
        {
            using (DemsifyEntities dataContext = new DemsifyEntities())
            {
                ObjectParameter totalPageCount = new ObjectParameter("TotalPageCount", typeof(int));
                ObjectParameter totalRecord = new ObjectParameter("TotalRecord", typeof(int));

                var priPolicy = dataContext.GetSubscriptionPolicy(subPolicy.ID, Utility.TrimString(subPolicy.SearchText), subPolicy.PageNumber, subPolicy.PageSize, subPolicy.IsPagingRequired, Utility.TrimString(subPolicy.OrderBy), Utility.TrimString(subPolicy.OrderByDirection), totalPageCount, totalRecord).ToList();

                var policyList = new List<SubscriptionPolicy>();
                foreach (var policyDetail in priPolicy)
                {
                    policyList.Add(new SubscriptionPolicy()
                    {
                        ID = policyDetail.ID,
                        SubPolicy = policyDetail.SubscriptionPolicy,
                    });
                }
                return policyList;
            }
        }
        #endregion
    }
}