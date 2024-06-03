using Microsoft.AspNetCore.Mvc;
using server.Services;

namespace server.Controllers;

[Route("file")]
public class FileController : Controller
{
    private const int MaximumFileSize = 1024 * 1024 * 16;
    private FileStorageService _fileStorageService = new();

    [HttpPost]
    public IActionResult SaveFile(IFormFile file)
    {
        if (file == null || file.Length == 0)
            return new JsonResult(new { message = "File is empty!" })
            {
                StatusCode = StatusCodes.Status400BadRequest
            };

        if (file.Length > MaximumFileSize)
            return new JsonResult(new { message = "File is too large! " })
            {
                StatusCode = 413
            };

        string fileId = _fileStorageService.StoreFile(file);

        return Created($"/file/{fileId}", new { fileId });
    }

    [HttpGet("{id}")]
    public IActionResult GetFile(string id)
    {
        string filePath = _fileStorageService.GetFilePath(id);

        if (string.IsNullOrEmpty(filePath)) return NotFound();

        return PhysicalFile(filePath, "application/octet-stream");
    }
}