using DemystifyFema.Service.Common;
using DemystifyFema.Service.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity.Core.Objects;
using System.Linq;
using System.Web;

namespace DemystifyFema.Service.Repository
{
    public class SubscriptionPackageRepository : ISubscriptionPackage
    {
        #region Add subscription Package data
        public int AddSubscriptionPackage(SubscriptionPackage subsPackage)
        {
            using (DemsifyEntities dataContext = new DemsifyEntities())
            {
                ObjectParameter result = new ObjectParameter("Result", typeof(int));

                dataContext.SubscriptionPackageAdd(subsPackage.PackageName, subsPackage.PackageAmount, subsPackage.PackageDetail, subsPackage.CreatedBy, result);

                return Convert.ToInt32(result.Value);
            }
        }
        #endregion

        #region Update subscription Package data
        public int UpdateSubscriptionPackage(SubscriptionPackage subsPackage)
        {
            using (DemsifyEntities dataContext = new DemsifyEntities())
            {
                ObjectParameter result = new ObjectParameter("Result", typeof(int));

                dataContext.SubscriptionPackageUpdate(subsPackage.PackageId, subsPackage.PackageName, subsPackage.PackageAmount, subsPackage.PackageDetail, subsPackage.ModifiedBy, result);

                return Convert.ToInt32(result.Value);
            }
        }
        #endregion

        #region Get subscription Package data
        public IEnumerable<SubscriptionPackage> GetSubscriptionPackage(SubscriptionPackage subscriptionPackage)
        {
            using (DemsifyEntities dataContext = new DemsifyEntities())
            {
                ObjectParameter totalPageCount = new ObjectParameter("TotalPageCount", typeof(int));
                ObjectParameter totalRecord = new ObjectParameter("TotalRecord", typeof(int));

                var subPackages = dataContext.SubscriptionPackageGet(subscriptionPackage.PackageId, Utility.TrimString(subscriptionPackage.SearchText), subscriptionPackage.IsActive, subscriptionPackage.PageNumber, subscriptionPackage.PageSize, subscriptionPackage.IsPagingRequired, Utility.TrimString(subscriptionPackage.OrderBy), Utility.TrimString(subscriptionPackage.OrderByDirection), totalPageCount, totalRecord).ToList();

                var subPackageList = new List<SubscriptionPackage>();
                foreach (var subPackageDetail in subPackages)
                {
                    subPackageList.Add(new SubscriptionPackage()
                    {
                        PackageId = subPackageDetail.PackageId,
                        PackageName = subPackageDetail.PackageName,
                        PackageAmount = subPackageDetail.PackageAmount,
                        PackageDetail = subPackageDetail.PackageDetail,
                        IsActive = subPackageDetail.IsActive,
                        TotalPageCount = Convert.ToInt32(totalPageCount.Value),
                        TotalRecord = Convert.ToInt32(totalRecord.Value)
                    });
                }
                return subPackageList;
            }
        }
        #endregion

        #region Delete subscription Package
        public int DeleteSubscriptionPackage(SubscriptionPackage subscriptionPackage)
        {
            using (DemsifyEntities dataContext = new DemsifyEntities())
            {
                ObjectParameter result = new ObjectParameter("Result", typeof(int));

                dataContext.SubscriptionPackageDelete(subscriptionPackage.PackageId, subscriptionPackage.ModifiedBy, result);

                return Convert.ToInt32(result.Value);
            }
        }
        #endregion

    }
}