using DemystifyFema.Service.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DemystifyFema.Service.Repository
{
    interface ISubscriptionPackage
    {
        #region Add subscription Package data
        int AddSubscriptionPackage(SubscriptionPackage subscriptionPackage);
        #endregion

        #region Update subscription Package data
        int UpdateSubscriptionPackage(SubscriptionPackage subscriptionPackage);
        #endregion

        #region Get subscription Package data
        IEnumerable<SubscriptionPackage> GetSubscriptionPackage(SubscriptionPackage subscriptionPackage);
        #endregion

        #region Delete subscription Package
        int DeleteSubscriptionPackage(SubscriptionPackage subscriptionPackage);
        #endregion
    }
}