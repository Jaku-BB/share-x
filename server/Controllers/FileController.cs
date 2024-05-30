using System.Text.Json;
using Microsoft.AspNetCore.Mvc;

namespace server.Controllers;

public class FileMap
{
    public string OriginalFileName { get; set; } = string.Empty;
    public string FileId { get; set; } = string.Empty;
}

[Route("file")]
public class FileController : Controller
{
    [HttpPost]
    public IActionResult SaveFile(IFormFile file)
    {
        if (file.Length > 1024 * 1024 * 16) return StatusCode(413);

        string fileId = Guid.NewGuid().ToString();
        string extension = Path.GetExtension(file.FileName);

        string storagePath = Path.Combine(Directory.GetCurrentDirectory(), "Storage");

        if (!Directory.Exists(storagePath)) Directory.CreateDirectory(storagePath);

        using FileStream stream = new(Path.Combine(storagePath, fileId + extension), FileMode.Create);
        file.CopyTo(stream);

        string fileMapPath = Path.Combine(storagePath, "FileMap.json");

        if (!System.IO.File.Exists(fileMapPath)) System.IO.File.WriteAllText(fileMapPath, "[]");

        string fileMapJson = System.IO.File.ReadAllText(fileMapPath);

        var fileMap = JsonSerializer.Deserialize<List<FileMap>>(fileMapJson);

        fileMap?.Add(new FileMap
        {
            OriginalFileName = file.FileName,
            FileId = fileId
        });

        System.IO.File.WriteAllText(fileMapPath, JsonSerializer.Serialize(fileMap));

        return Ok(new
        {
            fileId
        });
    }

    [HttpGet("{id}")]
    public IActionResult GetFile(string id)
    {
        string storagePath = Path.Combine(Directory.GetCurrentDirectory(), "Storage");

        string fileMapPath = Path.Combine(storagePath, "FileMap.json");

        if (!System.IO.File.Exists(fileMapPath)) return NotFound();

        string fileMapJson = System.IO.File.ReadAllText(fileMapPath);

        var fileMap = JsonSerializer.Deserialize<List<FileMap>>(fileMapJson);

        var file = fileMap?.FirstOrDefault(x => x.FileId == id);

        if (file == null) return NotFound();

        string extension = Path.GetExtension(file.OriginalFileName);

        string filePath = Path.Combine(storagePath, id + extension);

        if (!System.IO.File.Exists(filePath)) return NotFound();

        return PhysicalFile(filePath, "application/octet-stream", file.OriginalFileName);
    }
}