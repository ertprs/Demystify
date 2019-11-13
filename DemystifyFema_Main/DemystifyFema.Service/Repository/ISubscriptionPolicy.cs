using DemystifyFema.Service.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DemystifyFema.Service.Repository
{
    interface ISubscriptionPolicy
    {
        #region Add SubscriptionPolicy
        int AddSubscriptionPolicy(SubscriptionPolicy subPolicy);
        #endregion

        #region Get SubscriptionPolicy
        IEnumerable<SubscriptionPolicy> GetSubscriptionPolicy(SubscriptionPolicy subPolicy);
        #endregion
    }
}