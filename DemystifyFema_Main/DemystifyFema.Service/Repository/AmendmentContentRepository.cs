using DemystifyFema.Service.Common;
using DemystifyFema.Service.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity.Core.Objects;
using System.Linq;
using System.Web;

namespace DemystifyFema.Service.Repository
{
    public class AmendmentContentRepository : IAmendmentContent
    {
        #region Get amendment content data
        public IEnumerable<AmendmentContent> GetAmendmentContent(AmendmentContent amendmentContent)
        {
            using (DemsifyEntities dataContext = new DemsifyEntities())
            {
                ObjectParameter totalPageCount = new ObjectParameter("TotalPageCount", typeof(int));
                ObjectParameter totalRecord = new ObjectParameter("TotalRecord", typeof(int));

                var amendmentContents = dataContext.AmendmentContentGet(amendmentContent.AmendmentContentId, amendmentContent.IndexAmendmentId, amendmentContent.AmendmentContentModuleId, Utility.TrimString(amendmentContent.SearchText), amendmentContent.IsActive, amendmentContent.PageNumber, amendmentContent.PageSize, amendmentContent.IsPagingRequired, Utility.TrimString(amendmentContent.OrderBy), Utility.TrimString(amendmentContent.OrderByDirection), totalPageCount, totalRecord).ToList();

                var amendmentContentList = new List<AmendmentContent>();
                foreach (var amendmentContentDetail in amendmentContents)
                {
                    amendmentContentList.Add(new AmendmentContent()
                    {
                        AmendmentContentId = amendmentContentDetail.AmendmentContentId,
                        IndexAmendmentId = amendmentContentDetail.IndexAmendmentId,
                        AmendmentContents = amendmentContentDetail.AmendmentContent,
                        IsActive = amendmentContentDetail.IsActive,
                        TotalPageCount = Convert.ToInt32(totalPageCount.Value),
                        TotalRecord = Convert.ToInt32(totalRecord.Value)
                    });
                }
                return amendmentContentList;
            }
        }
        #endregion
    }
}