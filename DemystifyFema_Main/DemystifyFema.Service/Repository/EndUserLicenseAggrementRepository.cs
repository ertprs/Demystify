using DemystifyFema.Service.Common;
using DemystifyFema.Service.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity.Core.Objects;
using System.Linq;
using System.Web;


namespace DemystifyFema.Service.Repository
{
    public class EndUserLicenseAggrementRepository : IEndUserLicenseAggrement
    {
        #region Add EndUser License Aggrement
        public int AddEndUserLicenseAggrement(EndUserLicenseAggrement eula)
        {
            using (DemsifyEntities dataContext = new DemsifyEntities())
            {
                ObjectParameter result = new ObjectParameter("Result", typeof(int));

                dataContext.EndUserLicenseAggrement_Add(eula.EULA, result);

                return Convert.ToInt32(result.Value);
            }
        }
        #endregion

        #region Get EndUser License Aggrement
        public IEnumerable<EndUserLicenseAggrement> GetEndUserLicenseAggrement(EndUserLicenseAggrement eula)
        {
            using (DemsifyEntities dataContext = new DemsifyEntities())
            {
                ObjectParameter totalPageCount = new ObjectParameter("TotalPageCount", typeof(int));
                ObjectParameter totalRecord = new ObjectParameter("TotalRecord", typeof(int));

                var priPolicy = dataContext.GetEndUserLicenseAggrement(eula.ID, Utility.TrimString(eula.SearchText), eula.PageNumber, eula.PageSize, eula.IsPagingRequired, Utility.TrimString(eula.OrderBy), Utility.TrimString(eula.OrderByDirection), totalPageCount, totalRecord).ToList();

                var policyList = new List<EndUserLicenseAggrement>();
                foreach (var policyDetail in priPolicy)
                {
                    policyList.Add(new EndUserLicenseAggrement()
                    {
                        ID = policyDetail.ID,
                        EULA = policyDetail.EndUserLicenseAggrement,
                    });
                }
                return policyList;
            }
        }
        #endregion
    }
}