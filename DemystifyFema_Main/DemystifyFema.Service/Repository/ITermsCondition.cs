using DemystifyFema.Service.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DemystifyFema.Service.Repository
{
    interface ITermsCondition
    {
        #region Add TermsCondition
        int AddTermsCondition(TermsCondition termsCondition);
        #endregion

        #region Get TermsCondition
        IEnumerable<TermsCondition> GetTermsCondition(TermsCondition termsCondition);
        #endregion
    }
}