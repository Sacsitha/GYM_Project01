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
        [HttpGet("Get-All-Payments-By-MemberId/{id}")]

        public IActionResult GetAllPaymentsByMemberId(int id)
        {
            try
            {
                var fullPaymentsList = _paymentRepository.GetAllPayments();
                return Ok(fullPaymentsList);
            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("Add-Payment")]

        public IActionResult AddFullPayment(Payment payment)
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
