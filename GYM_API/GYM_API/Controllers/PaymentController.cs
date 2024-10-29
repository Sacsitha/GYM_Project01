using GYM_API.Entities;
using GYM_API.IRepository;
using GYM_API.Modals.RequestModal;
using GYM_API.Modals.ResponseModal;
using GYM_API.Repository;
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

        [HttpGet("Get-All-Payments")]

        public IActionResult GetAllFullPayments()
        {
            var fullPaymentsList = _paymentRepository.GetAllPayments();
            return Ok(fullPaymentsList);
        }
        [HttpGet("Get-All-Payments-Id/{id}")]

        public IActionResult GetAllPaymentsById(string id)
        {
            var fullPaymentsList = _paymentRepository.GetAllPaymentsById(id);
            return Ok(fullPaymentsList);
        }

        [HttpPost("Add-Payment")]

        public IActionResult AddFullPayment(PaymentResponseDTO payment)
        {
            try
            {
                _paymentRepository.AddFullPayment(payment);
                return Ok(payment);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
