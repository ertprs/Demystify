using DemystifyFema.Service.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DemystifyFema.Service.Repository
{
    interface IEndUserLicenseAggrement
    {
        #region Add EULA
        int AddEndUserLicenseAggrement(EndUserLicenseAggrement EULA);
        #endregion

        #region Get EULA
        IEnumerable<EndUserLicenseAggrement> GetEndUserLicenseAggrement(EndUserLicenseAggrement EULA);
        #endregion
    }
}