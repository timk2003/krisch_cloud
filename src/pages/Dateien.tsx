import { useState } from 'react';
import { FolderIcon, FileIcon, FileTextIcon, ImageIcon, FileSpreadsheetIcon, PlusCircle, Trash2 } from 'lucide-react';

interface FileItem {
  id: string;
  name: string;
  type: 'image' | 'document' | 'spreadsheet' | 'other';
  size: string;
  date: string;
}

const Dateien = () => {
  // Demo-Daten
  const [files, setFiles] = useState<FileItem[]>([
    { id: "1", name: "Trainingsplan.pdf", type: "document", size: "1.2 MB", date: "15.05.2025" },
    { id: "2", name: "Projektdokumentation.docx", type: "document", size: "3.5 MB", date: "14.05.2025" },
    { id: "3", name: "Finanzbericht.xlsx", type: "spreadsheet", size: "2.1 MB", date: "12.05.2025" },
    { id: "4", name: "Profilbild.jpg", type: "image", size: "0.8 MB", date: "10.05.2025" },
    { id: "5", name: "Notizen.txt", type: "document", size: "0.1 MB", date: "05.05.2025" }
  ]);
  
  const deleteFile = (id: string) => {
    setFiles(files.filter(file => file.id !== id));
  };
  
  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case 'image':
        return <ImageIcon size={20} className="text-blue-500" />;
      case 'document':
        return <FileTextIcon size={20} className="text-green-500" />;
      case 'spreadsheet':
        return <FileSpreadsheetIcon size={20} className="text-emerald-500" />;
      default:
        return <FileIcon size={20} className="text-gray-500" />;
    }
  };
  
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Dateien</h1>
        <p className="text-muted-foreground">Verwalte und organisiere deine Dateien</p>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        {/* Upload-Bereich */}
        <div className="bg-card border border-border rounded-lg shadow-sm p-5">
          <div className="flex items-center mb-4">
            <FolderIcon className="text-primary mr-2" size={20} />
            <h2 className="text-xl font-semibold">Datei hochladen</h2>
          </div>
          
          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
            <input type="file" id="file-upload" className="hidden" />
            <label htmlFor="file-upload" className="cursor-pointer">
              <div className="flex flex-col items-center">
                <PlusCircle size={40} className="text-primary mb-2" />
                <p className="text-lg font-medium mb-1">Dateien hier ablegen</p>
                <p className="text-sm text-muted-foreground mb-4">oder klicken, um Dateien auszuwählen</p>
                <button className="px-4 py-2 bg-secondary hover:bg-secondary/80 rounded-md text-sm transition-colors">
                  Dateien auswählen
                </button>
              </div>
            </label>
          </div>
        </div>
        
        {/* Datei-Liste */}
        <div className="bg-card border border-border rounded-lg shadow-sm p-5">
          <h2 className="text-xl font-semibold mb-4">Deine Dateien</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-medium">Name</th>
                  <th className="text-left py-3 px-4 text-sm font-medium">Typ</th>
                  <th className="text-left py-3 px-4 text-sm font-medium">Größe</th>
                  <th className="text-left py-3 px-4 text-sm font-medium">Datum</th>
                  <th className="text-right py-3 px-4 text-sm font-medium"></th>
                </tr>
              </thead>
              <tbody>
                {files.map((file) => (
                  <tr key={file.id} className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors">
                    <td className="py-3 px-4 text-sm">
                      <div className="flex items-center">
                        {getFileIcon(file.type)}
                        <span className="ml-2">{file.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-muted-foreground capitalize">{file.type}</td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{file.size}</td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{file.date}</td>
                    <td className="py-3 px-4 text-sm text-right">
                      <button 
                        onClick={() => deleteFile(file.id)}
                        className="p-1 text-muted-foreground hover:text-destructive transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dateien;