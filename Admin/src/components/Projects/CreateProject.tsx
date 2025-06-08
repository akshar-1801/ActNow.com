import React, { useState } from "react";
import {
  ArrowLeft,
  Upload,
  X,
  Image,
  Video,
  FileText,
  Plus,
  Save,
  Eye,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface MultimediaItem {
  id: string;
  type: "photo" | "video" | "infographic";
  url: string;
  title: string;
  file?: File;
}

interface ProjectFormData {
  name: string;
  description: string;
  location: string;
  category: string;
  date: string;
  content: string;
  multimedia: MultimediaItem[];
}

const categories = [
  "Infrastructure",
  "Environmental",
  "Energy",
  "Agriculture",
  "Healthcare",
  "Aerospace",
  "Technology",
  "Education",
];

const CreateProject: React.FC = () => {
  const [formData, setFormData] = useState<ProjectFormData>({
    name: "",
    description: "",
    location: "",
    category: "",
    date: "",
    content: "",
    multimedia: [],
  });

  const [dragActive, setDragActive] = useState(false);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: keyof ProjectFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleFileUpload = (
    files: FileList | null,
    type: "photo" | "video" | "infographic"
  ) => {
    if (!files) return;

    Array.from(files).forEach((file) => {
      const url = URL.createObjectURL(file);
      const newItem: MultimediaItem = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        type,
        url,
        title: file.name.split(".")[0],
        file,
      };

      setFormData((prev) => ({
        ...prev,
        multimedia: [...prev.multimedia, newItem],
      }));
    });
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const files = e.dataTransfer.files;
      const file = files[0];

      // Determine file type
      let type: "photo" | "video" | "infographic" = "photo";
      if (file.type.startsWith("video/")) {
        type = "video";
      } else if (
        file.type === "application/pdf" ||
        file.name.toLowerCase().includes("infographic")
      ) {
        type = "infographic";
      }

      handleFileUpload(files, type);
    }
  };

  const removeMultimedia = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      multimedia: prev.multimedia.filter((item) => item.id !== id),
    }));
  };

  const updateMultimediaTitle = (id: string, title: string) => {
    setFormData((prev) => ({
      ...prev,
      multimedia: prev.multimedia.map((item) =>
        item.id === id ? { ...item, title } : item
      ),
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Project name is required";
    }
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }
    if (!formData.category) {
      newErrors.category = "Category is required";
    }
    if (!formData.content.trim()) {
      newErrors.content = "Content is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }

    // In real implementation, you would submit to your API
    console.log("Project Data:", formData);
    alert("Project created successfully! (Check console for data)");
  };

  const formatContentPreview = (content: string) => {
    return content.split("\n").map((line, index) => {
      line = line.trim();
      if (!line) return <br key={index} />;

      if (line.startsWith("# ")) {
        return (
          <h1
            key={index}
            className="text-2xl font-bold text-gray-900 mb-4 mt-6 first:mt-0"
          >
            {line.substring(2)}
          </h1>
        );
      } else if (line.startsWith("## ")) {
        return (
          <h2
            key={index}
            className="text-xl font-semibold text-gray-800 mb-3 mt-5"
          >
            {line.substring(3)}
          </h2>
        );
      } else if (line.startsWith("### ")) {
        return (
          <h3
            key={index}
            className="text-lg font-semibold text-gray-800 mb-2 mt-4"
          >
            {line.substring(4)}
          </h3>
        );
      } else if (line.startsWith("**") && line.endsWith("**")) {
        return (
          <p key={index} className="font-semibold text-gray-900 mb-2">
            {line.slice(2, -2)}
          </p>
        );
      } else if (line.startsWith("- ")) {
        return (
          <li key={index} className="text-gray-700 mb-1 ml-4">
            {line.substring(2)}
          </li>
        );
      } else {
        return (
          <p key={index} className="text-gray-700 mb-3 leading-relaxed">
            {line}
          </p>
        );
      }
    });
  };

  const getMediaIcon = (type: string) => {
    switch (type) {
      case "photo":
        return <Image className="w-4 h-4" />;
      case "video":
        return <Video className="w-4 h-4" />;
      case "infographic":
        return <FileText className="w-4 h-4" />;
      default:
        return <Image className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Create New Project
              </h1>
              <p className="text-gray-600 mt-1">
                Fill in the details to create your project
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsPreviewMode(!isPreviewMode)}
              >
                <Eye className="w-4 h-4 mr-2" />
                {isPreviewMode ? "Edit" : "Preview"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {!isPreviewMode ? (
          <div className="space-y-8">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name">Project Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Enter project name"
                    className={errors.name ? "border-red-500" : ""}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) =>
                      handleInputChange("description", e.target.value)
                    }
                    placeholder="Brief description of your project"
                    rows={3}
                    className={errors.description ? "border-red-500" : ""}
                  />
                  {errors.description && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.description}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category">Category *</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) =>
                        handleInputChange("category", value)
                      }
                    >
                      <SelectTrigger
                        className={errors.category ? "border-red-500" : ""}
                      >
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.category && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.category}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) =>
                        handleInputChange("location", e.target.value)
                      }
                      placeholder="Project location"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="date">Project Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleInputChange("date", e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Media Upload */}
            <Card>
              <CardHeader>
                <CardTitle>Project Media</CardTitle>
              </CardHeader>
              <CardContent>
                {/* Drag and Drop Area */}
                <div
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                    dragActive
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-300"
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-lg font-medium text-gray-700 mb-2">
                    Drag and drop files here, or click to select
                  </p>
                  <p className="text-sm text-gray-500 mb-4">
                    Support for photos, videos, and documents
                  </p>

                  <div className="flex justify-center gap-2">
                    <input
                      type="file"
                      id="photo-upload"
                      multiple
                      accept="image/*"
                      onChange={(e) =>
                        handleFileUpload(e.target.files, "photo")
                      }
                      className="hidden"
                    />
                    <input
                      type="file"
                      id="video-upload"
                      multiple
                      accept="video/*"
                      onChange={(e) =>
                        handleFileUpload(e.target.files, "video")
                      }
                      className="hidden"
                    />
                    <input
                      type="file"
                      id="document-upload"
                      multiple
                      accept=".pdf,.doc,.docx"
                      onChange={(e) =>
                        handleFileUpload(e.target.files, "infographic")
                      }
                      className="hidden"
                    />

                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        document.getElementById("photo-upload")?.click()
                      }
                    >
                      <Image className="w-4 h-4 mr-2" />
                      Photos
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        document.getElementById("video-upload")?.click()
                      }
                    >
                      <Video className="w-4 h-4 mr-2" />
                      Videos
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        document.getElementById("document-upload")?.click()
                      }
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      Documents
                    </Button>
                  </div>
                </div>

                {/* Uploaded Files */}
                {formData.multimedia.length > 0 && (
                  <div className="mt-6">
                    <h4 className="font-medium text-gray-900 mb-4">
                      Uploaded Files ({formData.multimedia.length})
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {formData.multimedia.map((item, idx) => (
                        <div key={item.id} className="border rounded-lg p-3">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              {getMediaIcon(item.type)}
                              <Badge variant="secondary" className="text-xs">
                                {item.type}
                              </Badge>
                            </div>
                            <div className="flex gap-1">
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="p-1"
                                disabled={idx === 0}
                                onClick={() => {
                                  if (idx === 0) return;
                                  setFormData((prev) => {
                                    const arr = [...prev.multimedia];
                                    [arr[idx - 1], arr[idx]] = [
                                      arr[idx],
                                      arr[idx - 1],
                                    ];
                                    return { ...prev, multimedia: arr };
                                  });
                                }}
                                title="Move up"
                              >
                                <span className="sr-only">Move up</span>
                                <svg
                                  width="16"
                                  height="16"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M18 15l-6-6-6 6"
                                  />
                                </svg>
                              </Button>
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="p-1"
                                disabled={
                                  idx === formData.multimedia.length - 1
                                }
                                onClick={() => {
                                  if (idx === formData.multimedia.length - 1)
                                    return;
                                  setFormData((prev) => {
                                    const arr = [...prev.multimedia];
                                    [arr[idx], arr[idx + 1]] = [
                                      arr[idx + 1],
                                      arr[idx],
                                    ];
                                    return { ...prev, multimedia: arr };
                                  });
                                }}
                                title="Move down"
                              >
                                <span className="sr-only">Move down</span>
                                <svg
                                  width="16"
                                  height="16"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 9l6 6 6-6"
                                  />
                                </svg>
                              </Button>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => removeMultimedia(item.id)}
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                          {item.type === "photo" && (
                            <img
                              src={item.url}
                              alt={item.title}
                              className="w-full h-24 object-cover rounded mb-2"
                            />
                          )}
                          <Input
                            value={item.title}
                            onChange={(e) =>
                              updateMultimediaTitle(item.id, e.target.value)
                            }
                            placeholder="Enter title"
                            className="text-sm"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Content Editor */}
            <Card>
              <CardHeader>
                <CardTitle>Project Content *</CardTitle>
                <p className="text-sm text-gray-600">
                  Use markdown formatting: # for headers, ## for subheaders,
                  **text** for bold, - for lists
                </p>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={formData.content}
                  onChange={(e) => handleInputChange("content", e.target.value)}
                  placeholder="Write your project content here...

# Project Overview
Describe your project in detail...

## Key Features
- Feature 1
- Feature 2
- Feature 3

## Implementation
**Technical details** about your project...
"
                  rows={15}
                  className={`font-mono ${
                    errors.content ? "border-red-500" : ""
                  }`}
                />
                {errors.content && (
                  <p className="text-red-500 text-sm mt-1">{errors.content}</p>
                )}
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => window.history.back()}
              >
                Cancel
              </Button>
              <Button onClick={handleSubmit}>
                <Save className="w-4 h-4 mr-2" />
                Create Project
              </Button>
            </div>
          </div>
        ) : (
          /* Preview Mode */
          <div className="space-y-8">
            {/* Preview Header */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h1 className="text-3xl font-bold text-gray-900">
                    {formData.name || "Project Name"}
                  </h1>
                  {formData.category && <Badge>{formData.category}</Badge>}
                </div>
                <p className="text-lg text-gray-600 mb-4">
                  {formData.description ||
                    "Project description will appear here"}
                </p>
                <div className="flex gap-4 text-sm text-gray-600">
                  {formData.location && (
                    <div className="flex items-center gap-1">
                      <span>📍</span> {formData.location}
                    </div>
                  )}
                  {formData.date && (
                    <div className="flex items-center gap-1">
                      <span>📅</span>{" "}
                      {new Date(formData.date).toLocaleDateString()}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Preview Media */}
            {formData.multimedia.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Media ({formData.multimedia.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {formData.multimedia.map((item) => (
                      <div key={item.id} className="border rounded-lg p-2">
                        {item.type === "photo" && (
                          <img
                            src={item.url}
                            alt={item.title}
                            className="w-full h-24 object-cover rounded mb-2"
                          />
                        )}
                        <div className="flex items-center gap-1 mb-1">
                          {getMediaIcon(item.type)}
                          <span className="text-xs text-gray-500">
                            {item.type}
                          </span>
                        </div>
                        <p className="text-sm font-medium truncate">
                          {item.title}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Preview Content */}
            <Card>
              <CardContent className="p-8">
                <div className="prose prose-gray max-w-none">
                  {formData.content ? (
                    formatContentPreview(formData.content)
                  ) : (
                    <p className="text-gray-500 italic">
                      Content will appear here when you write it...
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateProject;
