using System.Text.Json;

namespace server.Services;

public class FileStorageService
{
    private static string _fileStoragePath = Path.Combine(Directory.GetCurrentDirectory(), "Storage");
    private string _fileMapPath = Path.Combine(_fileStoragePath, "FileMap.json");

    private class FileMapEntity
    {
        public string FileId { get; set; } = string.Empty;
        public string OriginalFileName { get; set; } = string.Empty;
    }

    public FileStorageService()
    {
        if (!Directory.Exists(_fileStoragePath)) Directory.CreateDirectory(_fileStoragePath);
        if (!File.Exists(_fileMapPath)) File.WriteAllText(_fileMapPath, "[]");
    }

    private List<FileMapEntity> GetFileMap()
    {
        string rawFileMapContent = File.ReadAllText(_fileMapPath);
        return JsonSerializer.Deserialize<List<FileMapEntity>>(rawFileMapContent) ?? [];
    }

    public string StoreFile(IFormFile file)
    {
        string fileId = Guid.NewGuid().ToString();
        string extension = Path.GetExtension(file.FileName);

        using FileStream stream = new(Path.Combine(_fileStoragePath, fileId + extension), FileMode.Create);
        file.CopyTo(stream);

        var fileMap = GetFileMap();

        fileMap.Add(new FileMapEntity
        {
            FileId = fileId,
            OriginalFileName = file.FileName
        });

        File.WriteAllText(_fileMapPath, JsonSerializer.Serialize(fileMap));

        return fileId;
    }

    public string GetFilePath(string fileId)
    {
        var fileMap = GetFileMap();
        var file = fileMap.FirstOrDefault(file => file.FileId == fileId);

        if (file == null) return string.Empty;

        string extension = Path.GetExtension(file.OriginalFileName);
        string filePath = Path.Combine(_fileStoragePath, fileId + extension);

        return File.Exists(filePath) ? filePath : string.Empty;
    }

    public string GetFileName(string fileId)
    {
        var fileMap = GetFileMap();
        var file = fileMap.FirstOrDefault(file => file.FileId == fileId);

        return file == null ? string.Empty : file.OriginalFileName;
    }
}