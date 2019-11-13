using DemystifyFema.Service.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DemystifyFema.Service.Repository
{
    interface IPrivacyPolicy
    {
        #region Add Privacy Policy
        int AddPrivacyPolicy(PrivacyPolicy privacyPolicy);
        #endregion

        #region Get Privacy Policy
        IEnumerable<PrivacyPolicy> GetPrivacyPolicy(PrivacyPolicy privacyPolicy);
        #endregion
    }
}