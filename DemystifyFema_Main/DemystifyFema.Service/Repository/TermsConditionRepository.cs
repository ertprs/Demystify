using DemystifyFema.Service.Common;
using DemystifyFema.Service.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity.Core.Objects;
using System.Linq;
using System.Web;


namespace DemystifyFema.Service.Repository
{
    public class TermsConditionRepository :ITermsCondition
    {
        #region Add TermsCondition
        public int AddTermsCondition(TermsCondition termsCondition)
        {
            using (DemsifyEntities dataContext = new DemsifyEntities())
            {
                ObjectParameter result = new ObjectParameter("Result", typeof(int));

               dataContext.TermsCondition_Add(termsCondition.TermsandCondition, result);

                return Convert.ToInt32(result.Value);
            }
        }
        #endregion



        #region Get TermsCondition
        public IEnumerable<TermsCondition> GetTermsCondition(TermsCondition termsCondition)
        {
            using (DemsifyEntities dataContext = new DemsifyEntities())
            {
                ObjectParameter totalPageCount = new ObjectParameter("TotalPageCount", typeof(int));
                ObjectParameter totalRecord = new ObjectParameter("TotalRecord", typeof(int));

               var priTerms = dataContext.GetTermsCondition(termsCondition.ID, Utility.TrimString(termsCondition.SearchText), termsCondition.PageNumber, termsCondition.PageSize, termsCondition.IsPagingRequired, Utility.TrimString(termsCondition.OrderBy), Utility.TrimString(termsCondition.OrderByDirection), totalPageCount, totalRecord).ToList();

                var termsList = new List<TermsCondition>();
                foreach (var policyDetail in priTerms)
                {
                    termsList.Add(new TermsCondition()
                    {
                        ID = policyDetail.ID,
                        TermsandCondition = policyDetail.TermsCondition,
                    });
                }
                return termsList;
            }
        }
        #endregion
    }
}