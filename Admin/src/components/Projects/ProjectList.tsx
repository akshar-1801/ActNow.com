import React, { useState, useMemo } from "react";
import {
  Search,
  Filter,
  Calendar,
  MapPin,
  ImageIcon,
  Video,
  FileText,
  Plus,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "react-router-dom";

const sampleProjects = [
  {
    id: "1",
    name: "Smart City Infrastructure",
    description:
      "Revolutionary urban planning project incorporating IoT sensors and sustainable energy solutions for modern metropolitan areas.",
    location: "New York, USA",
    category: "Infrastructure",
    date: new Date("2024-03-15"),
    multimedia: [
      {
        id: 1,
        type: "photo",
        url: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop",
        title: "City Overview",
      },
      { id: 2, type: "video", url: "#", title: "Project Demo" },
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
    multimedia: [
      {
        id: 3,
        type: "photo",
        url: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=800&h=600&fit=crop",
        title: "Coral Restoration",
      },
      { id: 4, type: "infographic", url: "#", title: "Impact Statistics" },
    ],
  },
  {
    id: "3",
    name: "Renewable Energy Grid",
    description:
      "Next-generation solar and wind power distribution network designed to power sustainable communities across rural areas.",
    location: "Texas, USA",
    category: "Energy",
    date: new Date("2024-02-10"),
    multimedia: [
      {
        id: 5,
        type: "photo",
        url: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&h=600&fit=crop",
        title: "Solar Installation",
      },
    ],
  },
  {
    id: "4",
    name: "Urban Vertical Farming",
    description:
      "Innovative hydroponic farming towers that maximize food production in minimal urban space using advanced LED growing systems.",
    location: "Singapore",
    category: "Agriculture",
    date: new Date("2024-04-05"),
    multimedia: [
      {
        id: 6,
        type: "photo",
        url: "https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=800&h=600&fit=crop",
        title: "Vertical Farm",
      },
      { id: 7, type: "video", url: "#", title: "Growing Process" },
    ],
  },
  {
    id: "5",
    name: "AI Healthcare Platform",
    description:
      "Machine learning powered diagnostic system that assists medical professionals in early disease detection and treatment planning.",
    location: "London, UK",
    category: "Healthcare",
    date: new Date("2024-05-12"),
    multimedia: [
      {
        id: 8,
        type: "infographic",
        url: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop",
        title: "AI Interface",
      },
    ],
  },
  {
    id: "6",
    name: "Space Tourism Hub",
    description:
      "Commercial spaceport facility designed for civilian space travel with state-of-the-art safety systems and luxury amenities.",
    location: "Nevada, USA",
    category: "Aerospace",
    date: new Date("2024-06-01"),
    multimedia: [
      {
        id: 9,
        type: "photo",
        url: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=800&h=600&fit=crop",
        title: "Spaceport Design",
      },
    ],
  },
];

const categories = [
  "All",
  "Infrastructure",
  "Environmental",
  "Energy",
  "Agriculture",
  "Healthcare",
  "Aerospace",
];

const getMediaIcon = (type: string) => {
  switch (type) {
    case "photo":
      return <ImageIcon className="w-3 h-3" />;
    case "video":
      return <Video className="w-3 h-3" />;
    case "infographic":
      return <FileText className="w-3 h-3" />;
    default:
      return <ImageIcon className="w-3 h-3" />;
  }
};

const ProjectList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("date");
  const navigate = useNavigate();

  const filteredAndSortedProjects = useMemo(() => {
    let filtered = sampleProjects.filter((project) => {
      const matchesSearch =
        project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.location?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || project.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case "date":
          return (
            new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime()
          );
        case "name":
          return a.name.localeCompare(b.name);
        case "category":
          return (a.category || "").localeCompare(b.category || "");
        default:
          return 0;
      }
    });
  }, [searchTerm, selectedCategory, sortBy]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2 inline-block">
              Projects
            </h1>
            <p className="text-gray-600">
              Manage and explore your project portfolio
            </p>
          </div>
          <Button
            variant="default"
            className="ml-4"
            onClick={() => navigate("/dashboard/projects/create")}
          >
            <Plus/> Create
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg border shadow-sm p-4 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Latest First</SelectItem>
                  <SelectItem value="name">Name A-Z</SelectItem>
                  <SelectItem value="category">Category</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Results Counter */}
        <div className="mb-6">
          <p className="text-sm text-gray-600">
            {filteredAndSortedProjects.length} project
            {filteredAndSortedProjects.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedProjects.map((project) => (
            <Card
              key={project.id}
              className="hover:shadow-md transition-shadow flex flex-col h-full"
            >
              {/* Project Image */}
              <div className="aspect-video relative overflow-hidden">
                {/* Category Badge - top left */}
                <div className="absolute top-2 left-2 z-10">
                  <Badge variant="secondary" className="text-xs">
                    {project.category}
                  </Badge>
                </div>
                {project.multimedia.length > 0 ? (
                  <img
                    src={project.multimedia[0].url}
                    alt={project.multimedia[0].title || project.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                    <ImageIcon className="w-8 h-8 text-gray-400" />
                  </div>
                )}
                {/* Media Count */}
                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs flex items-center gap-1">
                  {getMediaIcon(project.multimedia[0]?.type || "photo")}
                  {project.multimedia.length}
                </div>
              </div>

              <div className="flex flex-col flex-1">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-lg font-semibold line-clamp-2">
                      {project.name}
                    </CardTitle>
                  </div>
                </CardHeader>

                <CardContent className="pt-0 flex flex-col flex-1">
                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                    {project.description}
                  </p>
                  <div className="flex-1" />
                  <div className="space-y-2 mb-4">
                    {project.location && (
                      <div className="flex items-center text-xs text-gray-500">
                        <MapPin className="w-3 h-3 mr-2" />
                        <span className="truncate">{project.location}</span>
                      </div>
                    )}
                    {project.date && (
                      <div className="flex items-center text-xs text-gray-500">
                        <Calendar className="w-3 h-3 mr-2" />
                        <span>{project.date.toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>
                  <Button
                    variant="outline"
                    className="w-full text-sm mt-auto mb-2"
                    onClick={() =>
                      navigate(`/dashboard/projects/${project.id}`)
                    }
                  >
                    View Details
                  </Button>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredAndSortedProjects.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-white border rounded-lg p-8 max-w-md mx-auto">
              <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No projects found
              </h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your search or filters
              </p>
              <Button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("All");
                }}
                variant="outline"
              >
                Clear Filters
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectList;
