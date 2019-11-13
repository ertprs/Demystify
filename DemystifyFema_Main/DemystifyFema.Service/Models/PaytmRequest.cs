using System.ComponentModel.DataAnnotations;

namespace DemystifyFema.Service.Models
{
    public class PaytmRequest
    {
        [Required]
        public string MID { get; set; }
        [Required]
        public string ORDER_ID { get; set; }
        [Required]
        public string CUST_ID { get; set; }
        [Required]
        public string CHANNEL_ID { get; set; }
        [Required]
        public string INDUSTRY_TYPE_ID { get; set; }
        [Required]
        public string WEBSITE { get; set; }
        [Required]
        public string TXN_AMOUNT { get; set; }
        [Required]
        public string EMAIL { get; set; }
        [Required]
        public string MOBILE_NO { get; set; }
        [Required]
        public string CALLBACK_URL { get; set; }
    }
}