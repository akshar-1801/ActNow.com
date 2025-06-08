import React, { useState, useMemo } from "react";
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

// Extended sample data with content field
const sampleProjects = [
  {
    id: "1",
    name: "Smart City Infrastructure",
    description:
      "Revolutionary urban planning project incorporating IoT sensors and sustainable energy solutions for modern metropolitan areas.",
    location: "New York, USA",
    category: "Infrastructure",
    date: new Date("2024-03-15"),
    content: `# Project Overview

The Smart City Infrastructure project represents a groundbreaking approach to urban development, integrating cutting-edge IoT sensors with sustainable energy solutions to create a more efficient and livable metropolitan environment.

## Key Objectives

Our primary goal is to transform traditional city infrastructure into an intelligent, responsive system that can adapt to the needs of its citizens in real-time. This involves deploying thousands of sensors throughout the city to monitor everything from traffic patterns to air quality.

### Technology Implementation

The project utilizes a comprehensive network of IoT devices connected through a robust 5G infrastructure. These devices collect data on:

- Traffic flow and congestion patterns
- Air quality and pollution levels
- Energy consumption across different districts
- Waste management efficiency
- Public transportation usage

## Sustainability Focus

Environmental sustainability is at the core of this initiative. We've integrated renewable energy sources throughout the infrastructure, including:

**Solar Panel Networks**: Strategic placement of solar panels on public buildings and transportation hubs to generate clean energy for the city's operations.

**Smart Grid Technology**: Implementation of intelligent energy distribution systems that optimize power usage and reduce waste.

**Green Building Standards**: All new construction follows strict environmental guidelines to minimize carbon footprint.

## Expected Impact

The project is expected to reduce the city's carbon emissions by 35% within the first five years of implementation. Additionally, we anticipate significant improvements in traffic flow, reduced energy costs for residents, and enhanced quality of life through better air quality monitoring and management.

## Implementation Timeline

The project is being rolled out in three phases over a 24-month period, with each phase targeting different districts of the city. Phase 1 focuses on the downtown core, Phase 2 expands to residential areas, and Phase 3 completes the integration with suburban zones.

## Community Engagement

Citizen participation is crucial to the success of this initiative. We've established community feedback systems and regular town halls to ensure that the technology serves the actual needs of the residents.

The future of urban living is intelligent, sustainable, and responsive to human needs. This project sets the foundation for cities worldwide to follow a similar path toward smart urbanization.
		`,
    multimedia: [
      {
        id: 1,
        type: "photo",
        url: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200&h=800&fit=crop",
        title: "City Overview",
      },
      {
        id: 2,
        type: "photo",
        url: "https://www.monash.edu/__data/assets/image/0011/3817028/smart-city-illustration.jpg?w=1200&h=800&fit=crop",
        title: "Smart Infrastructure",
      },
      {
        id: 3,
        type: "photo",
        url: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=1200&h=800&fit=crop",
        title: "IoT Sensors",
      },
      {
        id: 4,
        type: "video",
        url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        title: "Project Demo",
      },
    ],
  },
  {
    id: "2",
    name: "Ocean Conservation Initiative",
    description:
      "Comprehensive marine ecosystem restoration project focused on coral reef rehabilitation and marine biodiversity protection.",
    location: "Great Barrier Reef, Australia",
    category: "Environmental",
    date: new Date("2024-01-20"),
    content: `
# Marine Ecosystem Restoration

The Ocean Conservation Initiative is a comprehensive program dedicated to the restoration and protection of marine ecosystems, with a special focus on coral reef rehabilitation in the Great Barrier Reef region.

## The Challenge

Coral reefs worldwide are facing unprecedented threats from climate change, ocean acidification, and human activities. The Great Barrier Reef has lost approximately 50% of its coral cover in the past three decades, making immediate action critical for the survival of this UNESCO World Heritage site.

## Our Approach

### Coral Restoration Techniques

We employ several innovative methods for coral restoration:

**Coral Gardening**: Growing coral fragments in underwater nurseries before transplanting them to degraded reef areas.

**Assisted Gene Flow**: Introducing heat-resistant coral varieties to help reefs adapt to rising ocean temperatures.

**3D Reef Printing**: Using eco-friendly materials to create artificial reef structures that serve as foundations for new coral growth.

## Scientific Research

Our team of marine biologists conducts ongoing research to understand coral resilience and develop new conservation strategies. Recent breakthroughs include:

- Identification of super corals with enhanced heat tolerance
- Development of probiotic treatments to boost coral immunity
- Advanced monitoring systems using AI and underwater drones

## Community Involvement

Local communities, including indigenous groups, play a vital role in our conservation efforts. We provide training and employment opportunities in reef monitoring and restoration activities.

## Measurable Impact

Since the project's inception, we have:
- Restored over 500 hectares of degraded reef area
- Successfully transplanted 50,000 coral fragments
- Increased fish biodiversity by 40% in restoration zones
- Trained 200+ local conservation volunteers

## Future Goals

Our long-term vision includes expanding restoration efforts to other reef systems in the Indo-Pacific region and developing scalable solutions that can be implemented globally.

The health of our oceans depends on immediate and sustained action. Through scientific innovation and community partnership, we're working to ensure that future generations can experience the wonder of thriving coral reefs.
		`,
    multimedia: [
      {
        id: 3,
        type: "photo",
        url: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=1200&h=800&fit=crop",
        title: "Coral Restoration",
      },
      {
        id: 4,
        type: "photo",
        url: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&h=800&fit=crop",
        title: "Marine Life",
      },
      {
        id: 5,
        type: "infographic",
        url: "https://images.unsplash.com/photo-1559284013-1c97d11b2b81?w=1200&h=800&fit=crop",
        title: "Impact Statistics",
      },
    ],
  },
];

// Simulate getting project ID from URL params
const getProjectIdFromUrl = () => {
  return "1";
};

const ProjectDetailsPage: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const projectId = getProjectIdFromUrl();

  const project = useMemo(() => {
    return sampleProjects.find((p) => p.id === projectId);
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
                {project.date.toLocaleDateString("en-US", {
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
                      ${
                        index === currentImageIndex
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
