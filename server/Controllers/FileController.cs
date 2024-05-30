using Microsoft.AspNetCore.Mvc;

namespace server.Controllers;

[Route("file")]
public class FileController : Controller
{
    [HttpPost]
    public IActionResult SaveFile(IFormFile file)
    {
        return Ok();
    }

    [HttpGet("{id}")]
    public IActionResult GetFile(string id)
    {
        return Ok();
    }
}