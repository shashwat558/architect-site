"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ImageUpload } from "../components/ImageUpload";
import { MultiImageUpload } from "../components/MultiImageUpload";

interface Project {
  id: string;
  title: string;
  subtitle?: string;
  category: string;
  year: number;
  location: string;
  brief?: string;
  approach?: string;
  image: string;
  heroImage: string;
  gallery: string[];
  processGallery?: string[];
  slug: string;
  link: string;
  createdAt: string;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    category: "",
    year: new Date().getFullYear(),
    location: "",
    brief: "",
    approach: "",
    image: "",
    heroImage: "",
    gallery: [] as string[],
    processGallery: [] as string[],
    slug: "",
  });

  // Auto-generate slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-'); // Replace multiple hyphens with single hyphen
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/projects");
      const data = await res.json();
      setProjects(data.projects || []);
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingProject
        ? `/api/projects/${editingProject.id}`
        : "/api/projects";
      const method = editingProject ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        fetchProjects();
        resetForm();
      } else {
        const error = await res.json();
        alert(error.error || "Failed to save project");
      }
    } catch (error) {
      console.error("Failed to save project:", error);
      alert("Failed to save project");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchProjects();
      }
    } catch (error) {
      console.error("Failed to delete project:", error);
    }
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      subtitle: project.subtitle || "",
      category: project.category,
      year: project.year,
      location: project.location,
      brief: project.brief || "",
      approach: project.approach || "",
      image: project.image,
      heroImage: project.heroImage || "",
      gallery: project.gallery || [],
      processGallery: project.processGallery || [],
      slug: project.slug,
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      title: "",
      subtitle: "",
      category: "",
      year: new Date().getFullYear(),
      location: "",
      brief: "",
      approach: "",
      image: "",
      heroImage: "",
      gallery: [],
      processGallery: [],
      slug: "",
    });
    setEditingProject(null);
    setShowForm(false);
  };

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 sm:mb-8 gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Projects</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-indigo-600 text-white px-4 py-3 rounded-md hover:bg-indigo-700 self-start sm:self-auto min-h-11"
        >
          {showForm ? "Cancel" : "Add Project"}
        </button>
      </div>

      {showForm && (
        <div className="bg-white shadow rounded-lg p-4 sm:p-6 mb-6 sm:mb-8">
          <h2 className="text-xl font-semibold mb-4">
            {editingProject ? "Edit Project" : "Create Project"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => {
                    const newTitle = e.target.value;
                    setFormData({ 
                      ...formData, 
                      title: newTitle,
                      slug: generateSlug(newTitle)
                    });
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                {formData.slug && (
                  <p className="mt-1 text-sm text-gray-500">
                    URL: <span className="font-mono text-indigo-600">/projects/{formData.slug}</span>
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subtitle
                </label>
                <input
                  type="text"
                  value={formData.subtitle}
                  onChange={(e) =>
                    setFormData({ ...formData, subtitle: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="A tagline for the project"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category *
                </label>
                <input
                  type="text"
                  required
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Year *
                </label>
                <input
                  type="number"
                  required
                  value={formData.year}
                  onChange={(e) =>
                    setFormData({ ...formData, year: parseInt(e.target.value) })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Brief
                </label>
                <textarea
                  value={formData.brief}
                  onChange={(e) =>
                    setFormData({ ...formData, brief: e.target.value })
                  }
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Client's requirements and context..."
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Approach
                </label>
                <textarea
                  value={formData.approach}
                  onChange={(e) =>
                    setFormData({ ...formData, approach: e.target.value })
                  }
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Design strategy and approach..."
                />
              </div>

              <div className="sm:col-span-2">
                <ImageUpload
                  value={formData.image}
                  onChange={(url) => setFormData({ ...formData, image: url })}
                  folder="adrs/projects"
                  label="Thumbnail Image"
                />
              </div>
              <div className="sm:col-span-2">
                <ImageUpload
                  value={formData.heroImage}
                  onChange={(url) => setFormData({ ...formData, heroImage: url })}
                  folder="adrs/projects"
                  label="Hero Image"
                />
              </div>
              <div className="sm:col-span-2">
                <MultiImageUpload
                  value={formData.gallery}
                  onChange={(urls) => setFormData({ ...formData, gallery: urls })}
                  folder="adrs/projects/gallery"
                  label="Project Gallery"
                  maxImages={20}
                />
              </div>
              <div className="sm:col-span-2">
                <MultiImageUpload
                  value={formData.processGallery}
                  onChange={(urls) => setFormData({ ...formData, processGallery: urls })}
                  folder="adrs/projects/process"
                  label="Process Gallery (Sketches, Diagrams)"
                  maxImages={15}
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <button
                type="submit"
                className="bg-indigo-600 text-white px-4 py-3 rounded-md hover:bg-indigo-700 min-h-11"
              >
                {editingProject ? "Update" : "Create"}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-200 text-gray-700 px-4 py-3 rounded-md hover:bg-gray-300 min-h-11"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white shadow overflow-hidden rounded-md">
        <ul className="divide-y divide-gray-200">
          {projects.length === 0 ? (
            <li className="px-4 sm:px-6 py-8 text-center text-gray-500">
              No projects yet. Create your first project!
            </li>
          ) : (
            projects.map((project) => (
              <li key={project.id}>
                <div className="px-4 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start sm:items-center gap-4">
                      {project.image && (
                        <Image
                          src={project.image}
                          alt={project.title}
                          width={64}
                          height={64}
                          className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded shrink-0"
                        />
                      )}
                      <div className="min-w-0 flex-1">
                        <h3 className="text-base sm:text-lg font-medium text-gray-900 break-words">
                          {project.title}
                        </h3>
                        <p className="text-sm text-gray-500 break-words">
                          {project.category} • {project.year}
                          {project.location && ` • ${project.location}`}
                        </p>
                        <p className="text-xs text-gray-400 mt-1 break-all">
                          Slug: {project.slug}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button
                      onClick={() => handleEdit(project)}
                      className="text-indigo-600 hover:text-indigo-900 px-3 py-2 text-sm min-h-11"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(project.id)}
                      className="text-red-600 hover:text-red-900 px-3 py-2 text-sm min-h-11"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
