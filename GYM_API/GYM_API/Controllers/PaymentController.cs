using GYM_API.IRepository;
using GYM_API.Modals.ResponseModal;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GYM_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentController : ControllerBase
    {
        private readonly IPaymentRepository _paymentRepository;

        public PaymentController(IPaymentRepository _paymentRepository)
        {
           this._paymentRepository = _paymentRepository;
        }

        [HttpGet("Get-All-FullPayments")]

        public IActionResult GetAllFullPayments()
        {
            var fullPaymentsList = _paymentRepository.GetAllFullPayments();
            return Ok(fullPaymentsList);
        }

        [HttpPost("Add-FullPayment")]

        public IActionResult AddFullPayment(PaymentResponseDTO paymentResponseDTO)
        {
            var fullPaymentDetail = _paymentRepository.AddFullPayment(paymentResponseDTO);
            return Ok(fullPaymentDetail);
        }
    }
}
