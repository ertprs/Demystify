namespace DemystifyFema.Service.Models
{
    public class PaytmOrderStatusResponse
    {
        public string MID { get; set; }
        public string TXNID { get; set; }
        public string ORDERID { get; set; }
        public string BANKTXNID { get; set; }
        public string TXNAMOUNT { get; set; }
        public string STATUS { get; set; }
        public string RESPCODE { get; set; }
        public string RESPMSG { get; set; }
        public string TXNDATE { get; set; }
        public string GATEWAYNAME { get; set; }
        public string BANKNAME { get; set; }
        public string PAYMENTMODE { get; set; }
        public string TXNTYPE { get; set; }
        public string REFUNDAMT { get; set; }
    }
}