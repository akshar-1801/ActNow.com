import React, { useState, useMemo, useEffect } from "react";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Video,
  FileText,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getProjectById } from "@/api/project";
import { useParams } from 'react-router-dom';


const ProjectDetailsPage: React.FC = () => {
  const [project, setProject] = useState<any>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { projectId } = useParams<{ projectId: string }>(); // ✅ add generic type

  useEffect(() => {
    const fetchProject = async () => {
      if (!projectId) return; // ✅ handle undefined

      try {
        const data = await getProjectById(projectId);
        setProject(data);
      } catch (error) {
        console.error("Failed to fetch project:", error);
      }
    };

    fetchProject();
  }, [projectId]);

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Project Not Found
          </h1>
          <p className="text-gray-600 mb-4">
            The project you're looking for doesn't exist.
          </p>
          <Button onClick={() => window.history.back()}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === project.multimedia.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? project.multimedia.length - 1 : prev - 1
    );
  };

  const formatContent = (content: string) => {
    return content.split("\n").map((line, index) => {
      line = line.trim();
      if (!line) return <br key={index} />;

      if (line.startsWith("# ")) {
        return (
          <h1
            key={index}
            className="text-3xl font-bold text-gray-900 mb-6 mt-8 first:mt-0"
          >
            {line.substring(2)}
          </h1>
        );
      } else if (line.startsWith("## ")) {
        return (
          <h2
            key={index}
            className="text-2xl font-semibold text-gray-800 mb-4 mt-6"
          >
            {line.substring(3)}
          </h2>
        );
      } else if (line.startsWith("### ")) {
        return (
          <h3
            key={index}
            className="text-xl font-semibold text-gray-800 mb-3 mt-5"
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
          <p key={index} className="text-gray-700 mb-4 leading-relaxed">
            {line}
          </p>
        );
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-2 py-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {project.name}
              </h1>
              <p className="text-lg text-gray-600">{project.description}</p>
            </div>
            <Badge className="self-start lg:self-center">
              {project.category}
            </Badge>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-4 text-sm text-gray-600">
            {project.location && (
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                {project.location}
              </div>
            )}
            {project.date && (
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                {new Date(project.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
            )}

          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-2 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Image Carousel */}
          <div className="lg:col-span-2 flex">
            {/* Thumbnails vertical on the left */}
            {project.multimedia.length > 1 && (
              <div className="hidden md:flex flex-col gap-2 mr-4 h-full justify-top">
                {project.multimedia.map((media, index) => (
                  <button
                    key={media.id}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-12 h-12 rounded-lg border-2 overflow-hidden flex-shrink-0 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400
                      ${index === currentImageIndex
                        ? "border-blue-600 shadow-lg scale-105"
                        : "border-gray-200 hover:border-blue-300 hover:shadow-md"
                      }
                    `}
                  >
                    {media.type === "video" ? (
                      <div className="w-full h-full flex items-center justify-center bg-gray-200">
                        <Video className="w-6 h-6 text-blue-500" />
                      </div>
                    ) : (
                      <img
                        src={media.url}
                        alt={media.title}
                        className="w-full h-full object-cover object-center"
                      />
                    )}
                  </button>
                ))}
              </div>
            )}
            <div className="relative w-full aspect-video bg-gray-100 flex items-center justify-center rounded-2xl shadow-lg overflow-hidden">
              {project.multimedia.length > 0 ? (
                <>
                  {project.multimedia[currentImageIndex].type === "video" ? (
                    <video
                      src={project.multimedia[currentImageIndex].url}
                      controls
                      className="w-full h-full object-cover object-center max-h-[400px] transition-all duration-700 ease-in-out rounded-2xl"
                      style={{ aspectRatio: "16/9" }}
                    >
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <img
                      src={project.multimedia[currentImageIndex].url}
                      alt={project.multimedia[currentImageIndex].title}
                      className="w-full h-full object-cover object-center max-h-[400px] transition-all duration-700 ease-in-out"
                      style={{ aspectRatio: "16/9" }}
                    />
                  )}
                  {project.multimedia.length > 1 && (
                    <>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={prevImage}
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={nextImage}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </>
                  )}
                  <div className="absolute bottom-2 right-2 bg-white/90 px-2 py-1 rounded text-sm">
                    {currentImageIndex + 1} / {project.multimedia.length}
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center w-full h-full">
                  <img className="w-16 h-16 text-gray-400" alt="No media" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="mt-4">
          <Card>
            <CardContent className="p-4">
              <div className="prose prose-gray max-w-none">
                {formatContent(project.content)}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsPage;
