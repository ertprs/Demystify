﻿using DemystifyFema.Service.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DemystifyFema.Service.Repository
{
    interface IAmendmentContent
    {
        #region Get amendment content data
        IEnumerable<AmendmentContent> GetAmendmentContent(AmendmentContent amendmentContent);
        #endregion
    }
}
